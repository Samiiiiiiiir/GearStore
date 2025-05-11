import { Router } from 'express';
import { categories, products } from '../constants/index.js';

const router = Router();

router.get('/categories', (req, res) => {
  res.send(categories);
});

router.get('/categories/:active', (req, res) => {
  const active = req.params.active;

  if (active && active != 'undefined') {
    const matchedProducts = products?.filter((item) => item?._base === active);

    if (!matchedProducts || matchedProducts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products matched with this category' });
    }
    res.json(matchedProducts);
  } else {
    res.json(products);
  }
});

export default router;
