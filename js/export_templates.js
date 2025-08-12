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
    
    switch (template.id) {
        case 'constitution':
            return baseCSS + getConstitutionExportCSS(colors);
        case 'modern':
            return baseCSS + getModernExportCSS(colors);
        case 'minimalist':
            return baseCSS + getMinimalistExportCSS(colors);
        case 'luxury':
            return baseCSS + getLuxuryExportCSS(colors);
        default:
            return baseCSS + getClassicExportCSS(colors);
    }
}

/**
 * CSS para template Constitution Export
 */
function getConstitutionExportCSS(colors) {
    return `
        .template-constitution {
            background: #f8f8f8;
            position: relative;
        }
        
        .constitution-cover {
            background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .constitution-cover::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 70%, #ff6b35 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255,107,53,0.3) 0%, transparent 50%);
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(2deg) scale(1.05); }
        }
        
        .constitution-logo {
            width: 120px;
            height: 120px;
            margin-bottom: 40px;
            border-radius: 50%;
            background: rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 2;
        }
        
        .constitution-title {
            font-size: 4rem;
            font-weight: 100;
            letter-spacing: 8px;
            margin-bottom: 20px;
            text-transform: uppercase;
            position: relative;
            z-index: 2;
        }
        
        .constitution-subtitle {
            font-size: 2.2rem;
            font-weight: 300;
            color: #ff6b35;
            margin-bottom: 15px;
            position: relative;
            z-index: 2;
        }
        
        .constitution-version {
            font-size: 1rem;
            opacity: 0.8;
            letter-spacing: 2px;
            position: relative;
            z-index: 2;
        }
        
        .constitution-section {
            padding: 80px 60px;
            border-bottom: 3px solid #ff6b35;
            background: white;
        }
        
        .constitution-section:nth-child(even) {
            background: #fafafa;
        }
        
        .constitution-section h2 {
            font-size: 2.5rem;
            color: #1a1a1a;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 300;
            position: relative;
            padding-left: 40px;
        }
        
        .constitution-section h2::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 25px;
            height: 3px;
            background: #ff6b35;
        }
        
        .constitution-article {
            background: rgba(255, 107, 53, 0.05);
            padding: 40px;
            margin: 30px 0;
            border: 1px solid rgba(255, 107, 53, 0.2);
            position: relative;
        }
        
        .constitution-article h3 {
            font-size: 1.4rem;
            color: #1a1a1a;
            margin-bottom: 20px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .constitution-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 40px;
            margin: 50px 0;
        }
        
        .constitution-footer {
            background: #1a1a1a;
            color: white;
            padding: 60px;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .constitution-cover { padding: 20px; }
            .constitution-title { font-size: 2.5rem; letter-spacing: 4px; }
            .constitution-subtitle { font-size: 1.8rem; }
            .constitution-section { padding: 40px 20px; }
            .constitution-section h2 { font-size: 2rem; }
            .constitution-grid { grid-template-columns: 1fr; gap: 20px; }
        }
    `;
}

/**
 * CSS para outros templates (Modern, Minimalist, Luxury, Classic)
 */
function getModernExportCSS(colors) {
    return `
        .template-modern {
            background: linear-gradient(45deg, #667eea, #764ba2);
        }
        
        .modern-cover {
            background: linear-gradient(45deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        
        .modern-title {
            font-size: 4.5rem;
            font-weight: 100;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .modern-section {
            background: rgba(255,255,255,0.95);
            margin: 40px;
            padding: 60px;
            border-radius: 25px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            backdrop-filter: blur(15px);
        }
    `;
}

function getMinimalistExportCSS(colors) {
    return `
        .template-minimalist {
            background: white;
        }
        
        .minimalist-cover {
            background: white;
            color: #1a1a1a;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .minimalist-title {
            font-size: 4rem;
            font-weight: 100;
            margin-bottom: 20px;
            letter-spacing: 5px;
        }
        
        .minimalist-section {
            padding: 80px 60px;
            max-width: 900px;
            margin: 0 auto;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .minimalist-section h2 {
            font-size: 2rem;
            font-weight: 100;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 4px;
            border-bottom: 1px solid #000;
            padding-bottom: 15px;
        }
    `;
}

