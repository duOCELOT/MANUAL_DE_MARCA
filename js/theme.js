/**
 * Sistema de Temas (Dark/Light) para Manual da Marca
 */

// Estado atual do tema
let currentTheme = 'light';

// Configurações dos temas
const THEMES = {
    light: {
        id: 'light',
        name: 'Claro',
        icon: '☀️',
        colors: {
            '--bg-color': '#f8f9fa',
            '--card-bg': '#ffffff',
            '--text-color': '#2c3e50',
            '--border-color': '#e9ecef',
            '--primary-color': '#2c3e50',
            '--secondary-color': '#3498db',
            '--accent-color': '#e74c3c',
            '--success-color': '#27ae60',
            '--warning-color': '#f39c12',
            '--danger-color': '#e74c3c',
            '--shadow': '0 5px 15px rgba(0,0,0,0.08)',
            '--shadow-hover': '0 8px 25px rgba(0,0,0,0.12)'
        }
    },
    dark: {
        id: 'dark',
        name: 'Escuro',
        icon: '🌙',
        colors: {
            '--bg-color': '#1a1a1a',
            '--card-bg': '#2d2d2d',
            '--text-color': '#e0e0e0',
            '--border-color': '#404040',
            '--primary-color': '#4a90e2',
            '--secondary-color': '#5da6f0',
            '--accent-color': '#ff6b6b',
            '--success-color': '#4ecdc4',
            '--warning-color': '#ffd93d',
            '--danger-color': '#ff6b6b',
            '--shadow': '0 5px 15px rgba(0,0,0,0.3)',
            '--shadow-hover': '0 8px 25px rgba(0,0,0,0.4)'
        }
    }
};

/**
 * Inicializar sistema de temas
 */
function initializeThemeSystem() {
    createThemeToggle();
    loadSavedTheme();
    applyTheme(currentTheme);
    setupThemeEventListeners();
    addThemeTransitions();
    
    BrandManualUtils.devLog('Sistema de temas inicializado');
}

/**
 * Criar toggle de tema na interface
 */
function createThemeToggle() {
    // Verificar se já existe
    if (document.getElementById('theme-toggle')) {
        return;
    }

    const controls = document.querySelector('.controls');
    if (!controls) return;
    
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'btn btn-theme-toggle';
    themeToggle.innerHTML = `
        <span class="theme-icon">🌙</span>
        <span class="theme-text">Tema Escuro</span>
    `;
    themeToggle.onclick = toggleTheme;
    
    // Adicionar CSS do toggle
    addThemeToggleCSS();
    
    // Inserir no início dos controles
    controls.insertBefore(themeToggle, controls.firstChild);
}

/**
 * Adicionar CSS específico do toggle
 */
