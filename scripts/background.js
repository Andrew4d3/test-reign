const util = require('util');
const request = util.promisify(require('request'));
const POSTS_URL = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

const Article = require('../models/Article');
const OmittedArticle = require('../models/OmittedArticle');

const getArticles = async () => {
  console.log('Fetching new articles...');
  try {
    const response = await request(POSTS_URL);
    const { statusCode, body } = response;
    const json_body = JSON.parse(body);
    if (statusCode === 200 && json_body && json_body.hits) {
      const { hits } = json_body;

      for (let i = 0; i < hits.length; i++) {
        const { story_id } = hits[i]
        const existingArticle = await Article.findOne({ story_id });
        const omittingArticle = await OmittedArticle.findOne({ story_id });

        if (!existingArticle && !omittingArticle) {
          await Article.create(hits[i]);
        }
      }
    } else {
      throw new Error(response);
    }
  } catch (e) {
    console.log('There has been an Error\nWill try again in 1 hour.', e);
  }
};

module.exports = {
  run : () => {
    getArticles();
    setInterval(getArticles, 1000 * 60 * 60); // Each hour
  }
}
