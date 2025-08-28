/**
 * Gerar corpo customizado do template
 */
function generateCustomizedBody(data, logoSrc, template, colors, customizations) {
    let sectionsHTML = '';
    
    // Definir ordem padrão das seções
    const sectionOrder = [
        'info-basicas',
        'identidade', 
        'logotipo',
        'cores',
        'tipografia',
        'tom-voz',
        'aplicacoes',
        'redes-sociais',
        'contatos'
    ];
    
    // Mapeamento de IDs para geradores de conteúdo
    const sectionGenerators = {
        'info-basicas': () => generateBasicInfoSection(data, colors, customizations),
        'identidade': () => generateIdentitySection(data, colors, customizations),
        'logotipo': () => generateLogoSection(data, logoSrc, colors, customizations),
        'cores': () => generateColorsSection(data, colors, customizations),
        'tipografia': () => generateTypographySection(data, colors, customizations),
        'tom-voz': () => generateVoiceSection(data, colors, customizations),
        'aplicacoes': () => generateApplicationsSection(data, colors, customizations),
        'redes-sociais': () => generateSocialSection(data, colors, customizations),
        'contatos': () => generateContactsSection(data, colors, customizations)
    };
    
    // Gerar seções respeitando customizações
    sectionOrder.forEach(sectionId => {
        const sectionConfig = customizations?.sections?.[sectionId];
        
        // Pular seção se desabilitada
        if (sectionConfig && !sectionConfig.enabled) {
            return;
        }
        
        // Gerar conteúdo da seção
        if (sectionGenerators[sectionId]) {
            const sectionContent = sectionGenerators[sectionId]();
            
            // Aplicar estilos customizados se disponíveis
            if (sectionConfig && sectionContent) {
                const sectionStyle = `
                    background: ${sectionConfig.backgroundColor || '#ffffff'};
                    padding: ${sectionConfig.padding || '40px'};
                    margin-bottom: ${customizations?.global?.sectionSpacing || 30}px;
                    border-radius: ${sectionConfig.borderRadius || '12px'};
                    box-shadow: ${sectionConfig.shadow || '0 5px 15px rgba(0,0,0,0.08)'};
                `;
                
                // Aplicar customizações ao título
                const customTitle = sectionConfig.customTitle;
                const icon = sectionConfig.icon;
                const titleColor = sectionConfig.titleColor;
                
                // Modificar o conteúdo da seção com customizações
                sectionsHTML += `
                    <div class="section" style="${sectionStyle}">
                        ${sectionContent.replace(
                            /<h2[^>]*>([^<]+)<\/h2>/,
                            `<h2 style="color: ${titleColor || colors.primary}; border-bottom: 3px solid ${colors.secondary}; padding-bottom: 10px; margin-bottom: 20px;">
                                ${icon || ''} ${customTitle || '$1'}
                            </h2>`
                        )}
                    </div>
                `;
            } else {
                sectionsHTML += `<div class="section" style="padding: 40px; margin-bottom: 30px;">${sectionContent}</div>`;
            }
        }
    });
    
    return `<div class="template-body">${sectionsHTML}</div>`;
}

// Funções auxiliares para gerar cada seção
function generateBasicInfoSection(data, colors, customizations) {
    return `
        <h2>Informações Básicas</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Nome do Hotel</h3>
                <p><strong>${escapeHtmlSafe(data.hotelName) || '[Nome do Hotel]'}</strong></p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Tipo/Conceito</h3>
                <p>${escapeHtmlSafe(data.hotelType) || '[Tipo/Conceito]'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Localização</h3>
                <p>${escapeHtmlSafe(data.hotelLocation) || '[Localização]'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Website</h3>
                <p>${escapeHtmlSafe(data.hotelWebsite) || '[Website]'}</p>
            </div>
        </div>
    `;
}

function generateIdentitySection(data, colors, customizations) {
    return `
        <h2>Identidade da Marca</h2>
        <div style="background: rgba(52, 152, 219, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>Missão</h3>
            <p>${escapeHtmlSafe(data.mission) || '[Missão a ser definida]'}</p>
        </div>
        <div style="background: rgba(52, 152, 219, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>Visão</h3>
            <p>${escapeHtmlSafe(data.vision) || '[Visão a ser definida]'}</p>
        </div>
        <div style="background: rgba(52, 152, 219, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>Posicionamento</h3>
            <p>${escapeHtmlSafe(data.positioning) || '[Posicionamento a ser definido]'}</p>
        </div>
        <h3>Valores da Marca</h3>
        ${[1, 2, 3].map(i => `
            <div style="background: rgba(231, 76, 60, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid ${colors.accent};">
                <h4>${escapeHtmlSafe(data[`value${i}`]) || `Valor ${i}`}</h4>
                <p>${escapeHtmlSafe(data[`valueDesc${i}`]) || '[Descrição do valor]'}</p>
            </div>
        `).join('')}
    `;
}

