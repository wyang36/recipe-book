import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('tomatos', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    onAddIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.getIngredients());
    }

    onAddIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.emit(this.getIngredients());
    }

    ingredientChanged = new EventEmitter<Ingredient[]>();
}