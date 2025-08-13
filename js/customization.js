/**
 * Sistema de Customização Avançada do Manual da Marca - VERSÃO FINAL
 * Versão completa e otimizada com todas as funcionalidades
 */

// ============================================================================
// CONFIGURAÇÃO INICIAL E DADOS
// ============================================================================

// Estado dinâmico do painel de customização
let showCustomizationPanel = false;

// Dados de customização global
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
    sections: {
        'info-basicas': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '🏢',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'grid',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'identidade': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '🎯',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'list',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'logotipo': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '🎨',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'centered',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'cores': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '🎨',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'palette',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'tipografia': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '✏️',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'grid',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'tom-voz': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '🗣️',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'list',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'aplicacoes': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '📋',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'grid',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'redes-sociais': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '📱',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'grid',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        },
        'contatos': {
            enabled: true,
            backgroundColor: '#f8f9fa',
            icon: '📞',
            titleColor: '#2c3e50',
            customTitle: null,
            layout: 'grid',
            animation: 'fadeIn',
            borderRadius: '12px',
            padding: '30px',
            shadow: '0 5px 15px rgba(0,0,0,0.08)',
            customCSS: ''
        }
    }
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

// Ícones disponíveis
const availableIcons = [
    '🏢', '🎯', '🎨', '✏️', '🗣️', '📋', '📱', '📞',
    '🏨', '🌟', '💎', '🎭', '🚀', '💡', '📊', '🔧',
    '⭐', '🎪', '🎬', '🎵', '🎮', '🎲', '🎳', '🎯',
    '📚', '📝', '📰', '📄', '📑', '📈', '📉', '📊',
    '💼', '💰', '💳', '💎', '👑', '🔐', '🔑', '🔓'
];

// ============================================================================
// FUNÇÕES PRINCIPAIS DE INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializar sistema de customização
 */
function initCustomization() {
    console.log('[Customization] Inicializando sistema...');
    
    try {
        // Verificar estado salvo do painel
        if (typeof(Storage) !== "undefined") {
            const savedState = localStorage.getItem('brandManual_customizationPanelVisible');
            if (savedState !== null) {
                showCustomizationPanel = savedState === 'true';
            }
        }
        
        // Criar ou remover painel baseado no estado
        if (showCustomizationPanel) {
            createCustomizationPanel();
            createAdvancedTabs();
            setupAdvancedListeners();
        } else {
            // Remover painel se existir
            const existingPanel = document.getElementById('customization');
            if (existingPanel) {
                existingPanel.remove();
            }
        }
        
        loadCustomizationData();
        
        // Aguardar um pouco antes de aplicar customizações
        setTimeout(() => {
            applyAllCustomizations();
        }, 500);
        
        console.log('[Customization] Sistema inicializado com sucesso');
    } catch (error) {
        console.error('[Customization] Erro na inicialização:', error);
    }
}

/**
 * Alternar visibilidade do painel de customização
 */
function toggleCustomizationPanel(show) {
    showCustomizationPanel = show;
    
    // Salvar preferência
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('brandManual_customizationPanelVisible', show.toString());
    }
    
    if (show) {
        // Criar painel se não existir
        if (!document.getElementById('customization')) {
            createCustomizationPanel();
            createAdvancedTabs();
            setupAdvancedListeners();
            
            // Aplicar animação de entrada
            setTimeout(() => {
                const panel = document.getElementById('customization');
                if (panel) {
                    panel.style.animation = 'slideInFromTop 0.6s ease-out';
                }
            }, 100);
        }
    } else {
        // Remover painel com animação
        const panel = document.getElementById('customization');
        if (panel) {
            panel.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                panel.remove();
            }, 300);
        }
    }
    
    console.log('[Customization] Painel', show ? 'mostrado' : 'oculto');
}

/**
 * Criar painel de customização
 */
