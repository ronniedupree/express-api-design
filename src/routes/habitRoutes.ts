import { Router } from 'express'
import { validateBody } from '../middleware/validation.ts'
import { z } from 'zod'

const createHabitScema = z.object({
    name: z.string(),
})

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'all habits' })
})

router.get('/:id', (req, res) => {
    res.json({ message: `got habit ${req.params.id}` })
})

router.post('/', validateBody(createHabitScema), (req, res) => {
    res.json({ message: 'created habit' })
})

router.delete('/:id', (req, res) => {
    res.json({ message: `deleted habit ${req.params.id}` })
})

router.post('/:id/complete', (req, res) => {
    res.json({ message: `completed habit ${req.params.id}` })
})

export default router