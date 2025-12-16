import { StorageService } from '../services/StorageService.js';
import { AuthManager } from './AuthManager.js';
import { RecipeManager } from './RecipeManager.js';
import { PlanManager } from './PlanManager.js';
import { AuthUI } from '../views/AuthUI.js';
import { MainMenuUI } from '../views/MainMenuUI.js';
import { RecipeFormUI } from '../views/RecipeFormUI.js';
import { RecipeListUI } from '../views/RecipeListUI.js';
import { PlanUI } from '../views/PlanUI.js';
import { AllergyUI } from '../views/AllergyUI.js';

/**
 * AppManager (GestorAplicacion)
 * Orchestrates the application flow and manages global state.
 */
export class AppManager {
    constructor() {
        this.currentUser = null;
        this.container = document.getElementById('app');

        // Initialize Sub-Managers
        this.authManager = new AuthManager(this);
        this.recipeManager = new RecipeManager();
        this.planManager = new PlanManager(this.recipeManager);
    }

    init() {
        console.log("App Initialized");
        this.checkSession();
    }

    checkSession() {
        const savedUser = StorageService.get('currentUser');
        if (savedUser) {
            this.currentUser = savedUser;
            this.showMainMenu();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        // Clear container
        this.updateView(new AuthUI(this.authManager).render());
    }

    showMainMenu() {
        this.updateView(new MainMenuUI(this).render());
    }

    showCreateRecipe() {
        this.updateView(new RecipeFormUI(this).render());
    }

    showEditRecipe(recipe) {
        this.updateView(new RecipeFormUI(this, recipe).render());
    }

    showSearchRecipe() {
        this.updateView(new RecipeListUI(this).render());
    }

    // Future Implementations Stubs
    showCreatePlan() {
        this.updateView(new PlanUI(this).render());
    }

    showAllergies() {
        this.updateView(new AllergyUI(this).render());
    }

    logout() {
        this.currentUser = null;
        StorageService.remove('currentUser');
        this.showLogin();
    }

    // Global Helper to redraw
    updateView(viewElement) {
        this.container.innerHTML = '';
        this.container.appendChild(viewElement);
    }
}