function generateLogoSection(data, logoSrc, colors, customizations) {
    if (!logoSrc) return '';
    
    return `
        <h2>Logotipo</h2>
        <div style="text-align: center; margin: 30px 0;">
            <img src="${logoSrc}" alt="Logo" style="max-width: 300px; max-height: 150px;">
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Dimensão Mínima</h3>
                <p>${escapeHtmlSafe(data.logoMinSize) || '[Ex: 50mm de largura]'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Área de Proteção</h3>
                <p>${escapeHtmlSafe(data.logoProtection) || '[Ex: 2x altura da letra principal]'}</p>
            </div>
        </div>
    `;
}

function generateColorsSection(data, colors, customizations) {
    const finalColors = customizations ? {
        primary: customizations.colors.primary || colors.primary,
        secondary: customizations.colors.secondary || colors.secondary,
        accent: customizations.colors.accent || colors.accent
    } : colors;
    
    return `
        <h2>Paleta de Cores</h2>
        <div style="display: flex; gap: 20px; margin: 30px 0; flex-wrap: wrap; justify-content: center;">
            <div style="text-align: center;">
                <div style="width: 120px; height: 120px; background: ${finalColors.primary}; border-radius: 8px; margin-bottom: 10px;"></div>
                <h4>Primária</h4>
                <p>${escapeHtmlSafe(data.primaryColorName) || 'Cor Primária'}</p>
                <p><strong>${finalColors.primary}</strong></p>
            </div>
            <div style="text-align: center;">
                <div style="width: 120px; height: 120px; background: ${finalColors.secondary}; border-radius: 8px; margin-bottom: 10px;"></div>
                <h4>Secundária</h4>
                <p>${escapeHtmlSafe(data.secondaryColorName) || 'Cor Secundária'}</p>
                <p><strong>${finalColors.secondary}</strong></p>
            </div>
            <div style="text-align: center;">
                <div style="width: 120px; height: 120px; background: ${finalColors.accent}; border-radius: 8px; margin-bottom: 10px;"></div>
                <h4>Destaque</h4>
                <p>${escapeHtmlSafe(data.accentColorName) || 'Cor de Destaque'}</p>
                <p><strong>${finalColors.accent}</strong></p>
            </div>
        </div>
    `;
}

function generateTypographySection(data, colors, customizations) {
    const typography = customizations?.typography || {};
    
    return `
        <h2>Tipografia</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Fonte Principal</h3>
                <p style="font-family: ${typography.primaryFont || 'Arial'}; font-size: 1.2rem;">
                    <strong>${escapeHtmlSafe(data.primaryFont) || typography.primaryFont || '[Fonte Principal]'}</strong>
                </p>
                <p>Uso: ${escapeHtmlSafe(data.primaryFontUsage) || 'Títulos, logotipo, destaques'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Fonte Secundária</h3>
                <p style="font-family: ${typography.secondaryFont || 'Arial'}; font-size: 1.2rem;">
                    <strong>${escapeHtmlSafe(data.secondaryFont) || typography.secondaryFont || '[Fonte Secundária]'}</strong>
                </p>
                <p>Uso: ${escapeHtmlSafe(data.secondaryFontUsage) || 'Textos longos, corpo'}</p>
            </div>
        </div>
    `;
}

function generateVoiceSection(data, colors, customizations) {
    return `
        <h2>Tom de Voz</h2>
        <div style="background: rgba(52, 152, 219, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>Personalidade da Comunicação</h3>
            <p>${escapeHtmlSafe(data.voiceTone) || '[Como a marca deve se comunicar]'}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Nível de Formalidade</h3>
                <p><strong>${escapeHtmlSafe(data.formalityLevel) || '[A definir]'}</strong></p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Tratamento Preferido</h3>
                <p><strong>${escapeHtmlSafe(data.treatment) || '[A definir]'}</strong></p>
            </div>
        </div>
    `;
}

