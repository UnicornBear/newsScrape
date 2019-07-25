// set up function for operations
$(()=>{

    // scrape function
    const scrapeArticles = function(){
        $.get('/scrape')
        .then((data) => {
            $('body').html(data);
        });
    };

    // save article
    const saveArticle = function() {
        let id = $(this).data('id');
        $.ajax({
            url: `/article/${id}`,
            method: 'PUT'
        })
        .then((data)=>{
            location.reload();
        });
    };

    // click control events
    $('.scrape').on('click', scrapeArticles);
    $('.btn-save').on('click', saveArticle);    

});