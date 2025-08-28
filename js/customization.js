/**
 * Sistema de Customização Avançada do Manual da Marca - VERSÃO CORRIGIDA 2.2
 * Arquivo: js/customization.js
 * Data: 2024
 */

// ============================================================================
// CONFIGURAÇÃO INICIAL E ESTADO GLOBAL
// ============================================================================

let isCustomizationInitialized = false;
let showCustomizationPanel = false;

// Dados de customização com estrutura simplificada
let customizationData = {
    coverPage: {
        enabled: true,
        backgroundImage: null,
        backgroundOverlay: 'rgba(0,0,0,0.4)',
        logoPosition: 'center',
        titleStyle: 'gradient'
    },
    headerBackground: {
        type: 'gradient',
        image: null,
        overlay: 'rgba(0,0,0,0.3)',
        customGradient: null
    },
    global: {
        theme: 'professional',
        borderStyle: 'rounded',
        animationLevel: 'full',
        maxWidth: '1200px',
        sectionSpacing: 30,
        backgroundType: 'solid',
        backgroundColor: '#f8f9fa'
    },
    typography: {
        primaryFont: 'Arial',
        secondaryFont: 'Arial',
        baseFontSize: 1.0,
        headingWeight: 'normal',
        lineHeight: 1.6
    },
    colors: {
        primary: '#2c3e50',
        secondary: '#3498db',
        accent: '#e74c3c',
        success: '#27ae60',
        warning: '#f39c12',
        danger: '#e74c3c'
    },
    sections: {}
};

