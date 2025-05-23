const express = require('express');
const app = express();
const path = require('path');
const db = require('./server/db');
const session = require('express-session');
const postRouter = require('./server/routes/postRouter')
const postApi = require('./server/routes/postApi');
const authApi = require('./server/routes/authApi')
const loginRouter = require('./server/routes/loginRouter')
const logoutRouter = require('./server/routes/logoutRouter')
const boardRouer = require('./server/routes/boardRouter')
const boardApi = require('./server/routes/boardApi')
const createRouter = require('./server/routes/postCreateRouter')
const postEditRouter = require('./server/routes/postEditRouter')
const commentApi = require('./server/routes/commentApi')
const signupRouter = require('./server/routes/signupRouter')

app.use(session({
  secret: '1451451',
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'html')));

app.use('/post', postRouter)
app.use('/api/board', boardApi)
app.use('/api/post',postApi)
app.use('/api/auth', authApi)
app.use('/api/comment', commentApi);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter)
app.use('/board', boardRouer);
app.use('/post-create', createRouter)
app.use('/post-edit/:post_id', postEditRouter)

app.listen(3000, () => {
    console.log('✅ 서버 실행 중: http://localhost:3000');
  }
);

