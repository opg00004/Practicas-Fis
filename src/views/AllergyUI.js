/**
 * AllergyUI (CategorizarAlergiaUI)
 * Allows users to define their dietary restrictions (allergies).
 */
export class AllergyUI {
    constructor(appManager) {
        this.appManager = appManager;
        this.commonAllergens = ['Gluten', 'Lácteos', 'Frutos Secos', 'Mariscos', 'Huevo', 'Soja', 'Cacahuetes'];
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
        title.innerText = 'Mis Alergias';

        header.appendChild(backBtn);
        header.appendChild(title);

        // Content
        const content = document.createElement('div');
        content.style.padding = '20px';
        content.style.flex = '1';

        const desc = document.createElement('p');
        desc.innerText = 'Selecciona tus alergias o intolerancias. Evitaremos recetas que contengan estos ingredientes al crear tu plan.';
        desc.style.marginBottom = '20px';
        desc.style.color = 'var(--text-muted)';
        content.appendChild(desc);

        const form = document.createElement('form');
        form.style.display = 'grid';
        form.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
        form.style.gap = '15px';

        const currentAllergies = this.appManager.currentUser.dietaryPreferences || [];

        this.commonAllergens.forEach(allergen => {
            const label = document.createElement('label');
            label.className = 'glass-panel';
            label.style.padding = '15px';
            label.style.display = 'flex';
            label.style.alignItems = 'center';
            label.style.gap = '10px';
            label.style.cursor = 'pointer';
            label.style.border = '1px solid rgba(255,255,255,0.1)';
            label.style.borderRadius = 'var(--radius-sm)';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = allergen;
            checkbox.checked = currentAllergies.includes(allergen);
            checkbox.style.width = '20px';
            checkbox.style.height = '20px';
            checkbox.style.accentColor = 'var(--primary)';

            const text = document.createElement('span');
            text.innerText = allergen;

            label.appendChild(checkbox);
            label.appendChild(text);
            form.appendChild(label);
        });

        // Save Button
        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.className = 'btn-primary';
        saveBtn.innerText = 'Guardar Preferencias';
        saveBtn.style.marginTop = '30px';
        saveBtn.style.width = '100%';
        saveBtn.onclick = () => this.savePreferences(form);

        content.appendChild(form);
        content.appendChild(saveBtn);
        container.appendChild(header);
        container.appendChild(content);

        return container;
    }

    savePreferences(form) {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Update User
        this.appManager.currentUser.dietaryPreferences = selected;
        // Persist change
        const users = this.appManager.authManager.login(this.appManager.currentUser.username, this.appManager.currentUser.password); // Hack to re-get/save user logic, but better to do it explicit

        // Explicit save
        const allUsers = this.appManager.authManager.getUsers();
        const userIndex = allUsers.findIndex(u => u.username === this.appManager.currentUser.username);
        if (userIndex !== -1) {
            allUsers[userIndex] = this.appManager.currentUser;
            this.appManager.authManager.saveUsers(allUsers);
        }

        // Update Local Session
        localStorage.setItem('currentUser', JSON.stringify(this.appManager.currentUser));

        alert('Preferencias guardadas correctamente.');
        this.appManager.showMainMenu();
    }
}
