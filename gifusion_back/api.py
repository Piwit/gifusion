import random

from flask import Flask, escape, request
from flask_cors import CORS

from search import GiphySearchAPI, TenorSearchAPI

app = Flask(__name__)
CORS(app)

giphy = GiphySearchAPI()
tenor = TenorSearchAPI()

@app.route('/')
def search():
    term = request.args.get('term', '')
    page = int(request.args.get('page', '0'))
    lang = request.args.get('lang', 'en')
    res = giphy.search(term, page, lang)
    res.extend(tenor.search(term, page, lang))
    random.shuffle(res)
    return {'data': res}

if __name__ == '__main__':
     app.run(port='5000')
