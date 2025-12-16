/**
 * GOURMET PLANNER / YantaConSeso - BUNDLE
 * Combined file to support file:// protocol execution without a server.
 */

// ==========================================
// SERVICES
// ==========================================

class StorageService {
    static get(key, fallback = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (e) {
            console.error(`Error loading ${key} from storage:`, e);
            return fallback;
        }
    }

    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error(`Error saving ${key} to storage:`, e);
            return false;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}

// ==========================================
// MODELS
// ==========================================

class User {
    constructor({ username, password, dietaryPreferences = [] }) {
        this.username = username;
        this.password = password;
        this.dietaryPreferences = dietaryPreferences;
    }

    static validate(username, password) {
        if (!username || username.length < 3) return { valid: false, message: "Username too short" };
        if (!password || password.length < 4) return { valid: false, message: "Password too short" };
        return { valid: true };
    }
}

class Recipe {
    constructor({ id = Date.now().toString(), name, ingredients = [], instructions = "", tags = [], allergies = [], image = "" }) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.tags = tags;
        this.allergies = allergies;
        this.image = image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60';
    }
}

// ==========================================
// SEED DATA
// ==========================================

const SeedData = [
    {
        id: 'receta_1',
        name: 'Lasaña Clásica de Carne',
        ingredients: ['Pasta de Lasaña', 'Carne Picada', 'Salsa de Tomate', 'Queso Mozzarella', 'Bechamel', 'Cebolla'],
        instructions: '1. Sofreír la carne con cebolla.\n2. Montar capas de pasta, carne y bechamel.\n3. Cubrir con queso.\n4. Hornear 40min a 180ºC.',
        tags: ['Italiana', 'Cena'],
        allergies: ['Gluten', 'Lácteos'],
        image: 'https://plus.unsplash.com/premium_photo-1671547330493-274bb998dd15?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_2',
        name: 'Ensalada César con Pollo',
        ingredients: ['Lechuga Romana', 'Pechuga de Pollo', 'Picatostes', 'Queso Parmesano', 'Salsa César'],
        instructions: '1. Asar el pollo y trocear.\n2. Lavar lechuga.\n3. Mezclar todo en un bol con la salsa.',
        tags: ['Saludable', 'Rápida'],
        allergies: ['Gluten', 'Lácteos', 'Huevo'],
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_3',
        name: 'Tacos al Pastor',
        ingredients: ['Tortillas de Maíz', 'Carne de Cerdo Adobada', 'Piña', 'Cebolla', 'Cilantro', 'Salsa Picante'],
        instructions: '1. Marinar cerdo con achiote y especias.\n2. Asar la carne.\n3. Calentar tortillas.\n4. Servir con piña, cilantro y salsa.',
        tags: ['Mexicana', 'Cena'],
        allergies: ['Gluten', 'Cerdo'],
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_4',
        name: 'Risotto de Setas',
        ingredients: ['Arroz Arboreo', 'Setas Variadas', 'Caldo de Verduras', 'Mantequilla', 'Parmesano', 'Vino Blanco'],
        instructions: '1. Sofreír setas.\n2. Añadir arroz y vino.\n3. Añadir caldo poco a poco removiendo.\n4. Mantecar con queso y mantequilla.',
        tags: ['Italiana', 'Vegetariana'],
        allergies: ['Lácteos'],
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_5',
        name: 'Curry de Garbanzos Vegano',
        ingredients: ['Garbanzos', 'Leche de Coco', 'Curry en Polvo', 'Espinacas', 'Arroz Basmati'],
        instructions: '1. Saltear especias.\n2. Añadir garbanzos y leche de coco.\n3. Cocinar 15min.\n4. Servir con arroz.',
        tags: ['Vegana', 'India'],
        allergies: [],
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_6',
        name: 'Hamburguesa Gourmet',
        ingredients: ['Carne de Vacuno', 'Pan Brioche', 'Queso Cheddar', 'Cebolla Caramelizada', 'Bacon'],
        instructions: '1. Cocinar carne al punto.\n2. Tostar pan.\n3. Montar con queso fundido y bacon crujiente.',
        tags: ['Americana', 'Cena'],
        allergies: ['Gluten', 'Lácteos'],
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_7',
        name: 'Sushi Variado',
        ingredients: ['Arroz Sushi', 'Alga Nori', 'Salmón', 'Aguacate', 'Pepinillo'],
        instructions: '1. Cocinar arroz con vinagre.\n2. Extender en nori.\n3. Añadir relleno y enrollar.',
        tags: ['Japonesa', 'Pescado'],
        allergies: ['Pescado'],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_8',
        name: 'Tortitas con Frutas',
        ingredients: ['Harina', 'Leche', 'Huevo', 'Fresas', 'Sirope de Arce'],
        instructions: '1. Mezclar masa.\n2. Hacer tortitas en sartén.\n3. Servir con fruta y sirope.',
        tags: ['Desayuno', 'Dulce'],
        allergies: ['Gluten', 'Lácteos', 'Huevo'],
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_9',
        name: 'Pizza Margarita',
        ingredients: ['Masa de Pizza', 'Salsa de Tomate', 'Mozzarella Fresca', 'Albahaca'],
        instructions: '1. Estirar masa.\n2. Añadir tomate y queso.\n3. Hornear a máxima temp.\n4. Añadir albahaca fresca.',
        tags: ['Italiana', 'Cena'],
        allergies: ['Gluten', 'Lácteos'],
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_10',
        name: 'Pasta Carbonara',
        ingredients: ['Espaguetis', 'Yemas de Huevo', 'Queso Pecorino', 'Guanciale (o Panceta)', 'Pimienta Negra'],
        instructions: '1. Dorar guanciale.\n2. Cocer pasta.\n3. Mezclar yemas y queso.\n4. Unir todo fuera del fuego con agua de cocción.',
        tags: ['Italiana', 'Rápida'],
        allergies: ['Gluten', 'Huevo', 'Lácteos'],
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_11',
        name: 'Gazpacho Andaluz',
        ingredients: ['Tomate Pera', 'Pimiento Verde', 'Pepino', 'Diente de Ajo', 'Aceite de Oliva', 'Vinagre', 'Pan (Opcional)'],
        instructions: '1. Lavar verduras y trocear.\n2. Triturar todo muy fino.\n3. Añadir aceite y vinagre.\n4. Colar y servir muy frío.',
        tags: ['Andaluza', 'Verano'],
        allergies: ['Gluten'],
        image: 'https://images.unsplash.com/photo-1598511797337-1d547d519d1f?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_12',
        name: 'Salmorejo Cordobés',
        ingredients: ['Tomate', 'Pan de Telera', 'Aceite de Oliva', 'Ajo', 'Huevo Duro', 'Jamón Serrano'],
        instructions: '1. Triturar tomate con ajo.\n2. Añadir pan y triturar.\n3. Emulsionar con aceite.\n4. Decorar con huevo y jamón.',
        tags: ['Andaluza', 'Sopa Fría'],
        allergies: ['Gluten', 'Huevo'],
        image: 'https://images.unsplash.com/photo-1621532570081-37f26d2d3a9d?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_13',
        name: 'Flamenquín Cordobés',
        ingredients: ['Lomo de Cerdo', 'Jamón Serrano', 'Queso', 'Huevo', 'Pan Rallado', 'Aceite'],
        instructions: '1. Aplanar filetes de lomo.\n2. Rellenar con jamón y queso.\n3. Enrollar y empanar.\n4. Freír hasta dorar.',
        tags: ['Andaluza', 'Carne'],
        allergies: ['Gluten', 'Lácteos', 'Huevo', 'Cerdo'],
        image: 'https://images.unsplash.com/photo-1594911776950-c6d98a09b307?auto=format&fit=crop&w=500&q=60' // Placeholder for fried roll
    },
    {
        id: 'receta_14',
        name: 'Espinacas con Garbanzos',
        ingredients: ['Espinacas', 'Garbanzos Cocidos', 'Pan Frito', 'Ajo', 'Comino', 'Pimentón'],
        instructions: '1. Cocer espinacas.\n2. Majar ajo, pan frito y especias.\n3. Sofreír todo junto con los garbanzos.',
        tags: ['Andaluza', 'Guiso'],
        allergies: ['Gluten'],
        image: 'https://images.unsplash.com/photo-1506505706240-a392e21b069d?auto=format&fit=crop&w=500&q=60' // General vegan stew
    },
    {
        id: 'receta_15',
        name: 'Gambas al Ajillo',
        ingredients: ['Gambas', 'Ajo Laminado', 'Guindilla', 'Aceite de Oliva', 'Perejil'],
        instructions: '1. Calentar aceite con ajo y guindilla.\n2. Añadir gambas (cuidado salpica).\n3. Cocinar 2 min y servir en cazuela.',
        tags: ['Andaluza', 'Tapa'],
        allergies: ['Mariscos'],
        image: 'https://images.unsplash.com/photo-1625943555419-56a2cb596640?auto=format&fit=crop&w=500&q=60' // Shrimp
    },
    {
        id: 'receta_11',
        name: 'Gambas al Ajillo (Huelva)',
        ingredients: ['Gambas Blancas', 'Ajo', 'Guindilla', 'Aceite de Oliva', 'Perejil'],
        instructions: '1. Calentar aceite con ajo láminado y guindilla.\n2. Añadir gambas y cocinar 1-2 min.\n3. Servir hirviendo en cazuela de barro.',
        tags: ['Andaluza', 'Huelva', 'Tapa'],
        allergies: ['Mariscos'],
        image: 'https://images.unsplash.com/photo-1625943555419-56a2cb596640?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_12',
        name: 'Tortillitas de Camarones (Cádiz)',
        ingredients: ['Camarones', 'Harina de Trigo', 'Harina de Garbanzo', 'Cebolleta', 'Perejil', 'Agua muy fría'],
        instructions: '1. Mezclar harinas, cebolleta, perejil y camarones.\n2. Añadir agua fría hasta obtener masa líquida.\n3. Freír cucharadas en aceite muy caliente hasta que queden como encaje.',
        tags: ['Andaluza', 'Cádiz', 'Fritura'],
        allergies: ['Gluten', 'Mariscos'],
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60' // General fried seafood
    },
    {
        id: 'receta_13',
        name: 'Huevos a la Flamenca (Sevilla)',
        ingredients: ['Huevos', 'Tomate Frito', 'Guisantes', 'Chorizo', 'Jamón Serrano', 'Pimiento Morrón', 'Patatas'],
        instructions: '1. Freír patatas en dados.\n2. En cazuela de barro, poner tomate, guisantes, patatas y embutidos.\n3. Cascar huevos encima.\n4. Hornear hasta que cuaje la clara.',
        tags: ['Andaluza', 'Sevilla', 'Cena'],
        allergies: ['Huevo'],
        image: 'https://images.unsplash.com/photo-1525351440155-ad29119bcd81?auto=format&fit=crop&w=500&q=60' // Eggs in pan
    },
    {
        id: 'receta_14',
        name: 'Salmorejo Cordobés (Córdoba)',
        ingredients: ['Tomate Rojo', 'Pan de Telera', 'Aceite de Oliva virgen extra', 'Ajo', 'Huevo Duro', 'Jamón'],
        instructions: '1. Triturar tomates y ajo.\n2. Añadir pan y triturar más.\n3. Emulsionar con aceite poco a poco.\n4. Decorar con huevo picado y jamón.',
        tags: ['Andaluza', 'Córdoba', 'Sopa Fría'],
        allergies: ['Gluten', 'Huevo'],
        image: 'https://images.unsplash.com/photo-1621532570081-37f26d2d3a9d?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'receta_15',
        name: 'Ajoblanco (Málaga)',
        ingredients: ['Almendras Crudas', 'Pan Duro', 'Ajo', 'Aceite de Oliva', 'Vinagre', 'Uvas o Melón'],
        instructions: '1. Remojar el pan.\n2. Triturar almendras con ajo y sal.\n3. Añadir el pan y aceite.\n4. Servir muy frío con uvas y un chorrito de aceite.',
        tags: ['Andaluza', 'Málaga', 'Sopa Fría'],
        allergies: ['Gluten', 'Frutos Secos'],
        image: 'https://images.unsplash.com/photo-1601344447330-8a2b25134700?auto=format&fit=crop&w=500&q=60' // White soup
    },
    {
        id: 'receta_16',
        name: 'Remojón Granadino (Granada)',
        ingredients: ['Naranjas', 'Bacalao Desalado', 'Cebolleta', 'Aceitunas Negras', 'Huevo Duro', 'Aceite de Oliva'],
        instructions: '1. Asar el bacalao o usar crudo desalado.\n2. Pelar y trocear naranjas.\n3. Mezclar con bacalao desmigado, cebolleta y aceitunas.\n4. Aliñar con abundante aceite.',
        tags: ['Andaluza', 'Granada', 'Ensalada'],
        allergies: ['Pescado', 'Huevo'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' // Salad
    },
    {
        id: 'receta_17',
        name: 'Pipirrana (Jaén)',
        ingredients: ['Tomate', 'Pimiento Verde', 'Pepino', 'Atún', 'Huevo Duro', 'Aceite', 'Comino'],
        instructions: '1. Picar verduras en dados muy pequeños.\n2. Añadir atún y huevo picado.\n3. Aliñar con emulsión de aceite, sal y comino.\n4. Comer con pan.',
        tags: ['Andaluza', 'Jaén', 'Ensalada'],
        allergies: ['Huevo', 'Pescado'],
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=60' // Fresh salad
    }
];

function initializeSeedData() {
    // 1. Initial Fresh Install Check (Only runs once ever)
    const isInitialized = StorageService.get('app_initialized', false);

    if (!isInitialized) {
        console.log("Fresh Install: Seeding initial data...");
        StorageService.save('recipes', SeedData);
        StorageService.save('app_initialized', true);
        StorageService.save('migration_andalusia_v3', true); // Mark future migrations as done for fresh install
        return;
    }

    // 2. Andalusian Migration (One-time run for existing users)
    const migrationApplied = StorageService.get('migration_andalusia_v3', false);

    if (!migrationApplied) {
        console.log("Running Andalusian Migration...");
        const existing = StorageService.get('recipes', []);

        // Force update/inject IDs 11-17 from SeedData (The 7 Provincial Recipes)
        const newRecipes = SeedData.filter(r => {
            const parts = r.id.split('_');
            if (parts.length < 2) return false;
            const idNum = parseInt(parts[1]);
            return idNum >= 11 && idNum <= 17;
        });

        let updatedCount = 0;
        newRecipes.forEach(newR => {
            const index = existing.findIndex(r => r.id === newR.id);
            if (index !== -1) {
                existing[index] = newR; // Overwrite to ensure correct data
            } else {
                existing.push(newR); // Inject if missing
            }
            updatedCount++;
        });

        if (updatedCount > 0) {
            StorageService.save('recipes', existing);
            console.log(`Migrated ${updatedCount} Andalusian recipes.`);
        }

        StorageService.save('migration_andalusia_v3', true);
    }
}

// ==========================================
// CONTROLLERS
// ==========================================

class AuthManager {
    constructor(appManager) {
        this.appManager = appManager;
    }

    login(username, password) {
        const users = StorageService.get('users', []);
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            this.appManager.currentUser = user;
            StorageService.save('currentUser', user);
            this.appManager.showMainMenu();
            return { success: true };
        } else {
            return { success: false, message: "Usuario o contraseña incorrectos" };
        }
    }

    register(username, password) {
        const validation = User.validate(username, password);
        if (!validation.valid) return { success: false, message: validation.message };

        const users = StorageService.get('users', []);
        if (users.find(u => u.username === username)) {
            return { success: false, message: "El usuario ya existe" };
        }

        const newUser = new User({ username, password });
        users.push(newUser);
        StorageService.save('users', users);

        // Auto login after register
        this.login(username, password);
        return { success: true };
    }

    getUsers() {
        return StorageService.get('users', []);
    }

    saveUsers(users) {
        StorageService.save('users', users);
    }
}

