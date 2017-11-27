const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('express-handlebars');
const flash = require('express-flash');

const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use('/', routes);


app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.listen(port, () => console.log(`Listening on ${port}`));