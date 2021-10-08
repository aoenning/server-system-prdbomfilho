import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


const UserSchema = new Schema({
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

    password: {
        type: String,
        required: true,
        select: false,
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

UserSchema.pre('beforeSave', async function (next) {

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

export default model('User', UserSchema);


