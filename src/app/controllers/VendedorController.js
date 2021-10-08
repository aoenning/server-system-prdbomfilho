import * as Yup from 'yup';
import Vendedor from '../models/Vendedor';


class VendedorController {
    //===================================================================================================    
    //Criar vendedor.
    async store(req, res) {

        //Validar nome.
        if (!req.body.name) {
            return res.status(400).json({ error: "Informe o nome do vendedor" })
        }


        //Validar cpf
        if (!req.body.cpf) {
            return res.status(400).json({ error: "Informe cpf do vendedor" })
        }

        const { cpf } = req.body;


        try {
            if (await Vendedor.findOne({ cpf }))
                return res.status(400).json({ error: "Vendedor ja cadastrado" })

            const vendedor = await Vendedor.create(req.body)

            return res.json(vendedor);

        } catch (error) {
            return res.status(401).json({ 'Error': "Não foi possivél salvar vendedor, analise detalhada do erro: " + error });
        }
    }

    //===========================================================================================================
    //Alterar dados vendedor.
    async update(req, res) {

        const { vendedor_id } = req.params;
        const id = vendedor_id;

        const vendedor = await Vendedor.findOne({ id });


        if (!vendedor) {
            return res.status(400).json({ error: "Vendedor não encontrado" });
        }


        try {
            const { name, cpf, email } = req.body;
            await Vendedor.updateOne({ id }, {
                name,
                cpf,
                email
            }, { new: true });

            const result = await Vendedor.findOne({ id });
            return res.json({ result });
        } catch (error) {
            return res.status(400).json({ error: "Não foi possivél modificar cadastro vendedor " + error });
        }

    }


    //===========================================================================================================
    //Alterar dados vendedor.
    async delete(req, res) {

        const { vendedor_id } = req.params;
        const vendedor = await Vendedor.find({ id: vendedor_id });

        if (!vendedor) {
            return res.status(400).json({ error: "Vendedor não encontrado" });
        }

        try {
            await Vendedor.findByIdAndRemove(req.params.vendedor_id)
            return res.json({ msg: "Vendedor excluido com sucesso" });
        } catch (error) {
            return res.status(400).json({ error: "Não foi possivél excluir vendedor" });
        }

    }

    //===========================================================================================================
    //Selecionar vendedores.
    async selected(req, res) {
        const vendedores = await Vendedor.find();
        if (!vendedores) {
            return res.status(401).json({ error: "Vendedores não localizados" });
        }

        return res.json(vendedores);
    }
}

export default new VendedorController();