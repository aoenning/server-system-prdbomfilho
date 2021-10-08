import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


const VendedorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    cpf: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
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


export default model('Vendedor', VendedorSchema);


