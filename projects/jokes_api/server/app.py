#!/usr/bin/env python3
"""
jokes api
"""
import random
import pyjokes
import json
from flask import Flask, Response, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
# CORS(app)
@app.route("/api/v1/jokes")
def get_random_joke():
    ranNum = random.random()
    jokeList = pyjokes.get_jokes(category="all", language="en")
    ranNum = int(ranNum*len(jokeList))
    joke = jokeList[ranNum]

    res = Response(json.dumps({"jokes": joke}))
    res.headers["Access-Control-Allow-Origin"] = "*"
    res.headers["Content-Type"] = "application/json"
    return res

@app.route("/api/v1/jokes/<id>")
def get_specific_joke(id):
    
    jokeList = pyjokes.get_jokes(category="all", language="en")
    joke = jokeList[int(id)]
    res = Response(json.dumps({id: joke}))
    res.headers["Access-Control-Allow-Origin"] = "*"
    res.headers["Content-Type"] = "application/json"
    return res

if __name__ == "__main__":
    app.run("0.0.0.0")