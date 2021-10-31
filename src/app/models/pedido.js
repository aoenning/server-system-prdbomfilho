import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


const PedidosSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },

    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    pagamento: {
        tipo: {
            type: String,
            enum: ['boleto', 'cartao', 'avista'],
            required: true,
        },
        quantidade: {
            type: String,
        }
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


export default model('Pedidos', PedidosSchema);