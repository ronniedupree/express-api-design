import express from 'express'
import authRoutes from "./routes/authRoutes.ts"
import userRoutes from "./routes/userRoutes.ts"
import habitRoutes from "./routes/habitRoutes.ts"
import cors from 'cors'
import morgan from "morgan"
import helmet from 'helmet'
import { isTesting } from "../env.ts"

const app = express()

// middleware
app.use(helmet())
app.use(cors({ origin: ['localhost'] }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev', {
    skip: () => isTesting(),
}))

// routes
app.get('/health', (req, res) => {
    res.json({ message: "Hello" }).status(200)
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/habits', habitRoutes)

export { app }
export default app