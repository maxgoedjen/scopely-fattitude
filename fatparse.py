import csv
import re
import json

import requests

URL = 'https://docs.google.com/spreadsheet/pub?key=0AoZP4sZ1PlPqdDdKNDZsSTJRazFVQzBNbGtqTnRadmc&single=true&gid=0&output=csv'

datapoint = re.compile('^([0-9.]*)$')
validrow = re.compile('^([0-9]+)$')

def get_data():
    debug = ''
    num_weighins = 0
    
    r = requests.get(URL)
    
    parsed_rows = []
    
    reader = csv.reader(r.text.splitlines())
    for row in reader:
        if row[0] == 'WEEK #':
            num_weighins = len(row) - 3
        elif validrow.match(row[0]):
            cat_row = []
            del row[0]
            for cell in row:
                if datapoint.match(cell):
                    if cell:
                        cat_row += [float(cell)]
                    elif len(cat_row) < num_weighins:
                        cat_row += [cat_row[-1]]
                        
            for i in range(len(cat_row), num_weighins):
                cat_row += [cat_row[-1]]
            
            contestant = {
                'name' : row[0],
                'data' : cat_row
            }
            parsed_rows += [contestant]
    
    return_data = {'data' : parsed_rows, 'debug':debug}
    return return_data
    
if __name__ == '__main__':
    print get_data()