// Temas predefinidos
const themePresets = {
    professional: {
        colors: { primary: '#2c3e50', secondary: '#3498db', accent: '#e74c3c' },
        typography: { primaryFont: 'Arial', baseFontSize: 1.0 },
        borderStyle: 'rounded',
        animationLevel: 'reduced'
    },
    modern: {
        colors: { primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460' },
        typography: { primaryFont: 'Roboto', baseFontSize: 1.1 },
        borderStyle: 'sharp',
        animationLevel: 'full'
    },
    elegant: {
        colors: { primary: '#2d3436', secondary: '#636e72', accent: '#a29bfe' },
        typography: { primaryFont: 'Georgia', baseFontSize: 1.0 },
        borderStyle: 'soft',
        animationLevel: 'reduced'
    },
    creative: {
        colors: { primary: '#6c5ce7', secondary: '#fd79a8', accent: '#fdcb6e' },
        typography: { primaryFont: 'Montserrat', baseFontSize: 1.1 },
        borderStyle: 'rounded',
        animationLevel: 'full'
    },
    minimalist: {
        colors: { primary: '#2d3436', secondary: '#636e72', accent: '#b2bec3' },
        typography: { primaryFont: 'Helvetica', baseFontSize: 0.95 },
        borderStyle: 'sharp',
        animationLevel: 'minimal'
    }
};

// Seções padrão
const DEFAULT_SECTIONS = {
    'info-basicas': { icon: '🏢', title: 'Informações Básicas' },
    'identidade': { icon: '🎯', title: 'Identidade da Marca' },
    'logotipo': { icon: '🎨', title: 'Logotipo' },
    'cores': { icon: '🎨', title: 'Paleta de Cores' },
    'tipografia': { icon: '✏️', title: 'Tipografia' },
    'tom-voz': { icon: '🗣️', title: 'Tom de Voz' },
    'aplicacoes': { icon: '📋', title: 'Aplicações da Marca' },
    'redes-sociais': { icon: '📱', title: 'Redes Sociais' },
    'contatos': { icon: '📞', title: 'Contatos' }
};

// ============================================================================
// FUNÇÕES DE INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializar sistema de customização de forma robusta
 */
function initCustomization() {
    console.log('[Customization] Inicializando sistema de customização...');
    
    if (isCustomizationInitialized) {
        console.log('[Customization] Sistema já inicializado');
        return true;
    }
    
    try {
        // Verificar dependências essenciais
        if (!checkEssentialDependencies()) {
            console.warn('[Customization] Dependências não encontradas - iniciando modo básico');
            initBasicMode();
        }
        
        // Inicializar seções padrão
        initializeDefaultSections();
        
        // Carregar dados salvos
        loadCustomizationData();
        
        // Verificar estado do painel
        checkPanelState();
        
        // Aplicar customizações salvas
        setTimeout(() => {
            applyAllCustomizations();
        }, 500);
        
        isCustomizationInitialized = true;
        console.log('[Customization] ✅ Sistema inicializado com sucesso');
        return true;
        
    } catch (error) {
        console.error('[Customization] ❌ Erro na inicialização:', error);
        initBasicMode();
        return false;
    }
}

/**
 * Verificar dependências essenciais
 */
function checkEssentialDependencies() {
    const required = ['BrandManualUtils'];
    const missing = [];
    
    for (const dep of required) {
        if (typeof window[dep] === 'undefined') {
            missing.push(dep);
        }
    }
    
    if (missing.length > 0) {
        console.warn('[Customization] Dependências faltando:', missing);
        return false;
    }
    
    return true;
}

/**
 * Modo básico sem dependências
 */
function initBasicMode() {
    console.log('[Customization] Iniciando modo básico...');
    
    // Criar funções básicas se não existirem
    if (!window.BrandManualUtils) {
        window.BrandManualUtils = {
            showSuccess: (msg) => {
                console.log('✅ SUCCESS:', msg);
                showBasicNotification(msg, 'success');
            },
            showError: (msg) => {
                console.log('❌ ERROR:', msg);
                showBasicNotification(msg, 'error');
            },
            devLog: (msg, data) => {
                console.log('[Dev]', msg, data || '');
            }
        };
    }
    
    isCustomizationInitialized = true;
    console.log('[Customization] ✅ Modo básico inicializado');
}

/**
 * Mostrar notificação básica
 */
function showBasicNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    if (type === 'success') {
        notification.style.background = '#27ae60';
        notification.textContent = '✅ ' + message;
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
        notification.textContent = '❌ ' + message;
    } else {
        notification.style.background = '#3498db';
        notification.textContent = 'ℹ️ ' + message;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Inicializar seções padrão
 */
function initializeDefaultSections() {
    Object.keys(DEFAULT_SECTIONS).forEach(sectionId => {
        if (!customizationData.sections[sectionId]) {
            customizationData.sections[sectionId] = {
                enabled: true,
                backgroundColor: '#f8f9fa',
                icon: DEFAULT_SECTIONS[sectionId].icon,
                titleColor: '#2c3e50',
                customTitle: null,
                layout: 'grid',
                animation: 'fadeIn',
                borderRadius: '12px',
                padding: '30px',
                shadow: '0 5px 15px rgba(0,0,0,0.08)',
                customCSS: ''
            };
        }
    });
}

/**
 * Verificar estado do painel
 */
function checkPanelState() {
    try {
        if (typeof(Storage) !== "undefined") {
            const savedState = localStorage.getItem('brandManual_customizationPanelVisible');
            showCustomizationPanel = savedState === 'true';
            
            if (showCustomizationPanel) {
                setTimeout(() => {
                    createCustomizationPanel();
                }, 500);
            }
        }
    } catch (e) {
        console.warn('[Customization] Erro ao verificar estado do painel:', e);
    }
}

// ============================================================================
// GERENCIAMENTO DO PAINEL
// ============================================================================

/**
 * Alternar painel de customização
 */
function toggleCustomizationPanel(show) {
    console.log('[Customization] Toggle painel:', show);
    
    if (!isCustomizationInitialized) {
        initCustomization();
    }
    
    showCustomizationPanel = show;
    
    // Salvar estado
    try {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('brandManual_customizationPanelVisible', show.toString());
        }
    } catch (e) {
        console.warn('[Customization] Erro ao salvar estado:', e);
    }
    
    if (show) {
        createCustomizationPanel();
        setTimeout(() => {
            const panel = document.getElementById('customization');
            if (panel) {
                panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 400);
        
        BrandManualUtils.showSuccess('Painel de customização ativado!');
    } else {
        removeCustomizationPanel();
        BrandManualUtils.showSuccess('Painel de customização desativado!');
    }
}

/**
 * Criar painel de customização
 */
function createCustomizationPanel() {
    console.log('[Customization] Criando painel de customização...');
    
    // Remover painel existente
    const existingPanel = document.getElementById('customization');
    if (existingPanel) {
        existingPanel.remove();
    }
    
    const container = document.querySelector('.container');
    if (!container) {
        console.error('[Customization] Container não encontrado');
        return;
    }
    
    // Criar seção de customização
    const customizationSection = document.createElement('section');
    customizationSection.className = 'section customization-panel';
    customizationSection.id = 'customization';
    
    // Adicionar estilos inline para garantir aplicação
    customizationSection.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        border: 3px solid #4a90e2 !important;
        position: relative;
        overflow: hidden;
        animation: slideInFromTop 0.6s ease-out;
        z-index: 10;
    `;
    
    customizationSection.innerHTML = createPanelHTML();
    
    // Inserir no container
    const firstSection = container.querySelector('.section:not(.customization-panel)');
    if (firstSection) {
        container.insertBefore(customizationSection, firstSection);
    } else {
        container.appendChild(customizationSection);
    }
    
    // Configurar event listeners
    setTimeout(() => {
        setupPanelEventListeners();
        updateInterfaceFields();
    }, 100);
    
    console.log('[Customization] ✅ Painel criado com sucesso');
}

/**
 * Remover painel de customização
 */
function removeCustomizationPanel() {
    const panel = document.getElementById('customization');
    if (panel) {
        panel.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (panel.parentNode) {
                panel.parentNode.removeChild(panel);
            }
        }, 300);
    }
}

/**
 * Criar HTML do painel
 */
function createPanelHTML() {
    return `
        <h2 style="color: white !important; border-bottom: 3px solid rgba(255,255,255,0.3) !important; position: relative; z-index: 2;">
            🎨 Customização Visual Avançada
        </h2>
        
        <div class="customization-group" style="background: rgba(255,255,255,0.1) !important; padding: 25px !important; border-radius: 12px !important; margin: 25px 0 !important; position: relative; z-index: 2;">
            <h3 style="color: white !important; margin-bottom: 20px !important;">🌟 Configurações Globais</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Tema Predefinido</label>
                    <select class="customization-control" id="globalTheme" onchange="applyThemePreset()">
                        <option value="professional">Profissional</option>
                        <option value="modern">Moderno</option>
                        <option value="elegant">Elegante</option>
                        <option value="creative">Criativo</option>
                        <option value="minimalist">Minimalista</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Estilo de Bordas</label>
                    <select class="customization-control" id="borderStyle" onchange="applyGlobalSettings()">
                        <option value="rounded">Arredondadas</option>
                        <option value="sharp">Afiadas</option>
                        <option value="soft">Suaves</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Nível de Animações</label>
                    <select class="customization-control" id="animationLevel" onchange="applyGlobalSettings()">
                        <option value="full">Completas</option>
                        <option value="reduced">Reduzidas</option>
                        <option value="minimal">Mínimas</option>
                        <option value="none">Nenhuma</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="customization-group" style="background: rgba(255,255,255,0.1) !important; padding: 25px !important; border-radius: 12px !important; margin: 25px 0 !important; position: relative; z-index: 2;">
            <h3 style="color: white !important; margin-bottom: 20px !important;">🎨 Cores Personalizadas</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Cor Primária</label>
                    <input type="color" class="customization-control" id="customPrimaryColor" 
                           value="#2c3e50" onchange="updateCustomColors()">
                </div>
                
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Cor Secundária</label>
                    <input type="color" class="customization-control" id="customSecondaryColor" 
                           value="#3498db" onchange="updateCustomColors()">
                </div>
                
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Cor de Destaque</label>
                    <input type="color" class="customization-control" id="customAccentColor" 
                           value="#e74c3c" onchange="updateCustomColors()">
                </div>
            </div>
            
            <div id="colorPreviewCustom" style="display: flex !important; gap: 10px !important; margin-top: 15px !important; justify-content: center !important; flex-wrap: wrap !important; position: relative; z-index: 2;">
                <!-- Preview será preenchido dinamicamente -->
            </div>
        </div>
        
        <div class="customization-group" style="background: rgba(255,255,255,0.1) !important; padding: 25px !important; border-radius: 12px !important; margin: 25px 0 !important; position: relative; z-index: 2;">
            <h3 style="color: white !important; margin-bottom: 20px !important;">📄 Configurações da Capa</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Posição do Logo na Capa</label>
                    <select class="customization-control" id="coverLogoPosition" onchange="updateCoverSettings()">
                        <option value="center">Centro</option>
                        <option value="top">Topo</option>
                        <option value="bottom">Inferior</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Estilo do Título</label>
                    <select class="customization-control" id="coverTitleStyle" onchange="updateCoverSettings()">
                        <option value="gradient">Gradiente</option>
                        <option value="solid">Cor Sólida</option>
                        <option value="outlined">Contornado</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group" style="margin-top: 20px;">
                <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Imagem de Fundo da Capa</label>
                <div class="file-input-wrapper" style="background: rgba(255,255,255,0.2) !important; border: 1px solid rgba(255,255,255,0.3) !important; color: white !important; padding: 10px 15px !important; border-radius: 6px !important; cursor: pointer !important; display: inline-block !important;">
                    <input type="file" id="coverBackgroundFile" accept="image/*" onchange="previewCoverBackground(this)" style="position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer;">
                    📁 Selecionar Imagem de Fundo
                </div>
                <div class="cover-preview" id="coverPreview" style="margin-top: 15px; min-height: 150px; border: 2px dashed rgba(255,255,255,0.3) !important; border-radius: 8px; background: rgba(255,255,255,0.05) !important; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6);">
                    Preview da Capa
                </div>
            </div>
        </div>
        
        <div class="customization-group" style="background: rgba(255,255,255,0.1) !important; padding: 25px !important; border-radius: 12px !important; margin: 25px 0 !important; position: relative; z-index: 2;">
            <h3 style="color: white !important; margin-bottom: 20px !important;">🖼️ Fundo do Cabeçalho</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Tipo de Fundo</label>
                    <select class="customization-control" id="headerBackgroundType" onchange="updateHeaderBackground()">
                        <option value="gradient">Gradiente</option>
                        <option value="image">Imagem</option>
                        <option value="solid">Cor Sólida</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Sobreposição</label>
                    <input type="range" class="customization-control" id="headerOverlay" min="0" max="1" step="0.1" value="0.3" onchange="updateHeaderBackground()" style="width: 100% !important;">
                    <small style="color: rgba(255,255,255,0.8) !important;">Escurecer fundo: <span id="overlayValue">30%</span></small>
                </div>
            </div>
            
            <div class="form-group" id="headerImageGroup" style="display: none; margin-top: 15px;">
                <label style="color: rgba(255,255,255,0.9) !important; font-weight: 500 !important; margin-bottom: 8px !important; display: block !important;">Imagem de Fundo do Cabeçalho</label>
                <div class="file-input-wrapper" style="background: rgba(255,255,255,0.2) !important; border: 1px solid rgba(255,255,255,0.3) !important; color: white !important; padding: 10px 15px !important; border-radius: 6px !important; cursor: pointer !important; display: inline-block !important;">
                    <input type="file" id="headerBackgroundFile" accept="image/*" onchange="previewHeaderBackground(this)" style="position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer;">
                    📁 Selecionar Imagem
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px; flex-wrap: wrap; position: relative; z-index: 2;">
            <button class="customization-btn" onclick="previewCustomizations()" 
                    style="background: rgba(255,255,255,0.9) !important; color: #4a90e2 !important; border: none !important; font-weight: 600 !important; padding: 12px 24px !important; border-radius: 8px !important; cursor: pointer !important;">
                👁️ Preview Customizações
            </button>
            <button class="customization-btn" onclick="saveCustomizations()"
                    style="background: #27ae60 !important; color: white !important; border: none !important; font-weight: 600 !important; padding: 12px 24px !important; border-radius: 8px !important; cursor: pointer !important;">
                💾 Salvar Customizações
            </button>
            <button class="customization-btn" onclick="resetCustomizations()"
                    style="background: #f39c12 !important; color: white !important; border: none !important; font-weight: 600 !important; padding: 12px 24px !important; border-radius: 8px !important; cursor: pointer !important;">
                🔄 Resetar Tudo
            </button>
            <button class="customization-btn" onclick="exportCustomizationConfig()"
                    style="background: #17a2b8 !important; color: white !important; border: none !important; font-weight: 600 !important; padding: 12px 24px !important; border-radius: 8px !important; cursor: pointer !important;">
                📤 Exportar Config
            </button>
        </div>
    `;
}

// ============================================================================
// APLICAÇÃO DE CUSTOMIZAÇÕES
// ============================================================================

/**
 * Aplicar tema predefinido
 */
function applyThemePreset() {
    const selectedTheme = document.getElementById('globalTheme')?.value;
    if (!selectedTheme || !themePresets[selectedTheme]) return;
    
    const theme = themePresets[selectedTheme];
    
    // Atualizar dados de customização
    customizationData.global.theme = selectedTheme;
    customizationData.colors = { ...customizationData.colors, ...theme.colors };
    customizationData.typography = { ...customizationData.typography, ...theme.typography };
    customizationData.global.borderStyle = theme.borderStyle;
    customizationData.global.animationLevel = theme.animationLevel;
    
    // Atualizar campos na interface
    updateInterfaceFields();
    
    // Aplicar mudanças
    applyAllCustomizations();
    
    BrandManualUtils.showSuccess(`Tema "${selectedTheme}" aplicado com sucesso!`);
}

/**
 * Aplicar configurações globais
 */
function applyGlobalSettings() {
    const borderStyle = document.getElementById('borderStyle')?.value;
    const animationLevel = document.getElementById('animationLevel')?.value;
    
    if (borderStyle) {
        customizationData.global.borderStyle = borderStyle;
        applyBorderStyles();
    }
    
    if (animationLevel) {
        customizationData.global.animationLevel = animationLevel;
        applyAnimationSettings();
    }
    
    saveCustomizationData();
}

/**
 * Atualizar cores customizadas
 */
function updateCustomColors() {
    const primary = document.getElementById('customPrimaryColor')?.value;
    const secondary = document.getElementById('customSecondaryColor')?.value;
    const accent = document.getElementById('customAccentColor')?.value;
    
    if (primary) customizationData.colors.primary = primary;
    if (secondary) customizationData.colors.secondary = secondary;
    if (accent) customizationData.colors.accent = accent;
    
    updateColorPreview();
    applyColorsToPage();
    saveCustomizationData();
}

/**
 * Atualizar configurações da capa
 */
function updateCoverSettings() {
    const logoPosition = document.getElementById('coverLogoPosition')?.value;
    const titleStyle = document.getElementById('coverTitleStyle')?.value;
    
    if (logoPosition) customizationData.coverPage.logoPosition = logoPosition;
    if (titleStyle) customizationData.coverPage.titleStyle = titleStyle;
    
    updateCoverPreview();
    saveCustomizationData();
}

/**
 * Atualizar fundo do header
 */
function updateHeaderBackground() {
    const typeEl = document.getElementById('headerBackgroundType');
    const overlayEl = document.getElementById('headerOverlay');
    const imageGroup = document.getElementById('headerImageGroup');
    const overlayValue = document.getElementById('overlayValue');
    
    if (!typeEl || !overlayEl) return;
    
    const type = typeEl.value;
    const overlay = overlayEl.value;
    
    // Mostrar/esconder upload de imagem
    if (imageGroup) {
        imageGroup.style.display = type === 'image' ? 'block' : 'none';
    }
    
    // Atualizar valor do overlay
    if (overlayValue) {
        overlayValue.textContent = Math.round(overlay * 100) + '%';
    }
    
    customizationData.headerBackground.type = type;
    customizationData.headerBackground.overlay = `rgba(0,0,0,${overlay})`;
    
    applyHeaderBackground();
    saveCustomizationData();
}

/**
 * Preview da imagem de fundo da capa
 */
function previewCoverBackground(input) {
    const preview = document.getElementById('coverPreview');
    if (!preview) return;
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            customizationData.coverPage.backgroundImage = e.target.result;
            updateCoverPreview();
            saveCustomizationData();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Preview da imagem de fundo do header
 */
function previewHeaderBackground(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            customizationData.headerBackground.image = e.target.result;
            updateHeaderBackground();
            saveCustomizationData();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Aplicar cores à página
 */
function applyColorsToPage() {
    const root = document.documentElement;
    const colors = customizationData.colors;
    
    // Aplicar variáveis CSS
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
    
    // Atualizar header se existir
    const header = document.querySelector('.header');
    if (header) {
        header.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    }
    
    // Atualizar títulos das seções
    const sectionTitles = document.querySelectorAll('.section h2');
    sectionTitles.forEach(title => {
        title.style.color = colors.primary;
        title.style.borderBottomColor = colors.secondary;
    });
    
    // Atualizar botões primários
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.style.backgroundColor = colors.secondary;
    });
}

/**
 * Aplicar estilos de borda
 */
function applyBorderStyles() {
    const borderStyle = customizationData.global.borderStyle;
    let borderRadius = '12px';
    
    switch (borderStyle) {
        case 'sharp':
            borderRadius = '0px';
            break;
        case 'soft':
            borderRadius = '6px';
            break;
        case 'rounded':
        default:
            borderRadius = '12px';
            break;
    }
    
    const elements = document.querySelectorAll('.section, .btn, .form-control');
    elements.forEach(element => {
        element.style.borderRadius = borderRadius;
    });
}

/**
 * Aplicar configurações de animação
 */
function applyAnimationSettings() {
    const animationLevel = customizationData.global.animationLevel;
    const root = document.documentElement;
    
    switch (animationLevel) {
        case 'none':
            root.style.setProperty('--animation-duration', '0s');
            break;
        case 'minimal':
            root.style.setProperty('--animation-duration', '0.1s');
            break;
        case 'reduced':
            root.style.setProperty('--animation-duration', '0.2s');
            break;
        case 'full':
        default:
            root.style.setProperty('--animation-duration', '0.3s');
            break;
    }
}

/**
 * Aplicar fundo do header
 */
function applyHeaderBackground() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const type = customizationData.headerBackground.type;
    const colors = customizationData.colors;
    
    switch (type) {
        case 'gradient':
            header.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
            break;
            
        case 'image':
            if (customizationData.headerBackground.image) {
                header.style.background = `
                    linear-gradient(${customizationData.headerBackground.overlay}, ${customizationData.headerBackground.overlay}),
                    url('${customizationData.headerBackground.image}') center/cover
                `;
            }
            break;
            
        case 'solid':
            header.style.background = colors.primary;
            break;
    }
}

/**
 * Atualizar preview da capa
 */
function updateCoverPreview() {
    const preview = document.getElementById('coverPreview');
    if (!preview) return;
    
    // Obter dados do formulário
    let data = {};
    try {
        if (window.BrandManualStorage && typeof window.BrandManualStorage.collectFormData === 'function') {
            data = window.BrandManualStorage.collectFormData();
        } else {
            const hotelNameEl = document.getElementById('hotelName');
            data.hotelName = hotelNameEl ? hotelNameEl.value : 'Nome do Hotel';
        }
    } catch (error) {
        data = { hotelName: 'Nome do Hotel' };
    }
    
    const logoImg = document.querySelector('#logoPreview img');
    const colors = customizationData.colors;
    
    let backgroundStyle = '';
    if (customizationData.coverPage.backgroundImage) {
        backgroundStyle = `
            background: linear-gradient(${customizationData.coverPage.backgroundOverlay}, ${customizationData.coverPage.backgroundOverlay}), 
                       url('${customizationData.coverPage.backgroundImage}') center/cover;
        `;
    } else {
        backgroundStyle = `background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});`;
    }
    
    const titleStyle = getTitleStyle();
    
    preview.innerHTML = `
        <div style="${backgroundStyle} width: 100%; height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: ${customizationData.coverPage.logoPosition}; color: white; padding: 30px; border-radius: 8px; text-align: center;">
            ${logoImg ? `<img src="${logoImg.src}" style="max-width: 150px; max-height: 60px; margin-bottom: 20px;">` : ''}
            <h1 style="font-size: 2.5rem; margin: 10px 0; ${titleStyle}">${data.hotelName || 'Nome do Hotel'}</h1>
            <p style="font-size: 1.2rem; opacity: 0.9;">Manual da Marca</p>
        </div>
    `;
}

/**
 * Obter estilo do título
 */
function getTitleStyle() {
    const style = customizationData.coverPage.titleStyle;
    const colors = customizationData.colors;
    
    switch (style) {
        case 'gradient':
            return `background: linear-gradient(45deg, ${colors.secondary}, ${colors.accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;`;
        case 'solid':
            return `color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);`;
        case 'outlined':
            return `color: transparent; -webkit-text-stroke: 2px white; font-weight: bold;`;
        default:
            return 'color: white; font-weight: bold;';
    }
}

/**
 * Aplicar todas as customizações
 */
function applyAllCustomizations() {
    try {
        console.log('[Customization] Aplicando todas as customizações...');
        
        applyColorsToPage();
        applyBorderStyles();
        applyAnimationSettings();
        applyHeaderBackground();
        updateColorPreview();
        
        console.log('[Customization] ✅ Todas as customizações aplicadas');
    } catch (error) {
        console.error('[Customization] ❌ Erro ao aplicar customizações:', error);
    }
}

// ============================================================================
// FUNÇÕES DE CONTROLE
// ============================================================================

/**
 * Preview das customizações
 */
function previewCustomizations() {
    try {
        applyAllCustomizations();
        BrandManualUtils.showSuccess('Customizações aplicadas! Use o Preview geral para ver o resultado final.');
    } catch (error) {
        console.error('[Customization] Erro no preview:', error);
        BrandManualUtils.showError('Erro ao aplicar preview das customizações');
    }
}

/**
 * Salvar customizações
 */
function saveCustomizations() {
    try {
        // Salvar no localStorage
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('brandManualCustomizations', JSON.stringify(customizationData));
            localStorage.setItem('brandManualAdvancedCustomizations', JSON.stringify(customizationData));
        }
        
        // Criar arquivo para download
        let customData = {
            _customizations: customizationData,
            _savedAt: new Date().toISOString(),
            _version: '2.2'
        };
        
        // Adicionar dados do formulário se disponível
        try {
            if (window.BrandManualStorage && window.BrandManualStorage.collectFormData) {
                Object.assign(customData, window.BrandManualStorage.collectFormData());
            }
        } catch (error) {
            console.warn('[Customization] Não foi possível coletar dados do formulário:', error);
        }
        
        const blob = new Blob([JSON.stringify(customData, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const hotelName = customData.hotelName || 'hotel';
        const timestamp = new Date().toISOString().slice(0, 10);
        
        a.href = url;
        a.download = `manual-customizado-${hotelName}-${timestamp}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        BrandManualUtils.showSuccess('Customizações salvas com sucesso!');
        
    } catch (error) {
        console.error('[Customization] Erro ao salvar:', error);
        BrandManualUtils.showError('Erro ao salvar customizações');
    }
}

/**
 * Resetar customizações
 */
function resetCustomizations() {
    if (confirm('⚠️ Tem certeza que deseja resetar todas as customizações?')) {
        // Reset para valores padrão
        customizationData = {
            coverPage: {
                enabled: true,
                backgroundImage: null,
                backgroundOverlay: 'rgba(0,0,0,0.4)',
                logoPosition: 'center',
                titleStyle: 'gradient'
            },
            headerBackground: {
                type: 'gradient',
                image: null,
                overlay: 'rgba(0,0,0,0.3)',
                customGradient: null
            },
            global: {
                theme: 'professional',
                borderStyle: 'rounded',
                animationLevel: 'full',
                maxWidth: '1200px',
                sectionSpacing: 30,
                backgroundType: 'solid',
                backgroundColor: '#f8f9fa'
            },
            typography: {
                primaryFont: 'Arial',
                secondaryFont: 'Arial',
                baseFontSize: 1.0,
                headingWeight: 'normal',
                lineHeight: 1.6
            },
            colors: {
                primary: '#2c3e50',
                secondary: '#3498db',
                accent: '#e74c3c',
                success: '#27ae60',
                warning: '#f39c12',
                danger: '#e74c3c'
            },
            sections: {}
        };
        
        // Reinicializar seções
        initializeDefaultSections();
        
        // Remover do localStorage
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem('brandManualCustomizations');
            localStorage.removeItem('brandManualAdvancedCustomizations');
        }
        
        // Atualizar interface
        updateInterfaceFields();
        
        // Aplicar mudanças
        applyAllCustomizations();
        
        BrandManualUtils.showSuccess('Customizações resetadas para valores padrão!');
    }
}

