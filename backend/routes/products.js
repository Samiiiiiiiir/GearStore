import { Router } from 'express';
import { products } from '../constants/index.js';

const router = Router();

router.get('/products', (req, res) => {
  if (req.query.page && req.query.limit) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({
      page,
      limit,
      total: products.length,
      items: paginatedProducts,
    });
  } else {
    res.json({
      page: undefined,
      limit: undefined,
      total: products.length,
      items: products,
    });
  }
});

router.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((item) => item._id === productId);

  if (!productId) {
    return res.status(404).json({ message: "Item wasn't found" });
  }
  res.send(product);
});

export default router;
