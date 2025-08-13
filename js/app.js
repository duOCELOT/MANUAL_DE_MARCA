/**
 * Aplicação Principal - Manual da Marca
 */

// Variáveis globais
let colorUpdateTimeout;

/**
 * Inicialização da aplicação
 */
document.addEventListener('DOMContentLoaded', function() {
    BrandManualUtils.devLog('Inicializando Manual da Marca...');
    
    // Verificar suporte do navegador
    checkBrowserSupport();
    
    // Carregar dados salvos automaticamente
    BrandManualStorage.autoLoad();
    
    // Configurar auto-save
    BrandManualStorage.setupAutoSave();
    
    // Configurar aviso antes de sair
    BrandManualStorage.setupBeforeUnload();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Inicializar preview das cores
    updateColorPreview();
    
    // Configurar atalhos de teclado
    setupKeyboardShortcuts();
    
    // Criar toggle para painel de customização
    createCustomizationToggle();
    
    BrandManualUtils.devLog('Manual da Marca inicializado com sucesso!');
    
    // Mostrar mensagem de boas-vindas se for primeira visita
    showWelcomeMessage();
});

/**
 * Verificar suporte do navegador
 */
function checkBrowserSupport() {
    const warnings = [];
    
    if (!BrandManualUtils.browserSupport.localStorage) {
        warnings.push('Auto-save não funcionará (localStorage não suportado)');
    }
    
    if (!BrandManualUtils.browserSupport.fileReader) {
        warnings.push('Upload de arquivos pode não funcionar');
    }
    
    if (!BrandManualUtils.browserSupport.canvas) {
        warnings.push('Algumas funcionalidades de imagem podem não funcionar');
    }
    
    if (warnings.length > 0) {
        const message = 'Avisos de compatibilidade:\n• ' + warnings.join('\n• ');
        console.warn('[Manual da Marca]', message);
        
        // Mostrar aviso apenas se muitas funcionalidades não funcionarem
        if (warnings.length > 2) {
            setTimeout(() => {
                alert('⚠️ Seu navegador pode ter limitações. Recomendamos usar Chrome, Firefox ou Edge mais recentes.');
            }, 2000);
        }
    }
}

/**
 * Criar toggle switch para painel de customização
 */
function createCustomizationToggle() {
    const controls = document.querySelector('.controls');
    if (!controls) return;
    
    // Criar container do toggle
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'customization-toggle-container';
    toggleContainer.innerHTML = `
        <label class="switch-label">
            <span class="switch-text">🎨 Customização Avançada</span>
            <label class="switch">
                <input type="checkbox" id="customizationToggle" onchange="handleCustomizationToggle(this.checked)">
                <span class="slider"></span>
            </label>
        </label>
    `;
    
    // Inserir antes do primeiro botão
    const firstButton = controls.querySelector('.btn');
    if (firstButton) {
        controls.insertBefore(toggleContainer, firstButton);
    } else {
        controls.appendChild(toggleContainer);
    }
    
    // Verificar estado salvo
    if (typeof(Storage) !== "undefined") {
        const savedState = localStorage.getItem('brandManual_customizationPanelVisible');
        if (savedState === 'true') {
            document.getElementById('customizationToggle').checked = true;
        }
    }
    
    BrandManualUtils.devLog('Toggle de customização criado');
}

/**
 * Handler para o toggle de customização
 */
function handleCustomizationToggle(checked) {
    if (window.BrandManualCustomization && window.BrandManualCustomization.toggleCustomizationPanel) {
        window.BrandManualCustomization.toggleCustomizationPanel(checked);
        BrandManualUtils.showSuccess(checked ? 
            'Painel de customização ativado!' : 
            'Painel de customização desativado!'
        );
        
        // Fazer scroll suave para o painel se estiver sendo mostrado
        if (checked) {
            setTimeout(() => {
                const panel = document.getElementById('customization');
                if (panel) {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 400);
        }
    }
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
    // Color pickers
    const colorInputs = ['primaryColor', 'secondaryColor', 'accentColor'];
    colorInputs.forEach(colorId => {
        const colorInput = document.getElementById(colorId);
        if (colorInput) {
            colorInput.addEventListener('change', updateColorPreview);
            colorInput.addEventListener('input', debounceColorUpdate);
        }
    });
    
    // Logo upload
    const logoFile = document.getElementById('logoFile');
    if (logoFile) {
        logoFile.addEventListener('change', handleLogoUpload);
    }
    
    // Validação de campos específicos
    const emailField = document.getElementById('brandManagerEmail');
    if (emailField) {
        emailField.addEventListener('blur', validateEmailField);
    }
    
    const websiteField = document.getElementById('hotelWebsite');
    if (websiteField) {
        websiteField.addEventListener('blur', validateWebsiteField);
    }
    
    // Eventos de foco para melhorar UX
    const allInputs = document.querySelectorAll('.form-control');
    allInputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
    });
    
    // Scroll suave para seções
    setupSectionNavigation();
    
    BrandManualUtils.devLog('Event listeners configurados');
}

