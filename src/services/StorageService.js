/**
 * StorageService
 * Handles persistence using localStorage with JSON serialization.
 */
export class StorageService {
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
