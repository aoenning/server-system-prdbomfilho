import * as Yup from 'yup';
import Pedido from '../models/Pedido';
import Itens from '../models/Itens';


class PedidoController {
    //===================================================================================================    
    //Criar pedido.
    async store(req, res) {

        try {

            const { cliente, vendedor, status, price, pagamento, itensPedido } = req.body;
            const pedido = await Pedido.create({
                status,
                price,
                cliente: cliente,
                vendedor: vendedor,
                pagamento: {
                    tipo: pagamento.tipo,
                    quantidade: pagamento.quantidade,
                },
                // itens: itens,
            });

            await Promise.all(itensPedido.map(async item => {
                const it = new Itens({ ...item, pedido: pedido._id });
                await it.save();
                pedido.itens.push(it);
            }))

            await pedido.save();

            return res.json({ pedido });

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
        const produto = await Produto.find({ id: produto_id });

        if (!produto) {
            return res.status(400).json({ message: "Produto não encontrado" });
        }

        try {
            await Produto.findByIdAndRemove(req.params.produto_id)
            return res.json({ msg: "Produto excluido com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: error });
        }

    }

    //===========================================================================================================
    //Selecionar pedidos.
    async selected(req, res) {

        const pedidos = await Pedido.find().populate(['itens']);
        if (!pedidos) {
            return res.status(401).json({ message: "Pedidos não localizados" });
        }

        return res.json(pedidos);
    }



    //Selecionar pedidos por id.
    async selectedItem(req, res) {
        const { pedidoId } = req.params;
        const id = pedidoId;

        try {
            const pedido = await Pedido.findById(pedidoId).populate(['itens']);

            if (!pedido) {
                return res.status(401).json({ message: "Pedido não localizado" });
            }
            return res.json(pedido);
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: error });
        }
    }
}

export default new PedidoController();