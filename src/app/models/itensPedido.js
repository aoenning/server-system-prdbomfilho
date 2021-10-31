import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { number } from 'yup/lib/locale';


const ItensPedidoSchema = new Schema({
    id_material: {
        type: Schema.Types.ObjectId,
        ref: 'produto',
        required: true,
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


export default model('itensPedido', ItensPedidoSchema);