function getLuxuryExportCSS(colors) {
    return `
        .template-luxury {
            background: linear-gradient(135deg, #000428, #004e92);
            color: white;
        }
        
        .luxury-cover {
            background: linear-gradient(135deg, rgba(0, 4, 40, 0.9), rgba(0, 78, 146, 0.9));
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
        }
        
        .luxury-title {
            font-size: 4.5rem;
            font-weight: 200;
            color: #d4af37;
            margin-bottom: 30px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
        }
        
        .luxury-section {
            background: rgba(255,255,255,0.98);
            color: #1a1a1a;
            margin: 50px;
            padding: 70px;
            border: 3px solid #d4af37;
            position: relative;
        }
        
        .luxury-section::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37);
            z-index: -1;
        }
    `;
}

function getClassicExportCSS(colors) {
    return `
        .template-classic .classic-cover {
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        
        .classic-title {
            font-size: 4rem;
            font-weight: 300;
            margin-bottom: 30px;
        }
        
        .classic-section {
            padding: 60px;
            border-bottom: 1px solid #e0e0e0;
            background: white;
        }
        
        .classic-section h2 {
            color: ${colors.primary};
            border-bottom: 4px solid ${colors.secondary};
            padding-bottom: 15px;
            margin-bottom: 40px;
            font-size: 2.2rem;
        }
    `;
}

/**
 * Gerar header do template
 */
function generateTemplateHeader(data, logoSrc, template, colors) {
    const hotelName = escapeHtmlSafe(data.hotelName) || '[NOME DO HOTEL]';
    
    switch (template.id) {
        case 'constitution':
            return `
                <div class="constitution-cover">
                    ${logoSrc ? `<div class="constitution-logo"><img src="${logoSrc}" alt="Logo" style="max-width: 80px; max-height: 80px;"></div>` : ''}
                    <div class="constitution-title">CONSTITUTION</div>
                    <div class="constitution-subtitle">${hotelName}</div>
                    <div class="constitution-version">VERSION 01 • ${new Date().getFullYear()}</div>
                </div>
            `;
        case 'modern':
            return `
                <div class="modern-cover">
                    ${logoSrc ? `<div class="modern-logo"><img src="${logoSrc}" alt="Logo" style="max-width: 150px; max-height: 100px; margin-bottom: 30px;"></div>` : ''}
                    <div class="modern-title">BRAND MANUAL</div>
                    <div class="modern-subtitle">${hotelName}</div>
                </div>
            `;
        case 'minimalist':
            return `
                <div class="minimalist-cover">
                    ${logoSrc ? `<div class="minimalist-logo"><img src="${logoSrc}" alt="Logo" style="max-width: 200px; max-height: 120px; margin-bottom: 40px;"></div>` : ''}
                    <div class="minimalist-title">BRAND MANUAL</div>
                    <div class="minimalist-subtitle">${hotelName}</div>
                </div>
            `;
        case 'luxury':
            return `
                <div class="luxury-cover">
                    ${logoSrc ? `<div class="luxury-logo"><img src="${logoSrc}" alt="Logo" style="max-width: 180px; max-height: 120px; margin-bottom: 40px; border: 2px solid #d4af37; padding: 20px;"></div>` : ''}
                    <div class="luxury-title">BRAND MANUAL</div>
                    <div class="luxury-subtitle">${hotelName}</div>
                </div>
            `;
        default:
            return `
                <div class="classic-cover">
                    ${logoSrc ? `<div class="classic-logo"><img src="${logoSrc}" alt="Logo" style="max-width: 200px; max-height: 120px; margin-bottom: 30px;"></div>` : ''}
                    <div class="classic-title">MANUAL DA MARCA</div>
                    <div class="classic-subtitle">${hotelName}</div>
                </div>
            `;
    }
}

/**
 * Gerar corpo do template
 */
