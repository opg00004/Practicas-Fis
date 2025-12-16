/**
 * RecipeFormUI
 * View for creating and editing recipes.
 */
export class RecipeFormUI {
    constructor(appManager, recipeToEdit = null) {
        this.appManager = appManager;
        this.recipe = recipeToEdit;
        this.isEdit = !!recipeToEdit;
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
        title.innerText = this.isEdit ? 'Editar Receta' : 'Nueva Receta';

        header.appendChild(backBtn);
        header.appendChild(title);

        // Content
        const content = document.createElement('div');
        content.style.flex = '1';
        content.style.overflowY = 'auto';
        content.style.padding = '20px';

        const form = document.createElement('form');
        form.onsubmit = (e) => this.save(e);

        // Name
        const nameGroup = document.createElement('div');
        nameGroup.className = 'form-group';
        nameGroup.innerHTML = `<label class="form-label">Nombre de la Receta</label>`;
        const nameInput = document.createElement('input');
        nameInput.className = 'form-input';
        nameInput.required = true;
        nameInput.value = this.recipe ? this.recipe.name : '';
        nameGroup.appendChild(nameInput);

        // Ingredients (Textarea for simplicity for now, comma separated)
        const ingGroup = document.createElement('div');
        ingGroup.className = 'form-group';
        ingGroup.innerHTML = `<label class="form-label">Ingredientes (separados por coma)</label>`;
        const ingInput = document.createElement('textarea');
        ingInput.className = 'form-input';
        ingInput.rows = 3;
        ingInput.placeholder = 'Tomate, Lechuga, Cebolla...';
        ingInput.value = this.recipe ? this.recipe.ingredients.join(', ') : '';
        ingGroup.appendChild(ingInput);

        // Instructions
        const instGroup = document.createElement('div');
        instGroup.className = 'form-group';
        instGroup.innerHTML = `<label class="form-label">Instrucciones</label>`;
        const instInput = document.createElement('textarea');
        instInput.className = 'form-input';
        instInput.rows = 5;
        instInput.required = true;
        instInput.value = this.recipe ? this.recipe.instructions : '';
        instGroup.appendChild(instInput);

        // Allergens (New)
        const allergyGroup = document.createElement('div');
        allergyGroup.className = 'form-group';
        allergyGroup.innerHTML = `<label class="form-label">Contiene Alérgenos:</label>`;
        allergyGroup.style.display = 'grid';
        allergyGroup.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
        allergyGroup.style.gap = '10px';

        const commonAllergens = ['Gluten', 'Lácteos', 'Frutos Secos', 'Mariscos', 'Huevo', 'Soja', 'Cacahuetes'];
        const currentAllergies = this.recipe ? (this.recipe.allergies || []) : [];

        commonAllergens.forEach(allergen => {
            const label = document.createElement('label');
            label.style.display = 'flex';
            label.style.alignItems = 'center';
            label.style.gap = '8px';
            label.style.color = 'var(--text-muted)';
            label.style.fontSize = '0.9rem';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'allergens';
            checkbox.value = allergen;
            checkbox.checked = currentAllergies.includes(allergen);
            checkbox.style.accentColor = 'var(--primary)';

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(allergen));
            allergyGroup.appendChild(label);
        });

        // Submit
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn-primary';
        submitBtn.innerText = this.isEdit ? 'Guardar Cambios' : 'Crear Receta';
        submitBtn.style.marginTop = '20px';

        form.appendChild(nameGroup);
        form.appendChild(ingGroup);
        form.appendChild(instGroup);
        form.appendChild(allergyGroup);
        form.appendChild(submitBtn);

        content.appendChild(form);
        container.appendChild(header);
        container.appendChild(content);

        return container;
    }

    save(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input').value; // First input is name
        const textareas = form.querySelectorAll('textarea');
        const ingredients = textareas[0].value.split(',').map(i => i.trim()).filter(i => i);
        const instructions = textareas[1].value;

        // Get checked allergens
        const allergyCheckboxes = form.querySelectorAll('input[name="allergens"]:checked');
        const allergies = Array.from(allergyCheckboxes).map(cb => cb.value);

        const data = { name, ingredients, instructions, tags: [], allergies };

        if (this.isEdit) {
            this.appManager.recipeManager.updateRecipe(this.recipe.id, data);
            alert('Receta actualizada!');
        } else {
            this.appManager.recipeManager.addRecipe(data);
            alert('Receta creada!');
        }

        this.appManager.showMainMenu();
    }
}
