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

	//function to append returned data from Rotten Tomatoes to DOM
	var showMovie = function(movie) {

		//clone '.movie-info' div as result
		var result = $('.movie-info').clone();

		//set poster property in result
		var poster = result.find('#poster img');
		poster.attr('src', movie.posters.detailed);

		//set title property in result
		var title = result.find('#title h2');
		title.text(movie.title);

		//set synopsis property in result
		var synopsis = result.find('#synopsis p');

			//check to see if synopsis is available
			if( movie.synopsis == '' ) {

				synopsis.text("Synopsis: N/A");

			} else {

				synopsis.text("Synopsis: " + movie.synopsis);

			}

		//set cast property in result
		var cast = result.find('#cast p');
		cast.text("Cast: " + movie.abridged_cast[0].name + ", " + movie.abridged_cast[1].name + ", " + movie.abridged_cast[2].name + ", " + movie.abridged_cast[3].name);	
	
			
		//set year property in result
		var year = result.find('#year p');
		year.text("Released: " + movie.year);

		//set mpaa_rating property in result
		var rating = result.find('#rating p');
		rating.text("MPAA Rating: " + movie.mpaa_rating);

		//set runtime property in result
		var runtime = result.find('#runtime p');

			//check to see if runtime is available
			if ( movie.runtime == '' || movie.runtime == null ) { 

				runtime.text("Runtime: N/A"); 

			} else {

				runtime.text("Runtime: " + movie.runtime + " min");

			}

		//set critic rating and score property in result  
		var critics = result.find('#critics p');

			//check to see if critics ratings and scores are availaable
			if ( movie.ratings.critics_rating == null || movie.ratings.critics_score == '' ) {

				critics.text("Critics Rating & Score N/A");

			} else {

				critics.text("Critics Rating: " + movie.ratings.critics_rating + " with a score of " + movie.ratings.critics_score);

			}

		//set audience rating and score property in result 	
		var audience = result.find('#audience p');

			//check to see if audience ratings and scores are available
			if ( movie.ratings.audience_rating == null || movie.ratings.audience_score == '' ) {

				audience.text("Audience Rating & Score N/A");

			} else {

				audience.text("Audience Rating: " + movie.ratings.audience_rating + " with a score of " + movie.ratings.audience_score);

			}

		//append data to '.results' div 
		$('.results').append(poster, title, synopsis, cast, year, rating, runtime, critics, audience);

	} //end showMovie function

	//function to make GET call to Rotten Tomatoes, returning data based on user's search input
	var getMovie = function(title) {

		//set url of site to a variable
		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=" + title + "&page_limit=2&page=1&apikey=9qt3g2sp97knswfepw7bchpq";
		
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

}); //end document ready