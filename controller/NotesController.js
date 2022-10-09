const Note = require('../model/NotesModel');

const add_note = async(req,res)=>{

   try {

    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.filename;
    const date = Date().toString();

    const note = new Note({
        user_id:user_id,
        title:title,
        description:description,
        image:image,
        date:date
    });

    const noteData = await note.save();
    if(noteData){
        res.status(200).send({success:true,msg:"Note details",data:note});
    }else{
        res.status(200).send({success:false,msg:"Something went wrong, Please try again!"});
    }
   } catch (error) {
       res.status(400).send({success:false,msg:error.message});
   }

}

const update_note = async(req,res)=>{

    try {
 
     const note_id = req.body.note_id;
     const title = req.body.title;
     const description = req.body.description;
     const image = req.file.filename;
 
     const note = new Note({
         note_id:note_id,
         title:title,
         description:description,
         image:image
     });
 
        const noteData = await Note.findByIdAndUpdate({"_id":note_id},{$set:{
            title:title,
            description:description,
            image:image
        }});

     if(noteData){
         res.status(200).send({success:true,msg:"Note details",data:note});
     }else{
         res.status(200).send({success:false,msg:"Something went wrong, Please try again!"});
     }
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
 
 }

 const get_notes = async(req,res)=>{
    try {
        const user_id = req.body.user_id;

        const notes = await Note.find({"user_id":user_id});
        if(notes){
            res.status(200).send({success:true,msg:"All notes",data:notes});
        }else{
            res.status(200).send({success:true,msg:"No notes available!"});
        }

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
 }

 const delete_notes = async(req,res)=>{
    try {
        const note_id = req.body.note_id;

        const notes = await Note.findOne({"_id":note_id});
        if(notes){
            const deleteNote = await Note.findByIdAndDelete({"_id":notes._id});
            res.status(200).send({success:true,msg:"Deleted note",data:notes});
        }else{
            res.status(200).send({success:true,msg:"No notes available!"});
        }

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
 }

 const get_notes_by_id = async(req,res)=>{
    try {
        const note_id = req.body.note_id;

        const notes = await Note.findOne({"_id":note_id});
        if(notes){
            res.status(200).send({success:true,msg:"Note details",data:notes});
        }else{
            res.status(200).send({success:true,msg:"No notes available!"});
        }

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
 }

 const serach_note = async(req,res)=>{
    try {
        const key = req.params.key;
        const user_id = req.params.user_id;

        const notes = await Note.find({"title":{$regex:".*"+key+".*",$options:'i'},"user_id":user_id});

        if(notes.length>0){
            res.status(200).send({success:true,msg:"Note details",data:notes});
        }else{
            res.status(200).send({success:true,msg:"No notes available!"});
        }

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
 }

module.exports = {
    add_note,
    update_note,
    get_notes,
    delete_notes,
    get_notes_by_id,
    serach_note
}