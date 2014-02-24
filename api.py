#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests

from bottle import route, run, response, request


def jsonp(request, dictionary):
    if (request.query.callback):
        return "%s(%s)" % (request.query.callback, dictionary)
    return dictionary


@route('/<path:path>')
def index(path):
    response.set_header('Access-Control-Allow-Origin', '*')
    response.set_header('charset', 'UTF-8')

    j = "&".join("%s=%s" % tup for tup in request.GET.items())
    re = requests.get('http://127.0.0.1:8098/{}?{}'.format(path, j))

    if (request.query.callback):
        response.content_type = "application/javascript"
        return jsonp(request, re.text)
    response.content_type = 'application/json'
    return re.text


run(host='127.0.0.1', port=8889)
