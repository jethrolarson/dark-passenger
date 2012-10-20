// Generated by CoffeeScript 1.3.3
(function() {
  var $w, converter, game, lookupOb, w;

  w = window;

  $w = $(w);

  lookupOb = function(ob, arr) {
    var item, result, _i, _len;
    result = ob;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      item = arr[_i];
      result = result[item];
      if (result === void 0) {
        return void 0;
      }
    }
    return result;
  };

  game = {
    title: 'Dark Passenger',
    $game: $('#game'),
    $title: $('#title'),
    $content: $('#content'),
    $links: $('#links'),
    locations: {},
    init: function() {
      cache.links = cache.links || {};
      this.bindEvents();
      this.locations = window.loc;
      return this.start();
    },
    bindEvents: function() {
      $w.bind({
        hashchange: this.render.bind(this)
      });
      return $(document).on('click', 'a.back', function(e) {
        e.preventDefault();
        return window.history.go(-1);
      });
    },
    render: function() {
      var content, data, hash, lookupArray,
        _this = this;
      hash = window.location.hash ? window.location.hash.slice(1) : 'intro';
      lookupArray = hash.split('/');
      data = lookupOb(this.locations, lookupArray);
      content = this.parseContent(data.content);
      return this.$game.fadeOut(200, function() {
        var k, links, v;
        if (data.title) {
          document.title = data.title + ' - ' + _this.title;
          _this.$title.text(data.title || "");
        }
        _this.$content.html(content);
        links = '';
        if (!_this.$content.find('a').length) {
          _this.$content.append("<a href=\"\" class=\"back\">Back</a>");
        }
        for (k in cache) {
          v = cache[k];
          if (/^_/.test(k)) {
            links += '<a href="#' + v + '">' + k.slice(1) + '</a>';
          }
        }
        links += "<a class=\"reset\" onclick=\"if(confirm('Restart Game?')){localStorage.clear();location.href='/';}\">Restart</a>";
        _this.$links.html(links);
        return _this.$game.fadeIn(200);
      });
    },
    newGame: function() {
      cache.clear();
      return this.render('intro');
    },
    start: function() {
      return $w.trigger('hashchange');
    },
    parseContent: function(txt) {
      txt = tmpl(txt)(this);
      return txt = converter.makeHtml(txt);
    }
  };

  window.cache = localStorage;

  converter = new Showdown.converter();

  $(function() {
    return game.init();
  });

}).call(this);