function generateApplicationsSection(data, colors, customizations) {
    return `
        <h2>Aplicações da Marca</h2>
        <div style="display: grid; gap: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Materiais Impressos</h3>
                <p>${escapeHtmlSafe(data.printMaterials) || '[Cartão de visita, papel timbrado, folhetos...]'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Sinalização</h3>
                <p>${escapeHtmlSafe(data.signage) || '[Placas externas, internas, direcionais...]'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Uniformes</h3>
                <p>${escapeHtmlSafe(data.uniforms) || '[Especificações de uniformes e aplicação da marca]'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Materiais Digitais</h3>
                <p>${escapeHtmlSafe(data.digitalMaterials) || '[Website, redes sociais, e-mail marketing...]'}</p>
            </div>
        </div>
    `;
}

function generateSocialSection(data, colors, customizations) {
    return `
        <h2>Redes Sociais</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            ${data.instagram ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <h3>📸 Instagram</h3>
                    <p>${escapeHtmlSafe(data.instagram)}</p>
                </div>
            ` : ''}
            ${data.facebook ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <h3>📘 Facebook</h3>
                    <p>${escapeHtmlSafe(data.facebook)}</p>
                </div>
            ` : ''}
            ${data.linkedin ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <h3>💼 LinkedIn</h3>
                    <p>${escapeHtmlSafe(data.linkedin)}</p>
                </div>
            ` : ''}
        </div>
    `;
}

function generateContactsSection(data, colors, customizations) {
    return `
        <h2>Contatos</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>👤 Responsável pela Marca</h3>
                <p><strong>${escapeHtmlSafe(data.brandManager) || '[Nome do responsável]'}</strong></p>
                <p>📧 ${escapeHtmlSafe(data.brandManagerEmail) || '[email@hotel.com]'}</p>
                <p>📱 ${escapeHtmlSafe(data.brandManagerPhone) || '[telefone]'}</p>
            </div>
            ${data.designer ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <h3>🎨 Agência/Designer</h3>
                    <p><strong>${escapeHtmlSafe(data.designer)}</strong></p>
                </div>
            ` : ''}
        </div>
    `;
}/**
 * Sistema de Exportação com Templates
 * Extensão do export.js original com suporte a templates
 */

/**
 * Exportar HTML com template selecionado
 */
