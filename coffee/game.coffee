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
	$title: $('#title')
	$content: $('#content')
	$links: $('#links')
	locations: {}
	init: ->
		cache.links = cache.links || {};
		@bindEvents()
		@locations = window.loc
		@start()
	bindEvents: ->
		$w.bind 'cmd',(e,c)=>
			$.scrollTo @renderCmd c
		$.on 'click', 'a', (e)->
			hash = @hash
			if @hash
				$t = $ hash
				if $t.length
					$('.passage').removeClass 'on'
					$.scrollTo $t.addClass 'on', onAfter: ->
						location.hash = hash

				else
					cmd @hash.slice 1
			e.preventDefault()
	renderCmd: (c)->
		$('.passage').removeClass 'on'
		$('a').each ->
			if @hash is '#'+c
				$(this).addClass 'clicked'
		lookupArray = c.split('_')
		data = lookupOb @locations,lookupArray
		newContent = $ '<div class="passage on" id="'+c+'">'+@parseContent(data.content)+'</div>'
		newContent.addClass(data.className) if data.className

		@$content.append newContent
		return newContent

	render: (cmds)->
		if not $.isArray cmds
			cmds = [cmds]
		@renderCmd c for c in cmds
	newGame: ->
		cache.clear()
		@render('intro')
	start: ->
		cmds = getCmds()
		if cmds.length
			@render cmds
		else
			cmd 'intro'
	parseContent: (txt)->
		txt = tmpl(txt)(this)
		return converter.makeHtml(txt)
}
window.cache = localStorage

w.cmd = (cmd)->
	$w.trigger 'cmd', cmd
	ar = getCmds()
	ar.push cmd
	set 'cmd', ar
	ar

w.getCmds = -> (get 'cmd') or []

w.set = (key,val)->
	val = JSON.stringify val
	try
		window.cache[key] = val
	catch e
		alert e
	
w.get = (key)->
	val = window.cache[key]
	return if val then JSON.parse val else undefined

$.scrollTo = (selector, settings)->
	settings = $.extend {
		offset: {
			top: 0
		},
		onAfter: $.noop,
		duration: 400
	}, settings
	pos = $(selector).offset()
	$('html,body').animate {
			scrollTop: pos.top + settings.offset.top
		},
		settings.speed,
		settings.easing,
		->
			settings.onAfter()

converter = new Showdown.converter()

$ ->
	game.init()