function createCustomizationPanel() {
    console.log('[Customization] Criando painel...');
    
    const container = document.querySelector('.container');
    if (!container) {
        console.error('[Customization] Container não encontrado');
        return;
    }
    
    const customizationSection = document.createElement('section');
    customizationSection.className = 'section customization-panel';
    customizationSection.id = 'customization';
    
    customizationSection.innerHTML = `
        <h2>🎨 Customização Visual Avançada</h2>
        
        <!-- Controles originais da capa -->
        <div class="customization-group">
            <h3>📄 Capa do Manual</h3>
            <div class="grid grid-2">
                <div class="form-group">
                    <label>Posição do Logo na Capa</label>
                    <select class="form-control" id="coverLogoPosition" onchange="updateCoverSettings()">
                        <option value="center">Centro</option>
                        <option value="top">Topo</option>
                        <option value="bottom">Inferior</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estilo do Título</label>
                    <select class="form-control" id="coverTitleStyle" onchange="updateCoverSettings()">
                        <option value="gradient">Gradiente</option>
                        <option value="solid">Cor Sólida</option>
                        <option value="outlined">Contornado</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label>Imagem de Fundo da Capa</label>
                <div class="file-input-wrapper">
                    <input type="file" id="coverBackgroundFile" accept="image/*" onchange="previewCoverBackground(this)">
                    📁 Selecionar Imagem de Fundo
                </div>
                <div class="cover-preview" id="coverPreview" style="margin-top: 15px; min-height: 200px; border: 2px dashed #ddd; border-radius: 8px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #6c757d;">
                    Preview da Capa
                </div>
            </div>
        </div>

        <!-- Configurações globais -->
        <div class="customization-group">
            <h3>🌐 Configurações Globais</h3>
            <div class="grid grid-3">
                <div class="form-group">
                    <label>Tema Predefinido</label>
                    <select class="form-control" id="globalTheme" onchange="applyThemePreset()">
                        <option value="professional">Profissional</option>
                        <option value="modern">Moderno</option>
                        <option value="elegant">Elegante</option>
                        <option value="creative">Criativo</option>
                        <option value="minimalist">Minimalista</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estilo de Bordas</label>
                    <select class="form-control" id="borderStyle" onchange="applyGlobalSettings()">
                        <option value="rounded">Arredondadas</option>
                        <option value="sharp">Afiadas</option>
                        <option value="soft">Suaves</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nível de Animações</label>
                    <select class="form-control" id="animationLevel" onchange="applyGlobalSettings()">
                        <option value="full">Completas</option>
                        <option value="reduced">Reduzidas</option>
                        <option value="minimal">Mínimas</option>
                        <option value="none">Nenhuma</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Header Background -->
        <div class="customization-group">
            <h3>🖼️ Fundo do Cabeçalho</h3>
            <div class="grid grid-3">
                <div class="form-group">
                    <label>Tipo de Fundo</label>
                    <select class="form-control" id="headerBackgroundType" onchange="updateHeaderBackground()">
                        <option value="gradient">Gradiente</option>
                        <option value="image">Imagem</option>
                        <option value="solid">Cor Sólida</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Sobreposição</label>
                    <input type="range" class="form-control" id="headerOverlay" min="0" max="1" step="0.1" value="0.3" onchange="updateHeaderBackground()">
                    <small>Escurecer fundo: <span id="overlayValue">30%</span></small>
                </div>
                <div class="form-group" id="headerImageGroup" style="display: none;">
                    <label>Imagem de Fundo</label>
                    <div class="file-input-wrapper">
                        <input type="file" id="headerBackgroundFile" accept="image/*" onchange="previewHeaderBackground(this)">
                        📁 Selecionar
                    </div>
                </div>
            </div>
        </div>

        <!-- Container para tabs avançadas -->
        <div class="advanced-tabs" id="advancedTabsContainer">
            <!-- Será preenchido pela função createAdvancedTabs() -->
        </div>

        <!-- Controles -->
        <div class="customization-controls">
            <button class="btn btn-primary" onclick="previewCustomizations()">👁️ Preview Customizações</button>
            <button class="btn btn-success" onclick="saveCustomizations()">💾 Salvar Customizações</button>
            <button class="btn btn-warning" onclick="resetCustomizations()">🔄 Resetar</button>
            <button class="btn btn-info" onclick="exportCustomizationConfig()">📤 Exportar Config</button>
            <button class="btn btn-secondary" onclick="importCustomizationConfig()">📥 Importar Config</button>
        </div>
    `;
    
    // Inserir antes da primeira seção
    const firstSection = container.querySelector('.section:not(.customization-panel)');
    if (firstSection) {
        container.insertBefore(customizationSection, firstSection);
    } else {
        container.appendChild(customizationSection);
    }
}

// ============================================================================
// FUNÇÕES ORIGINAIS MANTIDAS
// ============================================================================

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
        };
        reader.readAsDataURL(input.files[0]);
    }
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
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Atualizar configurações da capa
 */
function updateCoverSettings() {
    const logoPositionEl = document.getElementById('coverLogoPosition');
    const titleStyleEl = document.getElementById('coverTitleStyle');
    
    if (logoPositionEl) {
        customizationData.coverPage.logoPosition = logoPositionEl.value;
    }
    
    if (titleStyleEl) {
        customizationData.coverPage.titleStyle = titleStyleEl.value;
    }
    
    updateCoverPreview();
}

/**
 * Atualizar preview da capa
 */
function updateCoverPreview() {
    const preview = document.getElementById('coverPreview');
    if (!preview) return;
    
    // Tentar usar BrandManualStorage se disponível
    let data = {};
    try {
        if (window.BrandManualStorage && typeof window.BrandManualStorage.collectFormData === 'function') {
            data = window.BrandManualStorage.collectFormData();
        } else {
            // Fallback: coletar dados básicos
            const hotelNameEl = document.getElementById('hotelName');
            data.hotelName = hotelNameEl ? hotelNameEl.value : 'Nome do Hotel';
            data.primaryColor = customizationData.colors.primary;
            data.secondaryColor = customizationData.colors.secondary;
        }
    } catch (error) {
        console.warn('[Customization] Erro ao coletar dados do formulário:', error);
        data = {
            hotelName: 'Nome do Hotel',
            primaryColor: customizationData.colors.primary,
            secondaryColor: customizationData.colors.secondary
        };
    }
    
    const logoImg = document.querySelector('#logoPreview img');
    
    let backgroundStyle = '';
    if (customizationData.coverPage.backgroundImage) {
        backgroundStyle = `
            background: linear-gradient(${customizationData.coverPage.backgroundOverlay}, ${customizationData.coverPage.backgroundOverlay}), 
                       url('${customizationData.coverPage.backgroundImage}') center/cover;
        `;
    } else {
        backgroundStyle = `background: linear-gradient(135deg, ${data.primaryColor || '#2c3e50'}, ${data.secondaryColor || '#3498db'});`;
    }
    
    preview.innerHTML = `
        <div style="${backgroundStyle} width: 100%; height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: ${customizationData.coverPage.logoPosition}; color: white; padding: 30px; border-radius: 8px; text-align: center;">
            ${logoImg ? `<img src="${logoImg.src}" style="max-width: 150px; max-height: 60px; margin-bottom: 20px;">` : ''}
            <h1 style="font-size: 2.5rem; margin: 10px 0; ${getTitleStyle()}">${data.hotelName || 'Nome do Hotel'}</h1>
            <p style="font-size: 1.2rem; opacity: 0.9;">Manual da Marca</p>
        </div>
    `;
}

