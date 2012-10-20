#!/usr/bin/env python
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util as webappUtil
from django.utils import simplejson
import util, yaml, logging, re

class Index(webapp.RequestHandler):
  def get(self):
    util.render(self,'game.html',{})

def main():
  application = webapp.WSGIApplication([
    ('/', Index)
  ],debug=True)
  webappUtil.run_wsgi_app(application)


if __name__ == '__main__':
  main()
