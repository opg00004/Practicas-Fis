/**
 * User Model
 */
export class User {
    constructor({ username, password, dietaryPreferences = [] }) {
        this.username = username;
        this.password = password; // In a real app, never store plain text passwords!
        this.dietaryPreferences = dietaryPreferences;
    }

    static validate(username, password) {
        if (!username || username.length < 3) return { valid: false, message: "Username too short" };
        if (!password || password.length < 4) return { valid: false, message: "Password too short" };
        return { valid: true };
    }
}
