const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//  view engine
app.set('view engine', 'ejs');

//  connect to mongodb
const dbURI = 'mongodb+srv://hudsonsh2005:iameatingriceathome.@sams.igtg28b.mongodb.net/'; // !!!!!!!!!!!!!!!!!!!!

// listen for request after CONNECTION to mongodb
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));


//  middleware & static files
app.use(express.static('public'));  // for css file
app.use(express.urlencoded({ extended: true }));    // just for SUBJECTIVE err.
app.use(morgan('dev'));     // flexible generation/handling of logs     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use((req, res, next) => {
    res.locals.path = req.path;
    next()
})                                                           //           !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// basic routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes)

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

