import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  specials: any[] = []
  lists: any[] = []
  constructor(public imageService : ImageService) { }

  async ngOnInit() {
    this.specials = [
      {
        name: "Chicken Alfredo",
        ingredients: [
          "Chicken breast (sliced)",
          "Fettuccine pasta",
          "Heavy cream",
          "Butter",
          "Parmesan cheese",
          "Garlic",
          "Salt",
          "Pepper"
        ],
        instructions: [
          "Cook pasta according to package instructions, then set aside.",
          "Sauté sliced chicken in butter until golden, then set aside.",
          "In the same pan, sauté garlic, add cream and bring to a simmer.",
          "Add parmesan cheese and stir until melted.",
          "Add the cooked pasta and chicken, toss to combine, season with salt and pepper, and serve!"
        ]
      },
      {
        name: "Avocado Toast with Egg",
        ingredients: [
          "Bread",
          "Avocado",
          "Egg",
          "Salt",
          "Pepper",
          "Chili flakes (optional)"
        ],
        instructions: [
          "Toast bread, mash avocado with salt & pepper.",
          "Cook an egg (fried, poached, or scrambled).",
          "Spread avocado on toast, top with the egg, and sprinkle chili flakes."
        ]
      },
      {
        name: "One-Pan Honey Garlic Salmon",
        ingredients: [
          "Salmon",
          "Honey",
          "Soy sauce",
          "Garlic",
          "Butter",
          "Lemon"
        ],
        instructions: [
          "Sear salmon in butter, flip and cook.",
          "Add garlic, honey, and soy sauce, cook until sticky.",
          "Squeeze lemon on top and serve!"
        ]
      },
      {
        name: "Chocolate Chip Cookies",
        ingredients: [
          "Butter",
          "Sugar",
          "Eggs",
          "Vanilla extract",
          "Flour",
          "Baking soda",
          "Salt",
          "Chocolate chips"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C).",
          "Mix butter, sugar, eggs, and vanilla extract.",
          "Add flour, baking soda, and salt, and mix until combined.",
          "Fold in chocolate chips.",
          "Scoop dough onto a baking sheet and bake for 10-12 minutes, or until golden brown."
        ]
      },
      {
        name: "Creamy Garlic Parmesan Pasta",
        ingredients: [
          "Pasta",
          "Butter",
          "Garlic",
          "Heavy cream",
          "Parmesan",
          "Salt",
          "Pepper"
        ],
        instructions: [
          "Cook pasta, reserve some water.",
          "Sauté garlic in butter, add cream & parmesan.",
          "Toss in pasta, adjust consistency with pasta water, season to taste."
        ]
      },
      {
        name: "Caprese Salad",
        ingredients: [
          "Tomatoes",
          "Fresh mozzarella",
          "Basil",
          "Olive oil",
          "Balsamic vinegar",
          "Salt",
          "Pepper"
        ],
        instructions: [
          "Slice tomatoes and mozzarella into rounds.",
          "Layer tomato, mozzarella, and basil leaves on a plate.",
          "Drizzle with olive oil and balsamic vinegar.",
          "Season with salt and pepper, then serve!"
        ]
      },
      {
        name: "Vegetable Stir-Fry",
        ingredients: [
          "Bell peppers",
          "Carrots",
          "Broccoli",
          "Snow peas",
          "Soy sauce",
          "Ginger",
          "Garlic",
          "Sesame oil"
        ],
        instructions: [
          "Heat sesame oil in a pan, sauté garlic and ginger.",
          "Add vegetables and stir-fry until tender.",
          "Add soy sauce, cook for another 2 minutes, and serve!"
        ]
      },
      {
        name: "Banana Oat Pancakes",
        ingredients: [
          "Banana",
          "Oats",
          "Egg",
          "Baking powder",
          "Cinnamon"
        ],
        instructions: [
          "Blend banana, oats, egg, baking powder, and cinnamon.",
          "Cook small pancakes in a pan until golden brown.",
          "Serve with honey or fruits!"
        ]
      }
    ];

    for(let i = 0; i < this.specials.length; i++) {
      const imageUrl = await this.imageService.searchImage(this.specials[i].name); 
      this.specials[i].imageUrl = imageUrl; 
    }
    this.lists = [...this.specials]

  }

}
