import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


const ClienteSchema = new Schema({

    nome: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    telefone: {
        type: String,
        required: true,
    },

    documento: {
        tipo: {
            type: String,
            enum: ['cpf', 'cnpj'],
            required: true,
        },

        numero: {
            type: String,
            required: true,
        },
    },
    endereco: {
        logradouro: {
            type: String,
            required: true,
        },
        numero: {
            type: String,
            required: true,
        },

        cep: {
            type: String,
            required: true,
        },

        cidade: {
            type: String,
            required: true,
        },

        estado: {
            type: String,
            required: true,
        },
    },

    tipo_atividade: {
        type: String,
    },

    status: {
        type: String,
    },

    created_at: {
        type: Date,
        default: Date.now,
    },

    updated_at: {
        type: Date,
        default: Date.now,
    }

});


export default model('Cliente', ClienteSchema);