class RecipeManager {
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
}

class PlanManager {
    constructor(recipeManager) {
        this.recipeManager = recipeManager;
    }

    generatePlan(days = 7, userAllergies = []) {
        const allRecipes = this.recipeManager.getAllRecipes();

        // Filter recipes safe for user
        const safeRecipes = allRecipes.filter(recipe => {
            const hasConflict = recipe.allergies && recipe.allergies.some(allergen =>
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

        let available = [...safeRecipes];
        const plan = [];

        for (let i = 1; i <= days; i++) {
            if (available.length === 0) {
                // Refill if we run out of unique recipes
                available = [...safeRecipes];
            }

            const randomIndex = Math.floor(Math.random() * available.length);
            const recipe = available.splice(randomIndex, 1)[0];

            plan.push({
                day: i,
                recipe: recipe
            });
        }

        return {
            success: true,
            data: plan
        };
    }
    savePlan(plan, name) {
        if (!name) {
            // Saving current working plan (auto-save)
            StorageService.save('currentPlan', plan);
            return;
        }

        const savedPlans = StorageService.get('savedPlans', []);
        const existingIndex = savedPlans.findIndex(p => p.name === name);
        const planObj = { name, date: new Date().toISOString(), plan };

        if (existingIndex !== -1) {
            savedPlans[existingIndex] = planObj;
        } else {
            savedPlans.push(planObj);
        }

        StorageService.save('savedPlans', savedPlans);
        // Also update current
        StorageService.save('currentPlan', plan);
    }

    loadPlan() {
        return StorageService.get('currentPlan', null);
    }

    getSavedPlans() {
        return StorageService.get('savedPlans', []);
    }

    deleteSavedPlan(name) {
        let savedPlans = StorageService.get('savedPlans', []);
        savedPlans = savedPlans.filter(p => p.name !== name);
        StorageService.save('savedPlans', savedPlans);
    }

    replaceRecipe(dayIndex, currentPlan, newRecipe) {
        const newPlan = [...currentPlan];
        newPlan[dayIndex] = { ...newPlan[dayIndex], recipe: newRecipe };
        StorageService.save('currentPlan', newPlan);
        return newPlan;
    }

    swapRecipe(dayIndex, currentPlan, userAllergies = []) {
        // dayIndex is 0-based index in the plan array
        const allRecipes = this.recipeManager.getAllRecipes();
        const safeRecipes = allRecipes.filter(recipe => {
            const hasConflict = recipe.allergies && recipe.allergies.some(allergen =>
                userAllergies.includes(allergen)
            );
            return !hasConflict;
        });

        if (safeRecipes.length === 0) return currentPlan;

        // Try to find a recipe not already in the plan
        const usedIds = currentPlan.map(p => p.recipe.id);
        const candidates = safeRecipes.filter(r => !usedIds.includes(r.id));

        const pool = candidates.length > 0 ? candidates : safeRecipes;
        const randomRecipe = pool[Math.floor(Math.random() * pool.length)];

        // Create new plan array (immutability)
        const newPlan = [...currentPlan];
        newPlan[dayIndex] = { ...newPlan[dayIndex], recipe: randomRecipe };

        return newPlan;
    }
}

// ==========================================
// VIEWS
// ==========================================

class AuthUI {
    constructor(authManager) {
        this.authManager = authManager;
        this.isLoginMode = true;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'glass-panel fade-in';
        container.style.margin = '2rem';
        container.style.padding = '2rem';
        container.style.borderRadius = 'var(--radius-lg)';

        // Header
        const header = document.createElement('div');
        header.style.textAlign = 'center';
        header.style.marginBottom = '2rem';

        const title = document.createElement('h2');
        title.innerText = this.isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta';
        title.style.marginBottom = '0.5rem';

        const subtitle = document.createElement('p');
        subtitle.innerText = this.isLoginMode
            ? 'Bienvenido de nuevo a tu cocina digital'
            : 'Únete a YantaConSeso hoy';
        subtitle.style.color = 'var(--text-muted)';

        header.appendChild(title);
        header.appendChild(subtitle);

        // Form
        const form = document.createElement('form');
        form.onsubmit = (e) => this.handleSubmit(e);

        // Username Input
        const userGroup = document.createElement('div');
        userGroup.className = 'form-group';
        const userLabel = document.createElement('label');
        userLabel.className = 'form-label';
        userLabel.innerText = 'Usuario';
        const userInput = document.createElement('input');
        userInput.className = 'form-input';
        userInput.type = 'text';
        userInput.name = 'username';
        userInput.placeholder = 'Ej: chef_oscar';
        userInput.required = true;

        userGroup.appendChild(userLabel);
        userGroup.appendChild(userInput);

        // Password Input
        const passGroup = document.createElement('div');
        passGroup.className = 'form-group';
        const passLabel = document.createElement('label');
        passLabel.className = 'form-label';
        passLabel.innerText = 'Contraseña';
        const passInput = document.createElement('input');
        passInput.className = 'form-input';
        passInput.type = 'password';
        passInput.name = 'password';
        passInput.placeholder = '••••••••';
        passInput.required = true;

        passGroup.appendChild(passLabel);
        passGroup.appendChild(passInput);

        // Actions
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn-primary';
        submitBtn.innerText = this.isLoginMode ? 'Entrar' : 'Registrarse';

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'btn-secondary';
        toggleBtn.style.width = '100%';
        toggleBtn.style.marginTop = '1rem';
        toggleBtn.style.border = 'none';
        toggleBtn.innerText = this.isLoginMode
            ? '¿Nuevo aquí? Crea una cuenta'
            : '¿Ya tienes cuenta? Inicia sesión';

        toggleBtn.onclick = () => {
            this.isLoginMode = !this.isLoginMode;
            this.updateMode(title, subtitle, submitBtn, toggleBtn);
        };

        form.appendChild(userGroup);
        form.appendChild(passGroup);
        form.appendChild(submitBtn);
        form.appendChild(toggleBtn);

        container.appendChild(header);
        container.appendChild(form);

        return container;
    }

    updateMode(title, subtitle, submitBtn, toggleBtn) {
        title.innerText = this.isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta';
        subtitle.innerText = this.isLoginMode
            ? 'Bienvenido de nuevo a tu cocina digital'
            : 'Únete a YantaConSeso hoy';
        submitBtn.innerText = this.isLoginMode ? 'Entrar' : 'Registrarse';
        toggleBtn.innerText = this.isLoginMode
            ? '¿Nuevo aquí? Crea una cuenta'
            : '¿Ya tienes cuenta? Inicia sesión';
    }

    handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        let result;
        if (this.isLoginMode) {
            result = this.authManager.login(username, password);
        } else {
            result = this.authManager.register(username, password);
        }

        if (!result.success) {
            alert(result.message);
        }
    }
}

class MainMenuUI {
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

        container.appendChild(header);
        container.appendChild(grid);

        return container;
    }
}

class RecipeListUI {
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
        // List (Grid Layout)
        const listContainer = document.createElement('div');
        listContainer.style.flex = '1';
        listContainer.style.overflowY = 'auto';
        listContainer.style.padding = '20px';
        listContainer.style.display = 'grid';
        listContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        listContainer.style.gap = '20px';
        listContainer.style.alignContent = 'start';

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
            // card.style.padding = '15px'; // Padding moved to inner content to allow full-width image
            card.style.borderRadius = 'var(--radius-sm)';
            card.style.marginBottom = '10px';
            card.style.cursor = 'pointer';
            card.style.overflow = 'visible'; // Allow content to flow
            card.style.transition = 'background 0.2s';

