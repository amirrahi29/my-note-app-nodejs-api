const express = require('express');
const notes_routes = express();

const bodyParser = require('body-parser');
notes_routes.use(bodyParser.json());
notes_routes.use(bodyParser.urlencoded({extended:true}));

//multer
const multer = require('multer');
const path = require('path');


//fileupload
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/NotesImages'),function(err,success){
            if(err) throw err
        })
    },
    filename:function(req,file,cb){
        const name = Date.now()+"-"+file.originalname;
        cb(null,name,function(error,success){
            if(error){
                throw err
            }
        })
    }
});

const upload = multer({storage:storage});


//controller
const notesController = require('../controller/NotesController');

//middleware
const auth = require('../middleware/Auth');

//api's
notes_routes.post('/add_note',upload.single('image'),auth,notesController.add_note);
notes_routes.post('/update_note',upload.single('image'),auth,notesController.update_note);
notes_routes.post('/get_notes',auth,notesController.get_notes);
notes_routes.post('/delete_notes',auth,notesController.delete_notes);
notes_routes.post('/get_notes_by_id',auth,notesController.get_notes_by_id);
notes_routes.get('/serach_note/:key/:user_id',auth,notesController.serach_note);


module.exports = notes_routes;