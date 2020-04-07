#!/usr/bin/env python3
import random
import pyjokes
from flask import Flask, request, render_template, url_for, make_response

app = Flask(__name__)
#  methods=["GET", "POST"]
@app.route("/")
def index():
    category = ["neutral", "chuck", "all"]
    language = ["en", "de", "es"]
    return render_template("base.html", category = category, language = language) 

@app.route("/templates/jokes.html", methods=["GET", "POST"])

def send_joke():
    category = ["neutral", "chuck", "all"]
    language = ["en", "de", "es"]
    cat = request.form['cat']
    lang = request.form['lang']
    joke = getJoke(cat,lang)
    return render_template("jokes.html",JOKE=joke, category = category, language = language)
    
def getJoke(cat,lang):
    ranNum = random.random()
    jokeList = pyjokes.get_jokes(category=cat, language=lang)
    ranNum = int(ranNum*len(jokeList))
    joke = jokeList[ranNum]
    return joke

