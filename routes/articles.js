const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const OmittedArticle = require('../models/OmittedArticle');

/* GET users listing. */
router.delete('/:articleId', async(req, res) => {
  const { articleId } = req.params;
  try {
    const article = await Article.findOne({ _id: articleId });

    if (!article) {
      return res.send({ msg: 'ok'});
    }

    await OmittedArticle.create({ story_id: article.story_id });
    await article.remove();

    res.send({ msg: 'ok'});
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

module.exports = router;
