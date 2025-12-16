import { AppManager } from './controllers/AppManager.js';
import { initializeSeedData } from './utils/SeedData.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Data
    initializeSeedData();

    // Initialize App
    const app = new AppManager();
    app.init();
});
