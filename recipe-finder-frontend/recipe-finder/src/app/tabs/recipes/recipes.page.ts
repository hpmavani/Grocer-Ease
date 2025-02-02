import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: false
})
export class RecipesPage implements OnInit {
  recipes: any[] = []
  lists: any[] = []
  constructor(public imageService : ImageService) { 
    
  }

  async ngOnInit() {
    const navigation = window.history.state; 
    console.log("navigation info")
    console.log(navigation)
    console.log(navigation.response)
    this.recipes = navigation.response
    if(this.recipes){
      for(let i = 0; i < this.recipes.length; i++) {
        const imageUrl = await this.imageService.searchImage(this.recipes[i].recipe_name); 
        this.recipes[i].imageUrl = imageUrl; 
      }
      this.lists = [...this.recipes]
    }
  }

}
