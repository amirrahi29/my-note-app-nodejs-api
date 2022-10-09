const express = require('express');
//mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/MyNoteApp");

//config
const config = require('./confiig/config');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

//image
app.use(express.static('public'));

//user route
const user_route = require('./routes/UserRoute');
app.use('/api',user_route);

//notes route
const notes_routes = require('./routes/NotesRoutes');
app.use('/api',notes_routes);


app.listen(config.PORT,()=>{
    console.log("Server is running on: "+config.PORT);
});