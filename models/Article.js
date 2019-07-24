//need mongoose
const mongoose = require('mongoose');

//need Schema
const Schema = mongoose.Schema;

//set Schema up
const ArticleSchema = new Schema({
	title: { type: String },
	link: { type: String },
	summary: { type: String },
	timestamp: { type: Date, default: Date.now },
	saved: { type: Boolean, default: false },
	
	// stretch goal to get notes
	note: { type: String }
});

//create model for schema
const Article = mongoose.model('Article',ArticleSchema);

//export module
module.exports = Article;