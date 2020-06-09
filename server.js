const express = require('express');
const morgan = require('morgan');
const blogfulRouter = require('./blogfulRouter');

const app = express();

//middleware and routing:
app.use(morgan('common'));

//serve static assets using 2 different approaches:
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

//route the requests to appropriate routers:
app.use('/blog-posts', blogfulRouter);

//tell express server to listen to http requests coming from this port. 
app.listen(process.env.PORT || 8080, ()=> {
    console.log(`Your app is listening on port: ${process.env.PORT || 8080}`);
});