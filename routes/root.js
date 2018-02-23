const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const Article = require('../models/Article');

/* GET home page. */
router.get('/', async(req, res, next) => {
  try {
    let articles = await Article.find();
    // Picking attrs to show
    articles = _.map(articles, (article) => {
      const articleData = _.pick(article, ['url', 'story_url', 'title', 'story_title', 'created_at', 'author', '_id']);
      articleData.prettyDate = moment(articleData.created_at).calendar();
      return articleData;
    });
    // Filtering articles without any title
    articles = _.filter(articles, (article) => article.story_title || article.title);
    // Ordering by Date
    articles = _.orderBy(articles, ['created_at'], ['desc']);

    res.render('index', { title: 'Articles', articles });
  } catch (e) {
    console.error(e);
    res.render('error', e);
  }
});

module.exports = router;
