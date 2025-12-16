/**
 * RecipeListUI
 * View for searching and listing recipes.
 */
export class RecipeListUI {
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
        title.innerText = 'Buscar Recetas';

        header.appendChild(backBtn);
        header.appendChild(title);

        // Search Bar
        const searchContainer = document.createElement('div');
        searchContainer.style.padding = '20px';
        const searchInput = document.createElement('input');
        searchInput.className = 'form-input';
        searchInput.placeholder = 'Buscar por nombre o ingrediente...';
        searchInput.onkeyup = (e) => this.filterRecipes(e.target.value, listContainer);
        searchContainer.appendChild(searchInput);

        // List
        const listContainer = document.createElement('div');
        listContainer.style.flex = '1';
        listContainer.style.overflowY = 'auto';
        listContainer.style.padding = '0 20px 20px 20px';

        // Initial load
        this.filterRecipes('', listContainer);

        container.appendChild(header);
        container.appendChild(searchContainer);
        container.appendChild(listContainer);

        return container;
    }

    filterRecipes(query, container) {
        container.innerHTML = '';
        const recipes = this.appManager.recipeManager.searchRecipes(query);

        if (recipes.length === 0) {
            container.innerHTML = '<p style="text-align:center; color: var(--text-muted); margin-top: 20px;">No se encontraron recetas.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.style.background = 'rgba(255,255,255,0.05)';
            card.style.padding = '15px';
            card.style.borderRadius = 'var(--radius-sm)';
            card.style.marginBottom = '10px';
            card.style.cursor = 'pointer';
            card.style.transition = 'background 0.2s';

            card.onmouseover = () => card.style.background = 'rgba(255,255,255,0.1)';
            card.onmouseout = () => card.style.background = 'rgba(255,255,255,0.05)';
            card.onclick = () => this.appManager.showEditRecipe(recipe);

            const rName = document.createElement('h3');
            rName.innerText = recipe.name;
            rName.style.fontSize = '1.1rem';

            const rIng = document.createElement('p');
            rIng.innerText = `${recipe.ingredients.length} Ingredientes`;
            rIng.style.fontSize = '0.9rem';
            rIng.style.color = 'var(--text-muted)';

            card.appendChild(rName);
            card.appendChild(rIng);
            container.appendChild(card);
        });
    }
}
