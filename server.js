const path = require('path')
const express = require('express');
const session = require ('express-session');
const { create } = require('express-handlebars')


const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const helpers = require('./utils/templateHelpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "tech374hdxnsdj",
    cookie: {},
    resave: false,
    saveUnitialized: true, 
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess));
const handleb = create ({
    helpers
});

app.engine('handlebars', handleb.engine)
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} `))
})