w = window
$w = $(w)

# Utils
lookupOb = (ob, arr)->
	result = ob
	for item in arr
		result = result[item]
		return undefined if result == undefined

	return result

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
		$w.bind hashchange: @render.bind(this)
		$(document).on 'click','a.back', (e)->
			e.preventDefault()
			window.history.go(-1)
	render: ->
		hash = if window.location.hash then window.location.hash.slice(1) else 'intro'
		lookupArray = hash.split('/')
		data = lookupOb(@locations,lookupArray)
		content = @parseContent(data.content)
		@$game.fadeOut(200, =>
			if data.title
				document.title = data.title + ' - ' + @title
				@$title.text(data.title||"")
			@$content.html content
			links = ''
			if not @$content.find('a').length
				@$content.append """<a href="" class="back">Back</a>"""
			for k,v of cache
				if /^_/.test(k) 
					links += '<a href="#'+v+'">'+k.slice(1)+'</a>'
			links +="""<a class="reset" onclick="if(confirm('Restart Game?')){localStorage.clear();location.href='/';}">Restart</a>"""
			@$links.html(links)
			@$game.fadeIn(200)
		)
	newGame: ->
		cache.clear()
		@render('intro')
	start: ->
		$w.trigger('hashchange')
	parseContent: (txt)->
		txt = tmpl(txt)(this)
		return txt = converter.makeHtml(txt)
}

window.cache = localStorage

converter = new Showdown.converter()

$ ->
	game.init()