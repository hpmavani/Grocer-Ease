import '@capacitor-community/http';

import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core'
export interface UserPhoto {
  filepath: string; 
  filename: string;
  data: string; 
}
@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: UserPhoto[] = []; 

  constructor() { }

  public async uriToBlob(uri: string) {
    const response = await fetch(uri);  // Fetch the image as a Blob
    const blob = await response.blob();  // Get Blob data from the response
    return blob;
  }
  public async addNewToGallery(): Promise <any>{
    let response = ""; 
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      allowEditing: false, 
      source: CameraSource.Camera,
      quality: 100
    })
    
    if(capturedPhoto) {
      const formData = new FormData(); 
      const photoBlob = await this.uriToBlob(capturedPhoto.webPath!);
      formData.append('file', photoBlob, 'photo.png'); 
      formData.append('filename', 'bill.png'), 
      formData.append('filepath', capturedPhoto.webPath!)

      response = await this.postImage(formData);
    }
    return response; 
  }

  private async postImage(formData : FormData): Promise <any> {
    const siteUrl = "http://127.0.0.1:5000/photo"
    const options = {
      url: siteUrl, 
      headers: { "Content-Type": "multipart/form-data"}, 
      data:formData
    }

    try {
      const response = await CapacitorHttp.post(options);
      const parsed_response = await JSON.parse(JSON.stringify(response.data));
      return parsed_response; 
    } catch (error) {
      console.error("Error posting image:", error);
      throw error; // Proper error handling if the POST request fails
    }
      //console.log(response)
    

    /*let json_response = `[
      {
        "extra_ingredients": "Olive oil, salt, pepper",
        "recipe_instructions": "1. Wash and chop potatoes and sweet potatoes into small, even-sized pieces. 2. Toss with olive oil, salt, and pepper. 3. Spread on a baking sheet and roast in a preheated oven at 400°F (200°C) for 20-25 minutes, or until tender and slightly browned. 4.  While the potatoes roast, finely chop the cilantro. 5. Once the potatoes are cooked, sprinkle with chopped cilantro and serve.",
        "recipe_name": "Roasted Sweet Potatoes and Potatoes"
      },
      {
        "extra_ingredients": "Butter, salt, pepper",
        "recipe_instructions": "1. Boil or steam the ditalini pasta until al dente. 2. While pasta cooks, melt butter in a pan. 3. Drain the pasta and add it to the pan with melted butter. 4. Season with salt and pepper to taste. 5. Serve immediately. ",
        "recipe_name": "Simple Ditalini Pasta"
      },
      {
        "extra_ingredients": "Olive oil, salt, pepper",
        "recipe_instructions": "1. Heat olive oil in a pan. 2. Add chopped zucchini and mushrooms and sauté until tender. 3. Season with salt and pepper to taste. 4. Serve as a side dish or add to pasta. ",
        "recipe_name": "Sautéed Zucchini and Mushrooms"
      },
      {
        "extra_ingredients": "Salt",
        "recipe_instructions": "1. Heat a pan and add the tortillas. 2. Cook until lightly browned and crispy. 3. Season with salt to taste. 4. Serve with your favorite toppings such as the sautéed zucchini and mushrooms. ",
        "recipe_name": "Crispy Tortillas"
      },
      {
        "extra_ingredients": "Salt",
        "recipe_instructions": "1. Finely chop parsley. 2. Add salt to taste. 3. Serve as a garnish for any dish. ",
        "recipe_name": "Chopped Parsley"
      }
    ]`*/
    
  }

}





