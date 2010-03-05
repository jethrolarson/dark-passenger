from google.appengine.ext import webapp
from google.appengine.ext.webapp import template

import util, yaml, logging

class Index(webapp.RequestHandler):
  def get(self):
    util.render(self,'game.html',{})

class Location(webapp.RequestHandler):
  def get(self,loc):
    f=open('loc/'+loc+'.yaml') #FIXME security vulnerability
    templateData = {
      "data":yaml.load(f),
      "methods":open('loc/'+loc+'.js').read()
    }
    util.render(self,"location.js",templateData)

