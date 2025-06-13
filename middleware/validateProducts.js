function validateProduct(req, res, next) {
  const allowedFields = ['name', 'description', 'price', 'category', 'inStock'];
  const keys = Object.keys(req.body);

  const isValid = keys.every(key => allowedFields.includes(key));

  if (!isValid || keys.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing fields in request body' });
  }

  next();
}

module.exports = validateProduct;
