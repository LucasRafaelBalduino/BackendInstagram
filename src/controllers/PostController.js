// Essa pasta vai servir para criar, salvar e excluir os posts
const sharp = require('sharp'); // essa dependencia permite manipular imagem
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');


module.exports = {
  // retorna uma listas dos posts ordenados que estao cadastrados
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },
  // metodo de criar novos posts
  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;
    // definindo o tamanho e a qualidade das imagens
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const filename = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', filename),
      );

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename,
    });

    req.io.emit('post', post);
    return res.json(post);
  },
};
