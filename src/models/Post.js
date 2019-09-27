const mongoose = require('mongoose');

// representacao da tabela do banco de dados em formado de javascript
const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
}, {
  // vai informa a data de criacao, data que foi alterado...
  timestamps: true,
});
// exportando dando o nome de Post e colocando como parametro PostSchema
module.exports = mongoose.model('Post', PostSchema);