/**
 * Preview do logo
 */
function previewLogo(input) {
    const preview = document.getElementById('logoPreview');
    if (!preview) return;
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Validar arquivo
        if (!file.type.startsWith('image/')) {
            BrandManualUtils.showError('Por favor, selecione apenas arquivos de imagem');
            return;
        }
        
        // Verificar tamanho (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            BrandManualUtils.showError('Arquivo muito grande. Máximo 5MB permitido');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Logo Preview">`;
            BrandManualUtils.showSuccess('Logo carregado com sucesso!');
            BrandManualUtils.devLog('Logo carregado', file.name);
        };
        
        reader.onerror = function() {
            BrandManualUtils.showError('Erro ao carregar a imagem');
        };
        
        reader.readAsDataURL(file);
    }
}

/**
 * Atualizar preview das cores
 */
function updateColorPreview() {
    const primary = document.getElementById('primaryColor')?.value || '#2c3e50';
    const secondary = document.getElementById('secondaryColor')?.value || '#3498db';
    const accent = document.getElementById('accentColor')?.value || '#e74c3c';
    
    // Atualizar campos hex
    const primaryHex = document.getElementById('primaryColorHex');
    const secondaryHex = document.getElementById('secondaryColorHex');
    const accentHex = document.getElementById('accentColorHex');
    
    if (primaryHex) primaryHex.value = primary;
    if (secondaryHex) secondaryHex.value = secondary;
    if (accentHex) accentHex.value = accent;
    
    // Atualizar preview
    const preview = document.getElementById('colorPreview');
    if (preview) {
        preview.innerHTML = `
            <div class="color-swatch" style="background: ${primary};">Primária</div>
            <div class="color-swatch" style="background: ${secondary};">Secundária</div>
            <div class="color-swatch" style="background: ${accent};">Destaque</div>
        `;
    }
    
    // Atualizar CSS customizado se necessário
    updateDynamicStyles(primary, secondary, accent);
    
    BrandManualUtils.devLog('Preview de cores atualizado', { primary, secondary, accent });
}

/**
 * Debounce para atualização de cores
 */
function debounceColorUpdate() {
    clearTimeout(colorUpdateTimeout);
    colorUpdateTimeout = setTimeout(updateColorPreview, 200);
}

/**
 * Atualizar estilos dinâmicos da página
 */
function updateDynamicStyles(primary, secondary, accent) {
    // Criar ou atualizar style tag personalizado
    let customStyle = document.getElementById('custom-brand-styles');
    if (!customStyle) {
        customStyle = document.createElement('style');
        customStyle.id = 'custom-brand-styles';
        document.head.appendChild(customStyle);
    }
    
    customStyle.textContent = `
        :root {
            --primary-color: ${primary};
            --secondary-color: ${secondary};
            --accent-color: ${accent};
        }
        
        .header {
            background: linear-gradient(135deg, ${primary}, ${secondary}) !important;
        }
        
        .section h2 {
            color: ${primary} !important;
            border-bottom-color: ${secondary} !important;
        }
        
        .btn-primary {
            background: ${secondary} !important;
        }
        
        .btn-primary:hover {
            background: ${adjustBrightness(secondary, -20)} !important;
        }
        
        .form-control:focus {
            border-color: ${secondary} !important;
            box-shadow: 0 0 0 3px ${hexToRgba(secondary, 0.1)} !important;
        }
        
        .value-item {
            border-left-color: ${secondary} !important;
        }
    `;
}

/**
 * Ajustar brilho de cor
 */
