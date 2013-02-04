from bottle import *

# Static Routes
@get('/<filename:re:.*\.html>')
def html(filename):
	return static_file(filename, root='')

@get('/<filename:re:.*\.json>')
def json(filename):
	return static_file(filename, root='')

if __name__ == '__main__':
	# Bind to PORT if defined, otherwise default to 5000.
	port = int(os.environ.get('PORT', 5000))
	run(host='0.0.0.0', port=port)