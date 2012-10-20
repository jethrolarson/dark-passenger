// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
var templateSettings = {
	evaluate    : /<%([\s\S]+?)%>/g,
	interpolate : /<%=([\s\S]+?)%>/g,
	escape      : /<%-([\s\S]+?)%>/g
};

// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// Jethro adds context binding to data and `value` template delimeter
var _ = typeof _ != undefined ? _ : {};
var tIndex = 0;
tmpl = function(str) {
	var c  = templateSettings;
	var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
		'(function(){with(obj||{}){__p.push(\'' +
		str.replace(/\\/g, '\\\\')
			.replace(/'/g, "\\'")
			.replace(c.escape, function(match, code) {
				return "',_.escape(" + code.replace(/\\'/g, "'") + "),'";
			})
			.replace(c.interpolate, function(match, code) {
				return "'," + code.replace(/\\'/g, "'") + ",'";
			})
			.replace(c.evaluate || null, function(match, code) {
				return "');" + code.replace(/\\'/g, "'")
					.replace(/[\r\n\t]/g, ' ') + ";__p.push('";
			})
			.replace(/\r/g, '\\r')
			.replace(/\n/g, '\\n')
			.replace(/\t/g, '\\t')
			+ "');}}).call(obj);return __p.join('');";
	var func = new Function('obj', '_', tmpl);
	return function(data) { return func(data, _) };
};