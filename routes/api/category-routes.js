const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include: Product}).then((categoryData) => {
    res.json(categoryData);
  });
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if(!categoryData) {
      res.status(404).json({message: 'No category with this id!'});
    } 
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  const category = categoryData.get({plain: true});
  res.render('category', category);
});

router.post('/', (req, res) => {
  // create a new category
  
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = Category.destroy({
    where: {
      category_id: req.params.category_id,
    }
  });

  res.json(deletedCategory);
});

module.exports = router;
