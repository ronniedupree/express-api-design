import type { Request, Response, NextFunction } from 'express'
import { verifyToken, type Payload } from '../utils/jwt.ts'

export interface AuthenticatedRequest extends Request {
    user?: Payload
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        console.log(req.headers)
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({ error: 'Bad Request' })

        const payload = await verifyToken(token)
        req.user = payload
        console.log(req.user)
        next()
    } catch (e) {
        return res.status(403).json({ error: 'Forbidden' })
    }
}