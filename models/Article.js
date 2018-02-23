const { mongoose } = require('../scripts/db');

const Article =  new mongoose.Schema({
  created_at: Date,
  title: String,
  url: String,
  author: String,
  points: Number,
  story_text: String,
  comment_text: String,
  num_comments: Number,
  story_id: Number,
  story_title: String,
  story_url: String,
  parent_id: Number,
  created_at_i: Number,
  _tags: [String],
  objectID: String,
  _highlightResul: {
      title: {
          value: String,
          matchLevel: String,
          fullyHighlighted: Boolean,
          matchedWords: [String]
      },
      url: {
          value: String,
          matchLevel: String,
          matchedWords: [String]
      },
      author: {
          value: String,
          matchLevel: String,
          matchedWords: [String]
      }
  }
});

module.exports = mongoose.model('Article', Article);
