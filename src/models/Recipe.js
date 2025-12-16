/**
 * Recipe Model
 */
export class Recipe {
    constructor({ id = Date.now().toString(), name, ingredients = [], instructions = "", tags = [], allergies = [] }) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.tags = tags;
        this.allergies = allergies;
    }
}