function generateTemplateBody(data, logoSrc, template, colors) {
    const sectionClass = template.id === 'constitution' ? 'constitution-section' : 
                        template.id === 'modern' ? 'modern-section' :
                        template.id === 'minimalist' ? 'minimalist-section' :
                        template.id === 'luxury' ? 'luxury-section' : 'classic-section';
    
    const articleClass = template.id === 'constitution' ? 'constitution-article' : 'template-article';
    
    return `
        <div class="${sectionClass}">
            <h2>${template.id === 'constitution' ? 'Article I - ' : ''}Brand Identity</h2>
            
            <div class="${articleClass}">
                <h3>Mission Statement</h3>
                <p>${escapeHtmlSafe(data.mission) || '[Mission to be defined]'}</p>
            </div>
            
            <div class="${articleClass}">
                <h3>Vision Declaration</h3>
                <p>${escapeHtmlSafe(data.vision) || '[Vision to be defined]'}</p>
            </div>
            
            <div class="${articleClass}">
                <h3>Brand Positioning</h3>
                <p>${escapeHtmlSafe(data.positioning) || '[Positioning to be defined]'}</p>
            </div>
        </div>
        
        <div class="${sectionClass}">
            <h2>${template.id === 'constitution' ? 'Article II - ' : ''}Core Values</h2>
            
            ${[1, 2, 3].map(i => `
                <div class="${articleClass}">
                    <h3>${escapeHtmlSafe(data[`value${i}`]) || `Value ${i}`}</h3>
                    <p>${escapeHtmlSafe(data[`valueDesc${i}`]) || '[Value description]'}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="${sectionClass}">
            <h2>${template.id === 'constitution' ? 'Article III - ' : ''}Visual Standards</h2>
            
            <div class="${template.id === 'constitution' ? 'constitution-grid' : 'template-grid'}">
                <div class="${articleClass}">
                    <h3>Primary Colors</h3>
                    <p>Primary: ${data.primaryColor || colors.primary}</p>
                    <p>Secondary: ${data.secondaryColor || colors.secondary}</p>
                    <p>Accent: ${data.accentColor || colors.accent}</p>
                </div>
                
                <div class="${articleClass}">
                    <h3>Typography</h3>
                    <p><strong>Primary Font:</strong> ${escapeHtmlSafe(data.primaryFont) || '[Primary Font]'}</p>
                    <p><strong>Secondary Font:</strong> ${escapeHtmlSafe(data.secondaryFont) || '[Secondary Font]'}</p>
                </div>
            </div>
        </div>
        
        <div class="${sectionClass}">
            <h2>${template.id === 'constitution' ? 'Article IV - ' : ''}Communication</h2>
            
            <div class="${articleClass}">
                <h3>Voice & Tone</h3>
                <p>${escapeHtmlSafe(data.voiceTone) || '[Voice and tone to be defined]'}</p>
            </div>
            
            <div class="${articleClass}">
                <h3>Contact Information</h3>
                <p><strong>Brand Manager:</strong> ${escapeHtmlSafe(data.brandManager) || '[Name]'}</p>
                <p><strong>Email:</strong> ${escapeHtmlSafe(data.brandManagerEmail) || '[Email]'}</p>
                <p><strong>Phone:</strong> ${escapeHtmlSafe(data.brandManagerPhone) || '[Phone]'}</p>
            </div>
        </div>
    `;
}

/**
 * Gerar footer do template
 */
function generateTemplateFooter(data, template) {
    const footerClass = template.id === 'constitution' ? 'constitution-footer' : 
                       template.id === 'luxury' ? 'luxury-footer' : 'template-footer';
    
    return `
        <div class="${footerClass}">
            <h3>Document Information</h3>
            <p><strong>Version:</strong> 1.0</p>
            <p><strong>Created:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Template:</strong> ${template.name}</p>
            <p><strong>Next Review:</strong> ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
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
            background: ${template.id === 'constitution' ? '#1a1a1a' : 
                       template.id === 'luxury' ? 'linear-gradient(135deg, #000428, #004e92)' : 
                       colors.primary};
            color: white;
            border-radius: 10px;
        }
        
        .pdf-title {
            font-size: 28pt;
            margin-bottom: 10pt;
            font-weight: ${template.id === 'minimalist' ? '100' : '300'};
            ${template.id === 'constitution' ? 'letter-spacing: 3px; text-transform: uppercase;' : ''}
            ${template.id === 'luxury' ? 'color: #d4af37;' : ''}
        }
        
        .pdf-subtitle {
            font-size: 18pt;
            margin-bottom: 10pt;
            ${template.id === 'constitution' ? 'color: #ff6b35;' : ''}
        }
        
        .pdf-section {
            margin-bottom: 30pt;
            padding: 20pt;
            ${template.id === 'constitution' ? 'border-bottom: 2pt solid #ff6b35;' : 
              template.id === 'luxury' ? 'border: 2pt solid #d4af37;' : 
              'border-bottom: 1pt solid #ddd;'}
        }
        
        .pdf-section h2 {
            font-size: 18pt;
            color: ${template.id === 'constitution' ? '#1a1a1a' : 
                    template.id === 'luxury' ? '#d4af37' : colors.primary};
            margin-bottom: 15pt;
            ${template.id === 'constitution' ? 'text-transform: uppercase; letter-spacing: 1px; font-weight: 300;' : ''}
            ${template.id === 'minimalist' ? 'font-weight: 100; letter-spacing: 2px;' : ''}
        }
        
        .pdf-article {
            margin: 15pt 0;
            padding: 15pt;
            ${template.id === 'constitution' ? 'background: rgba(255, 107, 53, 0.05); border: 1pt solid rgba(255, 107, 53, 0.2);' :
              template.id === 'luxury' ? 'background: rgba(212, 175, 55, 0.1); border: 1pt solid #d4af37;' :
              'background: #f9f9f9; border-left: 3pt solid ' + colors.secondary + ';'}
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
        <div class="pdf-title">${template.id === 'constitution' ? 'CONSTITUTION' : 'MANUAL DA MARCA'}</div>
        <div class="pdf-subtitle">${escapeHtmlSafe(data.hotelName || '[NOME DO HOTEL]')}</div>
        <div>Template: ${template.name} • ${new Date().getFullYear()}</div>
    </div>
    
    <div class="pdf-section">
        <h2>${template.id === 'constitution' ? 'Article I - ' : ''}Brand Identity</h2>
        
        <div class="pdf-article">
            <h3>Mission</h3>
            <p>${escapeHtmlSafe(data.mission) || '[Mission to be defined]'}</p>
        </div>
        
        <div class="pdf-article">
            <h3>Vision</h3>
            <p>${escapeHtmlSafe(data.vision) || '[Vision to be defined]'}</p>
        </div>
        
        <div class="pdf-article">
            <h3>Positioning</h3>
            <p>${escapeHtmlSafe(data.positioning) || '[Positioning to be defined]'}</p>
        </div>
    </div>
    
    <div class="page-break pdf-section">
        <h2>${template.id === 'constitution' ? 'Article II - ' : ''}Core Values</h2>
        
        ${[1, 2, 3].map(i => `
            <div class="pdf-article">
                <h3>${escapeHtmlSafe(data[`value${i}`]) || `Value ${i}`}</h3>
                <p>${escapeHtmlSafe(data[`valueDesc${i}`]) || '[Value description]'}</p>
            </div>
        `).join('')}
    </div>
    
    <div class="page-break pdf-section">
        <h2>${template.id === 'constitution' ? 'Article III - ' : ''}Visual Standards</h2>
        
        <div class="pdf-article">
            <h3>Color Palette</h3>
            <p><strong>Primary:</strong> ${data.primaryColor || colors.primary}</p>
            <p><strong>Secondary:</strong> ${data.secondaryColor || colors.secondary}</p>
            <p><strong>Accent:</strong> ${data.accentColor || colors.accent}</p>
        </div>
        
        <div class="pdf-article">
            <h3>Typography</h3>
            <p><strong>Primary Font:</strong> ${escapeHtmlSafe(data.primaryFont) || '[Primary Font]'}</p>
            <p><strong>Secondary Font:</strong> ${escapeHtmlSafe(data.secondaryFont) || '[Secondary Font]'}</p>
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
            document.querySelector('.export-controls').style.display = 'none';
        });
        
        window.addEventListener('afterprint', function() {
            document.querySelector('.export-controls').style.display = 'flex';
        });
        
        // Template-specific animations or interactions
        ${template.id === 'constitution' ? `
            // Constitution template specific code
            const cover = document.querySelector('.constitution-cover');
            if (cover) {
                cover.addEventListener('click', function() {
                    document.querySelector('.constitution-section').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                });
            }
        ` : ''}
        
        ${template.id === 'modern' ? `
            // Modern template specific code
            const sections = document.querySelectorAll('.modern-section');
            sections.forEach((section, index) => {
                section.style.animationDelay = (index * 0.2) + 's';
                section.style.animation = 'fadeInUp 0.6s ease-out forwards';
            });
        ` : ''}
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
        const template = BrandManualTemplates.getSelectedTemplate();
        
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
 * Carregar dados de link compartilhado
 */
function loadFromShareLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareData = urlParams.get('share');
    
    if (!shareData) return false;
    
    try {
        const decodedData = JSON.parse(atob(shareData));
        
        // Restaurar template
        if (decodedData.t && BrandManualTemplates.TEMPLATES[decodedData.t]) {
            BrandManualTemplates.selectTemplate(decodedData.t);
        }
        
        // Restaurar dados básicos
        if (decodedData.h) document.getElementById('hotelName').value = decodedData.h;
        if (decodedData.m) document.getElementById('mission').value = decodedData.m;
        if (decodedData.v) document.getElementById('vision').value = decodedData.v;
        if (decodedData.c1) document.getElementById('primaryColor').value = decodedData.c1;
        if (decodedData.c2) document.getElementById('secondaryColor').value = decodedData.c2;
        if (decodedData.c3) document.getElementById('accentColor').value = decodedData.c3;
        
        // Atualizar preview
        if (window.updateColorPreview) {
            window.updateColorPreview();
        }
        
        BrandManualUtils.showSuccess('Dados carregados do link compartilhado!');
        
        // Limpar URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        return true;
    } catch (error) {
        BrandManualUtils.devLog('Erro ao carregar share link', error);
        return false;
    }
}

/**
 * Preview responsivo do template
 */
function previewResponsive() {
    const template = BrandManualTemplates.getSelectedTemplate();
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
        ${getTemplateExportCSS(template, {
            primary: data.primaryColor || '#2c3e50',
            secondary: data.secondaryColor || '#3498db',
            accent: data.accentColor || '#e74c3c'
        })}
        
        /* Mobile optimizations */
        body { font-size: 14px; }
        .template-container { margin: 0; }
        .export-controls { 
            position: relative; 
            top: auto; 
            right: auto; 
            margin: 10px; 
            justify-content: center;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
            .constitution-title { font-size: 2rem; letter-spacing: 2px; }
            .constitution-subtitle { font-size: 1.5rem; }
            .constitution-section { padding: 30px 15px; }
            .modern-title { font-size: 2.5rem; }
            .luxury-title { font-size: 2.5rem; }
            .minimalist-title { font-size: 2.5rem; letter-spacing: 2px; }
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
        ${generateTemplateBody(data, logoSrc, template, {
            primary: data.primaryColor || '#2c3e50',
            secondary: data.secondaryColor || '#3498db',
            accent: data.accentColor || '#e74c3c'
        })}
    </div>

    <div class="export-controls">
        <button class="btn btn-close" onclick="window.close()">✕ Fechar</button>
    </div>
</body>
</html>`;
}

/**
 * Atualizar as funções de export originais para usar templates
 */
function updateOriginalExportFunctions() {
    // Sobrescrever a função original de export HTML
    window.exportHTML = exportHTMLWithTemplate;
    window.exportPDF = exportPDFWithTemplate;
}

/**
 * Verificar compatibilidade do template com dados
 */
function checkTemplateCompatibility(template, data) {
    const warnings = [];
    
    // Verificar se há dados suficientes para o template
    if (!data.hotelName && template.id !== 'minimalist') {
        warnings.push('Nome do hotel não definido');
    }
    
    if (!data.mission && template.id === 'constitution') {
        warnings.push('Missão é essencial para o template Constitution');
    }
    
    if (!data.primaryColor && template.id === 'luxury') {
        warnings.push('Cores personalizadas recomendadas para template Luxury');
    }
    
    return {
        compatible: warnings.length === 0,
        warnings: warnings
    };
}

/**
 * Otimizar template para performance
 */
function optimizeTemplateForExport(templateHTML) {
    // Remover comentários
    let optimized = templateHTML.replace(/<!--[\s\S]*?-->/g, '');
    
    // Minificar CSS básico
    optimized = optimized.replace(/\s+/g, ' ');
    optimized = optimized.replace(/;\s+/g, ';');
    optimized = optimized.replace(/:\s+/g, ':');
    
    // Remover espaços desnecessários
    optimized = optimized.replace(/>\s+</g, '><');
    
    return optimized;
}

// Exportar funções globais
window.BrandManualExportTemplates = {
    exportHTMLWithTemplate,
    exportPDFWithTemplate,
    exportAllFormats,
    generateShareLink,
    loadFromShareLink,
    previewResponsive,
    checkTemplateCompatibility,
    optimizeTemplateForExport
};

// Substituir funções globais
window.exportHTMLWithTemplate = exportHTMLWithTemplate;
window.exportPDFWithTemplate = exportPDFWithTemplate;
window.exportAllFormats = exportAllFormats;
window.generateShareLink = generateShareLink;
window.previewResponsive = previewResponsive;

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há link compartilhado
    loadFromShareLink();
    
    // Atualizar funções originais
    updateOriginalExportFunctions();
});

BrandManualUtils.devLog('Export templates system loaded successfully');/**
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
        const template = BrandManualTemplates.getSelectedTemplate();
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
        const template = BrandManualTemplates.getSelectedTemplate();
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