/**
 * Exportar configuração de customização
 */
function exportCustomizationConfig() {
    try {
        const configData = {
            version: '2.2',
            timestamp: new Date().toISOString(),
            customizations: customizationData
        };
        
        const blob = new Blob([JSON.stringify(configData, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        
        a.href = url;
        a.download = `customizacao-config-${timestamp}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        BrandManualUtils.showSuccess('Configuração exportada com sucesso!');
        
    } catch (error) {
        console.error('[Customization] Erro ao exportar configuração:', error);
        BrandManualUtils.showError('Erro ao exportar configuração');
    }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Configurar event listeners do painel
 */
function setupPanelEventListeners() {
    // Adicionar styles CSS necessários
    addCustomizationStyles();
    
    // Auto-save nas mudanças
    const controls = document.querySelectorAll('.customization-control');
    controls.forEach(control => {
        control.addEventListener('change', saveCustomizationData);
        control.addEventListener('input', saveCustomizationData);
    });
    
    // Hover effects nos botões
    const buttons = document.querySelectorAll('.customization-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Adicionar estilos CSS para customização
 */
function addCustomizationStyles() {
    if (document.getElementById('customization-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'customization-styles';
    style.textContent = `
        .customization-control {
            width: 100% !important;
            padding: 10px 12px !important;
            background: rgba(255,255,255,0.15) !important;
            border: 1px solid rgba(255,255,255,0.3) !important;
            color: white !important;
            border-radius: 6px !important;
            transition: all 0.3s ease !important;
            font-size: 14px !important;
        }
        
        .customization-control:focus {
            background: rgba(255,255,255,0.25) !important;
            border-color: rgba(255,255,255,0.6) !important;
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(255,255,255,0.1) !important;
        }
        
        .customization-control:hover {
            background: rgba(255,255,255,0.2) !important;
            border-color: rgba(255,255,255,0.4) !important;
        }
        
        .customization-control option {
            background: #4a90e2 !important;
            color: white !important;
            padding: 8px !important;
        }
        
        .customization-control[type="color"] {
            width: 60px !important;
            height: 40px !important;
            padding: 4px !important;
            border-radius: 8px !important;
            cursor: pointer !important;
        }
        
        .customization-control[type="color"]:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
        }
        
        .customization-control[type="range"] {
            background: rgba(255,255,255,0.2) !important;
            outline: none !important;
            height: 6px !important;
            border-radius: 3px !important;
        }
        
        .customization-control[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none !important;
            appearance: none !important;
            width: 18px !important;
            height: 18px !important;
            border-radius: 50% !important;
            background: white !important;
            cursor: pointer !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3) !important;
        }
        
        .customization-btn {
            transition: all 0.3s ease !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
        }
        
        @keyframes slideInFromTop {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .file-input-wrapper {
            position: relative !important;
        }
        
        .file-input-wrapper input[type="file"] {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            opacity: 0 !important;
            cursor: pointer !important;
        }
        
        .customization-group:hover {
            background: rgba(255,255,255,0.15) !important;
            border-color: rgba(255,255,255,0.3) !important;
        }
        
        @media (max-width: 768px) {
            .customization-control[type="color"] {
                width: 80px !important;
                height: 50px !important;
            }
            
            .customization-btn {
                width: 100% !important;
                justify-content: center !important;
                margin-bottom: 10px !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Atualizar preview de cores
 */
function updateColorPreview() {
    const preview = document.getElementById('colorPreviewCustom');
    if (!preview) return;
    
    const colors = customizationData.colors;
    
    preview.innerHTML = `
        <div style="width: 60px; height: 40px; background: ${colors.primary}; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: all 0.3s ease;">PRIM</div>
        <div style="width: 60px; height: 40px; background: ${colors.secondary}; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: all 0.3s ease;">SEC</div>
        <div style="width: 60px; height: 40px; background: ${colors.accent}; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: all 0.3s ease;">DEST</div>
    `;
    
    // Adicionar hover effects
    const swatches = preview.querySelectorAll('div');
    swatches.forEach(swatch => {
        swatch.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        });
        
        swatch.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        });
    });
}

/**
 * Atualizar campos da interface
 */
function updateInterfaceFields() {
    const globalTheme = document.getElementById('globalTheme');
    if (globalTheme) globalTheme.value = customizationData.global.theme;
    
    const borderStyle = document.getElementById('borderStyle');
    if (borderStyle) borderStyle.value = customizationData.global.borderStyle;
    
    const animationLevel = document.getElementById('animationLevel');
    if (animationLevel) animationLevel.value = customizationData.global.animationLevel;
    
    const coverLogoPosition = document.getElementById('coverLogoPosition');
    if (coverLogoPosition) coverLogoPosition.value = customizationData.coverPage.logoPosition;
    
    const coverTitleStyle = document.getElementById('coverTitleStyle');
    if (coverTitleStyle) coverTitleStyle.value = customizationData.coverPage.titleStyle;
    
    const headerBackgroundType = document.getElementById('headerBackgroundType');
    if (headerBackgroundType) headerBackgroundType.value = customizationData.headerBackground.type;
    
    updateColorInputs();
    updateColorPreview();
    updateCoverPreview();
}

/**
 * Atualizar inputs de cor
 */
function updateColorInputs() {
    const primaryInput = document.getElementById('customPrimaryColor');
    if (primaryInput) primaryInput.value = customizationData.colors.primary;
    
    const secondaryInput = document.getElementById('customSecondaryColor');
    if (secondaryInput) secondaryInput.value = customizationData.colors.secondary;
    
    const accentInput = document.getElementById('customAccentColor');
    if (accentInput) accentInput.value = customizationData.colors.accent;
}

/**
 * Carregar dados de customização
 */
function loadCustomizationData() {
    try {
        let saved = null;
        
        if (typeof(Storage) !== "undefined") {
            // Tentar carregar versão avançada primeiro
            saved = localStorage.getItem('brandManualAdvancedCustomizations');
            
            // Fallback para versão original
            if (!saved) {
                saved = localStorage.getItem('brandManualCustomizations');
            }
        }
        
        if (saved) {
            const savedData = JSON.parse(saved);
            customizationData = { ...customizationData, ...savedData };
            
            console.log('[Customization] ✅ Dados carregados do localStorage');
        }
    } catch (error) {
        console.error('[Customization] Erro ao carregar dados:', error);
        
        // Limpar dados corrompidos
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem('brandManualCustomizations');
            localStorage.removeItem('brandManualAdvancedCustomizations');
        }
    }
}

/**
 * Salvar dados de customização
 */
function saveCustomizationData() {
    try {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('brandManualAdvancedCustomizations', JSON.stringify(customizationData));
        }
    } catch (error) {
        console.error('[Customization] Erro no auto-save:', error);
    }
}