/**
 * Obter estilo do título
 */
function getTitleStyle() {
    const style = customizationData.coverPage.titleStyle;
    
    switch (style) {
        case 'gradient':
            return `background: linear-gradient(45deg, ${customizationData.colors.secondary}, ${customizationData.colors.accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;`;
        case 'solid':
            return `color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);`;
        case 'outlined':
            return `color: transparent; -webkit-text-stroke: 2px white; font-weight: bold;`;
        default:
            return 'color: white; font-weight: bold;';
    }
}

/**
 * Aplicar fundo do header
 */
function applyHeaderBackground() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const type = customizationData.headerBackground.type;
    
    switch (type) {
        case 'gradient':
            header.style.background = `linear-gradient(135deg, ${customizationData.colors.primary}, ${customizationData.colors.secondary})`;
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
            header.style.background = customizationData.colors.primary;
            break;
    }
}

// ============================================================================
// FUNCIONALIDADES EXPANDIDAS
// ============================================================================

/**
 * Criar tabs avançadas
 */
function createAdvancedTabs() {
    const container = document.getElementById('advancedTabsContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="advanced-tabs-header">
            <h3>🔧 Customização Avançada</h3>
            <div class="tabs-nav">
                <button class="tab-btn active" onclick="switchAdvancedTab('sections')">📋 Seções</button>
                <button class="tab-btn" onclick="switchAdvancedTab('colors')">🎨 Cores</button>
                <button class="tab-btn" onclick="switchAdvancedTab('typography')">✏️ Tipografia</button>
                <button class="tab-btn" onclick="switchAdvancedTab('layout')">📐 Layout</button>
            </div>
        </div>
        
        <div class="tabs-content">
            ${generateSectionsTab()}
            ${generateColorsTab()}
            ${generateTypographyTab()}
            ${generateLayoutTab()}
        </div>
    `;
    
    // Inicializar primeira aba
    switchAdvancedTab('sections');
}

/**
 * Alternar entre tabs
 */
function switchAdvancedTab(tabName) {
    // Remover classe active de todas as tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });
    
    // Ativar tab selecionada
    const tabBtn = document.querySelector(`[onclick*="switchAdvancedTab('${tabName}')"]`);
    if (tabBtn) tabBtn.classList.add('active');
    
    const tabContent = document.getElementById(`tab-${tabName}`);
    if (tabContent) {
        tabContent.style.display = 'block';
        tabContent.classList.add('active');
    }
}

/**
 * Gerar aba de seções
 */
function generateSectionsTab() {
    return `
        <div class="tab-content active" id="tab-sections">
            <h4>📋 Personalizar Seções Individuais</h4>
            <div class="sections-customizer" id="sectionsCustomizer">
                ${generateSectionCards()}
            </div>
        </div>
    `;
}

/**
 * Gerar cards das seções
 */
function generateSectionCards() {
    const sectionNames = {
        'info-basicas': 'Informações Básicas',
        'identidade': 'Identidade da Marca', 
        'logotipo': 'Logotipo',
        'cores': 'Paleta de Cores',
        'tipografia': 'Tipografia',
        'tom-voz': 'Tom de Voz',
        'aplicacoes': 'Aplicações da Marca',
        'redes-sociais': 'Redes Sociais',
        'contatos': 'Contatos'
    };
    
    let html = '';
    
    Object.keys(customizationData.sections).forEach(sectionId => {
        const sectionData = customizationData.sections[sectionId];
        const sectionName = sectionNames[sectionId] || sectionId;
        
        html += `
            <div class="section-card" id="card-${sectionId}">
                <div class="section-card-header" onclick="toggleSectionCard('${sectionId}')">
                    <div class="section-info">
                        <span class="section-icon">${sectionData.icon}</span>
                        <span class="section-name">${sectionName}</span>
                    </div>
                    <div class="section-status ${sectionData.enabled ? 'enabled' : 'disabled'}">
                        ${sectionData.enabled ? '✅' : '❌'}
                    </div>
                    <span class="toggle-icon">▼</span>
                </div>
                
                <div class="section-card-content" id="content-${sectionId}" style="display: none;">
                    ${generateSectionControls(sectionId, sectionData)}
                </div>
            </div>
        `;
    });
    
    return html;
}

/**
 * Gerar controles de seção
 */
function generateSectionControls(sectionId, sectionData) {
    return `
        <div class="section-controls">
            <div class="control-row">
                <div class="form-group">
                    <label>
                        <input type="checkbox" ${sectionData.enabled ? 'checked' : ''} onchange="toggleSectionEnabled('${sectionId}', this.checked)">
                        Seção Ativa
                    </label>
                </div>
                <div class="form-group">
                    <label>Título Personalizado</label>
                    <input type="text" class="form-control" value="${sectionData.customTitle || ''}" 
                           placeholder="Deixe vazio para padrão" onchange="updateSectionTitle('${sectionId}', this.value)">
                </div>
            </div>
            
            <div class="control-row">
                <div class="form-group">
                    <label>Ícone</label>
                    <div class="icon-selector">
                        <input type="text" class="form-control" value="${sectionData.icon}" 
                               onchange="updateSectionIcon('${sectionId}', this.value)" maxlength="2">
                        <button type="button" class="btn-icon-picker" onclick="showIconPicker('${sectionId}')">🔍</button>
                    </div>
                    <div class="icon-picker" id="iconPicker-${sectionId}" style="display: none;">
                        ${generateIconPicker(sectionId)}
                    </div>
                </div>
                <div class="form-group">
                    <label>Cor do Título</label>
                    <input type="color" class="form-control" value="${sectionData.titleColor}" 
                           onchange="updateSectionColor('${sectionId}', 'titleColor', this.value)">
                </div>
                <div class="form-group">
                    <label>Cor de Fundo</label>
                    <input type="color" class="form-control" value="${sectionData.backgroundColor}" 
                           onchange="updateSectionColor('${sectionId}', 'backgroundColor', this.value)">
                </div>
            </div>
            
            <div class="section-preview-mini">
                <strong>Preview:</strong>
                <div class="mini-preview" style="background: ${sectionData.backgroundColor}; padding: 10px; border-radius: 6px; margin-top: 5px;">
                    <h4 style="color: ${sectionData.titleColor}; margin: 0;">${sectionData.icon} ${sectionData.customTitle || 'Título da Seção'}</h4>
                </div>
            </div>
        </div>
    `;
}

/**
 * Gerar picker de ícones
 */
function generateIconPicker(sectionId) {
    return availableIcons.map(icon => 
        `<span class="icon-option" onclick="selectIcon('${sectionId}', '${icon}')" style="cursor: pointer; padding: 5px; display: inline-block; border: 1px solid #ddd; margin: 2px; border-radius: 4px; hover: background-color: #f0f0f0;">${icon}</span>`
    ).join('');
}

/**
 * Gerar aba de cores
 */
function generateColorsTab() {
    return `
        <div class="tab-content" id="tab-colors" style="display: none;">
            <h4>🎨 Paleta de Cores Avançada</h4>
            <div class="grid grid-3">
                <div class="form-group">
                    <label>Cor Primária</label>
                    <input type="color" class="form-control" id="advancedPrimaryColor" 
                           value="${customizationData.colors.primary}" onchange="updateAdvancedColors()">
                    <input type="text" class="form-control" placeholder="Nome da cor" style="margin-top: 8px;">
                </div>
                <div class="form-group">
                    <label>Cor Secundária</label>
                    <input type="color" class="form-control" id="advancedSecondaryColor" 
                           value="${customizationData.colors.secondary}" onchange="updateAdvancedColors()">
                    <input type="text" class="form-control" placeholder="Nome da cor" style="margin-top: 8px;">
                </div>
                <div class="form-group">
                    <label>Cor de Destaque</label>
                    <input type="color" class="form-control" id="advancedAccentColor" 
                           value="${customizationData.colors.accent}" onchange="updateAdvancedColors()">
                    <input type="text" class="form-control" placeholder="Nome da cor" style="margin-top: 8px;">
                </div>
            </div>
            
            <div class="color-preview-advanced" style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <h5>Preview da Paleta</h5>
                <div class="color-swatches" id="advancedColorPreview">
                    <!-- Será preenchido dinamicamente -->
                </div>
            </div>
        </div>
    `;
}

/**
 * Gerar aba de tipografia
 */
function generateTypographyTab() {
    return `
        <div class="tab-content" id="tab-typography" style="display: none;">
            <h4>✏️ Configurações Tipográficas</h4>
            <div class="grid grid-2">
                <div class="form-group">
                    <label>Fonte Principal</label>
                    <select class="form-control" id="advancedPrimaryFont" onchange="updateAdvancedTypography()">
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Lato">Lato</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Tamanho Base</label>
                    <input type="range" class="form-control" id="advancedFontSize" 
                           min="0.8" max="1.4" step="0.1" value="1.0" onchange="updateAdvancedTypography()">
                    <small>Atual: <span id="fontSizeDisplay">1.0rem</span></small>
                </div>
            </div>
        </div>
    `;
}

/**
 * Gerar aba de layout
 */
function generateLayoutTab() {
    return `
        <div class="tab-content" id="tab-layout" style="display: none;">
            <h4>📐 Configurações de Layout</h4>
            <div class="grid grid-2">
                <div class="form-group">
                    <label>Largura Máxima</label>
                    <select class="form-control" id="advancedMaxWidth" onchange="updateAdvancedLayout()">
                        <option value="1000px">Compacto (1000px)</option>
                        <option value="1200px" selected>Padrão (1200px)</option>
                        <option value="1400px">Amplo (1400px)</option>
                        <option value="100%">Largura Total</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Espaçamento entre Seções</label>
                    <input type="range" class="form-control" id="advancedSectionSpacing" 
                           min="15" max="60" value="30" onchange="updateAdvancedLayout()">
                    <small>Atual: <span id="spacingDisplay">30px</span></small>
                </div>
            </div>
        </div>
    `;
}

// ============================================================================
// FUNÇÕES DE CONTROLE DE SEÇÕES
// ============================================================================

/**
 * Alternar card de seção
 */
function toggleSectionCard(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const icon = document.querySelector(`#card-${sectionId} .toggle-icon`);
    
    if (!content || !icon) return;
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

/**
 * Alternar seção ativa/inativa
 */
function toggleSectionEnabled(sectionId, enabled) {
    customizationData.sections[sectionId].enabled = enabled;
    
    const section = document.getElementById(sectionId);
    const statusElement = document.querySelector(`#card-${sectionId} .section-status`);
    
    if (section) {
        section.style.display = enabled ? 'block' : 'none';
    }
    
    if (statusElement) {
        statusElement.textContent = enabled ? '✅' : '❌';
        statusElement.className = `section-status ${enabled ? 'enabled' : 'disabled'}`;
    }
}

/**
 * Atualizar título da seção
 */
function updateSectionTitle(sectionId, title) {
    customizationData.sections[sectionId].customTitle = title;
    applySectionChanges(sectionId);
}

/**
 * Atualizar ícone da seção
 */
function updateSectionIcon(sectionId, icon) {
    customizationData.sections[sectionId].icon = icon;
    
    // Atualizar no card
    const cardIcon = document.querySelector(`#card-${sectionId} .section-icon`);
    if (cardIcon) cardIcon.textContent = icon;
    
    applySectionChanges(sectionId);
}

/**
 * Mostrar seletor de ícones
 */
function showIconPicker(sectionId) {
    const picker = document.getElementById(`iconPicker-${sectionId}`);
    if (picker) {
        picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
    }
}

/**
 * Selecionar ícone
 */
function selectIcon(sectionId, icon) {
    updateSectionIcon(sectionId, icon);
    
    // Esconder picker
    const picker = document.getElementById(`iconPicker-${sectionId}`);
    if (picker) picker.style.display = 'none';
    
    // Atualizar input
    const input = document.querySelector(`#card-${sectionId} input[onchange*="updateSectionIcon"]`);
    if (input) input.value = icon;
}

/**
 * Atualizar cor da seção
 */
function updateSectionColor(sectionId, property, value) {
    customizationData.sections[sectionId][property] = value;
    applySectionChanges(sectionId);
}

/**
 * Aplicar mudanças na seção
 */
function applySectionChanges(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const sectionData = customizationData.sections[sectionId];
    
    // Aplicar cor de fundo
    section.style.backgroundColor = sectionData.backgroundColor;
    
    // Aplicar título e ícone
    const titleElement = section.querySelector('h2');
    if (titleElement) {
        titleElement.style.color = sectionData.titleColor;
        
        // Extrair texto original sem ícone e número
        const originalText = titleElement.textContent.replace(/^[🏢🎯🎨✏️🗣️📋📱📞]\s*\d*\.\s*/, '');
        const sectionNumber = titleElement.textContent.match(/\d+\./)?.[0] || '';
        const finalTitle = sectionData.customTitle || originalText;
        
        titleElement.innerHTML = `${sectionData.icon} ${sectionNumber} ${finalTitle}`;
    }
    
    // Atualizar preview mini
    updateMiniPreview(sectionId);
}

/**
 * Atualizar preview mini
 */
function updateMiniPreview(sectionId) {
    const preview = document.querySelector(`#content-${sectionId} .mini-preview`);
    if (!preview) return;
    
    const sectionData = customizationData.sections[sectionId];
    const title = sectionData.customTitle || 'Título da Seção';
    
    preview.style.backgroundColor = sectionData.backgroundColor;
    preview.innerHTML = `<h4 style="color: ${sectionData.titleColor}; margin: 0;">${sectionData.icon} ${title}</h4>`;
}

// ============================================================================
// FUNÇÕES DE TEMAS E CONFIGURAÇÕES GLOBAIS
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
    
    try {
        if (window.BrandManualUtils && window.BrandManualUtils.showSuccess) {
            window.BrandManualUtils.showSuccess(`Tema "${selectedTheme}" aplicado com sucesso!`);
        } else {
            console.log(`Tema "${selectedTheme}" aplicado com sucesso!`);
        }
    } catch (error) {
        console.log(`Tema "${selectedTheme}" aplicado com sucesso!`);
    }
}

/**
 * Aplicar configurações globais
 */
function applyGlobalSettings() {
    const borderStyle = document.getElementById('borderStyle')?.value;
    const animationLevel = document.getElementById('animationLevel')?.value;
    
    if (borderStyle) customizationData.global.borderStyle = borderStyle;
    if (animationLevel) customizationData.global.animationLevel = animationLevel;
    
    applyBorderStyles();
    applyAnimationSettings();
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
 * Atualizar campos da interface
 */
function updateInterfaceFields() {
    // Atualizar cores avançadas
    const primaryColorField = document.getElementById('advancedPrimaryColor');
    if (primaryColorField) primaryColorField.value = customizationData.colors.primary;
    
    const secondaryColorField = document.getElementById('advancedSecondaryColor');
    if (secondaryColorField) secondaryColorField.value = customizationData.colors.secondary;
    
    const accentColorField = document.getElementById('advancedAccentColor');
    if (accentColorField) accentColorField.value = customizationData.colors.accent;
    
    // Atualizar tipografia
    const fontField = document.getElementById('advancedPrimaryFont');
    if (fontField) fontField.value = customizationData.typography.primaryFont;
    
    const fontSizeField = document.getElementById('advancedFontSize');
    if (fontSizeField) {
        fontSizeField.value = customizationData.typography.baseFontSize;
        const fontSizeDisplay = document.getElementById('fontSizeDisplay');
        if (fontSizeDisplay) {
            fontSizeDisplay.textContent = customizationData.typography.baseFontSize + 'rem';
        }
    }
    
    // Atualizar preview de cores
    updateAdvancedColorPreview();
}

// ============================================================================
// FUNÇÕES DE CORES E TIPOGRAFIA AVANÇADAS
// ============================================================================

/**
 * Atualizar cores avançadas
 */
function updateAdvancedColors() {
    const primary = document.getElementById('advancedPrimaryColor')?.value;
    const secondary = document.getElementById('advancedSecondaryColor')?.value;
    const accent = document.getElementById('advancedAccentColor')?.value;
    
    if (primary) customizationData.colors.primary = primary;
    if (secondary) customizationData.colors.secondary = secondary;
    if (accent) customizationData.colors.accent = accent;
    
    updateAdvancedColorPreview();
    applyColorScheme();
}

/**
 * Atualizar preview de cores avançadas
 */
function updateAdvancedColorPreview() {
    const container = document.getElementById('advancedColorPreview');
    if (!container) return;
    
    container.innerHTML = `
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <div style="width: 80px; height: 60px; background: ${customizationData.colors.primary}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">Primária</div>
            <div style="width: 80px; height: 60px; background: ${customizationData.colors.secondary}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">Secundária</div>
            <div style="width: 80px; height: 60px; background: ${customizationData.colors.accent}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">Destaque</div>
        </div>
    `;
}

/**
 * Aplicar esquema de cores
 */
function applyColorScheme() {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', customizationData.colors.primary);
    root.style.setProperty('--secondary-color', customizationData.colors.secondary);
    root.style.setProperty('--accent-color', customizationData.colors.accent);
    
    // Aplicar ao header
    applyHeaderBackground();
    
    // Aplicar aos títulos das seções
    const sectionTitles = document.querySelectorAll('.section h2');
    sectionTitles.forEach(title => {
        title.style.borderBottomColor = customizationData.colors.secondary;
    });
}

/**
 * Atualizar tipografia avançada
 */
function updateAdvancedTypography() {
    const primaryFont = document.getElementById('advancedPrimaryFont')?.value;
    const baseFontSize = document.getElementById('advancedFontSize')?.value;
    
    if (primaryFont) customizationData.typography.primaryFont = primaryFont;
    if (baseFontSize) {
        customizationData.typography.baseFontSize = parseFloat(baseFontSize);
        const fontSizeDisplay = document.getElementById('fontSizeDisplay');
        if (fontSizeDisplay) {
            fontSizeDisplay.textContent = baseFontSize + 'rem';
        }
    }
    
    applyTypographyStyles();
}

/**
 * Aplicar estilos tipográficos
 */
function applyTypographyStyles() {
    document.body.style.fontFamily = customizationData.typography.primaryFont;
    document.body.style.fontSize = customizationData.typography.baseFontSize + 'rem';
    
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.style.fontFamily = customizationData.typography.primaryFont;
    });
}

