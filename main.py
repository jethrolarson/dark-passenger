#!/usr/bin/env python
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

import controllers.game

def main():
  application = webapp.WSGIApplication([
    (r'/(.+)', controllers.game.Location),
    ('/', controllers.game.Index)
  ],debug=True)
  util.run_wsgi_app(application)


if __name__ == '__main__':
  main()
