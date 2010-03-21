from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from django.utils import simplejson
import util, yaml, logging

class Index(webapp.RequestHandler):
  def get(self):
    util.render(self,'game.html',{})

class Location(webapp.RequestHandler):
  def get(self,loc):
    f=open('loc/'+loc+'.yaml') #FIXME security vulnerability
    data = yaml.load(f)
    util.renderJSON(self,data)

