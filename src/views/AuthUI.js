/**
 * AuthUI
 * Renders the Login/Register Interface.
 */
export class AuthUI {
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
            // Re-render essentially (simplest way is to refresh the app innerHTML via manager, but here we hack it for simplicity)
            // Ideally we call AppManager to re-render AuthUI, but we can just update texts here for smoother XP
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
            alert(result.message); // Simple alert for now, can be improved to a toast
        }
    }
}