function exportHTMLWithTemplate() {
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const template = BrandManualTemplates ? BrandManualTemplates.getSelectedTemplate() : { id: 'classic', name: 'Clássico' };
        const logoImg = document.querySelector('#logoPreview img');
        const logoSrc = logoImg ? logoImg.src : '';
        
        const htmlContent = generateTemplateHTML(data, logoSrc, template);
        const filename = `manual-marca-${template.id}-${BrandManualUtils.generateSlug(data.hotelName || 'hotel')}.html`;
        
        downloadHTMLFile(htmlContent, filename);
        
        BrandManualUtils.showSuccess(`Manual HTML exportado com template "${template.name}"!`);
        BrandManualUtils.devLog('HTML com template exportado', { template: template.id, filename });
    } catch (error) {
        BrandManualUtils.devLog('Erro ao exportar HTML com template', error);
        BrandManualUtils.showError('Erro ao exportar HTML: ' + error.message);
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Exportar PDF com template selecionado
 */
function exportPDFWithTemplate() {
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const template = BrandManualTemplates ? BrandManualTemplates.getSelectedTemplate() : { id: 'classic', name: 'Clássico' };
        const pdfHTML = generateTemplatePDF(data, template);
        
        const printWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
        if (printWindow) {
            printWindow.document.write(pdfHTML);
            printWindow.document.close();
            
            printWindow.onload = function() {
                setTimeout(() => {
                    printWindow.print();
                }, 500);
            };
            
            BrandManualUtils.showSuccess(`PDF gerado com template "${template.name}"!`);
            BrandManualUtils.devLog('PDF com template gerado', template.id);
        } else {
            BrandManualUtils.showError('Pop-up bloqueado! Permita pop-ups para usar esta função.');
        }
    } catch (error) {
        BrandManualUtils.devLog('Erro ao gerar PDF com template', error);
        BrandManualUtils.showError('Erro ao gerar PDF: ' + error.message);
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Gerar HTML completo com template
 */
function generateTemplateHTML(data, logoSrc, template) {
    // Obter customizações se disponíveis
    const customizations = window.BrandManualCustomization ? 
        window.BrandManualCustomization.customizationData : null;
    
    // Usar cores customizadas ou padrão
    const colors = customizations ? {
        primary: customizations.colors.primary || data.primaryColor || '#2c3e50',
        secondary: customizations.colors.secondary || data.secondaryColor || '#3498db',
        accent: customizations.colors.accent || data.accentColor || '#e74c3c'
    } : {
        primary: data.primaryColor || '#2c3e50',
        secondary: data.secondaryColor || '#3498db',
        accent: data.accentColor || '#e74c3c'
    };

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual da Marca - ${escapeHtmlSafe(data.hotelName || 'Hotel')}</title>
    <style>
        ${getTemplateExportCSS(template, colors, customizations)}
    </style>
</head>
<body class="template-${template.id}" data-template="${template.id}">
    <div class="template-container">
        ${generateCustomizedCoverPage(data, logoSrc, template, colors, customizations)}
        ${generateTemplateHeader(data, logoSrc, template, colors, customizations)}
        ${generateCustomizedBody(data, logoSrc, template, colors, customizations)}
        ${generateTemplateFooter(data, template)}
    </div>

    <div class="export-controls">
        <button class="btn btn-print" onclick="window.print()">🖨️ Imprimir</button>
        <button class="btn btn-close" onclick="window.close()">✕ Fechar</button>
    </div>

    <script>
        ${getTemplateExportScript(template)}
    </script>
</body>
</html>`;
}

/**
 * Gerar CSS específico para exportação de template
 */
function getTemplateExportCSS(template, colors, customizations) {
    // CSS base com customizações aplicadas
    const globalStyles = customizations ? `
        --primary-color: ${customizations.colors.primary};
        --secondary-color: ${customizations.colors.secondary};
        --accent-color: ${customizations.colors.accent};
        --border-radius: ${customizations.global.borderStyle === 'sharp' ? '0px' : 
                         customizations.global.borderStyle === 'soft' ? '6px' : '12px'};
        --font-family: ${customizations.typography.primaryFont || 'Arial'}, sans-serif;
        --font-size-base: ${customizations.typography.baseFontSize || 1}rem;
    ` : '';
    
    const baseCSS = `
        :root {
            ${globalStyles}
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: var(--font-family, 'Arial', sans-serif); 
            font-size: var(--font-size-base, 1rem);
            line-height: 1.6; 
            color: #2c3e50;
            background: #f5f5f5;
            overflow-x: hidden;
        }
        
        .template-container { 
            max-width: ${customizations?.global.maxWidth || '1200px'}; 
            margin: 0 auto; 
            background: white;
            min-height: 100vh;
            position: relative;
        }
        
        .export-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            z-index: 1000;
        }
        
        .export-controls .btn {
            padding: 10px 15px;
            border: none;
            border-radius: var(--border-radius, 5px);
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .btn-print {
            background: #27ae60;
            color: white;
        }
        
        .btn-close {
            background: #e74c3c;
            color: white;
        }
        
        .export-controls .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .section {
            padding: 40px;
            margin-bottom: ${customizations?.global.sectionSpacing || 30}px;
            border-radius: var(--border-radius, 12px);
        }
        
        @media print {
            .export-controls { display: none !important; }
            .template-container { max-width: none; margin: 0; }
            body { background: white; }
        }
    `;
    
    // Adicionar CSS específico do template se necessário
    return baseCSS;
}

/**
 * Gerar capa customizada
 */
function generateCustomizedCoverPage(data, logoSrc, template, colors, customizations) {
    if (!customizations || !customizations.coverPage.enabled) {
        return ''; // Não incluir capa se desabilitada
    }
    
    const hotelName = escapeHtmlSafe(data.hotelName) || '[NOME DO HOTEL]';
    const coverData = customizations.coverPage;
    
    let backgroundStyle = '';
    if (coverData.backgroundImage) {
        backgroundStyle = `
            background: linear-gradient(${coverData.backgroundOverlay}, ${coverData.backgroundOverlay}), 
                       url('${coverData.backgroundImage}') center/cover;
        `;
    } else {
        backgroundStyle = `background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});`;
    }
    
    let titleStyle = '';
    switch (coverData.titleStyle) {
        case 'gradient':
            titleStyle = `background: linear-gradient(45deg, ${colors.secondary}, ${colors.accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;`;
            break;
        case 'solid':
            titleStyle = `color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);`;
            break;
        case 'outlined':
            titleStyle = `color: transparent; -webkit-text-stroke: 2px white; font-weight: bold;`;
            break;
        default:
            titleStyle = 'color: white; font-weight: bold;';
    }
    
    return `
        <div class="cover-page" style="${backgroundStyle} height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: ${coverData.logoPosition}; color: white; text-align: center; page-break-after: always;">
            ${logoSrc ? `<img src="${logoSrc}" alt="Logo" style="max-width: 200px; max-height: 100px; margin-bottom: 30px;">` : ''}
            <h1 style="font-size: 4rem; margin: 20px 0; ${titleStyle}">${hotelName}</h1>
            <p style="font-size: 2rem; opacity: 0.9; margin: 10px 0;">Manual da Marca</p>
            <p style="font-size: 1.2rem; opacity: 0.7; margin-top: 20px;">Versão 1.0 • ${new Date().getFullYear()}</p>
        </div>
    `;
}

/**
 * Gerar header do template com customizações
 */
function generateTemplateHeader(data, logoSrc, template, colors, customizations) {
    const hotelName = escapeHtmlSafe(data.hotelName) || '[NOME DO HOTEL]';
    
    // Aplicar customizações do header se disponíveis
    let headerBackground = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    
    if (customizations && customizations.headerBackground) {
        const headerData = customizations.headerBackground;
        switch (headerData.type) {
            case 'image':
                if (headerData.image) {
                    headerBackground = `
                        linear-gradient(${headerData.overlay}, ${headerData.overlay}),
                        url('${headerData.image}') center/cover
                    `;
                }
                break;
            case 'solid':
                headerBackground = colors.primary;
                break;
            case 'gradient':
            default:
                headerBackground = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
                break;
        }
    }
    
    return `
        <div class="template-header" style="background: ${headerBackground}; color: white; padding: 60px; text-align: center;">
            ${logoSrc && (!customizations || !customizations.coverPage.enabled) ? 
                `<img src="${logoSrc}" alt="Logo" style="max-width: 150px; max-height: 100px; margin-bottom: 30px;">` : ''}
            <h1 style="font-size: 3rem; margin-bottom: 20px;">MANUAL DA MARCA</h1>
            <h2 style="font-size: 2rem; font-weight: 300;">${hotelName}</h2>
            <p style="margin-top: 10px; opacity: 0.9;">Template: ${template.name}</p>
        </div>
    `;
}

/**
 * Gerar corpo do template
 */
function generateTemplateBody(data, logoSrc, template, colors) {
    return `
        <div class="template-body" style="padding: 40px;">
            <section style="margin-bottom: 40px;">
                <h2 style="color: ${colors.primary}; border-bottom: 3px solid ${colors.secondary}; padding-bottom: 10px; margin-bottom: 20px;">Identidade da Marca</h2>
                
                <div style="background: rgba(52, 152, 219, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Missão</h3>
                    <p>${escapeHtmlSafe(data.mission) || '[Missão a ser definida]'}</p>
                </div>
                
                <div style="background: rgba(52, 152, 219, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Visão</h3>
                    <p>${escapeHtmlSafe(data.vision) || '[Visão a ser definida]'}</p>
                </div>
                
                <div style="background: rgba(52, 152, 219, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Posicionamento</h3>
                    <p>${escapeHtmlSafe(data.positioning) || '[Posicionamento a ser definido]'}</p>
                </div>
            </section>
            
            <section style="margin-bottom: 40px;">
                <h2 style="color: ${colors.primary}; border-bottom: 3px solid ${colors.secondary}; padding-bottom: 10px; margin-bottom: 20px;">Valores da Marca</h2>
                
                ${[1, 2, 3].map(i => `
                    <div style="background: rgba(231, 76, 60, 0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid ${colors.accent};">
                        <h3>${escapeHtmlSafe(data[`value${i}`]) || `Valor ${i}`}</h3>
                        <p>${escapeHtmlSafe(data[`valueDesc${i}`]) || '[Descrição do valor]'}</p>
                    </div>
                `).join('')}
            </section>
            
            <section style="margin-bottom: 40px;">
                <h2 style="color: ${colors.primary}; border-bottom: 3px solid ${colors.secondary}; padding-bottom: 10px; margin-bottom: 20px;">Elementos Visuais</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <h3>Cores Principais</h3>
                        <p><strong>Primária:</strong> ${data.primaryColor || colors.primary}</p>
                        <p><strong>Secundária:</strong> ${data.secondaryColor || colors.secondary}</p>
                        <p><strong>Destaque:</strong> ${data.accentColor || colors.accent}</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <h3>Tipografia</h3>
                        <p><strong>Fonte Principal:</strong> ${escapeHtmlSafe(data.primaryFont) || '[Fonte Principal]'}</p>
                        <p><strong>Fonte Secundária:</strong> ${escapeHtmlSafe(data.secondaryFont) || '[Fonte Secundária]'}</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

/**
 * Gerar footer do template
 */
function generateTemplateFooter(data, template) {
    return `
        <div class="template-footer" style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
            <h3>Informações do Documento</h3>
            <p><strong>Versão:</strong> 1.0</p>
            <p><strong>Criado em:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Template:</strong> ${template.name}</p>
            <p><strong>Próxima Revisão:</strong> ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
        </div>
    `;
}

/**
 * Gerar PDF com template
 */
function generateTemplatePDF(data, template) {
    // Obter customizações se disponíveis
    const customizations = window.BrandManualCustomization ? 
        window.BrandManualCustomization.customizationData : null;
    
    // Usar cores customizadas ou padrão
    const colors = customizations ? {
        primary: customizations.colors.primary || data.primaryColor || '#2c3e50',
        secondary: customizations.colors.secondary || data.secondaryColor || '#3498db',
        accent: customizations.colors.accent || data.accentColor || '#e74c3c'
    } : {
        primary: data.primaryColor || '#2c3e50',
        secondary: data.secondaryColor || '#3498db',
        accent: data.accentColor || '#e74c3c'
    };

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual da Marca - ${template.name} - ${escapeHtmlSafe(data.hotelName || 'Hotel')}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: ${customizations?.typography?.primaryFont || 'Arial'}, sans-serif;
            font-size: ${customizations?.typography?.baseFontSize || 1}rem;
            line-height: 1.4;
            color: #333;
            margin: 20px;
        }
        
        .pdf-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 30px;
            background: ${colors.primary};
            color: white;
            border-radius: ${customizations?.global?.borderStyle === 'sharp' ? '0' : '10'}px;
        }
        
        .pdf-title {
            font-size: 28pt;
            margin-bottom: 10pt;
            font-weight: 300;
        }
        
        .pdf-subtitle {
            font-size: 18pt;
            margin-bottom: 10pt;
        }
        
        .pdf-section {
            margin-bottom: 30pt;
            padding: 20pt;
            border-bottom: 1pt solid #ddd;
            ${customizations?.sections ? 'page-break-inside: avoid;' : ''}
        }
        
        .pdf-section h2 {
            font-size: 18pt;
            color: ${colors.primary};
            margin-bottom: 15pt;
        }
        
        .pdf-article {
            margin: 15pt 0;
            padding: 15pt;
            background: #f9f9f9;
            border-left: 3pt solid ${colors.secondary};
        }
        
        .page-break { page-break-before: always; }
        
        @media print {
            body { margin: 0; font-size: 11pt; }
            .pdf-section { break-inside: avoid; }
            .pdf-header {
                background: ${colors.primary} !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    ${customizations?.coverPage?.enabled ? generatePDFCoverPage(data, template, colors, customizations) : ''}
    
    <div class="pdf-header">
        <div class="pdf-title">MANUAL DA MARCA</div>
        <div class="pdf-subtitle">${escapeHtmlSafe(data.hotelName || '[NOME DO HOTEL]')}</div>
        <div>Template: ${template.name} • ${new Date().getFullYear()}</div>
    </div>
    
    ${generatePDFBody(data, colors, customizations)}
    
    <script>
        window.onload = function() { 
            setTimeout(function() {
                window.print(); 
                setTimeout(function() { window.close(); }, 2000);
            }, 1000);
        };
    </script>
</body>
</html>`;
}

/**
 * Gerar capa do PDF
 */
function generatePDFCoverPage(data, template, colors, customizations) {
    const coverData = customizations.coverPage;
    const hotelName = escapeHtmlSafe(data.hotelName) || '[NOME DO HOTEL]';
    
    let backgroundStyle = '';
    if (coverData.backgroundImage) {
        backgroundStyle = `
            background: linear-gradient(${coverData.backgroundOverlay}, ${coverData.backgroundOverlay}), 
                       url('${coverData.backgroundImage}') center/cover;
        `;
    } else {
        backgroundStyle = `background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});`;
    }
    
    return `
        <div style="${backgroundStyle} height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; page-break-after: always; -webkit-print-color-adjust: exact; color-adjust: exact;">
            <h1 style="font-size: 48pt; margin: 20pt 0; font-weight: bold;">${hotelName}</h1>
            <p style="font-size: 24pt; margin: 10pt 0;">Manual da Marca</p>
            <p style="font-size: 14pt; margin-top: 20pt;">Versão 1.0 • ${new Date().getFullYear()}</p>
        </div>
    `;
}

/**
 * Gerar corpo do PDF com customizações
 */
function generatePDFBody(data, colors, customizations) {
    let bodyHTML = '';
    
    // Verificar quais seções estão habilitadas
    const sections = customizations?.sections || {};
    
    // Seção de Identidade
    if (!sections['identidade'] || sections['identidade'].enabled) {
        bodyHTML += `
            <div class="pdf-section">
                <h2>${sections['identidade']?.icon || ''} ${sections['identidade']?.customTitle || 'Identidade da Marca'}</h2>
                
                <div class="pdf-article">
                    <h3>Missão</h3>
                    <p>${escapeHtmlSafe(data.mission) || '[Missão a ser definida]'}</p>
                </div>
                
                <div class="pdf-article">
                    <h3>Visão</h3>
                    <p>${escapeHtmlSafe(data.vision) || '[Visão a ser definida]'}</p>
                </div>
                
                <div class="pdf-article">
                    <h3>Posicionamento</h3>
                    <p>${escapeHtmlSafe(data.positioning) || '[Posicionamento a ser definido]'}</p>
                </div>
            </div>
        `;
    }
    
    // Valores da Marca
    if (!sections['identidade'] || sections['identidade'].enabled) {
        bodyHTML += `
            <div class="page-break pdf-section">
                <h2>Valores da Marca</h2>
                
                ${[1, 2, 3].map(i => `
                    <div class="pdf-article">
                        <h3>${escapeHtmlSafe(data[`value${i}`]) || `Valor ${i}`}</h3>
                        <p>${escapeHtmlSafe(data[`valueDesc${i}`]) || '[Descrição do valor]'}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Paleta de Cores
    if (!sections['cores'] || sections['cores'].enabled) {
        const finalColors = customizations ? {
            primary: customizations.colors.primary || colors.primary,
            secondary: customizations.colors.secondary || colors.secondary,
            accent: customizations.colors.accent || colors.accent
        } : colors;
        
        bodyHTML += `
            <div class="page-break pdf-section">
                <h2>${sections['cores']?.icon || ''} ${sections['cores']?.customTitle || 'Padrões Visuais'}</h2>
                
                <div class="pdf-article">
                    <h3>Paleta de Cores</h3>
                    <p><strong>Primária:</strong> ${finalColors.primary}</p>
                    <p><strong>Secundária:</strong> ${finalColors.secondary}</p>
                    <p><strong>Destaque:</strong> ${finalColors.accent}</p>
                </div>
            </div>
        `;
    }
    
    // Tipografia
    if (!sections['tipografia'] || sections['tipografia'].enabled) {
        bodyHTML += `
            <div class="pdf-article">
                <h3>Tipografia</h3>
                <p><strong>Fonte Principal:</strong> ${escapeHtmlSafe(data.primaryFont) || customizations?.typography?.primaryFont || '[Fonte Principal]'}</p>
                <p><strong>Fonte Secundária:</strong> ${escapeHtmlSafe(data.secondaryFont) || customizations?.typography?.secondaryFont || '[Fonte Secundária]'}</p>
            </div>
        `;
    }
    
    return bodyHTML;
}

/**
 * Script específico do template para export
 */
function getTemplateExportScript(template) {
    return `
        // Template-specific interactions
        console.log('Template ${template.id} loaded for export');
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
            if (e.key === 'Escape') {
                window.close();
            }
        });
        
        // Print handling
        window.addEventListener('beforeprint', function() {
            const controls = document.querySelector('.export-controls');
            if (controls) controls.style.display = 'none';
        });
        
        window.addEventListener('afterprint', function() {
            const controls = document.querySelector('.export-controls');
            if (controls) controls.style.display = 'flex';
        });
    `;
}

/**
 * Função auxiliar para escape HTML
 */
function escapeHtmlSafe(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * Download do arquivo HTML
 */
function downloadHTMLFile(content, filename) {
    try {
        const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Limpar URL após download
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        
        BrandManualUtils.devLog('Download HTML realizado', filename);
    } catch (error) {
        throw new Error('Falha no download HTML: ' + error.message);
    }
}

/**
 * Exportar múltiplos formatos de uma vez
 */
function exportAllFormats() {
    const confirmation = confirm('Deseja exportar o manual em todos os formatos disponíveis?\n\n- HTML com template\n- PDF para impressão\n- Dados JSON');
    
    if (!confirmation) return;
    
    BrandManualUtils.showLoading();
    
    try {
        // Export HTML
        setTimeout(() => {
            exportHTMLWithTemplate();
        }, 500);
        
        // Export PDF
        setTimeout(() => {
            exportPDFWithTemplate();
        }, 1500);
        
        // Export Data
        setTimeout(() => {
            BrandManualStorage.saveData();
        }, 2500);
        
        BrandManualUtils.showSuccess('Todos os formatos estão sendo exportados!');
    } catch (error) {
        BrandManualUtils.showError('Erro durante exportação múltipla: ' + error.message);
    } finally {
        setTimeout(() => {
            BrandManualUtils.hideLoading();
        }, 3000);
    }
}

/**
 * Gerar link de compartilhamento
 */
function generateShareLink() {
    try {
        const data = BrandManualStorage.collectFormData();
        const template = BrandManualTemplates ? BrandManualTemplates.getSelectedTemplate() : { id: 'classic' };
        
        // Criar dados compactados para URL
        const shareData = {
            t: template.id,
            h: data.hotelName,
            m: data.mission,
            v: data.vision,
            c1: data.primaryColor,
            c2: data.secondaryColor,
            c3: data.accentColor
        };
        
        // Codificar dados
        const encodedData = btoa(JSON.stringify(shareData));
        const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encodedData}`;
        
        // Copiar para clipboard
        BrandManualUtils.copyToClipboard(shareUrl);
        BrandManualUtils.showSuccess('Link de compartilhamento copiado!');
        
        return shareUrl;
    } catch (error) {
        BrandManualUtils.showError('Erro ao gerar link de compartilhamento');
        BrandManualUtils.devLog('Erro share link', error);
    }
}

