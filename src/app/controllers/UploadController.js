
import * as Yup from 'yup';
// import firebase from '../firebase';
import Post from './../models/Post';
import admin from 'firebase-admin';
import path from 'path';
import Multer from 'multer';
import saltedMd5 from 'salted-md5';

class UploadController {
    //===================================================================================================    
    //Criar produto.
    async store(req, res) {
        // console.log(req.file);
        try {
            const { firebaseUrl } = req.file ? req.file : "";

            const post = await Post.create({
                name: req.file.originalname,
                size: req.file.size,
                key: req.file.filename,
                id_object: req.file.id_object,
                url: firebaseUrl,
            });

            return res.json({ post });
        } catch (error) {
            return res.status(400).json({ msg: error });
        }

    }
}


export default new UploadController();