/**
 * Atualizar layout avançado
 */
function updateAdvancedLayout() {
    const maxWidth = document.getElementById('advancedMaxWidth')?.value;
    const sectionSpacing = document.getElementById('advancedSectionSpacing')?.value;
    
    if (maxWidth) {
        customizationData.global.maxWidth = maxWidth;
        const container = document.querySelector('.container');
        if (container) {
            container.style.maxWidth = maxWidth;
        }
    }
    
    if (sectionSpacing) {
        customizationData.global.sectionSpacing = parseInt(sectionSpacing);
        const spacingDisplay = document.getElementById('spacingDisplay');
        if (spacingDisplay) {
            spacingDisplay.textContent = sectionSpacing + 'px';
        }
        
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.marginBottom = sectionSpacing + 'px';
        });
    }
}

// ============================================================================
// FUNÇÕES PRINCIPAIS DE APLICAÇÃO E CONTROLE
// ============================================================================

/**
 * Aplicar todas as customizações
 */
function applyAllCustomizations() {
    try {
        console.log('[Customization] Aplicando todas as customizações...');
        
        // Aplicar configurações globais
        applyBorderStyles();
        applyAnimationSettings();
        applyColorScheme();
        applyTypographyStyles();
        
        // Aplicar customizações de seções
        Object.keys(customizationData.sections).forEach(sectionId => {
            applySectionChanges(sectionId);
        });
        
        // Aplicar header e capa
        applyHeaderBackground();
        updateCoverPreview();
        
        console.log('[Customization] Todas as customizações aplicadas com sucesso');
    } catch (error) {
        console.error('[Customization] Erro ao aplicar customizações:', error);
    }
}