/**
 * Preview responsivo do template
 */
function previewResponsive() {
    const template = BrandManualTemplates ? BrandManualTemplates.getSelectedTemplate() : { id: 'classic', name: 'Clássico' };
    const data = BrandManualStorage.collectFormData();
    const logoImg = document.querySelector('#logoPreview img');
    const logoSrc = logoImg ? logoImg.src : '';
    
    const responsiveHTML = generateResponsivePreview(data, logoSrc, template);
    
    const newWindow = window.open('', '_blank', 'width=400,height=700,scrollbars=yes,resizable=yes');
    if (newWindow) {
        newWindow.document.write(responsiveHTML);
        newWindow.document.close();
        BrandManualUtils.showSuccess('Preview responsivo aberto!');
    }
}

/**
 * Gerar HTML responsivo para preview
 */
function generateResponsivePreview(data, logoSrc, template) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview Responsivo - ${template.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            font-size: 14px; 
            background: #f5f5f5;
        }
        .template-container { 
            margin: 0; 
            background: white;
        }
        .export-controls { 
            position: relative; 
            top: auto; 
            right: auto; 
            margin: 10px; 
            justify-content: center;
            display: flex;
            gap: 10px;
        }
        .btn {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            background: #e74c3c;
            color: white;
        }
        
        /* Mobile optimizations */
        @media (max-width: 480px) {
            body { font-size: 12px; }
            h1 { font-size: 1.5rem; }
            h2 { font-size: 1.2rem; }
            .template-header { padding: 30px 15px; }
        }
    </style>
