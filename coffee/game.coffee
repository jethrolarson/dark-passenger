# coffee -o static/js/ -w -c coffee/
w = window
$w = $ w
$d = $ document
# Utils
lookupOb = (ob, arr)->
	result = ob
	for item in arr
		result = result[item]
		return undefined if result == undefined

	return result


$.on = (args...)->
	$d.on.apply $d, args

# Game object #constructor
game = {
	title: 'Dark Passenger'
	$game: $('#game')
	$content: $('#content')
	$links: $('#links')
	locations: {}
	init: ->
		cache.links = cache.links || {};
		@bindEvents()
		@locations = window.loc
		@render()
		$.scrollTo $('.passage').last(), duration: 0
	bindEvents: ->
		self = this
		$.on 'click', 'a', (e)->
			hash = @hash
			if @hash
				$t = $ hash
				if $t.length
					$('.passage').removeClass 'on'
					$t.addClass 'on'
					$.scrollTo($t).done ->
						location.hash = hash
				else
					ar = getCmds()
					ar.push @hash.slice 1
					passageCount = $('.passage').length
					set 'cmd', ar
					self.render()
					if passageCount isnt $('.passage').length
						$.scrollTo $('.passage').last()
			e.preventDefault()
		
	renderCmd: (c)->
		$('.passage').removeClass 'on'
		lookupArray = c.split('_')
		data = lookupOb @locations,lookupArray
		content = if data.content then @parseContent(data.content) else ''
		if data.callback
			data.callback()
		return content and """<div class="passage #{if data.className then data.className else ''}" id="#{c}">#{content}</div>"""
		

	render: (cmds)->
		cmds = getCmds()
		content = ''
		if not $.isArray(cmds) or cmds.length is 0
			cmds = set 'cmd', ['intro']
		for c in cmds
			content += @renderCmd c 
		content = $ content
		$('a',content).each (i,el)=>
			for v in cmds
				if el.hash is '#'+v
					$(el).addClass 'clicked'
					break
		@$content.html content
	parseContent: (txt)->
		try
			txt = tmpl(txt)(this)
			return converter.makeHtml(txt)
		catch e
			return 'ERROR template failed: '+txt
}
window.cache = localStorage

w.getCmds = -> w.get('cmd') or []

w.set = (key,val)->
	try
		window.cache[key] = JSON.stringify val
	catch e
		alert e
		return undefined
	return val
w.get = (key)->
	val = window.cache[key]
	if val
		try
			JSON.parse val
		catch e
			undefined
	else undefined

$.scrollTo = (selector, settings)->
	settings = $.extend {
		offset: {
			top: -30
		},
		duration: 400
	}, settings
	dfd = $.Deferred()
	pos = $(selector).offset()
	$('html,body').animate({
			scrollTop: pos.top + settings.offset.top
		},
		settings.speed,
		settings.easing,
		->
			dfd.resolve()
	)
	return dfd

converter = new Showdown.converter()

$ ->
	game.init()