// Essa pasta vai servir para controlar as curtidas das fotos 'likes'
const Post = require('../models/Post');

module.exports = {
  // metodo de criar like
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  },
};
