const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
// aqui esta dividindo o servidor entre http e web socket em tempo real
const server = require('http').Server(app);
const io = require('socket.io')(server);
// foi criado um cluster no mongodb e aqui estou fazendo a conexao
mongoose.connect('mongodb+srv://semana:semana@cluster0-oofut.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});
app.use((req, res, next) => {
  req.io = io;
  next();
});
// permite acesso para o react acessar o backend
app.use(cors());
// rota para aceesar os arquivos estaticos como as imagens que foram feito uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
/* usando a porta 3000 no servidor para acessar localhost */
