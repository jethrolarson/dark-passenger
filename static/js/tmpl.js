/*: Simple javascript templating
	Adapted from John Resig's microtemplates
	#takes @tm: #string text of template
	#returns compiled template #function which takes a context as it's only param
*/
function tmpl(tm){
	return new Function("obj","var p=[];(function(){p.push('" +
		tm
			.replace(/[\r\t]/g, " ")
			.replace(/[\n]/g, "\\n")
			.split("<%").join("\t")
			.replace(/((^|%>)[^\t]*)'/g, "$1\r")
			 // escape other single quotes
			.split("'").join("\\'")
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t").join("');")
			.split("%>").join("p.push('")
			.split("\r").join("\\'")
		+ "');}).call(obj); return p.join('');");
}
//template helpers
var _ = {
	a: function(text,href,attr){
		href = href || text;
		return '<a href="'+href+'" '+this.attr(attr)+'>'+text+'</a>';
	},
	attr: function(obj){
		if(!obj)return "";
		var html = "";
		$.each(obj,function(k,v){
			html += k+'="'+v+'" ';
		});
		return html;
	}
};

function markup(str){
	return str
		.replace(/\n\s?\n/,"<br /><br />")
		.replace(/\[([^\]]+)\]\(([^\)]+)\)/,'<a href="$2">$1</a>');
}