            card.onmouseover = () => card.style.background = 'rgba(255,255,255,0.1)';
            card.onmouseout = () => card.style.background = 'rgba(255,255,255,0.05)';
            // NAVIGATION FIX: Pass callback to return to THIS list view
            // Uses showSearchRecipe which is the correct method name in AppManager
            card.onclick = () => this.appManager.showEditRecipe(recipe, () => this.appManager.showSearchRecipe());

            // Image
            const img = document.createElement('div');
            img.style.height = '120px';
            img.style.background = `url(${recipe.image}) center/cover no-repeat`;
            img.style.width = '100%';
            img.style.borderRadius = 'var(--radius-sm) var(--radius-sm) 0 0';

            const info = document.createElement('div');
            info.style.padding = '15px';

            const rName = document.createElement('h3');
            rName.innerText = recipe.name;
            rName.style.fontSize = '1.1rem';
            rName.style.lineHeight = '1.3';
            rName.style.marginBottom = '5px';
            rName.style.whiteSpace = 'normal';
            rName.style.wordBreak = 'break-word';
            rName.style.overflow = 'visible';
            rName.style.height = 'auto';

            const rIng = document.createElement('p');
            rIng.innerText = `${recipe.ingredients.length} Ingredientes`;
            rIng.style.fontSize = '0.9rem';
            rIng.style.color = 'var(--text-muted)';

