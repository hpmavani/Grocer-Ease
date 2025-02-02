import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
import os
import gemini_api


app = Flask(__name__)
CORS(app)
CORS(app, origins=["http://localhost:8100"])


FOLDER = "images/"
IMAGE_EXTENSIONS = ["png", "jpeg"]
recipes = ""
def load_image(file):
    try:
        return Image.open(file)
    except OSError:
        return None


@app.route('/')
def index():
    return "Welcome to recipe API"
#for now, put image from frontend in folder
@app.route('/photo', methods = ['POST'])
def getImage():
    #if no file sent in request
    if 'file' not in request.files:
        return "no file sent", 404
   
    filename = request.files['file'].filename
    print(filename)
   
    image = request.files['file']
   
    recipes = gemini_api.get_recipe(image)
   
    return "photo received", 200
   
if __name__ == "__main__":
    app.run(host = "0.0.0.0")