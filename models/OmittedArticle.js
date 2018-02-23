const { mongoose } = require('../scripts/db');

const OmittedArticle =  new mongoose.Schema({
  story_id: Number,
});

module.exports = mongoose.model('OmittedArticle', OmittedArticle);