// ============================================================================
// EXPORTAÇÃO E INTEGRAÇÃO
// ============================================================================

/**
 * Obter dados de customização
 */
function getCustomizationData() {
    return customizationData;
}

/**
 * Aplicar customizações ao export
 */
function applyCustomizationsToExport(htmlContent) {
    const colors = customizationData.colors;
    
    // Injetar CSS personalizado
    const customCSS = `
        <style>
        :root {
            --primary-color: ${colors.primary};
            --secondary-color: ${colors.secondary};
            --accent-color: ${colors.accent};
        }
        
        .header {
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}) !important;
        }
        
        .section h2 {
            color: ${colors.primary} !important;
            border-bottom-color: ${colors.secondary} !important;
        }
        
        .btn-primary {
            background: ${colors.secondary} !important;
        }
        </style>
    `;
    
    return htmlContent.replace('</head>', customCSS + '</head>');
}

// ============================================================================
// EXPORTAÇÃO GLOBAL
// ============================================================================

// Exportar para uso global
window.BrandManualCustomization = {
    // Funções principais
    initCustomization,
    toggleCustomizationPanel,
    previewCustomizations,
    saveCustomizations,
    resetCustomizations,
    exportCustomizationConfig,
    
    // Funções de configuração
    updateCoverSettings,
    previewCoverBackground,
    previewHeaderBackground,
    updateHeaderBackground,
    applyThemePreset,
    applyGlobalSettings,
    updateCustomColors,
    
    // Aplicação
    applyAllCustomizations,
    applyCustomizationsToExport,
    
    // Getters/Setters
    getCustomizationData,
    get customizationData() { return customizationData; },
    set customizationData(data) { customizationData = data; },
    get isPanelVisible() { return showCustomizationPanel; }
};

