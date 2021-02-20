const express = require('express');
const app = express();
const cors = require('cors');

app.set('secret', 'dfasfdasdf');
//指定域名为8080跨域
app.use(
  require('cors')({
    credentials: true,
    origin: 'http://localhost:8080'
  })
);
// 让express识别客户端提交的json
app.use(cors());
app.use(express.json());

require('./routes/announcement')(app)
require('./routes/user')(app)
require('./routes/place')(app)
require('./routes/apply')(app)

app.listen(3001, () => console.log('http://localhost:3001/'));