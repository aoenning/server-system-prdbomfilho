import admin from 'firebase-admin';

//gs://prdbomfilho.appspot.com
require('dotenv').config()
var serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL
});

const backet = admin.storage().bucket();
const uploadImagem = (req, res, next) => {
    if (!req.file) return next();

    const imagem = req.file;
    const nameArquivo = Date.now() + "." + imagem.originalname.split(".").pop();

    const file = backet.file(nameArquivo);
    // return file.getSignedUrl({
    //     action: 'read',
    //     expires: '03-09-2491'
    // }).then(signedUrls => {
    //     console.log(signedUrls);
    //     req.file.firebaseUrl = signedUrls[0];
    //     next();
    //     // signedUrls[0] contains the file's public URL
    // });


    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimetype,
        },
    });

    stream.on('error', (e) => {
        console.error(e);
    })

    stream.on('finish', async () => {
        await file.makePublic();

        const baseUrl = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
        // console.log(baseUrl);
        req.file.firebaseUrl = baseUrl[0];
        // req.file.firebaseUrl = `https://storage.googleapis.com/storage/v1/${process.env.BUCKET_URL}/${nameArquivo}`;
        next();

    })

    stream.end(imagem.buffer);
};

export default uploadImagem;