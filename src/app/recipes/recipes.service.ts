import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipesService {
    recipeChanged=new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Fish and Chips',
            'English classic fish and chips',
            'https://upload.wikimedia.org/wikipedia/commons/5/55/Fish%2C_chips_and_mushy_peas.jpg',
            [new Ingredient('Fish', 1),
            new Ingredient('French Fries', 20)]
        ),
        new Recipe('Burger',
            'Fully loaded burger',
            'https://upload.wikimedia.org/wikipedia/commons/6/65/Jumbo_Burger_The_Home_Chef_India.jpg',
            [new Ingredient('Buns', 2),
            new Ingredient('Meat', 2),
            new Ingredient('Tomato', 1),
            new Ingredient('Cheese', 1)]
        ),
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeByIndex(index: number) {
        return this.recipes[index];
    }

    addToShoppinglist(recipe: Recipe) {
        this.shoppingListService.onAddIngredients(recipe.ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}