/**
 * Preview das customizações
 */
function previewCustomizations() {
    try {
        applyAllCustomizations();
        
        try {
            if (window.BrandManualUtils && window.BrandManualUtils.showSuccess) {
                window.BrandManualUtils.showSuccess('Customizações aplicadas! Use o Preview geral para ver o resultado.');
            } else {
                alert('Customizações aplicadas!');
            }
        } catch (error) {
            alert('Customizações aplicadas!');
        }
    } catch (error) {
        console.error('[Customization] Erro no preview:', error);
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
            _version: '2.0'
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
        
        try {
            if (window.BrandManualUtils && window.BrandManualUtils.showSuccess) {
                window.BrandManualUtils.showSuccess('Customizações salvas com sucesso!');
            } else {
                alert('Customizações salvas com sucesso!');
            }
        } catch (error) {
            alert('Customizações salvas com sucesso!');
        }
        
    } catch (error) {
        console.error('[Customization] Erro ao salvar:', error);
        try {
            if (window.BrandManualUtils && window.BrandManualUtils.showError) {
                window.BrandManualUtils.showError('Erro ao salvar customizações');
            } else {
                alert('Erro ao salvar customizações');
            }
        } catch (e) {
            alert('Erro ao salvar customizações');
        }
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
        
        // Resetar seções para valores padrão
        const defaultSections = ['info-basicas', 'identidade', 'logotipo', 'cores', 'tipografia', 'tom-voz', 'aplicacoes', 'redes-sociais', 'contatos'];
        const defaultIcons = ['🏢', '🎯', '🎨', '🎨', '✏️', '🗣️', '📋', '📱', '📞'];
        
        defaultSections.forEach((sectionId, index) => {
            customizationData.sections[sectionId] = {
                enabled: true,
                backgroundColor: '#f8f9fa',
                icon: defaultIcons[index],
                titleColor: '#2c3e50',
                customTitle: null,
                layout: 'grid',
                animation: 'fadeIn',
                borderRadius: '12px',
                padding: '30px',
                shadow: '0 5px 15px rgba(0,0,0,0.08)',
                customCSS: ''
            };
        });
        
        // Remover do localStorage
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem('brandManualCustomizations');
            localStorage.removeItem('brandManualAdvancedCustomizations');
        }
        
        // Recriar painel se necessário
        if (showCustomizationPanel) {
            const existingPanel = document.getElementById('customization');
            if (existingPanel) {
                existingPanel.remove();
            }
            
            createCustomizationPanel();
            createAdvancedTabs();
        }
        
        applyAllCustomizations();
        
        try {
            if (window.BrandManualUtils && window.BrandManualUtils.showSuccess) {
                window.BrandManualUtils.showSuccess('Customizações resetadas!');
            } else {
                alert('Customizações resetadas!');
            }
        } catch (error) {
            alert('Customizações resetadas!');
        }
    }
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
            updateInterfaceFields();
            
            console.log('[Customization] Dados carregados do localStorage');
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
 * Exportar configuração de customização
 */
