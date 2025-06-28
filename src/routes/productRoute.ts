import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from "../middleware/auth.js";

const prisma = new PrismaClient();
const productRoute = Router();

productRoute.get('/producer/:producerId', authMiddleware, async (req: Request, res: Response) => {
	const { producerId } = req.params;

	try {
		const products = await prisma.product.findMany({
			where: { producerId }
		});

		if (!products.length) {
			return res.status(404).json({ message: 'Nenhum produto encontrado para este produtor.' });
		}

		res.json(products);
	} catch (error) {
		console.error('Erro ao buscar produtos:', error);
		res.status(500).json({ message: 'Erro interno do servidor' });
	}
});

// Rota para cadastrar novo produto
productRoute.post('/cadastrar', authMiddleware, async (req: Request, res: Response) => {
	const { name, description, price, producerId } = req.body;

	if (!name || !description || !price || !producerId) {
		return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
	}

	try {
		const producer = await prisma.user.findUnique({
			where: { id: producerId },
		});

		if (!producer || producer.role !== 'PRODUTOR') {
			return res.status(400).json({ message: 'Produtor inválido ou não encontrado.' });
		}

		const product = await prisma.product.create({
			data: {
				name,
				description,
				price: parseFloat(price),
				producerId,
			},
		});

		res.status(201).json(product);
	} catch (error) {
		console.error('Erro ao cadastrar produto:', error);
		res.status(500).json({ message: 'Erro interno ao cadastrar produto.' });
	}
});

export default productRoute;