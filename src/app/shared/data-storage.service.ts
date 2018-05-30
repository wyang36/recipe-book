import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { map } from 'rxjs/operators';
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipesService, private shoppingListService: ShoppingListService, private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put('https://recipe-book-cccae.firebaseio.com/recipes.json?auth=' + token,
            this.recipeService.getRecipes())
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.http.get('https://recipe-book-cccae.firebaseio.com/recipes.json?auth=' + token)
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

    storeShoppingList() {
        const token = this.authService.getToken();

        return this.http.put('https://recipe-book-cccae.firebaseio.com/shoppingList.json?auth=' + token,
            this.shoppingListService.getIngredients())
    }

    getShoppingList() {
        const token = this.authService.getToken();

        this.http.get('https://recipe-book-cccae.firebaseio.com/shoppingList.json?auth=' + token)
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.shoppingListService.setIngredients(ingredients);
                }
            )
    }
}