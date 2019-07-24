// dependencies
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');


module.exports = (app)=>{

//MAIN PAGE
	//main page route
    app.get('/', (req, res)=>{
        // report any exisiting articles in the db
        db.Article.find({})
        .sort({timestamp: -1})
        .then((dbArticle)=>{
            if (dbArticle.length == 0) {
                // if no articles, then, render new set of articles
                res.render('index');
            }
            else {
                // if is articles, then, render articles that have been scraped
                res.redirect('/articles');
            }
        })
        .catch((err)=>{
            res.json(err);
        });
    });

//SCRAPE TO MONGODB
	//scrape web site data and save to db
app.get('/scrape', (req, res)=>{
	// get info from URL loc
	// axios.get('http://www.bbc.com')
    
    // get info from URL sports loc - i like sports, sports sports sports
       axios.get('http://www.bbc.com/sport/football')
		
   .then((response)=>{
            // use cheerio for shorthand selector $
            let $ = cheerio.load(response.data);
            
			// figure out the response data and provide handlebar data
            $('.lakeside__content').each(function(i, element) {
                let result = {};
                const title = $(this).children('h3').children('a').children('span').text();
                const link = $(this).children('h3').children('a').attr('href');
                const summary = $(this).children('p').text();

                result.title = title;
                result.link = link;
                result.summary = summary;
               
                // create new article
                db.Article.create(result)
                .then((dbArticle)=>{
					//inform article scrape success
                    console.log(`\n article has been scraped: ${dbArticle}`);
                })
				//error if save to db fail
                .catch((err)=>{
                    console.log(`\n error trying to save to the database: ${err}`);
                });
            });

            res.redirect('/articles');
        })
		//error if url fail
        .catch((error)=>{
            console.log(`\n error trying to get data from url: ${error}`);
        });
    });		


//REPORT
    // report articles that have been scraped
    app.get('/articles', (req, res)=>{
        db.Article.find({})
        .sort({timestamp: -1})
        .then((dbArticle)=>{
            let articleObj = {article: dbArticle};

            // render the found articles
            res.render('index', articleObj);
        })
        .catch((err)=>{
            res.json(err);
        });
    });



//SAVE
	// report the saved articles
    app.get('/saved', (req, res)=>{
        db.Article.find({saved: true})
        .then((dbArticle)=>{
            let articleObj = {article: dbArticle};

            // report the retrieved articles
            res.render('index', articleObj);
        })
        .catch((err)=>{
            res.json(err);
        });
    });
	

//DELETE Article
	//remove a saved article


//REPORT NOTE/S
	//retreice most current notes

//SAVE NOTE
	//save the new note

//DELETE NOTE
	//remove a saved article note



};