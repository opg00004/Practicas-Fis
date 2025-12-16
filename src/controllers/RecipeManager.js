import { StorageService } from '../services/StorageService.js';
import { Recipe } from '../models/Recipe.js';

/**
 * RecipeManager
 * Handles creation, searching, editing, and deletion of recipes.
 */
export class RecipeManager {
    constructor() {
        this.recipes = this.loadRecipes();
    }

    loadRecipes() {
        const data = StorageService.get('recipes', []);
        return data.map(r => new Recipe(r));
    }

    saveRecipes() {
        StorageService.save('recipes', this.recipes);
    }

    addRecipe(recipeData) {
        const newRecipe = new Recipe(recipeData);
        this.recipes.push(newRecipe);
        this.saveRecipes();
        return newRecipe;
    }

    updateRecipe(id, recipeData) {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
            this.recipes[index] = new Recipe({ ...this.recipes[index], ...recipeData, id });
            this.saveRecipes();
            return true;
        }
        return false;
    }

    deleteRecipe(id) {
        this.recipes = this.recipes.filter(r => r.id !== id);
        this.saveRecipes();
    }

    getRecipe(id) {
        return this.recipes.find(r => r.id === id);
    }

    getAllRecipes() {
        return this.recipes;
    }

    searchRecipes(query) {
        const term = query.toLowerCase();
        return this.recipes.filter(r =>
            r.name.toLowerCase().includes(term) ||
            r.ingredients.some(i => i.toLowerCase().includes(term))
        );
    }

    // Alergias Logic
    addAllergy(recipeId, allergy) {
        const recipe = this.getRecipe(recipeId);
        if (recipe) {
            if (!recipe.allergies.includes(allergy)) {
                recipe.allergies.push(allergy);
                this.updateRecipe(recipeId, recipe);
            }
            return true;
        }
        return false;
    }
}
