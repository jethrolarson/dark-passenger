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
	$("#content, dialogs").delegate("a","click",function(){
		if(this.hash){
			var match = (/^#([^\/]+)(?:\/([^\/]+))*/).exec(this.hash);//Parse object lookups.
			var locationName = match[1];
			var lookupArray = match.slice(2);
			return that.loadContent(locationName,lookupArray);//Security hole?
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
			alert("Location timed out while loading");
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



/* Dialog
**********/
function Dialog(data){
	var dialog = $(
		'<dialog>\
			<header>\
				<a class="close" title="close">X</a>\
				'+(data.title?'<h2>'+data.title+'</h2>':'')+'\
			</header>\
			<div class="dialogBody">'+game.parseContent(data.content)+'</div>\
		</dialog>')
		.draggable()
		.appendTo(document.body);
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