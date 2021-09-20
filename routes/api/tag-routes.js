const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({include: Product}).then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {include: [ProductTag]
  });
    if(!tagData) {
      res.status(404).json({message: 'No category with this id!'});
    } 
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  const tag = tagData.get({plain: true});
  res.render('tag', tag);
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.productIds && req.body.productIds.length) {
        const tagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(tagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    }
  });

  res.json(deletedTag);
});

module.exports = router;