</head>
<body class="template-${template.id}" data-template="${template.id}">
    <div class="template-container">
        ${generateTemplateHeader(data, logoSrc, template, {
            primary: data.primaryColor || '#2c3e50',
            secondary: data.secondaryColor || '#3498db',
            accent: data.accentColor || '#e74c3c'
        })}
        <div style="padding: 20px;">
            <h2>Preview Mobile</h2>
            <p>Este é um preview responsivo do template ${template.name}.</p>
            <p>Hotel: ${escapeHtmlSafe(data.hotelName) || '[Nome do Hotel]'}</p>
        </div>
    </div>

    <div class="export-controls">
        <button class="btn" onclick="window.close()">✕ Fechar</button>
    </div>
</body>
</html>`;
}

// Exportar funções globais
window.BrandManualExportTemplates = {
    exportHTMLWithTemplate,
    exportPDFWithTemplate,
    exportAllFormats,
    generateShareLink,
    previewResponsive
};

// Substituir funções globais
window.exportHTMLWithTemplate = exportHTMLWithTemplate;
window.exportPDFWithTemplate = exportPDFWithTemplate;
window.exportAllFormats = exportAllFormats;
window.generateShareLink = generateShareLink;
window.previewResponsive = previewResponsive;

BrandManualUtils.devLog('Export templates system loaded successfully');