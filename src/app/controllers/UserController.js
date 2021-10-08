import * as Yup from 'yup';
import User from '../models/User';
import bcrypt from 'bcryptjs';

class UserController {
    //===================================================================================================    
    //Criar usuario.
    async store(req, res) {

        if (!req.body.name) {
            return res.status(401).json({ 'Erro': "Preencha o name" });
        }

        if (!req.body.cpf) {
            return res.status(401).json({ 'Erro': "Preencha o cpf" });
        }

        if (!req.body.email) {
            return res.status(401).json({ 'Erro': "Preencha o email" });
        }

        if (!req.body.password) {
            return res.status(401).json({ 'Erro': "Preencha o senha" });
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { cpf } = req.body;

        try {
            if (await User.findOne({ cpf }))
                return res.status(400).json({ error: "Usuario ja cadastrado" })

            const user = await User.create(req.body)

            user.password = undefined;

            return res.json(user);

        } catch (error) {
            return res.status(401).json({ 'Erro': error });
        }
    }


    async selectedUsers(req, res) {
        return res.json({ ok: "Teste" })

    }

    //===================================================================================================    
    async updateUser(req, res) {
        // Alteração de dados usuario.
        const schema = Yup.object().shape({
            name: Yup.string(),
            cpf: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });


        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' });
        }

        const { cpf, oldPassword } = req.body;

        //selecionando id do usuario.       
        const user = await User.findOne({ cpf }).select('+password');

        if (!user) {
            return res.status(400).json({ error: "Usuario não existe" })
        }


        if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({ error: "Senha incorreta." })
        }

        const userUpdate = await user.update(req.body);

        userUpdate.password = undefined;

        return res.json(userUpdate);
    }

}


export default new UserController();

