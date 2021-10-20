import * as Yup from 'yup';
import Cliente from '../models/Cliente';


class ClienteController {
    //===================================================================================================    
    //Criar cliente.
    async store(req, res) {

        //Validar nome.
        if (!req.body.nome) {
            return res.status(400).json({ error: "Informe o nome do cliente" })
        }


        //Validar email
        if (!req.body.email) {
            return res.status(400).json({ error: "Informe o email" })
        }


        //Validar telefone
        if (!req.body.telefone) {
            return res.status(400).json({ error: "Informe o telefone" })
        }

        //Validar endereco
        if (!req.body.endereco) {
            return res.status(400).json({ error: "Informe o endereco" })
        }

        //Validar cep
        if (!req.body.cep) {
            return res.status(400).json({ error: "Informe o cep" })
        }

        //Validar cidade
        if (!req.body.cep) {
            return res.status(400).json({ error: "Informe a cidade" })
        }

        //Validar estado
        if (!req.body.estado) {
            return res.status(400).json({ error: "Informe a estado" })
        }

        const { cpf, cnpj } = req.body;

        if (cpf) {
            const clienteFisico = await Cliente.findOne({ cpf });
            if (clienteFisico) {
                return res.status(400).json({ error: "Cliente ja cadastrado" })
            }
        }

        if (cnpj) {
            const clienteEmpresa = await Cliente.findOne({ cnpj });
            if (clienteEmpresa) {
                return res.status(400).json({ error: "Cliente ja cadastrado" })
            }
        }

        try {

            const cliente = await Cliente.create(req.body);
            return res.json(cliente);

        } catch (error) {
            return res.status(401).json({ 'Error': "Não foi possivél salvar cliente, analise detalhada do erro: " + error });
        }
    }

    //===========================================================================================================
    //Alterar dados cliente.
    async update(req, res) {

        const { cliente_id } = req.params;
        const id = cliente_id;

        const cliente = await Cliente.findOne({ id });


        if (!cliente) {
            return res.status(400).json({ error: "Cliente não encontrado" });
        }


        try {
            const { nome, cnpj, cpf, email, telefone, endereco, cep, cidade, estado, tipo_atividade, status } = req.body;
            await Cliente.updateOne({ id }, {
                nome,
                email,
                telefone,
                endereco,
                cep,
                cidade,
                estado,
                tipo_atividade,
                status
            }, { new: true });

            const result = await Cliente.findOne({ id });
            return res.json({ result });
        } catch (error) {
            return res.status(400).json({ error: "Não foi possivél modificar cadastro cliente " + error });
        }

    }


    //===========================================================================================================
    //Alterar dados cliente.
    async delete(req, res) {

        const { cliente_id } = req.params;
        const cliente = await Cliente.find({ id: cliente_id });

        if (!cliente) {
            return res.status(400).json({ error: "Cliente não encontrado" });
        }

        try {
            await Cliente.findByIdAndRemove(req.params.cliente_id)
            return res.json({ msg: "Cliente excluido com sucesso" });
        } catch (error) {
            return res.status(400).json({ error: "Não foi possivél excluir cliente" });
        }

    }

    //===========================================================================================================
    //Selecionar clientes.
    async selected(req, res) {
        const clientes = await Cliente.find();
        if (!clientes) {
            return res.status(401).json({ error: "Clientes não localizados" });
        }

        return res.json(clientes);
    }
}

export default new ClienteController();