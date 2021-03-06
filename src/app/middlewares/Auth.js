import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';


dotenv.config();
export default async (req, res, next) => {

    const authHeader = req.headers.authorization;

    //Verificar se existem token.
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não existe.' });
    }

    //Descartar o palavar Bearer e pegar apenas o token.
    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invailido.' });
    }

}