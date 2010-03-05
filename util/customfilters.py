from django import template
from django.template.defaultfilters import stringfilter
from google.appengine.ext import webapp
import markdown as markdownLib

register = webapp.template.create_template_register()


_base_js_escapes =  (
  ('\\', r'\x5C'),
  ('\'', r'\x27'),
  ('"', r'\x22'),
  ('>', r'\x3E'),
  ('<', r'\x3C'),
  ('&', r'\x26'),
  ('=', r'\x3D'),
  ('-', r'\x2D'),
  (';', r'\x3B'),
  (u'\u2028', r'\u2028'),
  (u'\u2029', r'\u2029')
)

# Escape every ASCII character with a value less than 32.
_js_escapes = (_base_js_escapes +
               tuple([('%c' % z, '\\x%02X' % z) for z in range(32)]))
               
@register.filter
@stringfilter
def escapejs(value):
  """Hex encodes characters for use in JavaScript strings."""
  for bad, good in _js_escapes:
    value = value.replace(bad, good)
  return value

@register.filter
def markdown(value):
  return markdownLib.Markdown().convert(value)