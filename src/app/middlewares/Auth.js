import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';


export default async (req, res, next) => {

    const authHeader = req.headers.authorization;

    //Verificar se existem token.
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não existe.' });
    }

    //Descartar o palavar Bearer e pegar apenas o token.
    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, '685712oenning');
        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invailido.' });
    }

}