/**
 * Sistema de Preview do Manual da Marca
 */

/**
 * Gerar preview do manual em nova janela
 */
function previewManual() {
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const logoImg = document.querySelector('#logoPreview img');
        const logoSrc = logoImg ? logoImg.src : '';
        
        const previewHTML = generatePreviewHTML(data, logoSrc);
        
        // Abrir em nova janela
        const newWindow = window.open('', '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
        
        if (newWindow) {
            newWindow.document.write(previewHTML);
            newWindow.document.close();
            BrandManualUtils.showSuccess('Preview aberto em nova janela!');
            BrandManualUtils.devLog('Preview gerado com sucesso');
        } else {
            BrandManualUtils.showError('Pop-up bloqueado! Permita pop-ups para usar esta função.');
        }
    } catch (error) {
        BrandManualUtils.devLog('Erro ao gerar preview', error);
        BrandManualUtils.showError('Erro ao gerar preview. Tente novamente.');
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Gerar HTML do preview
 */
function generatePreviewHTML(data, logoSrc) {
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
    <title>Preview - Manual da Marca</title>
    <style>
        ${getPreviewStyles()}
    </style>
</head>
<body>
    <div class="container">
        <div class="header" id="header">
            <h1>📋 Manual da Marca</h1>
            <h2 style="margin: 0; color: white; border: none;">
                ${BrandManualUtils.escapeHtml(data.hotelName) || 'Nome do Hotel'}
            </h2>
            <p style="margin-top: 10px; opacity: 0.9;">Preview do Manual de Identidade Visual</p>
        </div>
        
        ${generatePreviewSections(data, logoSrc)}
        
        <div class="preview-note">
            <p><strong>📋 Esta é uma prévia do seu manual da marca</strong></p>
            <p>Use os botões "Exportar HTML" ou "Exportar PDF" para gerar a versão completa.</p>
        </div>
    </div>
    
    <button class="close-btn" onclick="window.close()">✕ Fechar Preview</button>
    
    <script>
        ${getPreviewScript(colors)}
    </script>
</body>
</html>`;
}

/**
 * Obter estilos CSS para o preview
 */
function getPreviewStyles() {
    return `
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            margin: 0;
            background: #f8f9fa; 
            color: #333;
        }
        
        .container { 
            max-width: 900px; 
            margin: 0 auto; 
            background: white; 
            min-height: 100vh;
        }
        
        .header { 
            text-align: center; 
            padding: 40px 20px; 
            color: white; 
            background: #2c3e50;
        }
        
        h1 { 
            font-size: 2.5rem; 
            margin-bottom: 10px; 
            font-weight: 300;
        }
        
        h2 { 
            padding-bottom: 12px; 
            margin: 30px 0 20px 0;
            font-size: 1.8rem;
            border-bottom: 3px solid #3498db;
            color: #2c3e50;
        }
        
        h3 {
            margin: 25px 0 15px 0;
            font-size: 1.3rem;
            color: #2c3e50;
        }
        
        .section {
            padding: 30px;
            border-bottom: 1px solid #eee;
        }
        
        .info-box { 
            background: rgba(52, 152, 219, 0.08); 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
            border-left: 5px solid #3498db;
        }
        
        .value-item {
            background: rgba(231, 76, 60, 0.08);
            padding: 18px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 5px solid #e74c3c;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .color-preview { 
            display: flex; 
            gap: 15px; 
            margin: 20px 0;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .color-swatch { 
            width: 120px; 
            height: 80px; 
            border-radius: 8px; 
            display: flex;
            align-items: center;
            justify-content: center;
            color: white; 
            font-weight: bold;
            font-size: 14px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            flex-direction: column;
        }
        
        .logo { 
            text-align: center; 
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .logo img { 
            max-width: 250px; 
            max-height: 120px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 10px;
            background: white;
        }
        
        .social-links {
            display: flex;
            gap: 15px;
            margin: 15px 0;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .social-item {
            background: #3498db;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }
        
        .preview-note {
            text-align: center; 
            margin: 40px 30px 30px; 
            padding: 25px; 
            background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
            border-radius: 8px;
            border: 2px dashed #3498db;
        }
        
        .preview-note p {
            margin: 5px 0;
            font-style: italic;
            color: #6c757d;
        }
        
        .close-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 18px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .close-btn:hover {
            background: #c0392b;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .container { margin: 0; }
            h1 { font-size: 2rem; }
            .section { padding: 20px; }
            .color-preview { justify-content: center; }
            .grid { grid-template-columns: 1fr; }
        }
    `;
}

/**
 * Gerar seções do preview
 */
function generatePreviewSections(data, logoSrc) {
    return `
        ${logoSrc ? generateLogoSection(logoSrc) : ''}
        ${generateBasicInfoSection(data)}
        ${generateIdentitySection(data)}
        ${generateColorsSection(data)}
        ${generateTypographySection(data)}
        ${generateVoiceSection(data)}
        ${generateSocialSection(data)}
        ${generateContactSection(data)}
    `;
}

/**
 * Seção do Logo
 */
function generateLogoSection(logoSrc) {
    return `
        <div class="section">
            <div class="logo">
                <img src="${logoSrc}" alt="Logo do Hotel">
                <p style="margin-top: 15px; color: #6c757d; font-style: italic;">Logo da Marca</p>
            </div>
        </div>
    `;
}

/**
 * Seção Informações Básicas
 */
function generateBasicInfoSection(data) {
    return `
        <div class="section">
            <h2>🏢 Informações Básicas</h2>
            <div class="grid">
                <div class="info-box">
                    <strong>Nome:</strong> ${BrandManualUtils.escapeHtml(data.hotelName) || '[Nome do Hotel]'}
                </div>
                <div class="info-box">
                    <strong>Tipo:</strong> ${BrandManualUtils.escapeHtml(data.hotelType) || '[Tipo/Conceito]'}
                </div>
                <div class="info-box">
                    <strong>Localização:</strong> ${BrandManualUtils.escapeHtml(data.hotelLocation) || '[Localização]'}
                </div>
                <div class="info-box">
                    <strong>Website:</strong> ${BrandManualUtils.escapeHtml(data.hotelWebsite) || '[Website]'}
                </div>
            </div>
        </div>
    `;
}

/**
 * Seção Identidade
 */
function generateIdentitySection(data) {
    return `
        <div class="section">
            <h2>🎯 Identidade da Marca</h2>
            <div class="info-box">
                <h3>Missão</h3>
                <p>${BrandManualUtils.escapeHtml(data.mission) || '[Defina a missão do seu hotel]'}</p>
            </div>
            <div class="info-box">
                <h3>Visão</h3>
                <p>${BrandManualUtils.escapeHtml(data.vision) || '[Defina a visão do seu hotel]'}</p>
            </div>
            <div class="info-box">
                <h3>Posicionamento</h3>
                <p>${BrandManualUtils.escapeHtml(data.positioning) || '[Defina o posicionamento da marca]'}</p>
            </div>
            
            <h3>Valores da Marca</h3>
            <div class="value-item">
                <h4>${BrandManualUtils.escapeHtml(data.value1) || 'Valor 1'}</h4>
                <p>${BrandManualUtils.escapeHtml(data.valueDesc1) || '[Descrição do primeiro valor]'}</p>
            </div>
            <div class="value-item">
                <h4>${BrandManualUtils.escapeHtml(data.value2) || 'Valor 2'}</h4>
                <p>${BrandManualUtils.escapeHtml(data.valueDesc2) || '[Descrição do segundo valor]'}</p>
            </div>
            <div class="value-item">
                <h4>${BrandManualUtils.escapeHtml(data.value3) || 'Valor 3'}</h4>
                <p>${BrandManualUtils.escapeHtml(data.valueDesc3) || '[Descrição do terceiro valor]'}</p>
            </div>
        </div>
    `;
}

/**
 * Seção Cores
 */
function generateColorsSection(data) {
    return `
        <div class="section">
            <h2>🎨 Paleta de Cores</h2>
            <div class="color-preview">
                <div class="color-swatch" id="primarySwatch">
                    <div>Primária</div>
                    <small id="primaryHex">#2c3e50</small>
                </div>
                <div class="color-swatch" id="secondarySwatch">
                    <div>Secundária</div>
                    <small id="secondaryHex">#3498db</small>
                </div>
                <div class="color-swatch" id="accentSwatch">
                    <div>Destaque</div>
                    <small id="accentHex">#e74c3c</small>
                </div>
            </div>
        </div>
    `;
}

/**
 * Seção Tipografia
 */
function generateTypographySection(data) {
    return `
        <div class="section">
            <h2>✍️ Tipografia</h2>
            <div class="grid">
                <div class="info-box">
                    <h3>Fonte Principal</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.primaryFont) || '[Fonte Principal]'}</strong></p>
                    <p>${BrandManualUtils.escapeHtml(data.primaryFontUsage) || 'Títulos, logotipo, destaques'}</p>
                </div>
                <div class="info-box">
                    <h3>Fonte Secundária</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.secondaryFont) || '[Fonte Secundária]'}</strong></p>
                    <p>${BrandManualUtils.escapeHtml(data.secondaryFontUsage) || 'Textos longos, corpo'}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Seção Tom de Voz
 */
function generateVoiceSection(data) {
    return `
        <div class="section">
            <h2>🗣️ Tom de Voz</h2>
            <div class="info-box">
                <h3>Personalidade da Comunicação</h3>
                <p>${BrandManualUtils.escapeHtml(data.voiceTone) || '[Como a marca deve se comunicar]'}</p>
            </div>
            <div class="grid">
                <div class="info-box">
                    <strong>Formalidade:</strong> ${BrandManualUtils.escapeHtml(data.formalityLevel) || '[A definir]'}
                </div>
                <div class="info-box">
                    <strong>Tratamento:</strong> ${BrandManualUtils.escapeHtml(data.treatment) || '[A definir]'}
                </div>
            </div>
        </div>
    `;
}

/**
 * Seção Redes Sociais
 */
function generateSocialSection(data) {
    const socialItems = [];
    
    if (data.instagram) {
        socialItems.push(`<span class="social-item">📸 ${BrandManualUtils.escapeHtml(data.instagram)}</span>`);
    }
    if (data.facebook) {
        socialItems.push(`<span class="social-item">📘 Facebook</span>`);
    }
    if (data.linkedin) {
        socialItems.push(`<span class="social-item">💼 LinkedIn</span>`);
    }
    
    return `
        <div class="section">
            <h2>📱 Redes Sociais</h2>
            ${socialItems.length > 0 ? `<div class="social-links">${socialItems.join('')}</div>` : '<p style="text-align: center; color: #6c757d; font-style: italic;">Nenhuma rede social configurada</p>'}
        </div>
    `;
}

/**
 * Seção Contato
 */
function generateContactSection(data) {
    return `
        <div class="section">
            <h2>📞 Contato</h2>
            <div class="info-box">
                <p><strong>Responsável:</strong> ${BrandManualUtils.escapeHtml(data.brandManager) || '[Nome do responsável]'}</p>
                <p><strong>Email:</strong> ${BrandManualUtils.escapeHtml(data.brandManagerEmail) || '[email@hotel.com]'}</p>
                <p><strong>Telefone:</strong> ${BrandManualUtils.escapeHtml(data.brandManagerPhone) || '[telefone]'}</p>
            </div>
        </div>
    `;
}

/**
 * Script JavaScript para o preview
 */
function getPreviewScript(colors) {
    return `
        // Aplicar cores dinâmicas
        const primaryColor = '${colors.primary}';
        const secondaryColor = '${colors.secondary}';
        const accentColor = '${colors.accent}';
        
        function applyDynamicStyles() {
            // Header
            const header = document.getElementById('header');
            if (header) {
                header.style.background = 'linear-gradient(135deg, ' + primaryColor + ', ' + secondaryColor + ')';
            }
            
            // Títulos H2
            const h2Elements = document.querySelectorAll('h2');
            h2Elements.forEach(h2 => {
                h2.style.color = primaryColor;
                h2.style.borderBottomColor = secondaryColor;
            });
            
            // Títulos H3
            const h3Elements = document.querySelectorAll('h3');
            h3Elements.forEach(h3 => {
                h3.style.color = primaryColor;
            });
            
            // Info boxes
            const infoBoxes = document.querySelectorAll('.info-box');
            infoBoxes.forEach(box => {
                box.style.borderLeftColor = secondaryColor;
            });
            
            // Value items
            const valueItems = document.querySelectorAll('.value-item');
            valueItems.forEach(item => {
                item.style.borderLeftColor = accentColor;
            });
            
            // Color swatches
            const primarySwatch = document.getElementById('primarySwatch');
            const secondarySwatch = document.getElementById('secondarySwatch');
            const accentSwatch = document.getElementById('accentSwatch');
            
            if (primarySwatch) {
                primarySwatch.style.background = primaryColor;
                document.getElementById('primaryHex').textContent = primaryColor;
            }
            if (secondarySwatch) {
                secondarySwatch.style.background = secondaryColor;
                document.getElementById('secondaryHex').textContent = secondaryColor;
            }
            if (accentSwatch) {
                accentSwatch.style.background = accentColor;
                document.getElementById('accentHex').textContent = accentColor;
            }
            
            // Social items
            const socialItems = document.querySelectorAll('.social-item');
            socialItems.forEach(item => {
                item.style.background = secondaryColor;
            });
            
            // Preview note
            const previewNote = document.querySelector('.preview-note');
            if (previewNote) {
                previewNote.style.borderColor = secondaryColor;
            }
        }
        
        // Aplicar estilos quando a página carregar
        document.addEventListener('DOMContentLoaded', applyDynamicStyles);
        
        // Atalhos de teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.close();
            }
        });
        
        // Print functionality
        function printPreview() {
            window.print();
        }
        
        // Adicionar botão de impressão
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '🖨️ Imprimir';
        printBtn.style.cssText = 'position: fixed; top: 70px; right: 20px; padding: 10px 15px; background: #27ae60; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000;';
        printBtn.onclick = printPreview;
        document.body.appendChild(printBtn);
    `;
}

/**
 * Preview rápido inline (para desenvolvimento)
 */
function quickPreview() {
    const data = BrandManualStorage.collectFormData();
    
    // Mostrar dados em console (desenvolvimento)
    BrandManualUtils.devLog('Quick Preview Data', {
        hotelName: data.hotelName,
        colors: {
            primary: data.primaryColor,
            secondary: data.secondaryColor,
            accent: data.accentColor
        },
        fieldsCompleted: Object.keys(data).filter(key => !key.startsWith('_') && data[key]).length
    });
    
    // Mostrar popup com informações básicas
    const summary = `
📋 RESUMO DO MANUAL

🏨 Hotel: ${data.hotelName || '[Nome não definido]'}
🎯 Missão: ${data.mission ? '✅ Definida' : '❌ Não definida'}
🎨 Cores: ${data.primaryColor ? '✅ Configuradas' : '❌ Não configuradas'}
📝 Campos preenchidos: ${Object.keys(data).filter(key => !key.startsWith('_') && data[key]).length}
    `;
    
    alert(summary);
}

// Exportar funções para uso global
window.BrandManualPreview = {
    previewManual,
    generatePreviewHTML,
    quickPreview,
    
    // Generators
    generatePreviewSections,
    generateBasicInfoSection,
    generateIdentitySection,
    generateColorsSection,
    generateTypographySection,
    generateVoiceSection,
    generateSocialSection,
    generateContactSection
};