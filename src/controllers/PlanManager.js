/**
 * PlanManager
 * Handles the logic for generating meal plans.
 */
export class PlanManager {
    constructor(recipeManager) {
        this.recipeManager = recipeManager;
    }

    /**
     * Generates a random plan for a specified number of days.
     * Filters out recipes that contain user's allergies.
     * @param {number} days - Number of days to plan for.
     * @param {Array} userAllergies - List of allergies to avoid.
     */
    generatePlan(days = 7, userAllergies = []) {
        const allRecipes = this.recipeManager.getAllRecipes();

        // Filter recipes safe for user
        const safeRecipes = allRecipes.filter(recipe => {
            // Check if any of the recipe's allergies/tags match the user's allergies
            // We assume recipe.allergies contains things the recipe HAVE (e.g. "Nuts")
            // and userAllergies contains things the user AVOIDS (e.g. "Nuts")
            const hasConflict = recipe.allergies.some(allergen =>
                userAllergies.includes(allergen)
            );
            return !hasConflict;
        });

        if (safeRecipes.length === 0) {
            return {
                success: false,
                message: "No hay recetas disponibles que cumplan con tus restricciones de alergias."
            };
        }

        const plan = [];
        for (let i = 1; i <= days; i++) {
            // Pick a random recipe
            const randomIndex = Math.floor(Math.random() * safeRecipes.length);
            plan.push({
                day: i,
                recipe: safeRecipes[randomIndex]
            });
        }

        return {
            success: true,
            data: plan
        };
    }
}
