//need mongoose
const mongoose = require('mongoose');

//need Schema
const Schema = mongoose.Schema;

//set Schema up
const NoteSchema = new Schema({
	body: {
		type: String
	}
	
  // `title` is of type String
//  title: String,
  // `body` is of type String
//  body: String

});

// create model from Schema
const Note = mongoose.model('Note',NoteSchema);

//export Note module
module.exports = Note;