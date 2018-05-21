import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  AddIngredient() {
    const ingredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);
    this.shoppingListService.onAddIngredient(ingredient);
  }
}
