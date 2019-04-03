'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// タイムゾーンを設定する
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');

const app = express();

// CORSを許可する
app.use(cors());

// POSTパラメータをJSONで取得できるようにする
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// public以下に配置したファイルは直リンクで見れるようにする
app.use(express.static(path.resolve(__dirname, 'public')));

// サーバーの動作確認
app.get('/time', (req, res) => {
  res.send(moment().format('YYYY/MM/DD HH:mm:ss'));
});

// サーバーを起動する
const server = app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`START SERVER http://${host}:${port}`);
});
const messages = [];
const users = {};
let userNum = 0;
// socketサーバーを立ち上げる
const io = require('socket.io')(server, { origins: '*:*' });

// socketイベントの設定
io.on('connection', (socket) => {
  console.log('connected:', socket.id);
  // 参加人数を更新
  userNum++;
  io.emit('userNum', userNum);
  console.log('userNum', userNum);
  // コネクション確立時にサーバー側に保存されているメッセージを渡す。
  socket.emit('init', messages);
  // コネクション確立時に接続ユーザ名を渡す。
  for (const key in users) {
    socket.emit('join', users[key]);
  }
  // 切断時
  socket.on('disconnect', () => {
    console.log('disconnected:', socket.id);
    userNum--;
    io.emit('leave', users[socket.id]);
    delete users[socket.id];
    io.emit('userNum', userNum);
  });

  // メッセージの受信
  socket.on('send', (message) => {
    console.log('send:', message);
    messages.push(message);
    io.emit('send', message);
  });
  // ユーザの参加
  socket.on('join', (name) => {
    users[socket.id] = name;
    io.emit('join', name);
  });
});