            info.appendChild(rName);
            info.appendChild(rIng);

            card.appendChild(img);
            card.appendChild(info);
            container.appendChild(card);
        });
    }
}

class RecipeFormUI {
    constructor(appManager, recipeToEdit = null, returnToCallback = null) {
        this.appManager = appManager;
        this.recipe = recipeToEdit;
        this.isEdit = !!recipeToEdit;
        this.returnToCallback = returnToCallback;
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
        backBtn.onclick = () => {
            if (this.returnToCallback) {
                this.returnToCallback();
            } else {
                this.appManager.showMainMenu();
            }
        };

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

        // Image Section (URL or File)
        const imgGroup = document.createElement('div');
        imgGroup.className = 'form-group';
        imgGroup.innerHTML = `<label class="form-label">Imagen de la Receta</label>`;

        // Drag & Drop Area
        const dropZone = document.createElement('div');
        dropZone.style.border = '2px dashed rgba(255,255,255,0.2)';
        dropZone.style.borderRadius = 'var(--radius-md)';
        dropZone.style.padding = '20px';
        dropZone.style.textAlign = 'center';
        dropZone.style.cursor = 'pointer';
        dropZone.style.marginBottom = '10px';
        dropZone.style.transition = 'background 0.2s, border-color 0.2s';

        const currentImage = this.recipe ? this.recipe.image : '';
        const previewHtml = currentImage
            ? `<div style="margin-bottom:10px; height:150px; background:url(${currentImage}) center/contain no-repeat;"></div>`
            : `<i class="bi bi-cloud-upload" style="font-size: 2rem; color: var(--text-muted);"></i>`;

        dropZone.innerHTML = `
            <div id="img-preview">${previewHtml}</div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin: 5px 0;">Arrastra una imagen aquí o haz clic</p>
            <input type="file" accept="image/*" style="display: none;" id="file-input">
        `;

        // Hidden input to store the final image data (URL or Base64)
        const activeImageInput = document.createElement('input');
        activeImageInput.type = 'hidden';
        activeImageInput.name = 'activeFullImage';
        activeImageInput.value = currentImage; // Default to existing

        // Events
        const fileInput = dropZone.querySelector('#file-input');

        dropZone.onclick = () => fileInput.click();

        dropZone.ondragover = (e) => {
            e.preventDefault();
            dropZone.style.background = 'rgba(255,255,255,0.05)';
            dropZone.style.borderColor = 'var(--primary)';
        };

        dropZone.ondragleave = () => {
            dropZone.style.background = 'transparent';
            dropZone.style.borderColor = 'rgba(255,255,255,0.2)';
        };

        const handleFile = (file) => {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Resize image before setting
                    this.resizeImage(e.target.result, 800, 600, (resizedData) => {
                        activeImageInput.value = resizedData;
                        const preview = dropZone.querySelector('#img-preview');
                        preview.innerHTML = `<div style="margin-bottom:10px; height:150px; background:url(${resizedData}) center/contain no-repeat;"></div>`;
                    });
                };
                reader.readAsDataURL(file);
            }
        };

        dropZone.ondrop = (e) => {
            e.preventDefault();
            dropZone.style.background = 'transparent';
            dropZone.style.borderColor = 'rgba(255,255,255,0.2)';
            if (e.dataTransfer.files.length > 0) {
                handleFile(e.dataTransfer.files[0]);
            }
        };

        fileInput.onchange = (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        };

        // Fallback URL Input
        const urlInput = document.createElement('input');
        urlInput.className = 'form-input';
        urlInput.type = 'url';
        urlInput.placeholder = 'O pega una URL de imagen...';
        urlInput.style.marginTop = '10px';
        urlInput.onchange = (e) => {
            if (e.target.value) {
                activeImageInput.value = e.target.value;
                const preview = dropZone.querySelector('#img-preview');
                preview.innerHTML = `<div style="margin-bottom:10px; height:150px; background:url(${e.target.value}) center/contain no-repeat;"></div>`;
            }
        };

        imgGroup.appendChild(dropZone);
        imgGroup.appendChild(activeImageInput);
        imgGroup.appendChild(urlInput);

        // Name
        const nameGroup = document.createElement('div');
        nameGroup.className = 'form-group';
        nameGroup.innerHTML = `<label class="form-label">Nombre de la Receta</label>`;
        const nameInput = document.createElement('input');
        nameInput.className = 'form-input';
        nameInput.required = true;
        nameInput.value = this.recipe ? this.recipe.name : '';
        nameGroup.appendChild(nameInput);

        // Ingredients
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

        // Allergens
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

        form.appendChild(submitBtn);

        if (this.isEdit) {
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn-secondary';
            deleteBtn.style.marginTop = '10px';
            deleteBtn.style.background = 'rgba(255, 99, 71, 0.2)';
            deleteBtn.style.color = '#ff6b6b';
            deleteBtn.style.width = '100%';
            deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Eliminar Receta';
            deleteBtn.onclick = () => {
                if (confirm('¿Seguro que quieres borrar esta receta? Esta acción no se puede deshacer.')) {
                    this.appManager.recipeManager.deleteRecipe(this.recipe.id);
                    // Return to previous view or main menu after delete
                    if (this.returnToCallback) {
                        this.returnToCallback();
                    } else {
                        this.appManager.showMainMenu();
                    }
                }
            };
            form.appendChild(deleteBtn);
        }
        submitBtn.style.marginTop = '20px';

        form.appendChild(imgGroup);
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

    resizeImage(base64Str, maxWidth, maxHeight, callback) {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            callback(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 0.7 quality
        };
    }

    save(e) {
        e.preventDefault();
        const form = e.target;

        // Fix: Select specific inputs correctly
        const nameInput = form.querySelector('input.form-input[required]'); // Name has required attribute
        const imageInput = form.querySelector('input[name="activeFullImage"]');

        const name = nameInput.value;
        const image = imageInput.value;


        const textareas = form.querySelectorAll('textarea');
        const ingredients = textareas[0].value.split(',').map(i => i.trim()).filter(i => i);
        const instructions = textareas[1].value;

        const allergyCheckboxes = form.querySelectorAll('input[name="allergens"]:checked');
        const allergies = Array.from(allergyCheckboxes).map(cb => cb.value);

        const data = { name, ingredients, instructions, tags: [], allergies, image };

        if (this.isEdit) {
            this.appManager.recipeManager.updateRecipe(this.recipe.id, data);
            alert('Receta actualizada!');
        } else {
            this.appManager.recipeManager.addRecipe(data);
            alert('Receta creada!');
        }

        if (this.returnToCallback) {
            this.returnToCallback();
        } else {
            this.appManager.showMainMenu();
        }
    }
}

