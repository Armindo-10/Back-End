import { Router } from 'express';

const router = Router();

// Rota pública de teste
router.get('/', (req, res) => {
  res.json({ message: 'API funcionando corretamente 🎉' });
});

export default router;