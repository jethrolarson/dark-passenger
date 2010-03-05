from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from django.utils import simplejson

def render(rh,viewPath,data):
  rh.response.out.write(template.render("views/"+viewPath,data))
  
def renderJSON(rh,data):
  rh.response.headers['Content-Type'] = 'application/json'
  rh.response.out.write(simplejson.dumps(data))
  
def isAjax(rh):
  try:
    return rh.request.headers["X-Requested-With"] == "XMLHttpRequest"
  except:
    return False

def error(rh,code,message):
  rh.error(code)
  if isAjax(rh):
    rh.response.out.write(str(code)+": " + message)
  else:
    rh.response.out.write(template.render("views/error.html", {"message":message, "code":code}))

class Error404(webapp.RequestHandler):
  def get(self):
    util.error(self,404,"Page not found")