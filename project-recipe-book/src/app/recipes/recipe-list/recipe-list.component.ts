import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'This is test 1', 'http://images.media-allrecipes.com/userphotos/250x250/1330843.jpg'),
    new Recipe('Test Recipe 2', 'This is test 2', 'http://images.media-allrecipes.com/userphotos/250x250/1330843.jpg'),
    new Recipe('Test Recipe 3', 'This is test 3', 'http://images.media-allrecipes.com/userphotos/250x250/1330843.jpg'),
    new Recipe('Test Recipe 4', 'This is test 4', 'http://images.media-allrecipes.com/userphotos/250x250/1330843.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
