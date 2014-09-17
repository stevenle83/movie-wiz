$(document).ready(function() {

	//search input submit function
	$('.search-field').submit(function(event) {

		event.preventDefault();

		//declare variable for search input
		var title = $('#search').val();

		//clear previous search results
		$('.results').fadeOut('fast').empty();

		//clear input field or previous search 
		$('#search').val('').focus();

		getMovie(title);	

	});

	//click function to show info about the page 
	$('#about').click(function() {

		$('.info').slideToggle();

	});

}); //end document ready	

	//function to append returned data from Rotten Tomatoes to DOM
	var showMovie = function(movie) {

		//clone '.movie-info' div as result
		var $results = $('.results');

		//append title property into DOM
		$results.append('<div class="title"><h2>' + movie.title + '</h2></div>').fadeIn('fast');
		
		//append poster property to DOM
		$results.append('<div class="poster"><img src="' + movie.posters.detailed + '"/></div>');

		//append synopsis to DOM
		if( movie.synopsis == '' ) {

			$results.append('<div class="synopsis"><p><strong>Synopsis: N/A</strong></p></div>');

		} else {

			$results.append('<div class="synopsis"><p>' + '<strong>Synopsis:</strong> ' + movie.synopsis + '</p></div>');

		}

		//append cast property to DOM
		$results.append('<div class="cast"><p><strong>Cast:</strong> ' + movie.abridged_cast[0].name + ", " + movie.abridged_cast[1].name + ", " + movie.abridged_cast[2].name + ", " + movie.abridged_cast[3].name + '</p></div>');	
	
			
		//append year property to DOM
		$results.append('<div class="year"><p>' + "<strong>Released:</strong> " + movie.year + '</p></div>');

		//append mpaa_rating property to DOM
		$results.append('<div class="rating"><p>' + "<strong>MPAA Rating:</strong> " + movie.mpaa_rating + '</p></div>');

		//append runtime property to DOM
		if ( movie.runtime == '' || movie.runtime == null ) { 

			$results.append('<div class="runtime"><p><strong>Runtime: N/A</strong></p></div>'); 

		} else {

			$results.append('<div class="runtime"><p>' + "<strong>Runtime:</strong> " + movie.runtime + " min" + '</p></div>');

		}

		//append critics ratings and score properties to DOM
		if ( movie.ratings.critics_rating == null || movie.ratings.critics_score == '' ) {

			$results.append('<div class="review"><p><strong>Critics Rating & Score N/A</strong></p></div>');

		} else {

			$results.append('<div class="review"><p>' + "<strong>Critics Rating:</strong> " + movie.ratings.critics_rating + " with a score of " + movie.ratings.critics_score + '</p></div>');

		}
			

		//append audience ratings and score to properties DOM	
		if ( movie.ratings.audience_rating == null || movie.ratings.audience_score == '' ) {

			$results.append('<div class="review"><p><strong>Audience Rating & Score N/A</strong></p></div>');

		} else {

			$results.append('<div class="review"><p>' + "<strong>Audience Rating:</strong> " + movie.ratings.audience_rating + " with a score of " + movie.ratings.audience_score + '</p></div>' + '<hr>');

		}	
		
	} //end showMovie function

	//function to make GET call to Rotten Tomatoes, returning data based on user's search input
	var getMovie = function(title) {

		//set url of site to a variable
		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=" + title + "&page_limit=5&page=1&apikey=9qt3g2sp97knswfepw7bchpq";
		
		//set variable and make ajax call to rottentomatoes.com using GET method
		var data = $.ajax({

			url: url,
			dataType: "jsonp",
			type: "GET"

		}) //end $.ajax()

		//callback function for successful GET request
		.done(function(data) {

			$.each(data.movies, function(i, item) {

				//call showMovie function passing item as parameter (item = data returned by API)
				showMovie(item);

			}); //end $.each()	

		}); //end .done()

	} //end getMovie function
