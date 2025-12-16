/**
 * PlanUI (CrearPlanComidasUI)
 * Displays the generated meal plan.
 */
export class PlanUI {
    constructor(appManager) {
        this.appManager = appManager;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'glass-panel fade-in';
        container.style.height = '100vh';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';

        // Header
        const header = document.createElement('div');
        header.style.padding = '20px';
        header.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.gap = '15px';

        const backBtn = document.createElement('button');
        backBtn.className = 'btn-secondary';
        backBtn.innerHTML = '<i class="bi bi-arrow-left"></i>';
        backBtn.style.padding = '8px 12px';
        backBtn.onclick = () => this.appManager.showMainMenu();

        const title = document.createElement('h2');
        title.innerText = 'Tu Plan Semanal';

        header.appendChild(backBtn);
        header.appendChild(title);

        // Content
        const content = document.createElement('div');
        content.style.flex = '1';
        content.style.overflowY = 'auto';
        content.style.padding = '20px';

        // Generate Plan Logic
        const userAllergies = this.appManager.currentUser.dietaryPreferences || [];
        const planResult = this.appManager.planManager.generatePlan(7, userAllergies);

        if (!planResult.success) {
            const msg = document.createElement('div');
            msg.style.textAlign = 'center';
            msg.style.padding = '40px';
            msg.innerHTML = `
                <i class="bi bi-emoji-frown" style="font-size: 3rem; color: var(--primary);"></i>
                <p style="margin-top: 20px; font-size: 1.1rem;">${planResult.message}</p>
                <button class="btn-primary" style="margin-top: 20px;">Crear Nuevas Recetas</button>
            `;
            const btn = msg.querySelector('button');
            btn.onclick = () => this.appManager.showCreateRecipe();
            content.appendChild(msg);
        } else {
            // Check allergies warning
            if (userAllergies.length > 0) {
                const warning = document.createElement('div');
                warning.style.background = 'rgba(78, 205, 196, 0.1)';
                warning.style.border = '1px solid var(--secondary)';
                warning.style.borderRadius = 'var(--radius-sm)';
                warning.style.padding = '10px';
                warning.style.marginBottom = '20px';
                warning.style.fontSize = '0.9rem';
                warning.innerHTML = `<i class="bi bi-check-circle-fill" style="margin-right: 8px;"></i> Filtrado por tus alergias: <strong>${userAllergies.join(', ')}</strong>`;
                content.appendChild(warning);
            }

            // Timeline
            planResult.data.forEach(item => {
                const dayCard = document.createElement('div');
                dayCard.style.display = 'flex';
                dayCard.style.gap = '15px';
                dayCard.style.marginBottom = '20px';
                dayCard.className = 'fade-in';
                // Stagger animations
                dayCard.style.animationDelay = `${item.day * 0.1}s`;

                const dateBox = document.createElement('div');
                dateBox.style.background = 'var(--gradient-main)';
                dateBox.style.width = '60px';
                dateBox.style.borderRadius = 'var(--radius-md)';
                dateBox.style.display = 'flex';
                dateBox.style.flexDirection = 'column';
                dateBox.style.alignItems = 'center';
                dateBox.style.justifyContent = 'center';
                dateBox.style.flexShrink = '0';

                dateBox.innerHTML = `
                    <span style="font-size: 0.8rem; opacity: 0.8">DÍA</span>
                    <span style="font-weight: 700; font-size: 1.5rem">${item.day}</span>
                `;

                const recipeCard = document.createElement('div');
                recipeCard.className = 'glass-panel';
                recipeCard.style.flex = '1';
                recipeCard.style.padding = '15px';
                recipeCard.style.borderRadius = 'var(--radius-md)';
                recipeCard.style.border = '1px solid rgba(255,255,255,0.05)';
                recipeCard.style.cursor = 'pointer';
                recipeCard.onclick = () => this.appManager.showEditRecipe(item.recipe); // Or show details

                recipeCard.innerHTML = `
                    <h3 style="margin-bottom: 5px; font-size: 1.1rem">${item.recipe.name}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">${item.recipe.ingredients.slice(0, 3).join(', ')}...</p>
                `;

                dayCard.appendChild(dateBox);
                dayCard.appendChild(recipeCard);
                content.appendChild(dayCard);
            });
        }

        container.appendChild(header);
        container.appendChild(content);

        return container;
    }
}
