import { Mongoose, model, Schema } from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


const PostSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    id_object: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
});


export default model('Post', PostSchema);