class PlanUI {
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

        // Actions Header
        const actionsHeader = document.createElement('div');
        actionsHeader.style.display = 'flex';
        actionsHeader.style.gap = '10px';
        actionsHeader.style.marginBottom = '20px';
        actionsHeader.style.justifyContent = 'flex-end';

        const newPlanBtn = document.createElement('button');
        newPlanBtn.className = 'btn-secondary';
        newPlanBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i> Nuevo Plan';
        newPlanBtn.onclick = () => this.generateNewPlan(content);

        const historyBtn = document.createElement('button');
        historyBtn.className = 'btn-secondary';
        historyBtn.innerHTML = '<i class="bi bi-clock-history"></i> Mis Planes';
        historyBtn.onclick = () => this.showHistoryModal();

        const savePlanBtn = document.createElement('button');
        savePlanBtn.className = 'btn-primary';
        savePlanBtn.innerHTML = '<i class="bi bi-save"></i> Guardar Plan';
        savePlanBtn.onclick = () => {
            const name = prompt("Dale un nombre a tu plan (ej: 'Semana Keto'):");
            if (name) {
                this.appManager.planManager.savePlan(this.currentPlanData, name);
                alert('Plan guardado en tu historial!');
            }
        };

        actionsHeader.appendChild(newPlanBtn);
        actionsHeader.appendChild(historyBtn);
        actionsHeader.appendChild(savePlanBtn);
        content.appendChild(actionsHeader);

