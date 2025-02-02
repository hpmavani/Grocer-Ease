import google.generativeai as genai
import os
from dotenv import load_dotenv, dotenv_values
import json
import typing_extensions as typing
from PIL import Image
import re
from collections import defaultdict


response_schema = {
    "type": "ARRAY",
    "items": {
        "type": "OBJECT",
        "properties": {
            "recipe_name": {"type": "STRING"},
            "extra_ingredients": {"type": "STRING"},
            "recipe_instructions": {"type": "STRING"},
        },
        "required": ["recipe_name", "extra_ingredients", "recipe_instructions"],
    },
}
    
load_dotenv()
genai.configure(api_key=os.getenv("GEM_API_KEY"))
model = genai.GenerativeModel(model_name="gemini-1.5-flash",
generation_config = {"response_mime_type":"application/json"}
)    

def parse_ingredients(image):
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    prompt = "Parse all the grocery items/ingredients from this grocery store receipt."
    image = Image.open("recipe-finder-backend/image.png")
    response = model.generate_content([image, prompt])
    current_ingredients = response.text
    return current_ingredients
        
def parse_recipe(response): 
    recipe = response["candidates"][0]["content"]["parts"][0]["text"]
    recipe = recipe[2:-2]
    pattern = r'"(\w+)":\s*"([^"]+)"'
    # Extract key-value pairs
    matches = re.findall(pattern, recipe)
    print(len(matches))
    recipe_list = []
    j = 0
    for _ in range(0, 5):
        current_recipe = {}
        for _ in range(0, 3): 
            if j < len(matches):
                current_match = matches[j]
                current_recipe[current_match[0]] = current_match[1]
            j += 1
        recipe_list.append(current_recipe)
    return recipe_list
    
    
        
def get_recipe(image): 
    geminiInput = "(" + parse_ingredients(image)+")"
    geminiInput += "Those were grocery items/ingredients that I bought recently, and the text was parsed from a grocery receipt, so if some words are hard to decipher, try to comprehend them to the best of your ability using the grocery store context. Give me 5 specific recipes that I can make using just the ingredients I bought. The goal is to provide me with recipes that I do not need to buy extra ingredients for, but I do not have to use every ingredient I listed above. If it is not possible to find recipes that I can make using just the ingredients above, then give me recipes that use very few extra ingredients, so that I can make the most of what I already have. Follow a json format in your output. Have a dictionary for each recipe. Each recipe should have key-value pairs: recipe_name (for the recipe’s name only), extra_ingredients (for the extra ingredients required to make the recipe (if any)), and recipe_instructions (for a string containing numbered instructions in great detail). This is an example of a json output that I want, so make sure to use this schema when making the 3 recipe objects: {\"recipe_name\":\"Spicy Garlic Noodles\", \"extra_ingredients\":\"soy sauce, sesame oil\", \"recipe_instructions\":\"1. Cook wheat noodles according to package directions. 2. While noodles cook, mince garlic and ginger. Finely chop chilis (remove seeds for less heat).  3. Heat sesame oil in a wok or large pan over medium heat. Add garlic and ginger, sauté for 1 minute until fragrant. 4. Add chilis and sauté for 30 seconds. 5. Drain noodles and add them to the pan. Toss to coat. 6. Add soy sauce to taste. 7.  Stir in chopped basil. Serve immediately.”}. Do not add anything extra that I did not ask for, follow the json object format clearly using the examples with the recipe name, extra ingredients, and recipe instructions to make the recipe. Try to keep the number of words in the instructions for each recipe between 50-100 words.\""
    response = model.generate_content(geminiInput, generation_config=genai.GenerationConfig(response_mime_type="application/json", response_schema=response_schema))
    recipes = parse_recipe(response.to_dict())
    with open("prompt_response.json", "w") as jf:
        json.dump(recipes, jf)
    return recipes











#itemsBought = {"PUB DICED TOMATOES", "PUBLIX TOM/PASTE", "PF W/G WHEAT BREAD", "PBX FNCY PARM SHRD", "IMPOSS BURG", "BNLS CHICK BREAST" "PUBLIC FF LT VANIL", "LIMES PERSIAN", "PAC BROTH CHCKN LS", "JIF RO FT CREAMY", "PUBLIX GREEN BEANS", "HZ TOMATO KETCHUP", "PEPPERS GREEN BELL", "BELL PEPPERS RED", "ORGANIC CARROTS", "BANANA SHALLOTS"}


#print(response.text)  


  
