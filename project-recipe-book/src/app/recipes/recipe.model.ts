/* how should a recipe look?
 * We'll use a vanilla TypeScript class to define our Model.
 * A model is a blueprint for objects that we create.
 * Classes can be instantiated, so we can create new objects based
 * on the setup we provide here.
*/
export class Recipe {

  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, desc: string, imagePath: string) {

    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;

  }

}
