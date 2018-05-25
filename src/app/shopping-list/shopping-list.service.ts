import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

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
        this.ingredientChanged.next(this.getIngredients());
    }

    onAddIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.getIngredients());
    }

    ingredientChanged = new Subject<Ingredient[]>();
}