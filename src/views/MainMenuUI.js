/**
 * MainMenuUI
 * The main dashboard of the application.
 */
export class MainMenuUI {
    constructor(appManager) {
        this.appManager = appManager;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'glass-panel fade-in';
        container.style.flex = '1';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.padding = '20px';
        container.style.margin = '10px';
        container.style.borderRadius = 'var(--radius-lg)';

        // Header
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '30px';

        const title = document.createElement('h2');
        title.innerText = `Hola, ${this.appManager.currentUser.username}`;
        title.style.margin = '0';

        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn-secondary';
        logoutBtn.style.padding = '8px 16px';
        logoutBtn.innerText = 'Salir';
        logoutBtn.onclick = () => this.appManager.logout();

        header.appendChild(title);
        header.appendChild(logoutBtn);

        // Menu Grid
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
        grid.style.gap = '15px';
        grid.style.flex = '1';

        // Helper to create menu items
        const createMenuItem = (icon, text, onClick, color = 'var(--primary)') => {
            const btn = document.createElement('button');
            btn.className = 'glass-panel';
            btn.style.border = '1px solid rgba(255,255,255,0.1)';
            btn.style.padding = '20px';
            btn.style.borderRadius = 'var(--radius-md)';
            btn.style.display = 'flex';
            btn.style.flexDirection = 'column';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.gap = '10px';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'transform 0.2s';
            btn.style.color = 'white';
            btn.style.background = 'rgba(255,255,255,0.03)';

            btn.onmouseover = () => btn.style.transform = 'translateY(-5px)';
            btn.onmouseout = () => btn.style.transform = 'translateY(0)';
            btn.onclick = onClick;

            const i = document.createElement('i');
            i.className = `bi ${icon}`;
            i.style.fontSize = '2rem';
            i.style.color = color;

            const span = document.createElement('span');
            span.innerText = text;
            span.style.fontWeight = '600';

            btn.appendChild(i);
            btn.appendChild(span);
            return btn;
        };

        grid.appendChild(createMenuItem('bi-plus-circle', 'Crear Receta', () => this.appManager.showCreateRecipe(), '#FF6B6B'));
        grid.appendChild(createMenuItem('bi-search', 'Buscar Receta', () => this.appManager.showSearchRecipe(), '#4ECDC4'));
        grid.appendChild(createMenuItem('bi-calendar-week', 'Plan Comidas', () => this.appManager.showCreatePlan(), '#FFE66D'));
        grid.appendChild(createMenuItem('bi-exclamation-triangle', 'Alergias', () => this.appManager.showAllergies(), '#FF8E53'));
        // grid.appendChild(createMenuItem('bi-list-ul', 'Editar Receta', () => this.appManager.showSearchRecipe())); // Included in Search/View

        container.appendChild(header);
        container.appendChild(grid);

        return container;
    }
}
