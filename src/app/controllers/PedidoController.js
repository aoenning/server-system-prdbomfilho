import * as Yup from 'yup';
import Pedido from '../models/Pedidos';
import Itens from '../models/Itens';


class PedidoController {
    //===================================================================================================    
    //Criar pedido.
    async store(req, res) {
        console.log(req.body);
        try {

            const { id_cliente, cliente, id_vendedor, vendedor, status, price, pagamento, itensPedido } = req.body;
            const pedido = await Pedido.create({
                status,
                price,
                id_cliente: id_cliente,
                cliente: cliente,
                id_vendedor: id_vendedor,
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
            return res.status(401).json({ message: 'Não foi possivél salvar o pedido, verifique as informações' });
        }
    }

    //===========================================================================================================
    //Alterar dados pedido.
    async update(req, res) {

        try {

            const { status, itensPedido } = req.body;
            // console.log(req.params.pedidoId);
            const pedido = await Pedido.findByIdAndUpdate(req.params.pedidoId, {
                status,
            }, { new: true });

            pedido.itens = [];
            await Itens.remove({ pedido: pedido._id });

            await Promise.all(itensPedido.map(async item => {
                const it = new Itens({ ...item, pedido: pedido._id });
                await it.save();
                pedido.itens.push(it);
            }))

            await pedido.save();

            return res.json({ pedido });

        } catch (error) {
            return res.status(401).json({ message: 'Não foi possivél realizar alteração' });
        }

    }


    //===========================================================================================================
    //Alterar dados pedido.
    async delete(req, res) {
        try {

            const pedido = await Pedido.findById(req.params.pedidoId);

            if (!pedido) {
                return res.status(400).json({ message: "Pedido não encontrado" });
            }

            await Pedido.findByIdAndRemove(req.params.pedidoId);
            return res.json({ message: "Pedidos excluido com sucesso" });
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
            const pedido = await Pedido.findById(id).populate(['itens']);

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