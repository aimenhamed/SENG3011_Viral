from flask import Flask
from flask_cors import CORS
import subprocess
import json

app = Flask(__name__)
CORS(app)

@app.route('/')
def test():
    return {
        'data' : 'Hello world!'
    }

@app.route('/update')
def update():
    spider_name = "donSpider"
    # -O command overwrites the temporary file
    # '&&' is used to join multiple commands together.
    command = f"scrapy crawl {spider_name} -O latest.json && mv latest.json out.json"
    s = subprocess.Popen(command.split(), shell=True)
    return {
        'data' : 0,
    }

@app.route('/articles', methods = ['GET'])
def articles():
    output_file = 'out.json'
    with open(output_file) as output_data:
        output = json.load(output_data)
    return {
        'data': output
    }


if __name__ == '__main__':
    app.run(debug=True)