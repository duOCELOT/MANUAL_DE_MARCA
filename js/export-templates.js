/**
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
    <title>Manual da Marca - ${escapeHtmlSafe(data.hotelName || 'Hotel')}</title>
    <style>
        ${getTemplateExportCSS(template, colors)}
    </style>
</head>
<body class="template-${template.id}" data-template="${template.id}">
    <div class="template-container">
        ${generateTemplateHeader(data, logoSrc, template, colors)}
        ${generateTemplateBody(data, logoSrc, template, colors)}
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
function getTemplateExportCSS(template, colors) {
    const baseCSS = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #2c3e50;
            background: #f5f5f5;
            overflow-x: hidden;
        }
        
        .template-container { 
            max-width: 1200px; 
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
            border-radius: 5px;
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
 * Gerar header do template
 */
function generateTemplateHeader(data, logoSrc, template, colors) {
    const hotelName = escapeHtmlSafe(data.hotelName) || '[NOME DO HOTEL]';
    
    return `
        <div class="template-header" style="background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}); color: white; padding: 60px; text-align: center;">
            ${logoSrc ? `<img src="${logoSrc}" alt="Logo" style="max-width: 150px; max-height: 100px; margin-bottom: 30px;">` : ''}
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
    <title>Manual da Marca - ${template.name} - ${escapeHtmlSafe(data.hotelName || 'Hotel')}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
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
            border-radius: 10px;
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
        }
    </style>
</head>
<body>
    <div class="pdf-header">
        <div class="pdf-title">MANUAL DA MARCA</div>
        <div class="pdf-subtitle">${escapeHtmlSafe(data.hotelName || '[NOME DO HOTEL]')}</div>
        <div>Template: ${template.name} • ${new Date().getFullYear()}</div>
    </div>
    
    <div class="pdf-section">
        <h2>Identidade da Marca</h2>
        
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
    
    <div class="page-break pdf-section">
        <h2>Valores da Marca</h2>
        
        ${[1, 2, 3].map(i => `
            <div class="pdf-article">
                <h3>${escapeHtmlSafe(data[`value${i}`]) || `Valor ${i}`}</h3>
                <p>${escapeHtmlSafe(data[`valueDesc${i}`]) || '[Descrição do valor]'}</p>
            </div>
        `).join('')}
    </div>
    
    <div class="page-break pdf-section">
        <h2>Padrões Visuais</h2>
        
        <div class="pdf-article">
            <h3>Paleta de Cores</h3>
            <p><strong>Primária:</strong> ${data.primaryColor || colors.primary}</p>
            <p><strong>Secundária:</strong> ${data.secondaryColor || colors.secondary}</p>
            <p><strong>Destaque:</strong> ${data.accentColor || colors.accent}</p>
        </div>
        
        <div class="pdf-article">
            <h3>Tipografia</h3>
            <p><strong>Fonte Principal:</strong> ${escapeHtmlSafe(data.primaryFont) || '[Fonte Principal]'}</p>
            <p><strong>Fonte Secundária:</strong> ${escapeHtmlSafe(data.secondaryFont) || '[Fonte Secundária]'}</p>
        </div>
    </div>
    
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