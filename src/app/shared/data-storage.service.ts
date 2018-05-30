import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipesService) { }

    storeRecipes() {
        return this.http.put('https://recipe-book-cccae.firebaseio.com/recipes.json',
            this.recipeService.getRecipes())
    }

    getRecipes() {
        this.http.get('https://recipe-book-cccae.firebaseio.com/recipes.json')
            .pipe(map((recipes: Recipe[]) => {
                return recipes.map((recipe) => {
                    if (!recipe.ingredients) {
                        console.log(recipe);
                        recipe.ingredients = [];
                    }
                    return recipe;
                })
            }))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
    }
}