function addThemeToggleCSS() {
    if (document.getElementById('theme-toggle-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'theme-toggle-styles';
    style.textContent = `
        .btn-theme-toggle {
            background: var(--card-bg) !important;
            color: var(--text-color) !important;
            border: 2px solid var(--border-color) !important;
            transition: all 0.3s ease !important;
            position: relative;
            overflow: hidden;
        }
        
        .btn-theme-toggle:hover {
            border-color: var(--secondary-color) !important;
            transform: translateY(-2px);
            box-shadow: var(--shadow-hover) !important;
        }
        
        .btn-theme-toggle .theme-icon {
            font-size: 1.2rem;
            margin-right: 8px;
            transition: transform 0.3s ease;
        }
        
        .btn-theme-toggle:hover .theme-icon {
            transform: rotate(20deg);
        }
        
        .theme-transition {
            transition: all 0.3s ease;
        }
        
        .theme-switching {
            pointer-events: none;
            opacity: 0.7;
        }
        
        /* Dark theme specific styles */
        [data-theme="dark"] {
            color-scheme: dark;
        }
        
        [data-theme="dark"] body {
            background: var(--bg-color);
            color: var(--text-color);
        }
        
        [data-theme="dark"] .section {
            background: var(--card-bg);
            border-color: var(--border-color);
            color: var(--text-color);
        }
        
        [data-theme="dark"] .header {
            background: linear-gradient(135deg, #2c3e50, #4a90e2) !important;
        }
        
        [data-theme="dark"] .form-control {
            background: var(--card-bg);
            border-color: var(--border-color);
            color: var(--text-color);
        }
        
        [data-theme="dark"] .form-control:focus {
            background: var(--card-bg);
            border-color: var(--secondary-color);
            color: var(--text-color);
        }
        
        [data-theme="dark"] .form-control::placeholder {
            color: rgba(224, 224, 224, 0.6);
        }
        
        [data-theme="dark"] .form-control option {
            background: var(--card-bg);
            color: var(--text-color);
        }
        
        [data-theme="dark"] .preview-section {
            background: linear-gradient(135deg, #4a90e2 0%, #667eea 100%);
        }
        
        [data-theme="dark"] .color-preview {
            background: var(--card-bg);
        }
        
        [data-theme="dark"] .logo-preview {
            background: var(--card-bg);
            border-color: var(--border-color);
        }
        
        [data-theme="dark"] .value-item {
            background: rgba(77, 144, 226, 0.1);
            border-left-color: var(--secondary-color);
        }
        
        [data-theme="dark"] .info-box {
            background: rgba(77, 144, 226, 0.08);
            border-left-color: var(--secondary-color);
        }
        
        [data-theme="dark"] .file-input-wrapper {
            background: var(--secondary-color);
            color: white;
        }
        
        [data-theme="dark"] .file-input-wrapper:hover {
            background: var(--primary-color);
        }
        
        [data-theme="dark"] .color-swatch {
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        
        [data-theme="dark"] .btn-primary {
            background: var(--secondary-color) !important;
        }
        
        [data-theme="dark"] .btn-primary:hover {
            background: var(--primary-color) !important;
        }
        
        [data-theme="dark"] .btn-success {
            background: var(--success-color) !important;
        }
        
        [data-theme="dark"] .btn-warning {
            background: var(--warning-color) !important;
            color: #1a1a1a !important;
        }
        
        [data-theme="dark"] .btn-danger {
            background: var(--danger-color) !important;
        }
        
        /* Template cards dark theme */
        [data-theme="dark"] .template-card {
            background: var(--card-bg);
            border-color: var(--border-color);
            color: var(--text-color);
        }
        
        [data-theme="dark"] .template-mockup {
            background: rgba(77, 144, 226, 0.1);
            border-color: var(--border-color);
        }
        
        [data-theme="dark"] .template-card.selected {
            border-color: var(--success-color);
            box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
        }
        
        [data-theme="dark"] .template-card.selected::before {
            background: var(--success-color);
        }
        
        [data-theme="dark"] .template-info h3 {
            color: var(--text-color);
        }
        
        [data-theme="dark"] .template-info p {
            color: rgba(224, 224, 224, 0.8);
        }
        
        [data-theme="dark"] .template-aspect {
            background: rgba(93, 166, 240, 0.2);
            color: var(--secondary-color);
        }
        
        [data-theme="dark"] .mockup-content {
            background: #3a3a3a;
            color: var(--text-color);
        }
        
        [data-theme="dark"] .mockup-title {
            color: rgba(224, 224, 224, 0.8);
        }
        
        [data-theme="dark"] .mockup-aspect {
            background: rgba(255,255,255,0.1);
            color: rgba(224, 224, 224, 0.8);
        }
        
        /* Loading and messages dark theme */
        [data-theme="dark"] .loading {
            background: var(--card-bg);
            color: var(--text-color);
        }
        
        [data-theme="dark"] .success-message {
            background: linear-gradient(135deg, rgba(78, 205, 196, 0.2), rgba(78, 205, 196, 0.1));
            color: var(--success-color);
            border-color: var(--success-color);
        }
        
        [data-theme="dark"] .error-message {
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.1));
            color: var(--danger-color);
            border-color: var(--danger-color);
        }
        
        /* Scrollbar dark theme */
        [data-theme="dark"] ::-webkit-scrollbar {
            width: 8px;
        }
        
        [data-theme="dark"] ::-webkit-scrollbar-track {
            background: var(--card-bg);
        }
        
        [data-theme="dark"] ::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 4px;
        }
        
        [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
            background: var(--secondary-color);
        }
        
        /* Social links dark theme */
        [data-theme="dark"] .social-links .social-item {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
        }
        
        /* Brand values dark theme */
        [data-theme="dark"] .brand-values .value-item {
            background: rgba(93, 166, 240, 0.1);
        }
        
        /* Form group labels dark theme */
        [data-theme="dark"] .form-group label {
            color: var(--text-color);
        }
        
        /* Section titles dark theme */
        [data-theme="dark"] .section h2 {
            color: var(--primary-color);
            border-bottom-color: var(--secondary-color);
        }
        
        [data-theme="dark"] .section h3 {
            color: var(--text-color);
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Alternar tema
 */
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

/**
 * Aplicar tema
 */
function applyTheme(themeName) {
    if (!THEMES[themeName]) {
        BrandManualUtils.devLog('Tema não encontrado:', themeName);
        return;
    }
    
    const theme = THEMES[themeName];
    currentTheme = themeName;
    
    // Adicionar classe de transição
    document.body.classList.add('theme-switching');
    
    // Aplicar cores CSS
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    // Definir atributo de tema
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Atualizar toggle
    updateThemeToggle();
    
    // Salvar preferência
    saveThemePreference();
    
    // Remover classe de transição após animação
    setTimeout(() => {
        document.body.classList.remove('theme-switching');
    }, 300);
    
    BrandManualUtils.devLog(`Tema aplicado: ${theme.name}`);
    BrandManualUtils.showSuccess(`Tema ${theme.name} ativado!`);
}

/**
 * Atualizar botão toggle
 */
function updateThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    const theme = THEMES[currentTheme];
    const oppositeTheme = THEMES[currentTheme === 'light' ? 'dark' : 'light'];
    
    const icon = toggle.querySelector('.theme-icon');
    const text = toggle.querySelector('.theme-text');
    
    if (icon) icon.textContent = oppositeTheme.icon;
    if (text) text.textContent = `Tema ${oppositeTheme.name}`;
}

/**
 * Carregar tema salvo
 */
function loadSavedTheme() {
    if (!BrandManualUtils.browserSupport.localStorage) {
        return;
    }
    
    try {
        const saved = localStorage.getItem('brandManual_theme');
        if (saved && THEMES[saved]) {
            currentTheme = saved;
        } else {
            // Detectar preferência do sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            currentTheme = prefersDark ? 'dark' : 'light';
        }
    } catch (e) {
        BrandManualUtils.devLog('Erro ao carregar tema salvo', e);
    }
}

/**
 * Salvar preferência de tema
 */
function saveThemePreference() {
    if (!BrandManualUtils.browserSupport.localStorage) {
        return;
    }
    
    try {
        localStorage.setItem('brandManual_theme', currentTheme);
    } catch (e) {
        BrandManualUtils.devLog('Erro ao salvar preferência de tema', e);
    }
}

/**
 * Configurar event listeners
 */
function setupThemeEventListeners() {
    // Detectar mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Keyboard shortcut para alternar tema (Ctrl+Shift+T)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

/**
 * Lidar com mudança de tema do sistema
 */
function handleSystemThemeChange(e) {
    // Só aplicar se não houver preferência salva
    const hasUserPreference = localStorage.getItem('brandManual_theme');
    
    if (!hasUserPreference) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
    }
}

/**
 * Obter tema atual
 */
function getCurrentTheme() {
    return THEMES[currentTheme];
}

/**
 * Aplicar tema ao preview/export
 */
function applyThemeToExport(htmlContent, theme) {
    const themeConfig = THEMES[theme || currentTheme];
    
    // Injetar variáveis CSS do tema no HTML de export
    const themeCSS = `
        :root {
            ${Object.entries(themeConfig.colors)
                .map(([prop, value]) => `${prop}: ${value};`)
                .join('\n            ')}
        }
        
        body {
            background: var(--bg-color);
            color: var(--text-color);
        }
        
        .container {
            background: var(--card-bg);
        }
        
        .section {
            background: var(--card-bg);
            border-color: var(--border-color);
        }
        
        .form-control {
            background: var(--card-bg);
            border-color: var(--border-color);
            color: var(--text-color);
        }
    `;
    
    // Inserir CSS do tema no HTML
    const styledContent = htmlContent.replace(
        '</head>',
        `<style>${themeCSS}</style></head>`
    );
    
    return styledContent;
}

/**
 * Reset de tema (voltar ao padrão)
 */
function resetTheme() {
    const confirmReset = confirm('Deseja resetar para o tema padrão do sistema?');
    
    if (confirmReset) {
        // Remover preferência salva
        if (BrandManualUtils.browserSupport.localStorage) {
            localStorage.removeItem('brandManual_theme');
        }
        
        // Detectar tema do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        
        applyTheme(systemTheme);
        BrandManualUtils.showSuccess('Tema resetado para padrão do sistema!');
    }
}

/**
 * Criar paleta de cores personalizada
 */
function createCustomTheme(name, colors) {
    const customThemeId = `custom_${Date.now()}`;
    
    THEMES[customThemeId] = {
        id: customThemeId,
        name: name,
        icon: '🎨',
        colors: colors,
        custom: true
    };
    
    return customThemeId;
}

/**
 * Exportar configurações de tema
 */
function exportThemeConfig() {
    const config = {
        currentTheme: currentTheme,
        themes: THEMES,
        version: '1.0',
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { 
        type: 'application/json' 
    });
    
    const filename = `tema-manual-marca-${new Date().toISOString().split('T')[0]}.json`;
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
    BrandManualUtils.showSuccess('Configurações de tema exportadas!');
}

/**
 * Adicionar transições suaves na inicialização
 */
function addThemeTransitions() {
    const style = document.createElement('style');
    style.id = 'theme-transitions';
    style.textContent = `
        * {
            transition: background-color 0.3s ease, 
                       border-color 0.3s ease, 
                       color 0.3s ease,
                       box-shadow 0.3s ease !important;
        }
        
        .template-card,
        .section,
        .btn,
        .form-control {
            transition: all 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Verificar se tema escuro está ativo
 */
function isDarkTheme() {
    return currentTheme === 'dark';
}

/**
 * Obter cor atual baseada no tema
 */
function getThemeColor(colorName) {
    const theme = getCurrentTheme();
    return theme.colors[`--${colorName}`] || theme.colors[colorName];
}

// Exportar funções globais
window.BrandManualTheme = {
    initializeThemeSystem,
    toggleTheme,
    applyTheme,
    getCurrentTheme,
    applyThemeToExport,
    resetTheme,
    createCustomTheme,
    exportThemeConfig,
    isDarkTheme,
    getThemeColor,
    THEMES
};

// Funções globais para compatibilidade
window.toggleTheme = toggleTheme;
window.resetTheme = resetTheme;
window.isDarkTheme = isDarkTheme;

BrandManualUtils.devLog('Theme system loaded successfully');