(function(w,$){

var $w = $(w);
/* Utils */
function lookupOb(ob, arr) {
	var result = ob;
	for (var i = 0; i < arr.length; i++) {
		result = result[arr[i]];
		if (result === undefined) {
			return undefined;
		}
	}
	return result;
}

/*: Game object #constructor */
var game = {
	title: 'Dark Passenger',
	$game: $('#game'),
	$title: $('#title'),
	$content: $('#content'),
	locations: {},
	init: function() {
		game.loadLocations();
		game.bindEvents();
	},
	bindEvents: function(){
		$w.bind({
			hashchange: game.render,
			locationsLoaded: game.start
		});
	},
	render: function(e){
		hash = window.location.hash ? window.location.hash.slice(1) : 'intro';
		var lookupArray = hash.split('/'),
		    data = lookupOb(game.locations,lookupArray),
		    content = game.parseContent(data.content);
		game.$game.fadeOut(200, function(){
			if(data.title) {
				document.title = data.title + ' - ' + game.title;
				game.$title.text(data.title||"");
			}
			game.$content.html(content);
			game.$game.fadeIn(200);
		});
		
	},
	newGame: function() {
		cache.clear();
		game.render('intro');
	},
	start: function(){
		$w.trigger('hashchange');
	},
	loadLocations: function(){
		$.ajax({
		  url: '/loc',
		  dataType: 'json',
		  success: function(data){
				game.locations = data;
				console.log('locations Loaded');
				$w.trigger('locationsLoaded');
			}
		});
	}
};
game.parseContent = function(txt) {
	txt = tmpl(txt)(game);
	txt = converter.makeHtml(txt);
	return txt;
};

//TODO: Add save cache system
window.cache = localStorage;

var converter = new Showdown.converter();


$(function() {
	game.init(); //TODO enable loading from cookie/session
});
})(window,jQuery)