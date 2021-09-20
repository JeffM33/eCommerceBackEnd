const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(req.body, {
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
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
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // update product data
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbCategoryData => {
        if (!dbCategoryData[0]) {
            res.status(404).json({ message: 'No category found with this id'});
            return;
        }
        res.json(dbCategoryData);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = Category.destroy({
    where: {
      id: req.params.id,
    }
  });

  res.json(deletedCategory);
});

module.exports = router;
