import * as Yup from 'yup';
import Produto from '../models/Produto';


class ProdutoController {
    //===================================================================================================    
    //Criar produto.
    async store(req, res) {

        //Validar descricao.
        if (!req.body.descricao) {
            return res.status(400).json({ message: "Informe a descricao" })
        }


        //Validar unidade
        if (!req.body.unidade) {
            return res.status(400).json({ message: "Informe a unidade" })
        }


        //Validar preco
        if (!req.body.preco) {
            return res.status(400).json({ message: "Informe o preco" })
        }

        try {

            const produto = await Produto.create(req.body);
            return res.json(produto);

        } catch (error) {
            return res.status(401).json({ message: error });
        }
    }

    //===========================================================================================================
    //Alterar dados produto.
    async update(req, res) {

        const { produto_id } = req.params;
        const id = produto_id;

        const produto = await Produto.findOne({ id: id });


        if (!produto) {
            return res.status(400).json({ message: "Produto não encontrado" });
        }

        try {
            const { descricao, unidade, preco, status } = req.body;
            await Produto.updateOne({ id: id }, {
                descricao,
                unidade,
                preco,
                status,
            }, { new: true });

            const produto = await Produto.findOne({ id: id });
            return res.json({ produto });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }

    }


    //===========================================================================================================
    //Alterar dados produto.
    async delete(req, res) {

        const { produto_id } = req.params;
        const id = produto_id;
        const produto = await Produto.find({ id: id });

        if (!produto) {
            return res.status(400).json({ message: "Produto não encontrado" });
        }

        try {
            await Produto.findByIdAndRemove(id);
            return res.json({ msg: "Produto excluido com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: error });
        }

    }

    //===========================================================================================================
    //Selecionar produtos.
    async selected(req, res) {
        const produtos = await Produto.find();
        if (!produtos) {
            return res.status(401).json({ message: "Produtos não localizados" });
        }

        return res.json(produtos);
    }
}

export default new ProdutoController();