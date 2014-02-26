#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import json

from bottle import route, run, response, request


def jsonp(request, dictionary):
    if request.query.callback:
        return "%s(%s)" % (request.query.callback, dictionary)
    return dictionary


@route('/<path:path>')
def index(path):
    response.set_header('Access-Control-Allow-Origin', '*')
    response.set_header('charset', 'UTF-8')

    j = "&".join("%s=%s" % tup for tup in request.GET.items())
    method = request.query._method
    r = getattr(requests, method)
    re = r('http://127.0.0.1:8098/{}?{}'.format(path, j))

    d = json.dumps(re.text)
    if request.query.callback:
        response.content_type = "application/javascript"

        if path == 'ping' and re.text == "OK":
            d = {"ping": "OK"}
        elif(path == 'ping'):
            d = {"ping": "OFF"}

        if method in ['delete']:
            d = {}

        return jsonp(request, d)

    response.content_type = 'application/json'
    return d


run(host='127.0.0.1', port=8889)
