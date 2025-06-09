import jwt from 'jsonwebtoken'
import { prisma } from '../index.js'
import { compareSync, hashSync } from 'bcrypt'
import { JWT_SECRET } from '../secrets.js'
import type { Request, Response } from 'express'
import { SignupSchema } from '../schema/user.js'

export const signup = async (req: Request, res: Response) => {
  try {
    SignupSchema.parse(req.body)
    const { name, email, password, role } = req.body

    let user = await prisma.user.findFirst({ where: { email } })
    if (user) {
      return res.status(409).json({
        message: 'Usuário já existe',
      })
    }

    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 12),
        role,
      },
    })
    res.json(user)
    res.status(201).json({
      message: 'Usuário criado com sucesso',
    })
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    return res.status(422).json({
      message: 'Entidade não processável',
    })
  }
}
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    return res.status(404).json({
      message: 'Usuário não encontrado',
    })
  }
  if (!user) {
    return res.status(404).json({
      message: 'Usuário não encontrado',
    })
  }
  if (!compareSync(password, user.password)) {
    return res.status(400).json({
      message: 'Credenciais inválidas',
    })
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET)
  res.json({ user, token })
}
