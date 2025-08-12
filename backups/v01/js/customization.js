/**
 * Sistema de Customização Avançada do Manual da Marca
 */

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
        type: 'gradient', // 'gradient', 'image', 'solid'
        image: null,
        overlay: 'rgba(0,0,0,0.3)',
        customGradient: null
    },
    sections: {
        'info-basicas': {
            backgroundColor: '#f8f9fa',
            icon: '🏢',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'identidade': {
            backgroundColor: '#f8f9fa',
            icon: '🎯',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'logotipo': {
            backgroundColor: '#f8f9fa',
            icon: '🎨',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'cores': {
            backgroundColor: '#f8f9fa',
            icon: '🎨',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'tipografia': {
            backgroundColor: '#f8f9fa',
            icon: '✍️',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'tom-voz': {
            backgroundColor: '#f8f9fa',
            icon: '🗣️',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'aplicacoes': {
            backgroundColor: '#f8f9fa',
            icon: '📋',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'redes-sociais': {
            backgroundColor: '#f8f9fa',
            icon: '📱',
            titleColor: '#2c3e50',
            customTitle: null
        },
        'contatos': {
            backgroundColor: '#f8f9fa',
            icon: '📞',
            titleColor: '#2c3e50',
            customTitle: null
        }
    }
};

/**
 * Inicializar sistema de customização
 */
function initCustomization() {
    createCustomizationPanel();
    loadCustomizationData();
    applyCustomizations();
    
    BrandManualUtils.devLog('Sistema de customização inicializado');
}

/**
 * Criar painel de customização
 */
function createCustomizationPanel() {
    const container = document.querySelector('.container');
    const customizationSection = document.createElement('section');
    customizationSection.className = 'section customization-panel';
    customizationSection.id = 'customization';
    
    customizationSection.innerHTML = `
        <h2>🎨 Customização Visual</h2>
        
        <!-- Capa do Manual -->
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

        <!-- Customização de Seções -->
        <div class="customization-group">
            <h3>🎭 Customizar Seções</h3>
            <div class="sections-customizer" id="sectionsCustomizer">
                <!-- Será preenchido dinamicamente -->
            </div>
        </div>

        <!-- Preview e Controles -->
        <div class="customization-controls">
            <button class="btn btn-primary" onclick="previewCustomizations()">👁️ Preview Customizações</button>
            <button class="btn btn-success" onclick="saveCustomizations()">💾 Salvar Customizações</button>
            <button class="btn btn-warning" onclick="resetCustomizations()">🔄 Resetar</button>
        </div>
    `;
    
    // Inserir antes da primeira seção
    const firstSection = container.querySelector('.section');
    container.insertBefore(customizationSection, firstSection);
    
    // Gerar customizadores de seção
    generateSectionCustomizers();
}

/**
 * Gerar customizadores para cada seção
 */
function generateSectionCustomizers() {
    const sectionsContainer = document.getElementById('sectionsCustomizer');
    const sections = document.querySelectorAll('.section[id]:not(#customization)');
    
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionTitle = section.querySelector('h2')?.textContent || sectionId;
        
        const customizer = document.createElement('div');
        customizer.className = 'section-customizer';
        customizer.innerHTML = `
            <div class="section-customizer-header" onclick="toggleSectionCustomizer('${sectionId}')">
                <h4>${sectionTitle}</h4>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="section-customizer-content" id="customizer-${sectionId}" style="display: none;">
                <div class="grid grid-3">
                    <div class="form-group">
                        <label>Cor de Fundo</label>
                        <input type="color" class="form-control" id="bg-${sectionId}" value="#f8f9fa" onchange="updateSectionCustomization('${sectionId}')">
                    </div>
                    <div class="form-group">
                        <label>Ícone</label>
                        <input type="text" class="form-control" id="icon-${sectionId}" value="${customizationData.sections[sectionId]?.icon || '📋'}" onchange="updateSectionCustomization('${sectionId}')" placeholder="🎨">
                    </div>
                    <div class="form-group">
                        <label>Cor do Título</label>
                        <input type="color" class="form-control" id="title-${sectionId}" value="#2c3e50" onchange="updateSectionCustomization('${sectionId}')">
                    </div>
                </div>
                <div class="form-group">
                    <label>Título Personalizado (deixe vazio para usar o padrão)</label>
                    <input type="text" class="form-control" id="custom-title-${sectionId}" placeholder="Ex: Informações do Estabelecimento" onchange="updateSectionCustomization('${sectionId}')">
                </div>
            </div>
        `;
        
        sectionsContainer.appendChild(customizer);
    });
}

/**
 * Alternar customizador de seção
 */
function toggleSectionCustomizer(sectionId) {
    const content = document.getElementById(`customizer-${sectionId}`);
    const icon = document.querySelector(`#customizer-${sectionId}`).parentElement.querySelector('.toggle-icon');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

/**
 * Preview da imagem de fundo da capa
 */
function previewCoverBackground(input) {
    const preview = document.getElementById('coverPreview');
    
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
    const logoPosition = document.getElementById('coverLogoPosition').value;
    const titleStyle = document.getElementById('coverTitleStyle').value;
    
    customizationData.coverPage.logoPosition = logoPosition;
    customizationData.coverPage.titleStyle = titleStyle;
    
    updateCoverPreview();
}

/**
 * Atualizar preview da capa
 */
function updateCoverPreview() {
    const preview = document.getElementById('coverPreview');
    const data = BrandManualStorage.collectFormData();
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
 * Obter estilo do título baseado na seleção
 */
function getTitleStyle() {
    const style = customizationData.coverPage.titleStyle;
    const data = BrandManualStorage.collectFormData();
    
    switch (style) {
        case 'gradient':
            return `background: linear-gradient(45deg, ${data.secondaryColor || '#3498db'}, ${data.accentColor || '#e74c3c'}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;`;
        case 'solid':
            return `color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);`;
        case 'outlined':
            return `color: transparent; -webkit-text-stroke: 2px white; font-weight: bold;`;
        default:
            return '';
    }
}

/**
 * Atualizar fundo do header
 */
function updateHeaderBackground() {
    const type = document.getElementById('headerBackgroundType').value;
    const overlay = document.getElementById('headerOverlay').value;
    const imageGroup = document.getElementById('headerImageGroup');
    
    // Mostrar/esconder upload de imagem
    imageGroup.style.display = type === 'image' ? 'block' : 'none';
    
    // Atualizar valor do overlay
    document.getElementById('overlayValue').textContent = Math.round(overlay * 100) + '%';
    
    customizationData.headerBackground.type = type;
    customizationData.headerBackground.overlay = `rgba(0,0,0,${overlay})`;
    
    // Aplicar ao header atual
    applyHeaderBackground();
}

/**
 * Aplicar fundo do header
 */
function applyHeaderBackground() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const type = customizationData.headerBackground.type;
    const data = BrandManualStorage.collectFormData();
    
    switch (type) {
        case 'gradient':
            header.style.background = `linear-gradient(135deg, ${data.primaryColor || '#2c3e50'}, ${data.secondaryColor || '#3498db'})`;
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
            header.style.background = data.primaryColor || '#2c3e50';
            break;
    }
}

/**
 * Atualizar customização de seção
 */
function updateSectionCustomization(sectionId) {
    const bgColor = document.getElementById(`bg-${sectionId}`).value;
    const icon = document.getElementById(`icon-${sectionId}`).value;
    const titleColor = document.getElementById(`title-${sectionId}`).value;
    const customTitle = document.getElementById(`custom-title-${sectionId}`).value;
    
    // Atualizar dados
    if (!customizationData.sections[sectionId]) {
        customizationData.sections[sectionId] = {};
    }
    
    customizationData.sections[sectionId].backgroundColor = bgColor;
    customizationData.sections[sectionId].icon = icon;
    customizationData.sections[sectionId].titleColor = titleColor;
    customizationData.sections[sectionId].customTitle = customTitle;
    
    // Aplicar mudanças
    applySectionCustomization(sectionId);
}

/**
 * Aplicar customização de seção
 */
function applySectionCustomization(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const customization = customizationData.sections[sectionId];
    if (!customization) return;
    
    // Aplicar cor de fundo
    section.style.backgroundColor = customization.backgroundColor;
    
    // Aplicar ícone e título
    const title = section.querySelector('h2');
    if (title) {
        // Extrair texto sem ícone
        const titleText = title.textContent.replace(/^[🏢🎯🎨✍️🗣️📋📱📞]\s*\d*\.\s*/, '');
        const sectionNumber = title.textContent.match(/\d+\./)?.[0] || '';
        
        // Aplicar customizações
        title.style.color = customization.titleColor;
        title.innerHTML = `${customization.icon} ${sectionNumber} ${customization.customTitle || titleText}`;
    }
}

/**
 * Aplicar todas as customizações
 */
function applyCustomizations() {
    // Aplicar header
    applyHeaderBackground();
    
    // Aplicar seções
    Object.keys(customizationData.sections).forEach(sectionId => {
        applySectionCustomization(sectionId);
    });
}

/**
 * Preview das customizações
 */
function previewCustomizations() {
    // Aplicar todas as customizações
    applyCustomizations();
    
    // Gerar preview da capa
    generateCoverPagePreview();
    
    BrandManualUtils.showSuccess('Customizações aplicadas! Use o Preview geral para ver o resultado completo.');
}

/**
 * Gerar preview da capa
 */
function generateCoverPagePreview() {
    const data = BrandManualStorage.collectFormData();
    const logoImg = document.querySelector('#logoPreview img');
    
    const coverHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Capa - Manual da Marca</title>
            <style>
                body { margin: 0; font-family: Arial, sans-serif; }
                .cover-page {
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: ${customizationData.coverPage.logoPosition};
                    color: white;
                    text-align: center;
                    padding: 50px;
                    ${getCoverBackgroundStyle()}
                }
                .logo { max-width: 300px; max-height: 120px; margin-bottom: 30px; }
                .title { font-size: 3rem; margin: 20px 0; ${getTitleStyle()} }
                .subtitle { font-size: 1.5rem; opacity: 0.9; margin-bottom: 30px; }
                .meta { font-size: 1rem; opacity: 0.8; }
            </style>
        </head>
        <body>
            <div class="cover-page">
                ${logoImg ? `<img src="${logoImg.src}" class="logo" alt="Logo">` : ''}
                <h1 class="title">${data.hotelName || 'Nome do Hotel'}</h1>
                <p class="subtitle">Manual da Marca</p>
                <p class="meta">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
            </div>
        </body>
        </html>
    `;
    
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    previewWindow.document.write(coverHTML);
    previewWindow.document.close();
}

/**
 * Obter estilo de fundo da capa
 */
function getCoverBackgroundStyle() {
    const data = BrandManualStorage.collectFormData();
    
    if (customizationData.coverPage.backgroundImage) {
        return `
            background: linear-gradient(${customizationData.coverPage.backgroundOverlay}, ${customizationData.coverPage.backgroundOverlay}), 
                       url('${customizationData.coverPage.backgroundImage}') center/cover;
        `;
    } else {
        return `background: linear-gradient(135deg, ${data.primaryColor || '#2c3e50'}, ${data.secondaryColor || '#3498db'});`;
    }
}

/**
 * Salvar customizações
 */
function saveCustomizations() {
    try {
        const customData = {
            ...BrandManualStorage.collectFormData(),
            _customizations: customizationData
        };
        
        const blob = new Blob([JSON.stringify(customData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `manual-customizado-${BrandManualUtils.generateSlug(customData.hotelName || 'hotel')}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        BrandManualUtils.showSuccess('Customizações salvas com sucesso!');
    } catch (error) {
        BrandManualUtils.showError('Erro ao salvar customizações');
    }
}

/**
 * Carregar dados de customização
 */
function loadCustomizationData() {
    try {
        const saved = localStorage.getItem('brandManualCustomizations');
        if (saved) {
            customizationData = { ...customizationData, ...JSON.parse(saved) };
            populateCustomizationFields();
        }
    } catch (error) {
        BrandManualUtils.devLog('Erro ao carregar customizações', error);
    }
}

/**
 * Preencher campos de customização
 */
function populateCustomizationFields() {
    // Implementar população dos campos quando necessário
    BrandManualUtils.devLog('Campos de customização populados');
}

/**
 * Resetar customizações
 */
function resetCustomizations() {
    if (confirm('Deseja resetar todas as customizações para os valores padrão?')) {
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
            sections: {}
        };
        
        // Resetar campos
        document.querySelectorAll('.customization-panel input, .customization-panel select').forEach(input => {
            if (input.type === 'color') {
                input.value = input.id.includes('title') ? '#2c3e50' : '#f8f9fa';
            } else if (input.type === 'range') {
                input.value = '0.3';
            } else {
                input.value = '';
            }
        });
        
        // Aplicar reset
        applyCustomizations();
        BrandManualUtils.showSuccess('Customizações resetadas!');
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que outros scripts carregaram
    setTimeout(initCustomization, 1000);
});

// Exportar funções globais
window.BrandManualCustomization = {
    initCustomization,
    updateCoverSettings,
    updateHeaderBackground,
    updateSectionCustomization,
    previewCustomizations,
    saveCustomizations,
    resetCustomizations,
    applyCustomizations
};