import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { db } from '../db/connection.ts'
import { users, type NewUser } from '../db/schema.ts'
import { generateToken } from '../utils/jwt.ts'
import { hashPassword } from '../utils/passwords.ts'

export const register = async (req: Request, res: Response) => {
    try {
        // const { email, username, password, firstName, lastName } = req.body
        const hashedPassword = await hashPassword(req.body.password)
        const [user] = await db.insert(users).values({
            ...req.body,
            password: hashPassword
        }).returning({
            id: users.id,
            email: users.email,
            userName: users.username,
            firstName: users.firstName,
            lastName: users.lastName,
            createdAt: users.createdAt
        })

        const token = await generateToken({
            id: user.id,
            email: user.email,
            username: user.userName,
        })

        return res.status(201).json({
            message: 'User created',
            user,
            token
        })

    } catch (err) {
        console.log('Registration Error', err)
        res.status(500).json({ error: 'Failed to create user' })
        return
    }
}