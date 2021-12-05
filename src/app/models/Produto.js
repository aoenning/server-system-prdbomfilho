import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


const ProdutosSchema = new Schema({
    descricao: {
        type: String,
        required: true,
    },

    unidade: {
        type: String,
        required: true
    },

    preco: {
        type: String,
        required: true
    },

    status: {
        type: String
    },

    image: {
        name: { type: String },
        size: { type: String },
        key: { type: String },
        url: { type: String, required: true },
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


export default model('Produtos', ProdutosSchema);