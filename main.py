#!/usr/bin/env python
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util as webappUtil
from django.utils import simplejson
import util, yaml, logging, re

class Index(webapp.RequestHandler):
  def get(self):
    util.render(self,'game.html',{})

class Data(webapp.RequestHandler):
  def get(self,loc):
    if re.match(r"[a-z]+", loc) != None: 
      f=open('data/'+loc+'.yaml') #FIXME security vulnerability
      data = yaml.load(f)
      util.renderJSON(self,data)
    else:
      util.error(404,"Not a valid, or even present resource")

def main():
  application = webapp.WSGIApplication([
    (r'/(.+)', Data),
    ('/', Index)
  ],debug=True)
  webappUtil.run_wsgi_app(application)


if __name__ == '__main__':
  main()
