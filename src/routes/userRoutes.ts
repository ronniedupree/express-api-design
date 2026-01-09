import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.ts'

const router = Router()
router.use(authenticateToken)

router.get('/', (req, res) => {
    res.json({ message: 'all users' })
})

router.get('/:id', (req, res) => {
    res.json({ message: `got user ${req.params.id}` })
})

router.put('/:id', (req, res) => {
    res.json({ message: `updated user ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
    res.json({ message: `deleted user ${req.params.id}` })
})

export default router