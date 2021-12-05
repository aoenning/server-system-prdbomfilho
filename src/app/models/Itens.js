import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { number } from 'yup/lib/locale';


const ItensSchema = new Schema({
    pedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true,
    },
    id_material: {
        type: Schema.Types.ObjectId,
        ref: 'Produto',
        required: true,
    },

    image: {
        type: String,
    },

    descricao_material: {
        type: String,
        required: true,
    },

    unidade: {
        type: String,
        required: true,
    },

    quantidade: {
        type: String,
        required: true,
    },

    preco: {
        type: String,
        required: true,
    },

    valor_item: {
        type: String,
        required: true,
    },

    status: {
        type: String
    },

    created_at: {
        type: Date,
        default: Date.now,
    },

    updated_at: {
        type: Date,
        default: Date.now,
    },

});


export default model('Itens', ItensSchema);