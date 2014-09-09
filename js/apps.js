$(document).ready(function() {

	//search input submit function
	$('.search-field').submit(function(event) {

		event.preventDefault();

		//declare variable for search input
		var title = $('#search').val();

		//clear previous search results
		$('.results').html('');

		//clear input field or previous search 
		$('#search').val('').focus();

		getMovie(title);	

	});

	//function to make GET call to Rotten Tomatoes, returning info based on user's search input
	var getMovie = function(title) {

		//set url of site to a variable
		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q="+ title +"&page_limit=10&page=1&apikey=9qt3g2sp97knswfepw7bchpq";
		
		//make ajax call to rottentomatoes.com using GET method
		$.ajax({

			url: url,
			dataType: "jsonp",
			type: "GET"

		})

		.done(function(data) {

			for ( var i = 0; i < data.movies.length; i ++ ) {

				$('.results').append("<p>" + data.movies[i].synopsis + "</p>" + '<br>' + data.movies[i].title);	

			}

		});

	}

});