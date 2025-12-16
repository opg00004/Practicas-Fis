import { StorageService } from '../services/StorageService.js';
import { User } from '../models/User.js';

/**
 * AuthManager
 * Handles registration and login logic.
 */
export class AuthManager {
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
