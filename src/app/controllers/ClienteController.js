import * as Yup from 'yup';
import Cliente from '../models/Cliente';


class ClienteController {
    //===================================================================================================    
    //Criar cliente.
    async store(req, res) {


        //Validar nome.
        if (!req.body.nome) {
            return res.status(400).json({ message: "Informe o nome do cliente" })
        }


        //Validar email
        if (!req.body.email) {
            return res.status(400).json({ message: "Informe o email" })
        }


        //Validar telefone
        if (!req.body.telefone) {
            return res.status(400).json({ message: "Informe o telefone" })
        }

        //Validar endereco
        if (!req.body.endereco.logradouro) {
            return res.status(400).json({ message: "Informe o logradouro" })
        }

        //Validar cep
        if (!req.body.endereco.cep) {
            return res.status(400).json({ message: "Informe o cep" })
        }

        //Validar cidade
        if (!req.body.endereco.cidade) {
            return res.status(400).json({ message: "Informe a cidade" })
        }

        //Validar estado
        if (!req.body.endereco.estado) {
            return res.status(400).json({ message: "Informe a estado" })
        };

        if (req.body.documento.numero) {
            const documento = await Cliente.findOne({ documento: { numero: req.body.documento.numero } });

            if (documento) {
                return res.status(400).json({ message: "Cliente ja cadastrado" })
            }
        }


        try {

            const cliente = await Cliente.create(req.body);
            return res.json(cliente);

        } catch (error) {
            return res.status(401).json({ message: error });
        }
    }

    //===========================================================================================================
    //Alterar dados cliente.
    async update(req, res) {

        const { cliente_id } = req.params;
        const id = cliente_id;

        const cliente = await Cliente.findOne({ id: id });


        if (!cliente) {
            return res.status(400).json({ message: "Cliente não encontrado" });
        }

        try {
            // const clientes = req.body;
            // const { nome, email, telefone, endereco, cep, cidade, estado, tipo_atividade, status } = req.body;
            const result = await Cliente.updateOne({ id }, { clientes: req.body }, { new: true });

            // const result = await Cliente.findOne({ id: id });
            return res.json({ result });
        } catch (error) {
            return res.status(400).json({ message: error });
        }

    }


    //===========================================================================================================
    //Alterar dados cliente.
    async delete(req, res) {

        const { cliente_id } = req.params;
        const cliente = await Cliente.find({ id: cliente_id });

        if (!cliente) {
            return res.status(400).json({ message: "Cliente não encontrado" });
        }

        try {
            await Cliente.findByIdAndRemove(req.params.cliente_id)
            return res.json({ msg: "Cliente excluido com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: error });
        }

    }

    //===========================================================================================================
    //Selecionar clientes.
    async selected(req, res) {
        const clientes = await Cliente.find();
        if (!clientes) {
            return res.status(401).json({ message: "Clientes não localizados" });
        }

        return res.json(clientes);
    }
}

export default new ClienteController();