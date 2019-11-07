import requests
from key import GIPHY_KEY, TENOR_KEY

GIPHY_URL = 'https://api.giphy.com/v1/gifs/search'
GIPHY_LANG = {'en', 'es', 'pt', 'id', 'fr', 'ar', 'tr', 'th', 'vi', 'de', 'it',
              'ja', 'zh-CN', 'zh-TW', 'ru', 'ko', 'pl', 'nl', 'ro', 'hu', 'sv',
              'cs', 'hi', 'bn', 'da', 'fa', 'tl', 'fi', 'iw', 'ms', 'no', 'uk',
              'zh'}
TENOR_URL = 'https://api.tenor.com/v1/search'
TENOR_LANG = {'pt', 'en', 'es', 'it', 'de', 'ar', 'ru', 'fr', 'ja', 'ko', 'da',
              'pl', 'sq', 'sk', 'id', 'hi', 'tr', 'nl', 'bn', 'tl', 'he',
              'zh-CN', 'zh-TW', 'fi', 'sv', 'cs', 'ro', 'ms', 'ur', 'nb', 'nn',
              'ca', 'el', 'hu', 'th', 'fa', 'uk', 'hr', 'vi', 'zh'}
GIF_LIMIT = 25
MAX_WIDTH = 200

def get_dimensions(width, height):
    if width > MAX_WIDTH:
        zoom_out = MAX_WIDTH / width
        new_height = int(height * zoom_out)
        return MAX_WIDTH, new_height
    return width, height

class SearchAPI:
    url = ''
    params = {}
    previous_term = ''
    stop = False

    def search(self, term, page, lang):
        self.stop = self.stop if self.previous_term == term else False
        self.params = self.prepare_query(term, page, lang)
        if not self.stop:
            r = requests.get(self.url, params=self.params)
            result = self.process_results(r.json())
            return result
        self.previous_term = term
        return []

    def prepare_query(self, term, page, lang):
        return {}

    def process_results(self, result):
        return result


class GiphySearchAPI(SearchAPI):
    url = GIPHY_URL
    params = {
        'api_key': GIPHY_KEY,
        'limit': GIF_LIMIT,
    }

    def prepare_query(self, term, page, lang):
        self.params['q'] = term
        self.params['offset'] = GIF_LIMIT * page - 1
        self.params['lang'] = lang if lang in GIPHY_LANG else 'en'
        return self.params

    def process_results(self, result):
        self.stop = result['pagination']['total_count'] == \
            result['pagination']['offset'] + result['pagination']['count'] \
            if 'pagination' in result else False
        processed_result = []
        for entry in result['data']:
            width, height = get_dimensions(
                int(entry['images']['fixed_width']['width']),
                int(entry['images']['fixed_width']['height'])
            )
            processed_entry = {
                'url': entry['images']['fixed_width']['url'],
                'width': width,
                'height': height,
                'shareUrl': entry['bitly_url'],
                'source': 'Giphy'
            }
            processed_result.append(processed_entry)
        return processed_result

class TenorSearchAPI(SearchAPI):
    url = TENOR_URL
    params = {
        'key': TENOR_KEY,
        'limit': GIF_LIMIT,
        'contentfilter': 'off',
        'media_filter': 'minimal'
    }

    def prepare_query(self, term, page, lang):
        self.params['q'] = term
        self.params['pos'] = page * GIF_LIMIT - 1
        self.params['locale'] = lang if lang in TENOR_LANG else 'en'
        return self.params

    def process_results(self, result):
        self.stop = result['next'] is None
        processed_result = []
        for entry in result['results']:
            width, height = get_dimensions(
                int(entry['media'][0]['tinygif']['dims'][0]),
                int(entry['media'][0]['tinygif']['dims'][1])
            )
            processed_entry = {
                'url': entry['media'][0]['tinygif']['url'],
                'width': width,
                'height': height,
                'shareUrl': entry['itemurl'],
                'source': 'Tenor'
            }
            processed_result.append(processed_entry)
        return processed_result
