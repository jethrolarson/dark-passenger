/* Utils */
function lookupOb(ob,arr){
	var result = ob;
	for(var i=0;i<arr.length;i++){
		result = result[arr[i]];
		if(result === undefined){
			return undefined;
		}
	}
	return result;
}


/*: Game object #constructor */
var game = {
	title:"Dark Passenger",
	$title:$("#title"),
	$content:$("#content"),
	$dialogs : $("#dialogs"),
	$locations : $("#locations"),
	$inventory : $("#inventory"),
	$people:$("#people"),
	locations:{},
	people:{},
	inventory:{},
	location:{
		current:null
	},
	init: function(){
		if(cache.location){
			game.location.render(cache.location);
		}else{
			game.newGame(); 
		}
		game.addEvents();
	},
	newGame: function(){
		cache.clear();
		game.location.render("intro");
	}
};

game.loadContent = function(locationName,lookupArray){
	if(cache.location!=locationName){
		game.location.render(locationName,lookupArray);
	}else{
		var data = lookupOb(game.location.current,lookupArray);
		Dialog(data);
	}
};

game.addEvents = function(){
	$("#content, #dialogs").delegate("a","click",function(){
		var $this = $(this);
		if($this.hasClass("next")){
			
		}else if($this.hasClass("prev")){
			
		}
		else if(this.hash){
			var lookupArray = this.hash.slice(1).split("/");
			var match = (/^#([^\/]+)(?:\/([^\/]+))*/).exec(this.hash);//Parse object lookups.
			var locationName = lookupArray[0];
			return game.loadContent(locationName,lookupArray.slice(1));//Security hole?
		}
	});
};

game.location.render=function(name,lookupArray){
	if(name){
		game.location.current = game.locations[name];
		cache.location=name;
		//TODO handle lookupArray
	}
	var loc = game.location.current;
	document.title = loc.title+" - "+game.title;
	game.$title.text(loc.title);
	game.$content.html(game.parseContent(loc.content));
	game.renderMenu("locations");
	game.renderMenu("people");
};
game.renderMenu = function(name){
	HTML ="";
	$.each(game[name],function(k,v){
		if(v.visible){
			HTML = '<li><a href="#'+k+'">'+v.name+'</a></li>';
		}
	});
	game['$'+name].html(HTML);
};


game.parseContent = function(txt){
	txt = tmpl(txt)(game);
	txt = converter.makeHtml(txt);
	return txt;
};

//TODO: Add save cache system
var cache = localStorage;

/* Dialog
**********/
function Dialog(data){
	var content = data.content; 
	if($.isArray(data.content)){
		content = content[0];//TODO Make paging functional
	}
	content = game.parseContent(content)
	var $dialog = $("#zoom");
	$dialog.find("h2").text(data.title?data.title:'');
	$dialog.find("content").html(content);
	$dialog.fadeIn(300);
}

var converter = new Showdown.converter();

//JSONP load function
function location_load(data){
	game.locations = data;
}

$(function(){
	game.init();//TODO enable loading from cookie/session
	var $dialog = $("#zoom").each(function(){
		var $this = $(this);
		var $content = $this.find(".content");
		var $prev = $this.find(".prev").click(function(){
			$this.trigger("prev");
			return false;
		});
		var $next = $this.find(".next").click(function(){
			$this.trigger("next");
			return false;
		});
		$this.find(".close").click(function(){
			$dialog.hide();
		});
	});
});