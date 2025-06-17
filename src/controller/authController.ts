import jwt from 'jsonwebtoken'
import { prisma } from '../index.js'
import { JWT_SECRET } from '../secrets.js'
import { compareSync, hashSync } from 'bcrypt'
import type { Request, Response } from 'express'
import { SignupSchema } from '../schema/user.js'

export const signup = async (req: Request, res: Response) => {
  try {
    SignupSchema.parse(req.body)
    const { name, email, password, role } = req.body

    const userExists = await prisma.user.findFirst({ where: { email } })
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado' })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 12),
        role,
      },
    })

    return res.status(201).json(user)
  } catch (error: any) {
    console.error('Erro no signup:', error)
    return res.status(500).json({ message: error.message || 'Erro interno' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    throw Error('Usuário não encontrado')
  }
  if (!compareSync(password, user.password)) {
    throw Error('Credenciais inválidas')
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET)
  res.json({ user, token })
}
