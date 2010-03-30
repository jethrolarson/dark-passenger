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
	curLocName : "",
	curLoc:null,
	init: function(){
		this.newGame(); 
		this.addEvents();
	},
	newGame: function(){
		this.move("intro");
	}
};
game.move = function(name){
	if(!this.locations[name]){
		this.locations[name] = new Location(name);
	}
	this.curLocName=name;
	this.curLoc = this.locations[name];
	this.render();	
};

game.loadContent = function(locationName,lookupArray){
	if(this.curLocName!=locationName){
		this.move(locationName,lookupArray);
	}else{
		var data = lookupOb(this.curLoc.data,lookupArray);
		Dialog(data);
	}
};

game.addEvents = function(){
	var that=this;
	$("#content, #dialogs").delegate("a","click",function(){
		var $this = $(this);
		if($this.hasClass("next")){
			
		}else if($this.hasClass("prev")){
			
		}
		else if(this.hash){
			var lookupArray = this.hash.slice(1).split("/");
			var match = (/^#([^\/]+)(?:\/([^\/]+))*/).exec(this.hash);//Parse object lookups.
			var locationName = lookupArray[0];
			return that.loadContent(locationName,lookupArray.slice(1));//Security hole?
		}
	});
};

game.render=function(){
	var loc = this.locations[this.curLocName],
			readyCheck = null,
			timer = 0,
			that=this;
	function _render(){
		if(loc.ready){
			clearInterval(readyCheck);
			document.title = loc.data.main.title+" - "+that.title;
			that.$title.text(loc.data.title);
			that.$content.html(that.parseContent(loc.data.main.content));
			that.renderMenu("locations");
			that.renderMenu("people");
			return;
		}
		timer++;
		if(timer>5){
			clearInterval(readyCheck);
			console.log("error","Location timed out while loading");
		}
	}
	readyCheck = setInterval(_render,500);
	
};
game.renderMenu = function(name){
	HTML ="";
	$.each(this[name],function(k,v){
		if(v.visible){
			HTML = '<li><a href="#'+k+'">'+v.name+'</a></li>';
		}
	});
	this['$'+name].html(HTML);
};


game.parseContent = function(txt){
	txt = tmpl(txt)(this);
	txt = converter.makeHtml(txt);
	return txt;
};

//TODO: Add save cache system
game.cache = {
	get: function(){
		
	},
	set: function(){
		
	}
}
var cache = {};

/* Dialog
**********/
function Dialog(data){
	var content = data.content; 
	if($.isArray(data.content)){
		content = content[0];
	}
	content = game.parseContent(content)
	var dialog = $(
		'<dialog>\
			<header>\
				<a class="close" title="close">X</a>\
				'+(data.title?'<h2>'+data.title+'</h2>':'')+'\
			</header>\
			<div class="dialogBody">'+content+'</div>\
			<footer>\
				<a class="prev" href="#prev">prev</a>\
				<a class="next" href="#next">next</a>\
			</footer>\
		</dialog>')
		.draggable()
		.appendTo("#dialogs");
	dialog.find('.close').click(function(){
		dialog.remove();
	});
}


/* Location
************/
function Location(name){
	this.name=name;
	//this.items
	//this.people
	//:Loads Location scripts and data via AJAX
	var that = this;
	$.getScript("/"+name,function(response){
		response = $.parseJSON(response);
		that.data = response;
		that.ready = true;
	});
}

var converter = new Showdown.converter();

$(function(){
	game.init();//TODO enable loading from cookie/session
});