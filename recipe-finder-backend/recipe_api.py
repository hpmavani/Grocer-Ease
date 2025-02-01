import json
from flask import Flask, jsonify, request

app = Flask(__name__)
FOLDER = "/images"
IMAGE_EXTENSIONS = {"png", "jpeg"}

@app.route('/')
def index(): 
    return "Welcome to recipe API"
#for now, put image from frontend in folder
@app.route('/photo', methods = ['POST'])
def getImage(): 
    file_path = FOLDER + "/image.txt"
    
    #if no file sent in request
    if 'file' not in request.files: 
        return 'No file sent', 400
    
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    
    
    
 