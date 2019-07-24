// set up function for operations

$(()=>{
    // scrape function
    const scrapeArticles = ()=>{
        $.get('/scrape')
        .then((data) => {
            $('body').html(data);
        });
    };

    // click control events
    $('.scrape').on('click', scrapeArticles);
});