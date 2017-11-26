const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');

const routes = require('./routes/index');

app.use('/data', express.static(__dirname + '/data'));
app.use('/', express.static(__dirname + '/public'));
app.use('/', routes);

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.listen(port, () => console.log(`Listening on ${port}`));