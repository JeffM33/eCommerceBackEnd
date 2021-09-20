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
    const tagData = await Tag.findByPk(req.params.id);
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
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      Tag.create({
        tag_name: req.body.tag_name
      })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
      });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbTagData => {
        if (!dbTagData[0]) {
            res.status(404).json({ message: 'No Tag found with this id'});
            return;
        }
        res.json(dbTagData);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = Tag.destroy({
    where: {
      id: req.params.id,
    }
  });

  res.json(deletedTag);
});

module.exports = router;
