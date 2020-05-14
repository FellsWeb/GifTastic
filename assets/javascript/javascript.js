// function to start once the page loads
$(function(){
    populateButtons(topics, 'searchButton', '#buttonsArea');
    console.log("Page Loaded");
 })
 
 
 // array of search topics
 var topics = ["NBA", "NFL", "MLB", "Boxing", "MMA", "NCAAB",  "NCAAFB", "KOBE",];
 
 // function to add buttons to page after submitting input in the search area
 function populateButtons(topics, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for(var i = 0; i < topics.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    }
 }
 // when the submit button is clicked, an ajax call is made to the giphy API
 $(document).on('click', '.searchButton', function(){
    $('#searches').empty();
    var type = $(this).data('type');
    var searchInput = $("#search-input").val();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+ type +'&api_key=5BU2XCfZ0xiLXcbOTKhpHOMXMfe9pD6F&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET',
    })
 // the AJAX response is logged with the rating, still and animated image tags, and the image and rating is uploaded on the html page
    .done(function(response){
        console.log(response.data);
        for(var i = 0; i < response.data.length; i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $("<p>").text('Rating: ' + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', 'still');
            image.addClass('searchImage');
            // append the rating and image to the page
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
        }
        
    })
 })
 // This function lets the image click back and forth between still and animated 
 $(document).on('click', '.searchImage', function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
 })
 // This function popluates a button for the newly searched sport (& KOBE!)
 $('#addSearch').on('click', function(){
    var newSearch = $('input').eq(0).val();
    topics.push(newSearch);
    populateButtons(topics, 'searchButton', '#buttonsArea');
    return false;
 })
 