        // Load existing plan or generate new
        const savedPlan = this.appManager.planManager.loadPlan();
        if (savedPlan) {
            this.renderPlanItems(savedPlan, content);
        } else {
            this.generateNewPlan(content);
        }

        container.appendChild(header);
        container.appendChild(content);

        return container;
    }

    generateNewPlan(container) {
        const userAllergies = this.appManager.currentUser.dietaryPreferences || [];
        const result = this.appManager.planManager.generatePlan(7, userAllergies);

        if (result.success) {
            this.renderPlanItems(result.data, container);
        } else {
            // Clear previous items to show error
            this.renderPlanItems([], container); // Clear list

            const msg = document.createElement('div');
            msg.style.textAlign = 'center';
            msg.style.padding = '40px';
            msg.innerHTML = `
                <i class="bi bi-emoji-frown" style="font-size: 3rem; color: var(--primary);"></i>
                <p style="margin-top: 20px; font-size: 1.1rem;">${result.message}</p>
                <button class="btn-primary" style="margin-top: 20px;">Crear Nuevas Recetas</button>
            `;
            const btn = msg.querySelector('button');
            btn.onclick = () => this.appManager.showCreateRecipe();

            // Append after header
            // We need to find the list container or append to main content
            // Simplest: just append to container if list is empty
            const list = container.querySelector('#plan-list');
            if (list) list.appendChild(msg);
        }
    }

    renderPlanItems(planData, parentContainer) {
        this.currentPlanData = planData;

        let listContainer = parentContainer.querySelector('#plan-list');
        if (!listContainer) {
            listContainer = document.createElement('div');
            listContainer.id = 'plan-list';
            parentContainer.appendChild(listContainer);
        }
        listContainer.innerHTML = '';

        if (planData.length === 0) return;

        // Allergies Warning
        const userAllergies = this.appManager.currentUser.dietaryPreferences || [];
        if (userAllergies.length > 0) {
            const warning = document.createElement('div');
            warning.style.background = 'rgba(78, 205, 196, 0.1)';
            warning.style.border = '1px solid var(--secondary)';
            warning.style.borderRadius = 'var(--radius-sm)';
            warning.style.padding = '10px';
            warning.style.marginBottom = '20px';
            warning.style.fontSize = '0.9rem';
            warning.innerHTML = `<i class="bi bi-check-circle-fill" style="margin-right: 8px;"></i> Filtrado por tus alergias: <strong>${userAllergies.join(', ')}</strong>`;
            listContainer.appendChild(warning);
        }

        planData.forEach((item, index) => {
            const dayCard = document.createElement('div');
            dayCard.style.display = 'flex';
            dayCard.style.gap = '15px';
            dayCard.style.marginBottom = '20px';
            dayCard.className = 'fade-in';
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
            recipeCard.style.borderRadius = 'var(--radius-md)';
            recipeCard.style.border = '1px solid rgba(255,255,255,0.05)';
            recipeCard.style.cursor = 'pointer';
            recipeCard.style.overflow = 'hidden';
            recipeCard.style.display = 'flex';

            recipeCard.onclick = (e) => {
                if (!e.target.closest('.swap-btn')) {
                    this.showRecipeDetail(item.recipe);
                }
            };

            // Thumbnail
            const img = document.createElement('div');
            img.style.width = '100px';
            img.style.background = `url(${item.recipe.image}) center/cover no-repeat`;

            // Info
            const info = document.createElement('div');
            info.style.padding = '15px';
            info.style.flex = '1';

            info.innerHTML = `
                    <h3 style="margin: 0 0 5px 0; font-size: 1.1rem; white-space: normal; word-break: break-word; line-height: 1.3;">${item.recipe.name}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem">${item.recipe.ingredients.length} Ingredientes</p>
                `;

            // Swap Button
            const swapBtn = document.createElement('button');
            swapBtn.className = 'swap-btn btn-secondary';
            swapBtn.style.margin = '15px';
            swapBtn.style.alignSelf = 'center';
            swapBtn.innerHTML = '<i class="bi bi-arrow-left-right"></i>';
            swapBtn.title = 'Cambiar plato';
            swapBtn.onclick = (e) => {
                e.stopPropagation();
                // Show modal selection
                this.showSwapModal(index);
            };

            recipeCard.appendChild(img);
            recipeCard.appendChild(info);
            recipeCard.appendChild(swapBtn);

            dayCard.appendChild(dateBox);
            dayCard.appendChild(recipeCard);
            listContainer.appendChild(dayCard);
        });

    }

    showSwapModal(dayIndex) {
        // Modal Overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.className = 'fade-in';

        const modal = document.createElement('div');
        modal.className = 'glass-panel';
        modal.style.width = '90%';
        modal.style.maxWidth = '500px';
        modal.style.maxHeight = '80vh';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.padding = '20px';
        modal.style.borderRadius = 'var(--radius-lg)';

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '20px';
        header.innerHTML = '<h3>Elige una receta</h3>';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '2rem';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = () => document.body.removeChild(overlay);
        header.appendChild(closeBtn);
        modal.appendChild(header);

        const list = document.createElement('div');
        list.style.overflowY = 'auto';
        list.style.flex = '1';

        const allRecipes = this.appManager.recipeManager.getAllRecipes();
        const userAllergies = this.appManager.currentUser.dietaryPreferences || [];

        const safeRecipes = allRecipes.filter(r => {
            const hasConflict = r.allergies && r.allergies.some(a => userAllergies.includes(a));
            return !hasConflict;
        });

        safeRecipes.forEach(r => {
            const item = document.createElement('div');
            item.style.padding = '10px';
            item.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            item.style.cursor = 'pointer';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.gap = '10px';

            item.onmouseover = () => item.style.background = 'rgba(255,255,255,0.05)';
            item.onmouseout = () => item.style.background = 'transparent';
            item.onclick = () => {
                this.appManager.planManager.replaceRecipe(dayIndex, this.currentPlanData, r);
                document.body.removeChild(overlay);
                this.appManager.showCreatePlan();
            };

            const img = document.createElement('div');
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.borderRadius = '4px';
            img.style.background = `url(${r.image}) center/cover no-repeat`;

            const name = document.createElement('span');
            name.innerText = r.name;

            item.appendChild(img);
            item.appendChild(name);
            list.appendChild(item);
        });

        modal.appendChild(list);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    showHistoryModal() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.className = 'fade-in';

        const modal = document.createElement('div');
        modal.className = 'glass-panel';
        modal.style.width = '90%';
        modal.style.maxWidth = '500px';
        modal.style.maxHeight = '80vh';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.padding = '20px';
        modal.style.borderRadius = 'var(--radius-lg)';

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '20px';
        header.innerHTML = '<h3>Mis Planes Guardados</h3>';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '2rem';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = () => document.body.removeChild(overlay);
        header.appendChild(closeBtn);
        modal.appendChild(header);

        const list = document.createElement('div');
        list.style.overflowY = 'auto';
        list.style.flex = '1';

        const savedPlans = this.appManager.planManager.getSavedPlans();

        if (savedPlans.length === 0) {
            list.innerHTML = '<p style="color:var(--text-muted); text-align:center;">No tienes planes guardados.</p>';
        } else {
            savedPlans.forEach(p => {
                const item = document.createElement('div');
                item.style.padding = '15px';
                item.style.background = 'rgba(255,255,255,0.05)';
                item.style.marginBottom = '10px';
                item.style.borderRadius = 'var(--radius-sm)';
                item.style.display = 'flex';
                item.style.justifyContent = 'space-between';
                item.style.alignItems = 'center';

                const info = document.createElement('div');
                const date = new Date(p.date).toLocaleDateString();
                info.innerHTML = `<strong>${p.name}</strong><br><small style="color:var(--text-muted)">${date}</small>`;

                const actions = document.createElement('div');
                actions.style.display = 'flex';
                actions.style.gap = '10px';

                const loadBtn = document.createElement('button');
                loadBtn.className = 'btn-secondary';
                loadBtn.style.padding = '5px 10px';
                loadBtn.innerText = 'Cargar';
                loadBtn.onclick = () => {
                    this.appManager.planManager.savePlan(p.plan); // Set as current
                    this.appManager.showCreatePlan(); // Reload view
                    document.body.removeChild(overlay);
                };

                const delBtn = document.createElement('button');
                delBtn.className = 'btn-secondary';
                delBtn.style.padding = '5px 10px';
                delBtn.style.background = 'rgba(255, 99, 71, 0.2)';
                delBtn.style.color = '#ff6b6b';
                delBtn.innerText = 'Borrar';
                delBtn.onclick = () => {
                    if (confirm('¿Borrar este plan?')) {
                        this.appManager.planManager.deleteSavedPlan(p.name);
                        document.body.removeChild(overlay);
                        this.showHistoryModal(); // Refresh modal
                    }
                };

                actions.appendChild(loadBtn);
                actions.appendChild(delBtn);
                item.appendChild(info);
                item.appendChild(actions);
                list.appendChild(item);
            });
        }

        modal.appendChild(list);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    showRecipeDetail(recipe) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.className = 'fade-in';

        const modal = document.createElement('div');
        modal.className = 'glass-panel';
        modal.style.width = '90%';
        modal.style.maxWidth = '600px';
        modal.style.maxHeight = '85vh';
        modal.style.overflowY = 'auto';
        modal.style.borderRadius = 'var(--radius-lg)';
        modal.style.position = 'relative';

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '15px';
        closeBtn.style.right = '20px';
        closeBtn.style.background = 'rgba(0,0,0,0.5)';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.width = '35px';
        closeBtn.style.height = '35px';
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.zIndex = '2';
        closeBtn.onclick = () => document.body.removeChild(overlay);
        modal.appendChild(closeBtn);

        // Image Header
        const imgHeader = document.createElement('div');
        imgHeader.style.height = '200px';
        imgHeader.style.background = `url(${recipe.image}) center/cover no-repeat`;
        modal.appendChild(imgHeader);

        // Content
        const content = document.createElement('div');
        content.style.padding = '25px';

        const title = document.createElement('h2');
        title.innerText = recipe.name;
        title.style.marginBottom = '15px';
        title.style.color = 'var(--primary)';

        const meta = document.createElement('div');
        meta.style.display = 'flex';
        meta.style.gap = '15px';
        meta.style.marginBottom = '20px';
        meta.style.fontSize = '0.9rem';
        meta.style.color = 'var(--text-muted)';

        const allergyCount = recipe.allergies ? recipe.allergies.length : 0;
        meta.innerHTML = `
            <span><i class="bi bi-basket"></i> ${recipe.ingredients.length} Ingredientes</span>
            <span><i class="bi bi-exclamation-triangle"></i> ${allergyCount} Alérgenos</span>
        `;

        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.innerText = 'Ingredientes';
        ingredientsTitle.style.fontSize = '1.1rem';
        ingredientsTitle.style.marginTop = '20px';
        ingredientsTitle.style.marginBottom = '10px';

        const ingredientsList = document.createElement('ul');
        ingredientsList.style.paddingLeft = '20px';
        recipe.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.innerText = ing;
            li.style.marginBottom = '5px';
            ingredientsList.appendChild(li);
        });

        const instructionsTitle = document.createElement('h3');
        instructionsTitle.innerText = 'Instrucciones';
        instructionsTitle.style.fontSize = '1.1rem';
        instructionsTitle.style.marginTop = '20px';
        instructionsTitle.style.marginBottom = '10px';

        const instructionsText = document.createElement('div');
        instructionsText.style.lineHeight = '1.6';
        instructionsText.innerHTML = recipe.instructions.replace(/\n/g, '<br>');

        content.appendChild(title);
        content.appendChild(meta);

        if (recipe.allergies && recipe.allergies.length > 0) {
            const allergyContainer = document.createElement('div');
            allergyContainer.style.display = 'flex';
            allergyContainer.style.gap = '8px';
            allergyContainer.style.marginBottom = '20px';
            allergyContainer.style.flexWrap = 'wrap';

            recipe.allergies.forEach(a => {
                const tag = document.createElement('span');
                tag.innerText = a;
                tag.style.background = 'rgba(255, 99, 71, 0.2)';
                tag.style.color = '#ff6b6b';
                tag.style.padding = '4px 10px';
                tag.style.borderRadius = '20px';
                tag.style.fontSize = '0.85rem';
                allergyContainer.appendChild(tag);
            });
            content.appendChild(allergyContainer);
        }

        content.appendChild(ingredientsTitle);
        content.appendChild(ingredientsList);
        content.appendChild(instructionsTitle);
        content.appendChild(instructionsText);

        modal.appendChild(content);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }
}

class AllergyUI {
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
        const users = this.appManager.authManager.getUsers();
        const userIndex = users.findIndex(u => u.username === this.appManager.currentUser.username);
        if (userIndex !== -1) {
            users[userIndex] = this.appManager.currentUser;
            this.appManager.authManager.saveUsers(users);
        }

        // Update Local Session
        localStorage.setItem('currentUser', JSON.stringify(this.appManager.currentUser));

        alert('Preferencias guardadas correctamente.');
        this.appManager.showMainMenu();
    }
}

// ==========================================
// MAIN CONTROLLER
// ==========================================

class AppManager {
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

    showCreateRecipe(returnToCallback = null) {
        this.updateView(new RecipeFormUI(this, null, returnToCallback).render());
    }

    showEditRecipe(recipe, returnToCallback = null) {
        this.updateView(new RecipeFormUI(this, recipe, returnToCallback).render());
    }

    showSearchRecipe() {
        this.updateView(new RecipeListUI(this).render());
    }

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

// ==========================================
// ENTRY POINT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Data
    initializeSeedData();

    // Initialize App
    const app = new AppManager();
    app.init();
});
