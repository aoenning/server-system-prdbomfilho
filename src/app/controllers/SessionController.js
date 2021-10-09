import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';
import bcrypt from 'bcryptjs';

dotenv.config();
class SessionController {
    //===================================================================================================    
    //Seleciona token do usuario.    
    async store(req, res) {
        const { cpf, password } = req.body;

        //Verificar usuario cadastrado.
        const user = await User.findOne({ cpf }).select('+password');

        if (!user) {
            return res.status(401).json({ sucesso: 'Usuario não existe.' })
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Senha incorreta.' })
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400,
        });

        return res.json({ user, token });
    }
}

export default new SessionController();