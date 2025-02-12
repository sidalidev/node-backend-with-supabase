const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create todo
router.post('/', async (req, res) => {
  try {
    const { title, completed } = req.body
    const todo = await prisma.todo.create({
      data: {
        title,
        completed: completed || false,
      },
    })
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, completed } = req.body
    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { title, completed },
    })
    res.json(todo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
