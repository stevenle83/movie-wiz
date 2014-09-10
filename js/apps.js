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
		synopsis.text(movie.synopsis);

		//set year property in result
		var year = result.find('#year p');
		year.text("Released: " + movie.year);

		//set mpaa_rating property in result
		var rating = result.find('#rating p');
		rating.text("MPAA Rating: " + movie.mpaa_rating);

		//set runtime property in result
		var runtime = result.find('#runtime p');
		runtime.text("Runtime: " + movie.runtime);

		//set critic_rating and audience_rating in result  
		var critics = result.find('#critics p');
		critics.text("Rated: " + movie.ratings.critics_rating + " by Critics with a score of " + movie.ratings.critics_score);

		var audience = result.find('#audience p');
		audience.text("Rated: " + movie.ratings.audience_rating + " by Audience with a score of " + movie.ratings.audience_score);

		return result;

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

			$.each(data.movies, function(index, item) {

				//set showMovie function to variable movie
				var movie = showMovie(item);	

				//movie is called and appended to '.results' div	
				$('.results').append(movie);

			}); //end $.each()

		}); //end .done()

	} //end getMovie function

}); //end document ready