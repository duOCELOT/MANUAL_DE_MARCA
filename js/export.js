/**
 * Sistema de Exportação Completo - HTML e PDF
 */

/**
 * Exportar como HTML completo
 */
function exportHTML() {
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const logoImg = document.querySelector('#logoPreview img');
        const logoSrc = logoImg ? logoImg.src : '';
        
        const htmlContent = generateCompleteHTML(data, logoSrc);
        const filename = `manual-marca-${BrandManualUtils.generateSlug(data.hotelName || 'hotel')}.html`;
        
        downloadHTMLFile(htmlContent, filename);
        
        BrandManualUtils.showSuccess('Manual HTML exportado com sucesso!');
        BrandManualUtils.devLog('HTML exportado', filename);
    } catch (error) {
        BrandManualUtils.devLog('Erro ao exportar HTML', error);
        BrandManualUtils.showError('Erro ao exportar HTML: ' + error.message);
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Exportar como PDF (via impressão) - CORRIGIDO
 */
function exportPDF() {
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const pdfHTML = generatePDFHTML(data);
        
        const printWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
        if (printWindow) {
            printWindow.document.write(pdfHTML);
            printWindow.document.close();
            
            // Aguardar carregamento antes de imprimir
            printWindow.onload = function() {
                setTimeout(() => {
                    printWindow.print();
                }, 500);
            };
            
            BrandManualUtils.showSuccess('Janela de impressão aberta!');
            BrandManualUtils.devLog('PDF/Print gerado com sucesso');
        } else {
            BrandManualUtils.showError('Pop-up bloqueado! Permita pop-ups para usar esta função.');
        }
    } catch (error) {
        BrandManualUtils.devLog('Erro ao gerar PDF', error);
        BrandManualUtils.showError('Erro ao gerar PDF: ' + error.message);
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Gerar HTML completo do manual
 */
function generateCompleteHTML(data, logoSrc) {
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
        ${getExportCSS(colors)}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 MANUAL DA MARCA</h1>
            <h2>${escapeHtmlSafe(data.hotelName || '[NOME DO HOTEL]')}</h2>
            <p>Diretrizes de Identidade Visual e Comunicação</p>
            <p class="meta">Gerado em ${new Date().toLocaleDateString('pt-BR')} • Versão 1.0</p>
        </div>

        <div class="toc">
            <h2>📖 Índice</h2>
            <ul>
                <li><a href="#info-basicas">1. Informações Básicas</a></li>
                <li><a href="#identidade">2. Identidade da Marca</a></li>
                <li><a href="#logotipo">3. Logotipo</a></li>
                <li><a href="#cores">4. Paleta de Cores</a></li>
                <li><a href="#tipografia">5. Tipografia</a></li>
                <li><a href="#tom-voz">6. Tom de Voz</a></li>
                <li><a href="#aplicacoes">7. Aplicações da Marca</a></li>
                <li><a href="#redes-sociais">8. Redes Sociais</a></li>
                <li><a href="#contatos">9. Contatos</a></li>
            </ul>
        </div>

        ${generateHTMLSections(data, logoSrc, colors)}

        <div class="footer">
            <h3>📝 Informações do Manual</h3>
            <p><strong>Versão:</strong> 1.0</p>
            <p><strong>Data de Criação:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Próxima Revisão:</strong> ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('pt-BR')}</p>
            <p class="disclaimer">Este manual é um documento vivo e deve ser atualizado sempre que houver mudanças na identidade visual da marca.</p>
        </div>
    </div>

    <button class="print-btn" onclick="window.print()">🖨️ Imprimir</button>

    <script>
        ${getExportJavaScript()}
    </script>
</body>
</html>`;
}

/**
 * Gerar HTML para PDF/Impressão - CORRIGIDO
 */
function generatePDFHTML(data) {
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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            line-height: 1.4;
            color: #333;
            margin: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 30px;
            background: ${colors.primary};
            color: white;
            border-radius: 10px;
        }
        
        h1 {
            font-size: 28pt;
            margin-bottom: 10pt;
        }
        
        h2 {
            font-size: 20pt;
            color: ${colors.primary};
            margin: 20pt 0 10pt 0;
            border-bottom: 2pt solid ${colors.secondary};
            padding-bottom: 5pt;
        }
        
        h3 {
            font-size: 16pt;
            color: ${colors.primary};
            margin: 15pt 0 8pt 0;
        }
        
        p {
            margin-bottom: 8pt;
        }
        
        .info-box {
            border: 1pt solid #ddd;
            padding: 15pt;
            margin: 10pt 0;
            background: #f9f9f9;
            border-radius: 5pt;
            border-left: 4pt solid ${colors.secondary};
        }
        
        .value-item {
            border: 1pt solid #ddd;
            padding: 15pt;
            margin: 10pt 0;
            background: #fdf2f2;
            border-radius: 5pt;
            border-left: 4pt solid ${colors.accent};
        }
        
        .color-info {
            display: inline-block;
            margin: 5pt 10pt 5pt 0;
            padding: 10pt;
            border-radius: 5pt;
            border: 1pt solid #ccc;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15pt;
            margin: 15pt 0;
        }
        
        .contact-section {
            background: #f8f9fa;
            padding: 15pt;
            border-radius: 5pt;
            border: 1pt solid #e9ecef;
        }
        
        @media print {
            body {
                margin: 0;
                font-size: 11pt;
            }
            
            .page-break {
                page-break-before: always;
            }
            
            .info-box,
            .value-item {
                break-inside: avoid;
            }
            
            .header {
                background: ${colors.primary} !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 MANUAL DA MARCA</h1>
        <h2 style="color: white; border: none; margin: 10pt 0;">${escapeHtmlSafe(data.hotelName || '[NOME DO HOTEL]')}</h2>
        <p>Diretrizes de Identidade Visual e Comunicação</p>
    </div>
    
    <div class="page-break">
        <h2>🏢 Informações Básicas</h2>
        <div class="grid">
            <div class="info-box">
                <h3>Nome do Hotel</h3>
                <p><strong>${escapeHtmlSafe(data.hotelName) || '[A PREENCHER]'}</strong></p>
            </div>
            <div class="info-box">
                <h3>Tipo/Conceito</h3>
                <p>${escapeHtmlSafe(data.hotelType) || '[A PREENCHER]'}</p>
            </div>
        </div>
        <div class="grid">
            <div class="info-box">
                <h3>Localização</h3>
                <p>${escapeHtmlSafe(data.hotelLocation) || '[A PREENCHER]'}</p>
            </div>
            <div class="info-box">
                <h3>Website</h3>
                <p>${escapeHtmlSafe(data.hotelWebsite) || '[A PREENCHER]'}</p>
            </div>
        </div>
    </div>
    
    <div class="page-break">
        <h2>🎯 Identidade da Marca</h2>
        <div class="info-box">
            <h3>Missão</h3>
            <p>${escapeHtmlSafe(data.mission) || '[A PREENCHER]'}</p>
        </div>
        <div class="info-box">
            <h3>Visão</h3>
            <p>${escapeHtmlSafe(data.vision) || '[A PREENCHER]'}</p>
        </div>
        <div class="info-box">
            <h3>Posicionamento</h3>
            <p>${escapeHtmlSafe(data.positioning) || '[A PREENCHER]'}</p>
        </div>
        
        <h3>Valores da Marca</h3>
        <div class="value-item">
            <h4>${escapeHtmlSafe(data.value1) || 'Valor 1'}</h4>
            <p>${escapeHtmlSafe(data.valueDesc1) || '[Descrição do valor]'}</p>
        </div>
        <div class="value-item">
            <h4>${escapeHtmlSafe(data.value2) || 'Valor 2'}</h4>
            <p>${escapeHtmlSafe(data.valueDesc2) || '[Descrição do valor]'}</p>
        </div>
        <div class="value-item">
            <h4>${escapeHtmlSafe(data.value3) || 'Valor 3'}</h4>
            <p>${escapeHtmlSafe(data.valueDesc3) || '[Descrição do valor]'}</p>
        </div>
    </div>
    
    <div class="page-break">
        <h2>🎨 Paleta de Cores</h2>
        <div class="color-info" style="background: ${colors.primary}; color: white;">
            <strong>Cor Primária</strong><br>
            ${escapeHtmlSafe(data.primaryColorName) || '[Nome]'}<br>
            <strong>${data.primaryColorHex || colors.primary}</strong>
        </div>
        <div class="color-info" style="background: ${colors.secondary}; color: white;">
            <strong>Cor Secundária</strong><br>
            ${escapeHtmlSafe(data.secondaryColorName) || '[Nome]'}<br>
            <strong>${data.secondaryColorHex || colors.secondary}</strong>
        </div>
        <div class="color-info" style="background: ${colors.accent}; color: white;">
            <strong>Cor de Destaque</strong><br>
            ${escapeHtmlSafe(data.accentColorName) || '[Nome]'}<br>
            <strong>${data.accentColorHex || colors.accent}</strong>
        </div>
    </div>
    
    <div class="page-break">
        <h2>✍️ Tipografia</h2>
        <div class="grid">
            <div class="info-box">
                <h3>Fonte Principal</h3>
                <p><strong>${escapeHtmlSafe(data.primaryFont) || '[A definir]'}</strong></p>
                <p>${escapeHtmlSafe(data.primaryFontUsage) || 'Títulos, logotipo, destaques'}</p>
            </div>
            <div class="info-box">
                <h3>Fonte Secundária</h3>
                <p><strong>${escapeHtmlSafe(data.secondaryFont) || '[A definir]'}</strong></p>
                <p>${escapeHtmlSafe(data.secondaryFontUsage) || 'Textos longos, corpo'}</p>
            </div>
        </div>
    </div>
    
    <div class="page-break">
        <h2>🗣️ Tom de Voz</h2>
        <div class="info-box">
            <h3>Personalidade da Comunicação</h3>
            <p>${escapeHtmlSafe(data.voiceTone) || '[A definir]'}</p>
        </div>
        <div class="grid">
            <div class="info-box">
                <h3>Nível de Formalidade</h3>
                <p><strong>${escapeHtmlSafe(data.formalityLevel) || '[A definir]'}</strong></p>
            </div>
            <div class="info-box">
                <h3>Tratamento Preferido</h3>
                <p><strong>${escapeHtmlSafe(data.treatment) || '[A definir]'}</strong></p>
            </div>
        </div>
    </div>
    
    <div class="page-break">
        <h2>📞 Contatos</h2>
        <div class="contact-section">
            <h3>👤 Responsável pela Marca</h3>
            <p><strong>Nome:</strong> ${escapeHtmlSafe(data.brandManager) || '[Nome]'}</p>
            <p><strong>Email:</strong> ${escapeHtmlSafe(data.brandManagerEmail) || '[Email]'}</p>
            <p><strong>Telefone:</strong> ${escapeHtmlSafe(data.brandManagerPhone) || '[Telefone]'}</p>
        </div>
        
        ${data.designer ? `
        <div class="contact-section" style="margin-top: 15pt;">
            <h3>🎨 Agência/Designer</h3>
            <p><strong>${escapeHtmlSafe(data.designer)}</strong></p>
        </div>
        ` : ''}
    </div>
    
    <script>
        window.onload = function() { 
            // Aguardar um pouco antes de imprimir
            setTimeout(function() {
                window.print(); 
                // Fechar janela após impressão (opcional)
                setTimeout(function() {
                    window.close();
                }, 2000);
            }, 1000);
        };
        
        // Debug
        console.log('PDF gerado com sucesso!');
    </script>
</body>
</html>`;
}

/**
 * CSS para exportação HTML
 */
function getExportCSS(colors) {
    return `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #2c3e50; 
            background: #f8f9fa;
        }
        
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
        
        .header { 
            text-align: center; 
            margin-bottom: 40px; 
            padding: 40px; 
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            color: white; 
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .header h2 { border: none; color: white; margin: 10px 0; }
        .header p { opacity: 0.9; margin-top: 10px; }
        
        .toc { 
            background: #f8f9fa; 
            padding: 25px; 
            border-radius: 8px; 
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .toc h2 { 
            color: ${colors.primary}; 
            border-bottom: 3px solid ${colors.secondary}; 
            padding-bottom: 10px; 
            margin-bottom: 20px;
        }
        
        .toc ul { list-style: none; columns: 2; column-gap: 30px; }
        .toc li { margin: 8px 0; break-inside: avoid; }
        .toc a { 
            color: ${colors.primary}; 
            text-decoration: none; 
            font-weight: 500;
            padding: 5px 0;
            display: block;
            transition: color 0.3s;
        }
        .toc a:hover { color: ${colors.secondary}; text-decoration: underline; }
        
        .section { 
            background: white; 
            margin-bottom: 30px; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        h2 { 
            color: ${colors.primary}; 
            border-bottom: 3px solid ${colors.secondary}; 
            padding-bottom: 10px; 
            margin-bottom: 25px; 
            font-size: 1.8rem;
        }
        
        h3 { color: ${colors.primary}; margin: 20px 0 15px 0; }
        
        .grid { display: grid; gap: 20px; margin: 20px 0; }
        .grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        .grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
        
        .info-box { 
            background: rgba(52, 152, 219, 0.1); 
            padding: 20px; 
            border-radius: 8px; 
            margin: 15px 0;
            border-left: 4px solid ${colors.secondary};
        }
        
        .value-item { 
            background: rgba(231, 76, 60, 0.08); 
            padding: 20px; 
            margin: 15px 0;
            border-radius: 8px; 
            border-left: 4px solid ${colors.accent};
        }
        
        .footer {
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 8px;
            text-align: center;
            border: 2px solid ${colors.secondary};
        }
        
        .print-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1000;
        }
        
        @media print {
            body { background: white; }
            .section { box-shadow: none; border: 1px solid #ddd; }
            .print-btn { display: none !important; }
        }
        
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .header { padding: 30px 20px; }
            .section { padding: 20px; }
            .grid-2, .grid-3 { grid-template-columns: 1fr; }
            .toc ul { columns: 1; }
        }
    `;
}

/**
 * Gerar seções HTML
 */
function generateHTMLSections(data, logoSrc, colors) {
    return `
        <section class="section" id="info-basicas">
            <h2>🏢 1. Informações Básicas</h2>
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Nome do Hotel</h3>
                    <p><strong>${escapeHtmlSafe(data.hotelName) || '[A PREENCHER]'}</strong></p>
                </div>
                <div class="info-box">
                    <h3>Tipo/Conceito</h3>
                    <p>${escapeHtmlSafe(data.hotelType) || '[A PREENCHER]'}</p>
                </div>
                <div class="info-box">
                    <h3>Localização</h3>
                    <p>${escapeHtmlSafe(data.hotelLocation) || '[A PREENCHER]'}</p>
                </div>
                <div class="info-box">
                    <h3>Website</h3>
                    <p>${data.hotelWebsite ? `<a href="${escapeHtmlSafe(data.hotelWebsite)}" target="_blank">${escapeHtmlSafe(data.hotelWebsite)}</a>` : '[A PREENCHER]'}</p>
                </div>
            </div>
        </section>

        <section class="section" id="identidade">
            <h2>🎯 2. Identidade da Marca</h2>
            
            <div class="info-box">
                <h3>Missão</h3>
                <p>${escapeHtmlSafe(data.mission) || '[A PREENCHER: Por que seu hotel existe? Qual é o propósito?]'}</p>
            </div>

            <div class="info-box">
                <h3>Visão</h3>
                <p>${escapeHtmlSafe(data.vision) || '[A PREENCHER: Onde seu hotel quer chegar? Quais são as aspirações?]'}</p>
            </div>

            <div class="info-box">
                <h3>Posicionamento</h3>
                <p>${escapeHtmlSafe(data.positioning) || '[A PREENCHER: Como seu hotel quer ser percebido no mercado?]'}</p>
            </div>

            <h3>Valores da Marca</h3>
            <div class="value-item">
                <h4>${escapeHtmlSafe(data.value1) || 'Valor 1'}</h4>
                <p>${escapeHtmlSafe(data.valueDesc1) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
            <div class="value-item">
                <h4>${escapeHtmlSafe(data.value2) || 'Valor 2'}</h4>
                <p>${escapeHtmlSafe(data.valueDesc2) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
            <div class="value-item">
                <h4>${escapeHtmlSafe(data.value3) || 'Valor 3'}</h4>
                <p>${escapeHtmlSafe(data.valueDesc3) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
        </section>

        ${logoSrc ? `
        <section class="section" id="logotipo">
            <h2>🎨 3. Logotipo</h2>
            <div style="text-align: center; margin: 30px 0;">
                <img src="${logoSrc}" alt="Logo do Hotel" style="max-width: 300px; max-height: 150px; border-radius: 8px;">
            </div>
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Dimensão Mínima</h3>
                    <p>${escapeHtmlSafe(data.logoMinSize) || '[Ex: 50mm de largura]'}</p>
                </div>
                <div class="info-box">
                    <h3>Área de Proteção</h3>
                    <p>${escapeHtmlSafe(data.logoProtection) || '[Ex: 2x altura da letra principal]'}</p>
                </div>
            </div>
        </section>
        ` : ''}

        <section class="section" id="cores">
            <h2>🎨 4. Paleta de Cores</h2>
            
            <h3>Cores Principais</h3>
            <div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap; justify-content: center;">
                <div style="width: 120px; height: 80px; background: ${colors.primary}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <div>Primária</div>
                    <small>${data.primaryColorHex || colors.primary}</small>
                </div>
                <div style="width: 120px; height: 80px; background: ${colors.secondary}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <div>Secundária</div>
                    <small>${data.secondaryColorHex || colors.secondary}</small>
                </div>
                <div style="width: 120px; height: 80px; background: ${colors.accent}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <div>Destaque</div>
                    <small>${data.accentColorHex || colors.accent}</small>
                </div>
            </div>
        </section>

        <section class="section" id="tipografia">
            <h2>✍️ 5. Tipografia</h2>
            
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Fonte Principal</h3>
                    <p><strong>${escapeHtmlSafe(data.primaryFont) || '[Nome da Fonte]'}</strong></p>
                    <p><strong>Uso:</strong> ${escapeHtmlSafe(data.primaryFontUsage) || 'Títulos, logotipo, destaques'}</p>
                </div>
                <div class="info-box">
                    <h3>Fonte Secundária</h3>
                    <p><strong>${escapeHtmlSafe(data.secondaryFont) || '[Nome da Fonte]'}</strong></p>
                    <p><strong>Uso:</strong> ${escapeHtmlSafe(data.secondaryFontUsage) || 'Textos longos, corpo'}</p>
                </div>
            </div>
        </section>

        <section class="section" id="contatos">
            <h2>📞 9. Contatos</h2>
            
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>👤 Responsável pela Marca</h3>
                    <p><strong>${escapeHtmlSafe(data.brandManager) || '[Nome do responsável]'}</strong></p>
                    <p>📧 ${data.brandManagerEmail ? `<a href="mailto:${escapeHtmlSafe(data.brandManagerEmail)}">${escapeHtmlSafe(data.brandManagerEmail)}</a>` : '[email@hotel.com]'}</p>
                    <p>📱 ${escapeHtmlSafe(data.brandManagerPhone) || '[+55 (11) 99999-9999]'}</p>
                </div>
                <div class="info-box">
                    <h3>🎨 Agência/Designer</h3>
                    <p><strong>${escapeHtmlSafe(data.designer) || '[Nome da agência ou designer]'}</strong></p>
                </div>
            </div>
        </section>
    `;
}

/**
 * JavaScript para o HTML exportado
 */
function getExportJavaScript() {
    return `
        // Scroll suave para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Esconder botão de print ao imprimir
        window.addEventListener('beforeprint', function() {
            const printBtn = document.querySelector('.print-btn');
            if (printBtn) printBtn.style.display = 'none';
        });

        window.addEventListener('afterprint', function() {
            const printBtn = document.querySelector('.print-btn');
            if (printBtn) printBtn.style.display = 'block';
        });

        console.log('Manual da Marca carregado com sucesso!');
    `;
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
 * Escape HTML seguro
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

// Substituir funções globais
window.exportHTML = exportHTML;
window.exportPDF = exportPDF;

// Debug
BrandManualUtils.devLog('Export system loaded - HTML and PDF ready!');