function exportCustomizationConfig() {
    try {
        const configData = {
            version: '2.0',
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
        
        try {
            if (window.BrandManualUtils && window.BrandManualUtils.showSuccess) {
                window.BrandManualUtils.showSuccess('Configuração exportada com sucesso!');
            } else {
                alert('Configuração exportada com sucesso!');
            }
        } catch (error) {
            alert('Configuração exportada com sucesso!');
        }
        
    } catch (error) {
        console.error('[Customization] Erro ao exportar configuração:', error);
        try {
            if (window.BrandManualUtils && window.BrandManualUtils.showError) {
                window.BrandManualUtils.showError('Erro ao exportar configuração');
            } else {
                alert('Erro ao exportar configuração');
            }
        } catch (e) {
            alert('Erro ao exportar configuração');
        }
    }
}

/**
 * Importar configuração de customização
 */
function importCustomizationConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const configData = JSON.parse(e.target.result);
                
                if (configData.customizations) {
                    customizationData = { ...customizationData, ...configData.customizations };
                    
                    // Recriar painel com novos dados se necessário
                    if (showCustomizationPanel) {
                        const existingPanel = document.getElementById('customization');
                        if (existingPanel) {
                            existingPanel.remove();
                        }
                        
                        createCustomizationPanel();
                        createAdvancedTabs();
                    }
                    
                    applyAllCustomizations();
                    updateInterfaceFields();
                    
                    try {
                        if (window.BrandManualUtils && window.BrandManualUtils.showSuccess) {
                            window.BrandManualUtils.showSuccess('Configuração importada com sucesso!');
                        } else {
                            alert('Configuração importada com sucesso!');
                        }
                    } catch (error) {
                        alert('Configuração importada com sucesso!');
                    }
                } else {
                    try {
                        if (window.BrandManualUtils && window.BrandManualUtils.showError) {
                            window.BrandManualUtils.showError('Arquivo de configuração inválido');
                        } else {
                            alert('Arquivo de configuração inválido');
                        }
                    } catch (error) {
                        alert('Arquivo de configuração inválido');
                    }
                }
                
            } catch (error) {
                console.error('[Customization] Erro ao importar configuração:', error);
                try {
                    if (window.BrandManualUtils && window.BrandManualUtils.showError) {
                        window.BrandManualUtils.showError('Erro ao ler arquivo de configuração');
                    } else {
                        alert('Erro ao ler arquivo de configuração');
                    }
                } catch (e) {
                    alert('Erro ao ler arquivo de configuração');
                }
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

/**
 * Configurar listeners avançados
 */
function setupAdvancedListeners() {
    try {
        // Auto-save das customizações
        let autoSaveTimeout;
        const autoSaveCustomizations = function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                try {
                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem('brandManualAdvancedCustomizations', JSON.stringify(customizationData));
                    }
                } catch (error) {
                    console.error('[Customization] Erro no auto-save:', error);
                }
            }, 2000);
        };
        
        // Observer para mudanças no painel de customização
        const observer = new MutationObserver(() => {
            autoSaveCustomizations();
        });
        
        const customizationPanel = document.getElementById('customization');
        if (customizationPanel) {
            observer.observe(customizationPanel, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }
        
        console.log('[Customization] Listeners avançados configurados');
    } catch (error) {
        console.error('[Customization] Erro ao configurar listeners:', error);
    }
}

