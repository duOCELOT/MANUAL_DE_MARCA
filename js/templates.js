/**
 * Sistema de Templates para Manual da Marca
 */

// Definições de Templates
const TEMPLATES = {
    classic: {
        id: 'classic',
        name: 'Clássico',
        description: 'Template tradicional, limpo e profissional',
        aspectRatio: '16:9',
        preview: '/templates/classic-preview.jpg',
        styles: {
            headerBg: 'linear-gradient(135deg, #2c3e50, #3498db)',
            textColor: '#2c3e50',
            accentColor: '#3498db',
            layout: 'traditional'
        }
    },
    constitution: {
        id: 'constitution',
        name: 'Constitution',
        description: 'Inspirado em documentos oficiais, elegante e formal',
        aspectRatio: '4:3',
        preview: '/templates/constitution-preview.jpg',
        styles: {
            headerBg: 'linear-gradient(135deg, #1a1a1a, #333333)',
            textColor: '#1a1a1a',
            accentColor: '#ff6b35',
            layout: 'document'
        }
    },
    modern: {
        id: 'modern',
        name: 'Moderno',
        description: 'Design contemporâneo com elementos visuais dinâmicos',
        aspectRatio: '16:9',
        preview: '/templates/modern-preview.jpg',
        styles: {
            headerBg: 'linear-gradient(45deg, #667eea, #764ba2)',
            textColor: '#2c3e50',
            accentColor: '#667eea',
            layout: 'modern'
        }
    },
    minimalist: {
        id: 'minimalist',
        name: 'Minimalista',
        description: 'Foco no conteúdo, sem distrações visuais',
        aspectRatio: '4:3',
        preview: '/templates/minimalist-preview.jpg',
        styles: {
            headerBg: '#ffffff',
            textColor: '#1a1a1a',
            accentColor: '#000000',
            layout: 'minimal'
        }
    },
    luxury: {
        id: 'luxury',
        name: 'Luxo',
        description: 'Elegante e sofisticado para hotéis premium',
        aspectRatio: '16:9',
        preview: '/templates/luxury-preview.jpg',
        styles: {
            headerBg: 'linear-gradient(135deg, #000428, #004e92)',
            textColor: '#1a1a1a',
            accentColor: '#d4af37',
            layout: 'luxury'
        }
    }
};

// Template selecionado atualmente
let selectedTemplate = 'classic';

/**
 * Inicializar sistema de templates
 */
function initializeTemplateSystem() {
    createTemplateSelector();
    loadSelectedTemplate();
    setupTemplateEventListeners();
    
    BrandManualUtils.devLog('Sistema de templates inicializado');
}

/**
 * Criar seletor de templates na interface
 */
function createTemplateSelector() {
    // Verificar se já existe
    if (document.getElementById('template-selector-section')) {
        return;
    }

    const container = document.querySelector('.container');
    const controls = document.querySelector('.controls');
    
    const templateSection = document.createElement('section');
    templateSection.id = 'template-selector-section';
    templateSection.className = 'section template-selector';
    templateSection.innerHTML = `
        <h2>🎨 Escolher Template</h2>
        <p>Selecione o template que melhor representa o estilo do seu hotel:</p>
        
        <div class="template-grid">
            ${Object.values(TEMPLATES).map(template => `
                <div class="template-card" data-template="${template.id}">
                    <div class="template-preview">
                        <div class="template-mockup template-${template.id}">
                            <div class="mockup-header"></div>
                            <div class="mockup-content">
                                <div class="mockup-title">MANUAL DA MARCA</div>
                                <div class="mockup-subtitle">${template.name.toUpperCase()}</div>
                                <div class="mockup-aspect">${template.aspectRatio}</div>
                            </div>
                        </div>
                    </div>
                    <div class="template-info">
                        <h3>${template.name}</h3>
                        <p>${template.description}</p>
                        <span class="template-aspect">Formato: ${template.aspectRatio}</span>
                    </div>
                    <button class="btn btn-template" onclick="selectTemplate('${template.id}')">
                        Selecionar Template
                    </button>
                </div>
            `).join('')}
        </div>
        
        <div class="template-actions">
            <button class="btn btn-primary" onclick="previewSelectedTemplate()">
                👁️ Preview do Template
            </button>
        </div>
    `;
    
    // Inserir após os controles
    container.insertBefore(templateSection, controls.nextSibling);
    
    // Marcar template selecionado
    updateTemplateSelection();
}

