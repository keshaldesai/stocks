const express = require('express');
const app = express();

const apiControlller = require('./controllers/apiController');
const setupControlller = require('./controllers/setupController');

const mongoConfig = require('./config/mongoConfig.json');
const mongoose = require('mongoose');

//connect to MongoDB
mongoose.connect(`mongodb://${mongoConfig.user}:${mongoConfig.pass}@ds113660.mlab.com:13660/nightlifefcc`);

//use bodyparser, cors, passport
setupControlller(app);

//general API handler
apiControlller(app);

app.listen(8000, console.log('Listening on port 8000'));