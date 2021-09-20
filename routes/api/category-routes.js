const router = require('express').Router();
// const { where } = require('sequelize/types');
//const { is } = require('sequelize/types/lib/operators');
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

// Creates
router.post('/', async(req, res) => {
  // create a new category
  try{
    const categoryName = await Category.create(req.body);
    if(!categoryName) {
      res.status(404).json({message: 'Cannot create a new category'});
    }
    res.status(200).json(categoryName);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// Update
router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  // update product data
  try{
    const categoryUpdate = await Category.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});


router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDestroy = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!categoryDestroy) {
      res.status(404).json({message: 'Cannot destroy non-existent categories'});
      return;
    }
    res.status(200).json(categoryDestroy);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

module.exports = router;