// ============================================================================
// COMPATIBILIDADE E INTEGRAÇÃO
// ============================================================================

/**
 * Aplicar customizações (função de compatibilidade)
 */
function applyCustomizations() {
    applyAllCustomizations();
}

/**
 * Verificar dependências
 */
function checkDependencies() {
    const dependencies = [
        'BrandManualUtils',
        'BrandManualStorage'
    ];
    
    const missing = dependencies.filter(dep => typeof window[dep] === 'undefined');
    
    if (missing.length > 0) {
        console.warn('[Customization] Dependências faltando:', missing);
        return false;
    }
    
    return true;
}

/**
 * Modo de compatibilidade
 */
function initCompatibilityMode() {
    console.log('[Customization] Iniciando em modo de compatibilidade');
    
    // Versão simplificada sem dependências externas
    const simpleCustomization = {
        applyBasicColors: function() {
            const root = document.documentElement;
            root.style.setProperty('--primary-color', customizationData.colors.primary);
            root.style.setProperty('--secondary-color', customizationData.colors.secondary);
            root.style.setProperty('--accent-color', customizationData.colors.accent);
        },
        
        applyBasicLayout: function() {
            const container = document.querySelector('.container');
            if (container) {
                container.style.maxWidth = customizationData.global.maxWidth;
            }
        }
    };
    
    // Aplicar customizações básicas
    simpleCustomization.applyBasicColors();
    simpleCustomization.applyBasicLayout();
    
    window.BrandManualCustomizationCompatibility = simpleCustomization;
}

