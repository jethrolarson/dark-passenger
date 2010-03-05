function Game(state){
	this.title="Dark Passenger";
	this.$title=$("#title");
	this.$content=$("#content");
	this.$dialogs = $("#dialogs");
	this.$locations = $("#locations");
	this.$inventory = $("#inventory");
	this.$people=$("#people");
	
	this.locations={};
	this.people={};
	this.inventory={};
	this.curLocName = "";
	if(state){
		this.loadGame(state);
	}else{
		this.newGame(); 
	}
	this.addEvents();
}
Game.prototype.look=function(name){
	var loc = this.locations[this.curLocName];
	Dialog(loc.data[name]);
	return false;
};
Game.prototype.move=function(name){
	if(!this.locations[name]){
		this.locations[name] = new Location(name);		
	}
	this.curLocName=name;
	this.render();	
};
Game.prototype.talk=function(name){
	alert("TODO add talk functionality")
};

Game.prototype.addEvents = function(){
	var that=this;
	$("#content, dialogs").delegate("a","click",function(){
		if(this.hash){
			var match = this.hash.match(/^#([^\/$]+)\/(.+)/);//TODO accept extra arguments?
			controller = match[1];
			name = match[2];
			return that[controller](name);//Security hole?
		}
	});
};

Game.prototype.render=function(){
	var loc = this.locations[this.curLocName],
			readyCheck = null,
			timer = 0,
			that=this;
	function _render(){
		if(loc.ready){
			clearInterval(readyCheck);
			document.title = loc.data.main.title+" - "+that.title;
			that.$title.text(loc.data.title);
			that.$content.html(loc.look());
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
Game.prototype.renderMenu = function(name){
	HTML ="";
	$.each(this[name],function(k,v){
		if(v.visible){
			HTML = '<li><a href="#'+k+'">'+v.name+'</a></li>';
		}
	});
	this['$'+name].html(HTML);
};

Game.prototype.newGame = function(){
	this.move("intro");
};

/* Dialog
**********/
function Dialog(data){
	var dialog = $(
		'<dialog>\
			<header>\
				<a class="close" title="close">X</a>\
				<h2>'+data.title+'</h2>\
			</header>\
			<div class="dialogBody">'+converter.makeHtml(data.look)+'</div>\
		</dialog>')
		//.draggable()
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
		response = eval("("+response+")");
		that.data = response.data;
		that.methods = response.methods;
		that.methods.init();
		that.ready = true;
	});
}
Location.prototype.look=function(){
	return converter.makeHtml(this.data["main"].look);
};



/* Item
********/
function Item(data){
	this.data = data;
}
Item.prototype.examine = function(){
	return this.look;//TODO Convert to html from markdown
};
//Item.use
//Item.combine


var converter = new Showdown.converter();

var game = null;
$(function(){
	game = new Game();//TODO enable loading from cookie/session
});