function adjustBrightness(hex, percent) {
    const rgb = BrandManualUtils.hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (color) => {
        const adjusted = Math.round(color * (100 + percent) / 100);
        return Math.max(0, Math.min(255, adjusted));
    };
    
    const r = adjust(rgb.r);
    const g = adjust(rgb.g);
    const b = adjust(rgb.b);
    
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converter HEX para RGBA
 */
function hexToRgba(hex, alpha = 1) {
    const rgb = BrandManualUtils.hexToRgb(hex);
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex;
}

/**
 * Handle do upload de logo
 */
function handleLogoUpload(event) {
    previewLogo(event.target);
}

/**
 * Validar campo de email
 */
function validateEmailField(event) {
    const email = event.target.value.trim();
    if (email && !BrandManualUtils.isValidEmail(email)) {
        BrandManualUtils.showError('Email inválido');
        event.target.classList.add('is-invalid');
    } else {
        event.target.classList.remove('is-invalid');
    }
}

/**
 * Validar campo de website
 */
function validateWebsiteField(event) {
    const url = event.target.value.trim();
    if (url && !BrandManualUtils.isValidUrl(url)) {
        BrandManualUtils.showError('URL inválida. Use formato: https://exemplo.com');
        event.target.classList.add('is-invalid');
    } else {
        event.target.classList.remove('is-invalid');
    }
}

/**
 * Handle de foco nos inputs
 */
function handleInputFocus(event) {
    event.target.parentElement.classList.add('focused');
}

/**
 * Handle de blur nos inputs
 */
function handleInputBlur(event) {
    event.target.parentElement.classList.remove('focused');
}

/**
 * Configurar navegação entre seções
 */
function setupSectionNavigation() {
    // Adicionar índice de navegação flutuante (opcional)
    if (BrandManualUtils.isMobile()) {
        return; // Não adicionar em mobile para economizar espaço
    }
    
    const sections = document.querySelectorAll('.section h2');
    if (sections.length === 0) return;
    
    const nav = document.createElement('nav');
    nav.className = 'floating-nav';
    nav.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        padding: 15px;
        z-index: 999;
        max-height: 400px;
        overflow-y: auto;
        display: none;
    `;
    
    const navList = document.createElement('ul');
    navList.style.cssText = 'list-style: none; margin: 0; padding: 0;';
    
    sections.forEach((section, index) => {
        const li = document.createElement('li');
        li.style.cssText = 'margin: 5px 0;';
        
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = `${index + 1}. ${section.textContent.replace(/[🏢🎯🎨✏️🗣️📋📱📞]/g, '').trim()}`;
        a.style.cssText = `
            text-decoration: none;
            color: var(--primary-color);
            font-size: 0.8rem;
            display: block;
            padding: 5px;
            border-radius: 5px;
            transition: background 0.3s;
        `;
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        a.addEventListener('mouseenter', () => {
            a.style.background = 'rgba(52, 152, 219, 0.1)';
        });
        
        a.addEventListener('mouseleave', () => {
            a.style.background = 'transparent';
        });
        
        li.appendChild(a);
        navList.appendChild(li);
    });
    
    nav.appendChild(navList);
    document.body.appendChild(nav);
    
    // Mostrar/esconder navegação baseado no scroll
    let scrollTimer;
    window.addEventListener('scroll', () => {
        nav.style.display = 'block';
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (window.scrollY < 200) {
                nav.style.display = 'none';
            }
        }, 2000);
    });
}

/**
 * Configurar atalhos de teclado
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Apenas processar se não estiver digitando em um input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    BrandManualStorage.saveData();
                    break;
                case 'o':
                    e.preventDefault();
                    BrandManualStorage.loadData();
                    break;
                case 'p':
                    e.preventDefault();
                    BrandManualPreview.previewManual();
                    break;
                case 'h':
                    e.preventDefault();
                    BrandManualExport.exportHTML();
                    break;
                case 'r':
                    e.preventDefault();
                    if (confirm('Recarregar página? Dados não salvos serão perdidos.')) {
                        location.reload();
                    }
                    break;
            }
        }
        
        // Atalhos sem Ctrl
        switch (e.key) {
            case 'F1':
                e.preventDefault();
                showHelpModal();
                break;
            case 'Escape':
                hideAllModals();
                break;
        }
    });
    
    BrandManualUtils.devLog('Atalhos de teclado configurados');
}

/**
 * Mostrar modal de ajuda
 */
function showHelpModal() {
    const helpContent = `
        <h3>🔧 Atalhos de Teclado</h3>
        <ul>
            <li><kbd>Ctrl+S</kbd> - Salvar dados</li>
            <li><kbd>Ctrl+O</kbd> - Carregar dados</li>
            <li><kbd>Ctrl+P</kbd> - Preview</li>
            <li><kbd>Ctrl+H</kbd> - Exportar HTML</li>
            <li><kbd>F1</kbd> - Mostrar esta ajuda</li>
            <li><kbd>ESC</kbd> - Fechar modais</li>
        </ul>
        
        <h3>💡 Dicas de Uso</h3>
        <ul>
            <li>Os dados são salvos automaticamente enquanto você digita</li>
            <li>Use cores contrastantes para melhor legibilidade</li>
            <li>O logo deve ter boa qualidade (mín. 200px)</li>
            <li>Teste o preview antes de exportar</li>
            <li>Ative a Customização Avançada para mais opções visuais</li>
        </ul>
        
        <h3>🎨 Customização Avançada</h3>
        <p>Use o toggle "Customização Avançada" no topo da página para acessar opções avançadas de personalização visual, incluindo:</p>
        <ul>
            <li>Temas predefinidos</li>
            <li>Customização de seções individuais</li>
            <li>Paleta de cores expandida</li>
            <li>Configurações de tipografia</li>
            <li>Ajustes de layout</li>
        </ul>
    `;
    
    showModal('Ajuda - Manual da Marca', helpContent);
}

/**
 * Mostrar modal genérico
 */
function showModal(title, content) {
    // Remover modal existente
    const existingModal = document.getElementById('help-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'help-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <button onclick="this.parentElement.parentElement.remove()" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
        ">✕</button>
        <h2 style="margin-bottom: 20px; color: var(--primary-color);">${title}</h2>
        ${content}
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Esconder todos os modais
 */
function hideAllModals() {
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => modal.remove());
}

/**
 * Mostrar mensagem de boas-vindas
 */
function showWelcomeMessage() {
    // Verificar se é primeira visita
    const hasVisited = localStorage.getItem('brandManual_hasVisited');
    
    if (!hasVisited && !BrandManualStorage.data.hotelName) {
        setTimeout(() => {
            const welcomeContent = `
                <h3>🎉 Bem-vindo ao Manual da Marca!</h3>
                <p>Esta ferramenta te ajuda a criar um manual profissional para a identidade visual do seu hotel.</p>
                
                <h4>Como começar:</h4>
                <ol>
                    <li>Preencha as informações básicas do hotel</li>
                    <li>Defina a missão, visão e valores</li>
                    <li>Escolha as cores da marca</li>
                    <li>Configure tipografia e tom de voz</li>
                    <li>Use o Preview para ver o resultado</li>
                    <li>Exporte o manual completo</li>
                </ol>
                
                <p><strong>🎨 Novo!</strong> Ative a "Customização Avançada" no topo da página para acessar opções visuais extras!</p>
                
                <p><strong>💡 Dica:</strong> Seus dados são salvos automaticamente!</p>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); document.getElementById('hotelName').focus();" style="
                        background: var(--secondary-color);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Começar Agora!</button>
                </div>
            `;
            
            showModal('Bem-vindo!', welcomeContent);
            
            // Marcar como visitado
            try {
                localStorage.setItem('brandManual_hasVisited', 'true');
            } catch (e) {
                // Ignorar se localStorage não estiver disponível
            }
        }, 1000);
    }
}

/**
 * Funções expostas globalmente para compatibilidade
 */
window.previewLogo = previewLogo;
window.updateColorPreview = updateColorPreview;
window.saveData = BrandManualStorage.saveData;
window.loadData = BrandManualStorage.loadData;
window.clearAllData = BrandManualStorage.clearAllData;
window.previewManual = BrandManualPreview.previewManual;
window.exportHTML = BrandManualExport.exportHTML;
window.exportPDF = BrandManualExport.exportPDF;
window.handleCustomizationToggle = handleCustomizationToggle;

// Tratamento de erros globais
window.addEventListener('error', function(e) {
    BrandManualUtils.devLog('Erro global capturado', e.error);
    BrandManualUtils.showError('Ocorreu um erro inesperado. Tente recarregar a página.');
});

// Tratamento de promessas rejeitadas
window.addEventListener('unhandledrejection', function(e) {
    BrandManualUtils.devLog('Promise rejeitada', e.reason);
    BrandManualUtils.showError('Erro de processamento. Verifique sua conexão.');
    e.preventDefault();
});

BrandManualUtils.devLog('App.js carregado com sucesso');