/**
 * Inicialização condicional
 */
function conditionalInit() {
    if (checkDependencies()) {
        // Modo completo
        initCustomization();
    } else {
        // Modo de compatibilidade
        initCompatibilityMode();
        
        // Ainda assim aplicar customizações básicas
        setTimeout(() => {
            loadCustomizationData();
            applyAllCustomizations();
        }, 500);
    }
}

// ============================================================================
// EXPORTAÇÃO GLOBAL E COMPATIBILIDADE
// ============================================================================

/**
 * Exportar funções para uso global
 */
window.BrandManualCustomization = {
    // Funções principais
    initCustomization,
    toggleCustomizationPanel,
    updateCoverSettings,
    previewCoverBackground,
    updateHeaderBackground,
    previewHeaderBackground,
    updateCoverPreview,
    getTitleStyle,
    applyHeaderBackground,
    previewCustomizations,
    saveCustomizations,
    resetCustomizations,
    applyCustomizations,
    applyAllCustomizations,
    
    // Funções avançadas
    switchAdvancedTab,
    applyThemePreset,
    applyGlobalSettings,
    toggleSectionCard,
    toggleSectionEnabled,
    updateSectionTitle,
    updateSectionIcon,
    showIconPicker,
    selectIcon,
    updateSectionColor,
    updateAdvancedColors,
    updateAdvancedTypography,
    updateAdvancedLayout,
    exportCustomizationConfig,
    importCustomizationConfig,
    
    // Utilitários
    loadCustomizationData,
    checkDependencies,
    
    // Getters/Setters
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
window.switchAdvancedTab = switchAdvancedTab;
window.applyThemePreset = applyThemePreset;
window.applyGlobalSettings = applyGlobalSettings;
window.toggleSectionCard = toggleSectionCard;
window.toggleSectionEnabled = toggleSectionEnabled;
window.updateSectionTitle = updateSectionTitle;
window.updateSectionIcon = updateSectionIcon;
window.showIconPicker = showIconPicker;
window.selectIcon = selectIcon;
window.updateSectionColor = updateSectionColor;
window.updateAdvancedColors = updateAdvancedColors;
window.updateAdvancedTypography = updateAdvancedTypography;
window.updateAdvancedLayout = updateAdvancedLayout;
window.exportCustomizationConfig = exportCustomizationConfig;
window.importCustomizationConfig = importCustomizationConfig;

// ============================================================================
// INICIALIZAÇÃO E TRATAMENTO DE ERROS
// ============================================================================

/**
 * Tratamento de erros global
 */
window.addEventListener('error', function(e) {
    if (e.error && e.error.message && e.error.message.includes('customization')) {
        console.error('[Customization] Erro capturado:', e.error);
    }
});

/**
 * Adicionar estilos de animação
 */
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInFromTop {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyles);

/**
 * Inicializar quando DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar outros sistemas carregarem
    setTimeout(conditionalInit, 1500);
});

// Executar inicialização se DOM já estiver carregado
if (document.readyState === 'loading') {
    // DOM ainda carregando, aguardar evento
} else {
    // DOM já carregado
    setTimeout(conditionalInit, 1000);
}

// ============================================================================
// LOGS FINAIS
// ============================================================================

console.log('[Customization] Sistema de Customização Expandido carregado - Versão 2.1 com Toggle');
console.log('[Customization] Configuração:', {
    'Painel Visível': showCustomizationPanel,
    'Temas Predefinidos': Object.keys(themePresets).length,
    'Ícones Disponíveis': availableIcons.length,
    'Seções Configuráveis': Object.keys(customizationData.sections).length,
    'Modo': checkDependencies() ? 'Completo' : 'Compatibilidade'
});

// Funções de compatibilidade para evitar erros
if (typeof updateSectionCustomization === 'undefined') {
    window.updateSectionCustomization = function(sectionId) {
        console.warn('[Customization] updateSectionCustomization chamada (compatibilidade)');
        applySectionChanges(sectionId);
    };
}

if (typeof toggleSectionCustomizer === 'undefined') {
    window.toggleSectionCustomizer = function(sectionId) {
        console.warn('[Customization] toggleSectionCustomizer chamada (compatibilidade)');
        toggleSectionCard(sectionId);
    };
}