/**
 * Selecionar template
 */
function selectTemplate(templateId) {
    if (!TEMPLATES[templateId]) {
        BrandManualUtils.showError('Template não encontrado');
        return;
    }
    
    selectedTemplate = templateId;
    updateTemplateSelection();
    saveTemplatePreference();
    
    BrandManualUtils.showSuccess(`Template "${TEMPLATES[templateId].name}" selecionado!`);
    BrandManualUtils.devLog('Template selecionado:', templateId);
}

/**
 * Atualizar seleção visual dos templates
 */
function updateTemplateSelection() {
    const cards = document.querySelectorAll('.template-card');
    cards.forEach(card => {
        const templateId = card.dataset.template;
        const button = card.querySelector('.btn-template');
        
        if (templateId === selectedTemplate) {
            card.classList.add('selected');
            button.textContent = '✓ Selecionado';
            button.classList.add('btn-success');
            button.classList.remove('btn-primary');
        } else {
            card.classList.remove('selected');
            button.textContent = 'Selecionar Template';
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');
        }
    });
}

/**
 * Preview do template selecionado
 */
function previewSelectedTemplate() {
    if (!selectedTemplate || !TEMPLATES[selectedTemplate]) {
        BrandManualUtils.showError('Nenhum template selecionado');
        return;
    }
    
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const template = TEMPLATES[selectedTemplate];
        const logoImg = document.querySelector('#logoPreview img');
        const logoSrc = logoImg ? logoImg.src : '';
        
        const previewHTML = generateTemplatePreview(data, logoSrc, template);
        
        // Abrir em nova janela
        const newWindow = window.open('', '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
        
        if (newWindow) {
            newWindow.document.write(previewHTML);
            newWindow.document.close();
            BrandManualUtils.showSuccess(`Preview do template "${template.name}" aberto!`);
        } else {
            BrandManualUtils.showError('Pop-up bloqueado! Permita pop-ups para usar esta função.');
        }
    } catch (error) {
        BrandManualUtils.devLog('Erro ao gerar preview do template', error);
        BrandManualUtils.showError('Erro ao gerar preview do template');
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Gerar HTML do preview do template
 */
function generateTemplatePreview(data, logoSrc, template) {
    const colors = {
        primary: data.primaryColor || '#2c3e50',
        secondary: data.secondaryColor || '#3498db',
        accent: data.accentColor || '#e74c3c'
    };
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview Template - ${template.name}</title>
    <style>
        ${getTemplateCSS(template, colors)}
    </style>
</head>
<body class="template-${template.id}">
    <div class="container">
        ${generateTemplateContent(data, logoSrc, template, colors)}
    </div>
    
    <div class="template-info-bar">
        <span>Template: ${template.name}</span>
        <span>Formato: ${template.aspectRatio}</span>
        <button onclick="window.close()" class="close-btn">✕ Fechar</button>
    </div>
    
    <script>
        // Adicionar interatividade específica do template
        ${getTemplateScript(template)}
    </script>
</body>
</html>`;
}

/**
 * Gerar CSS específico do template
 */
function getTemplateCSS(template, colors) {
    const baseCSS = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: ${template.styles.textColor};
            background: #f5f5f5;
            overflow-x: hidden;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white;
            min-height: 100vh;
            position: relative;
        }
        .template-info-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            font-size: 14px;
        }
        .close-btn {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
    `;
    
    switch (template.id) {
        case 'constitution':
            return baseCSS + getConstitutionCSS(template, colors);
        case 'modern':
            return baseCSS + getModernCSS(template, colors);
        case 'minimalist':
            return baseCSS + getMinimalistCSS(template, colors);
        case 'luxury':
            return baseCSS + getLuxuryCSS(template, colors);
        default:
            return baseCSS + getClassicCSS(template, colors);
    }
}

/**
 * CSS para template Constitution
 */
function getConstitutionCSS(template, colors) {
    return `
        .template-constitution {
            background: linear-gradient(45deg, #f5f5f5 25%, transparent 25%), 
                        linear-gradient(-45deg, #f5f5f5 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #f5f5f5 75%), 
                        linear-gradient(-45deg, transparent 75%, #f5f5f5 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        .constitution-header {
            background: linear-gradient(135deg, #1a1a1a, #333333);
            color: white;
            padding: 80px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .constitution-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="2" fill="%23ff6b35" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ff6b35" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        
        .constitution-title {
            font-size: 3.5rem;
            font-weight: 300;
            letter-spacing: 3px;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }
        
        .constitution-subtitle {
            font-size: 1.8rem;
            font-weight: 600;
            color: #ff6b35;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        
        .constitution-meta {
            font-size: 1rem;
            opacity: 0.8;
            position: relative;
            z-index: 1;
        }
        
        .constitution-section {
            padding: 60px 40px;
            border-bottom: 3px solid #ff6b35;
            position: relative;
        }
        
        .constitution-section h2 {
            font-size: 2rem;
            color: #1a1a1a;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-left: 5px solid #ff6b35;
            padding-left: 20px;
        }
        
        .constitution-content {
            background: rgba(255, 107, 53, 0.05);
            padding: 30px;
            border-radius: 0;
            border: 1px solid rgba(255, 107, 53, 0.2);
            margin: 20px 0;
        }
        
        .constitution-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        
        @media (max-width: 768px) {
            .constitution-header { padding: 60px 20px; }
            .constitution-title { font-size: 2.5rem; }
            .constitution-section { padding: 40px 20px; }
        }
    `;
}

/**
 * CSS para template Modern
 */
function getModernCSS(template, colors) {
    return `
        .template-modern {
            background: linear-gradient(45deg, #667eea, #764ba2);
            min-height: 100vh;
        }
        
        .modern-header {
            background: linear-gradient(45deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
            color: white;
            padding: 100px 40px;
            text-align: center;
            position: relative;
            backdrop-filter: blur(10px);
        }
        
        .modern-title {
            font-size: 4rem;
            font-weight: 100;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .modern-section {
            background: rgba(255,255,255,0.95);
            margin: 30px;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
        }
        
        .modern-card {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
            padding: 25px;
            border-radius: 15px;
            margin: 20px 0;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }
    `;
}

/**
 * CSS para template Minimalist
 */
function getMinimalistCSS(template, colors) {
    return `
        .template-minimalist {
            background: white;
        }
        
        .minimalist-header {
            background: white;
            color: #1a1a1a;
            padding: 80px 40px;
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .minimalist-title {
            font-size: 3rem;
            font-weight: 300;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }
        
        .minimalist-section {
            padding: 60px 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .minimalist-section h2 {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 3px;
            border-bottom: 1px solid #000;
            padding-bottom: 10px;
        }
        
        .minimalist-content {
            background: #fafafa;
            padding: 30px;
            margin: 20px 0;
            border-left: 2px solid #000;
        }
    `;
}

/**
 * CSS para template Luxury
 */
function getLuxuryCSS(template, colors) {
    return `
        .template-luxury {
            background: linear-gradient(135deg, #000428, #004e92);
            color: white;
        }
        
        .luxury-header {
            background: linear-gradient(135deg, rgba(0, 4, 40, 0.9), rgba(0, 78, 146, 0.9));
            padding: 120px 40px;
            text-align: center;
            position: relative;
        }
        
        .luxury-title {
            font-size: 4rem;
            font-weight: 300;
            color: #d4af37;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .luxury-section {
            background: rgba(255,255,255,0.95);
            color: #1a1a1a;
            margin: 40px;
            padding: 50px;
            border-radius: 0;
            border: 2px solid #d4af37;
            position: relative;
        }
        
        .luxury-section::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37);
            z-index: -1;
        }
        
        .luxury-content {
            background: rgba(212, 175, 55, 0.1);
            padding: 30px;
            border: 1px solid #d4af37;
            margin: 20px 0;
        }
    `;
}

/**
 * CSS para template Classic
 */
function getClassicCSS(template, colors) {
    return `
        .template-classic .classic-header {
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            color: white;
            padding: 80px 40px;
            text-align: center;
        }
        
        .classic-title {
            font-size: 3rem;
            font-weight: 300;
            margin-bottom: 20px;
        }
        
        .classic-section {
            padding: 50px 40px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .classic-section h2 {
            color: ${colors.primary};
            border-bottom: 3px solid ${colors.secondary};
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        
        .classic-content {
            background: rgba(52, 152, 219, 0.05);
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid ${colors.secondary};
            margin: 20px 0;
        }
    `;
}

/**
 * Gerar conteúdo específico do template
 */
function generateTemplateContent(data, logoSrc, template, colors) {
    const hotelName = BrandManualUtils.escapeHtml(data.hotelName) || '[NOME DO HOTEL]';
    
    switch (template.id) {
        case 'constitution':
            return generateConstitutionContent(data, logoSrc, hotelName);
        case 'modern':
            return generateModernContent(data, logoSrc, hotelName);
        case 'minimalist':
            return generateMinimalistContent(data, logoSrc, hotelName);
        case 'luxury':
            return generateLuxuryContent(data, logoSrc, hotelName);
        default:
            return generateClassicContent(data, logoSrc, hotelName);
    }
}

/**
 * Conteúdo template Constitution
 */
function generateConstitutionContent(data, logoSrc, hotelName) {
    return `
        <div class="constitution-header">
            <div class="constitution-title">CONSTITUTION</div>
            <div class="constitution-subtitle">${hotelName}</div>
            <div class="constitution-meta">VERSION 01 • ${new Date().getFullYear()}</div>
        </div>
        
        <div class="constitution-section">
            <h2>Article I - Brand Identity</h2>
            <div class="constitution-content">
                <h3>Mission Statement</h3>
                <p>${BrandManualUtils.escapeHtml(data.mission) || '[Mission to be defined]'}</p>
            </div>
            <div class="constitution-content">
                <h3>Vision Declaration</h3>
                <p>${BrandManualUtils.escapeHtml(data.vision) || '[Vision to be defined]'}</p>
            </div>
        </div>
        
        <div class="constitution-section">
            <h2>Article II - Visual Standards</h2>
            <div class="constitution-grid">
                <div class="constitution-content">
                    <h3>Primary Typography</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.primaryFont) || '[Primary Font]'}</strong></p>
                </div>
                <div class="constitution-content">
                    <h3>Color Palette</h3>
                    <p>Primary: ${data.primaryColor || '#2c3e50'}</p>
                    <p>Secondary: ${data.secondaryColor || '#3498db'}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Conteúdo template Modern
 */
function generateModernContent(data, logoSrc, hotelName) {
    return `
        <div class="modern-header">
            <div class="modern-title">BRAND MANUAL</div>
            <div class="modern-subtitle">${hotelName}</div>
        </div>
        
        <div class="modern-section">
            <h2>Brand Identity</h2>
            <div class="modern-card">
                <h3>Mission</h3>
                <p>${BrandManualUtils.escapeHtml(data.mission) || '[Mission to be defined]'}</p>
            </div>
            <div class="modern-card">
                <h3>Vision</h3>
                <p>${BrandManualUtils.escapeHtml(data.vision) || '[Vision to be defined]'}</p>
            </div>
        </div>
        
        <div class="modern-section">
            <h2>Visual Elements</h2>
            <div class="modern-card">
                <h3>Typography</h3>
                <p><strong>Primary:</strong> ${BrandManualUtils.escapeHtml(data.primaryFont) || '[Primary Font]'}</p>
                <p><strong>Secondary:</strong> ${BrandManualUtils.escapeHtml(data.secondaryFont) || '[Secondary Font]'}</p>
            </div>
        </div>
    `;
}

/**
 * Conteúdo template Minimalist  
 */
function generateMinimalistContent(data, logoSrc, hotelName) {
    return `
        <div class="minimalist-header">
            <div class="minimalist-title">BRAND MANUAL</div>
            <div class="minimalist-subtitle">${hotelName}</div>
        </div>
        
        <div class="minimalist-section">
            <h2>Identity</h2>
            <div class="minimalist-content">
                <h3>Mission</h3>
                <p>${BrandManualUtils.escapeHtml(data.mission) || '[Mission to be defined]'}</p>
            </div>
            <div class="minimalist-content">
                <h3>Vision</h3>
                <p>${BrandManualUtils.escapeHtml(data.vision) || '[Vision to be defined]'}</p>
            </div>
        </div>
        
        <div class="minimalist-section">
            <h2>Standards</h2>
            <div class="minimalist-content">
                <h3>Typography</h3>
                <p><strong>Primary:</strong> ${BrandManualUtils.escapeHtml(data.primaryFont) || '[Primary Font]'}</p>
                <p><strong>Secondary:</strong> ${BrandManualUtils.escapeHtml(data.secondaryFont) || '[Secondary Font]'}</p>
            </div>
        </div>
    `;
}

/**
 * Conteúdo template Luxury
 */
function generateLuxuryContent(data, logoSrc, hotelName) {
    return `
        <div class="luxury-header">
            <div class="luxury-title">BRAND MANUAL</div>
            <div class="luxury-subtitle">${hotelName}</div>
        </div>
        
        <div class="luxury-section">
            <h2>Brand Essence</h2>
            <div class="luxury-content">
                <h3>Mission Statement</h3>
                <p>${BrandManualUtils.escapeHtml(data.mission) || '[Mission to be defined]'}</p>
            </div>
            <div class="luxury-content">
                <h3>Vision Statement</h3>
                <p>${BrandManualUtils.escapeHtml(data.vision) || '[Vision to be defined]'}</p>
            </div>
        </div>
        
        <div class="luxury-section">
            <h2>Design Standards</h2>
            <div class="luxury-content">
                <h3>Typography Hierarchy</h3>
                <p><strong>Primary:</strong> ${BrandManualUtils.escapeHtml(data.primaryFont) || '[Primary Font]'}</p>
                <p><strong>Secondary:</strong> ${BrandManualUtils.escapeHtml(data.secondaryFont) || '[Secondary Font]'}</p>
            </div>
        </div>
    `;
}

/**
 * Conteúdo template Classic
 */
function generateClassicContent(data, logoSrc, hotelName) {
    return `
        <div class="classic-header">
            <div class="classic-title">MANUAL DA MARCA</div>
            <div class="classic-subtitle">${hotelName}</div>
        </div>
        
        <div class="classic-section">
            <h2>Identidade da Marca</h2>
            <div class="classic-content">
                <h3>Missão</h3>
                <p>${BrandManualUtils.escapeHtml(data.mission) || '[Missão a ser definida]'}</p>
            </div>
            <div class="classic-content">
                <h3>Visão</h3>
                <p>${BrandManualUtils.escapeHtml(data.vision) || '[Visão a ser definida]'}</p>
            </div>
        </div>
        
        <div class="classic-section">
            <h2>Elementos Visuais</h2>
            <div class="classic-content">
                <h3>Tipografia</h3>
                <p><strong>Principal:</strong> ${BrandManualUtils.escapeHtml(data.primaryFont) || '[Fonte Principal]'}</p>
                <p><strong>Secundária:</strong> ${BrandManualUtils.escapeHtml(data.secondaryFont) || '[Fonte Secundária]'}</p>
            </div>
        </div>
    `;
}

/**
 * Script JavaScript para o template
 */
function getTemplateScript(template) {
    return `
        console.log('Template ${template.id} carregado');
        
        // Fechar ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.close();
            }
        });
    `;
}

/**
 * Salvar preferência de template
 */
function saveTemplatePreference() {
    if (BrandManualUtils.browserSupport.localStorage) {
        try {
            localStorage.setItem('brandManual_selectedTemplate', selectedTemplate);
        } catch (e) {
            BrandManualUtils.devLog('Erro ao salvar preferência de template', e);
        }
    }
}

/**
 * Carregar template selecionado
 */
function loadSelectedTemplate() {
    if (BrandManualUtils.browserSupport.localStorage) {
        try {
            const saved = localStorage.getItem('brandManual_selectedTemplate');
            if (saved && TEMPLATES[saved]) {
                selectedTemplate = saved;
            }
        } catch (e) {
            BrandManualUtils.devLog('Erro ao carregar preferência de template', e);
        }
    }
}

/**
 * Configurar event listeners
 */
function setupTemplateEventListeners() {
    // Template selection
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-template')) {
            const card = e.target.closest('.template-card');
            if (card) {
                const templateId = card.dataset.template;
                selectTemplate(templateId);
            }
        }
    });
}

/**
 * Obter template selecionado
 */
function getSelectedTemplate() {
    return TEMPLATES[selectedTemplate] || TEMPLATES.classic;
}

/**
 * Aplicar template ao export
 */
function applyTemplateToExport(data, logoSrc) {
    const template = getSelectedTemplate();
    
    // Modificar a função de export baseada no template
    if (template.id === 'constitution') {
        return generateConstitutionExport(data, logoSrc, template);
    }
    
    // Aplicar estilos do template ao export padrão
    return generateTemplateExport(data, logoSrc, template);
}

// Exportar funções globais
window.BrandManualTemplates = {
    initializeTemplateSystem,
    selectTemplate,
    previewSelectedTemplate,
    getSelectedTemplate,
    applyTemplateToExport,
    TEMPLATES
};

// Funções globais para compatibilidade
window.selectTemplate = selectTemplate;
window.previewSelectedTemplate = previewSelectedTemplate;

BrandManualUtils.devLog('Template system loaded successfully');