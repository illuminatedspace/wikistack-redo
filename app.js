const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const router = require('./routes');
const path = require('path');
const model = require('./models');


app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

model.User.sync({ force: true })
  .then( () => {
    return model.Page.sync({ force: true });
  })
  .then( () => {
    return app.listen(1337, () =>
  console.log('server is listening at port 1337'));
  })
  .catch(console.error);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', router);


