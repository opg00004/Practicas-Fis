import { StorageService } from '../services/StorageService.js';

export const SeedData = [
    {
        id: 'receta_1',
        name: 'Lasaña Clásica de Carne',
        ingredients: ['Pasta de Lasaña', 'Carne Picada', 'Salsa de Tomate', 'Queso Mozzarella', 'Bechamel', 'Cebolla'],
        instructions: '1. Sofreír la carne con cebolla.\n2. Montar capas de pasta, carne y bechamel.\n3. Cubrir con queso.\n4. Hornear 40min a 180ºC.',
        tags: ['Italiana', 'Cena'],
        allergies: ['Gluten', 'Lácteos'] // Contains Gluten (Pasta) and Dairy (Cheese/Bechamel)
    },
    {
        id: 'receta_2',
        name: 'Ensalada César con Pollo',
        ingredients: ['Lechuga Romana', 'Pechuga de Pollo', 'Picatostes', 'Queso Parmesano', 'Salsa César'],
        instructions: '1. Asar el pollo y trocear.\n2. Lavar lechuga.\n3. Mezclar todo en un bol con la salsa.',
        tags: ['Saludable', 'Rápida'],
        allergies: ['Gluten', 'Lácteos', 'Huevo'] // Croutons (Gluten), Cheese/Sauce (Dairy), Sauce (Egg)
    },
    {
        id: 'receta_3',
        name: 'Tacos de Pescado',
        ingredients: ['Tortillas de Maíz', 'Merluza Rebozada', 'Pico de Gallo', 'Lima', 'Repollo'],
        instructions: '1. Freír el pescado.\n2. Calentar tortillas.\n3. Montar tacos con verduras y lima.',
        tags: ['Mexicana', 'Pescado'],
        allergies: ['Gluten', 'Pescado'] // Breading (Gluten), Fish
    },
    {
        id: 'receta_4',
        name: 'Risotto de Setas',
        ingredients: ['Arroz Arboreo', 'Setas Variadas', 'Caldo de Verduras', 'Mantequilla', 'Parmesano', 'Vino Blanco'],
        instructions: '1. Sofreír setas.\n2. Añadir arroz y vino.\n3. Añadir caldo poco a poco removiendo.\n4. Mantecar con queso y mantequilla.',
        tags: ['Italiana', 'Vegetariana'],
        allergies: ['Lácteos'] // Butter/Cheese
    },
    {
        id: 'receta_5',
        name: 'Curry de Garbanzos Vegano',
        ingredients: ['Garbanzos', 'Leche de Coco', 'Curry en Polvo', 'Espinacas', 'Arroz Basmati'],
        instructions: '1. Saltear especias.\n2. Añadir garbanzos y leche de coco.\n3. Cocinar 15min.\n4. Servir con arroz.',
        tags: ['Vegana', 'India'],
        allergies: [] // Safe mostly
    }
];

export function initializeSeedData() {
    const existing = StorageService.get('recipes');
    if (!existing || existing.length === 0) {
        console.log("Seeding initial data...");
        StorageService.save('recipes', SeedData);
    }
}