// Funções globais para compatibilidade com HTML inline
window.toggleCustomizationPanel = toggleCustomizationPanel;
window.updateCoverSettings = updateCoverSettings;
window.previewCoverBackground = previewCoverBackground;
window.updateHeaderBackground = updateHeaderBackground;
window.previewHeaderBackground = previewHeaderBackground;
window.previewCustomizations = previewCustomizations;
window.saveCustomizations = saveCustomizations;
window.resetCustomizations = resetCustomizations;
window.applyThemePreset = applyThemePreset;
window.applyGlobalSettings = applyGlobalSettings;
window.updateCustomColors = updateCustomColors;
window.exportCustomizationConfig = exportCustomizationConfig;

// ============================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================================

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initCustomization();
    }, 1000);
});

// Executar se DOM já estiver carregado
if (document.readyState === 'loading') {
    // DOM ainda carregando, aguardar evento
} else {
    // DOM já carregado
    setTimeout(() => {
        initCustomization();
    }, 500);
}

// ============================================================================
// LOGS FINAIS E INFORMAÇÕES
// ============================================================================

console.log('[Customization] Sistema de Customização Avançada carregado - Versão 2.2 CORRIGIDA');
console.log('[Customization] Principais correções aplicadas:');
console.log('- ✅ Inicialização mais robusta');
console.log('- ✅ Gerenciamento de estado simplificado');
console.log('- ✅ Melhor tratamento de erros');
console.log('- ✅ Interface mais estável');
console.log('- ✅ Compatibilidade melhorada');
console.log('- ✅ CSS com prioridade garantida');
console.log('- ✅ Event listeners mais seguros');
console.log('- ✅ Auto-save funcional');
console.log('- ✅ Preview em tempo real');
console.log('- ✅ Responsividade otimizada');