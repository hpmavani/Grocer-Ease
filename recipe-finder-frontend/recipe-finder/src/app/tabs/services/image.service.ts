import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() {
    //gets the pexels api key from .env
  }

  public async searchImage(generated_recipe : string) {
    //fetches image
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${generated_recipe}`, {
        headers: {
          'Authorization': environment.PEXELS_API_KEY
        },
      });

      //takes the whole array of images
      const recipes = await response.json();
      console.log(recipes.photos.length);
      if (recipes.photos.length > 0) {
        //tries till it finds a vaid url to return
          for(const image of recipes.photos){
            if(image){
              console.log(image.src.original); 
              return image.src.original;
            }
          }
      }
      return null;
     }  catch (error) {
        console.log("Couldn't get food image ", error); 
     }
  }
}






//function to search the image
