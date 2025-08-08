/**
 * Sistema de Exportação HTML - Versão Corrigida
 */

/**
 * Exportar como HTML completo - VERSÃO CORRIGIDA
 */
function exportHTML() {
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const logoImg = document.querySelector('#logoPreview img');
        const logoSrc = logoImg ? logoImg.src : '';
        
        // Gerar HTML corrigido
        const htmlContent = generateFixedHTML(data, logoSrc);
        const filename = `manual-marca-${BrandManualUtils.generateSlug(data.hotelName || 'hotel')}.html`;
        
        // Download do arquivo
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
 * Gerar HTML completo e funcional
 */
function generateFixedHTML(data, logoSrc) {
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
    <title>Manual da Marca - ${escapeHtmlFixed(data.hotelName || 'Hotel')}</title>
    <style>
        ${getFixedCSS(colors)}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 MANUAL DA MARCA</h1>
            <h2>${escapeHtmlFixed(data.hotelName || '[NOME DO HOTEL]')}</h2>
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

        ${generateFixedSections(data, logoSrc, colors)}

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
        ${getFixedJavaScript()}
    </script>
</body>
</html>`;
}

/**
 * CSS fixo e funcional
 */
function getFixedCSS(colors) {
    return `
        /* Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Layout */
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #f8f9fa;
            padding: 20px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        /* Header */
        .header {
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            color: white;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 300;
        }

        .header h2 {
            font-size: 2rem;
            margin: 15px 0;
            border: none;
            color: white;
        }

        .header p {
            opacity: 0.9;
            margin: 5px 0;
        }

        .meta {
            font-size: 0.9rem;
            margin-top: 15px !important;
        }

        /* Índice */
        .toc {
            background: #f8f9fa;
            padding: 30px;
            border-bottom: 1px solid #eee;
        }

        .toc h2 {
            color: ${colors.primary};
            border-bottom: 3px solid ${colors.secondary};
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .toc ul {
            list-style: none;
            columns: 2;
            column-gap: 30px;
        }

        .toc li {
            margin: 8px 0;
            break-inside: avoid;
        }

        .toc a {
            color: ${colors.primary};
            text-decoration: none;
            font-weight: 500;
            padding: 5px 0;
            display: block;
            transition: color 0.3s;
        }

        .toc a:hover {
            color: ${colors.secondary};
            text-decoration: underline;
        }

        /* Seções */
        .section {
            padding: 40px;
            border-bottom: 1px solid #eee;
        }

        .section:last-of-type {
            border-bottom: none;
        }

        h2 {
            color: ${colors.primary};
            border-bottom: 3px solid ${colors.secondary};
            padding-bottom: 10px;
            margin-bottom: 25px;
            font-size: 1.8rem;
        }

        h3 {
            color: ${colors.primary};
            margin: 20px 0 15px 0;
            font-size: 1.3rem;
        }

        h4 {
            color: ${colors.primary};
            margin: 15px 0 10px 0;
        }

        /* Grid */
        .grid {
            display: grid;
            gap: 20px;
            margin: 20px 0;
        }

        .grid-2 {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .grid-3 {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        /* Info boxes */
        .info-box {
            background: rgba(52, 152, 219, 0.08);
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 5px solid ${colors.secondary};
        }

        .value-item {
            background: rgba(231, 76, 60, 0.08);
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 5px solid ${colors.accent};
        }

        /* Logo */
        .logo-container {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .logo-container img {
            max-width: 300px;
            max-height: 150px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        /* Cores */
        .color-swatches {
            display: flex;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
            justify-content: center;
        }

        .color-swatch {
            width: 120px;
            height: 80px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .color-swatch small {
            font-size: 0.8rem;
            margin-top: 5px;
        }

        /* Guidelines */
        .guidelines-box {
            background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
            border: 1px solid #27ae60;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .guidelines-box h4 {
            color: #27ae60;
            margin-bottom: 15px;
        }

        .guidelines-box ul {
            margin-left: 20px;
        }

        .guidelines-box li {
            margin: 8px 0;
        }

        /* Social */
        .social-links {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin: 20px 0;
            justify-content: center;
        }

        .social-item {
            background: ${colors.secondary};
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 500;
            transition: transform 0.3s;
        }

        .social-item:hover {
            transform: translateY(-2px);
        }

        /* Contatos */
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .contact-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        /* Footer */
        .footer {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            padding: 30px;
            text-align: center;
            border-top: 3px solid ${colors.secondary};
        }

        .footer h3 {
            margin-bottom: 20px;
        }

        .disclaimer {
            margin-top: 20px;
            font-style: italic;
            color: #6c757d;
        }

        /* Print button */
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
            transition: all 0.3s;
        }

        .print-btn:hover {
            background: #219a52;
            transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
            body { padding: 10px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 2rem; }
            .section { padding: 25px; }
            .toc { padding: 20px; }
            .toc ul { columns: 1; }
            .grid-2, .grid-3 { grid-template-columns: 1fr; }
            .color-swatches { justify-content: center; }
            .social-links { justify-content: center; }
        }

        /* Print styles */
        @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; }
            .print-btn { display: none !important; }
            .section { page-break-inside: avoid; }
            .toc { page-break-after: always; }
        }
    `;
}

/**
 * Gerar seções do manual
 */
function generateFixedSections(data, logoSrc, colors) {
    return `
        <section class="section" id="info-basicas">
            <h2>🏢 1. Informações Básicas</h2>
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Nome do Hotel</h3>
                    <p><strong>${escapeHtmlFixed(data.hotelName) || '[A PREENCHER]'}</strong></p>
                </div>
                <div class="info-box">
                    <h3>Tipo/Conceito</h3>
                    <p>${escapeHtmlFixed(data.hotelType) || '[A PREENCHER]'}</p>
                </div>
                <div class="info-box">
                    <h3>Localização</h3>
                    <p>${escapeHtmlFixed(data.hotelLocation) || '[A PREENCHER]'}</p>
                </div>
                <div class="info-box">
                    <h3>Website</h3>
                    <p>${data.hotelWebsite ? `<a href="${escapeHtmlFixed(data.hotelWebsite)}" target="_blank">${escapeHtmlFixed(data.hotelWebsite)}</a>` : '[A PREENCHER]'}</p>
                </div>
            </div>
        </section>

        <section class="section" id="identidade">
            <h2>🎯 2. Identidade da Marca</h2>
            
            <div class="info-box">
                <h3>Missão</h3>
                <p>${escapeHtmlFixed(data.mission) || '[A PREENCHER: Por que seu hotel existe? Qual é o propósito?]'}</p>
            </div>

            <div class="info-box">
                <h3>Visão</h3>
                <p>${escapeHtmlFixed(data.vision) || '[A PREENCHER: Onde seu hotel quer chegar? Quais são as aspirações?]'}</p>
            </div>

            <div class="info-box">
                <h3>Posicionamento</h3>
                <p>${escapeHtmlFixed(data.positioning) || '[A PREENCHER: Como seu hotel quer ser percebido no mercado?]'}</p>
            </div>

            <h3>Valores da Marca</h3>
            <div class="value-item">
                <h4>${escapeHtmlFixed(data.value1) || 'Valor 1'}</h4>
                <p>${escapeHtmlFixed(data.valueDesc1) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
            <div class="value-item">
                <h4>${escapeHtmlFixed(data.value2) || 'Valor 2'}</h4>
                <p>${escapeHtmlFixed(data.valueDesc2) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
            <div class="value-item">
                <h4>${escapeHtmlFixed(data.value3) || 'Valor 3'}</h4>
                <p>${escapeHtmlFixed(data.valueDesc3) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
        </section>

        <section class="section" id="logotipo">
            <h2>🎨 3. Logotipo</h2>
            
            ${logoSrc ? `<div class="logo-container"><img src="${logoSrc}" alt="Logo do Hotel"></div>` : '<div class="info-box"><p>📁 <em>Logo será inserido aqui após upload</em></p></div>'}
            
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Dimensão Mínima</h3>
                    <p>${escapeHtmlFixed(data.logoMinSize) || '[Ex: 50mm de largura]'}</p>
                </div>
                <div class="info-box">
                    <h3>Área de Proteção</h3>
                    <p>${escapeHtmlFixed(data.logoProtection) || '[Ex: 2x altura da letra principal]'}</p>
                </div>
            </div>

            <div class="guidelines-box">
                <h4>⚠️ Diretrizes de Uso do Logotipo</h4>
                <ul>
                    <li>✅ Sempre respeitar a dimensão mínima especificada</li>
                    <li>✅ Manter a área de proteção livre de outros elementos</li>
                    <li>✅ Usar sempre as versões oficiais do logotipo</li>
                    <li>❌ Nunca distorcer ou alterar as proporções</li>
                    <li>❌ Não alterar as cores sem autorização</li>
                    <li>❌ Não aplicar efeitos ou sombras não aprovados</li>
                </ul>
            </div>
        </section>

        <section class="section" id="cores">
            <h2>🎨 4. Paleta de Cores</h2>
            
            <h3>Cores Principais</h3>
            <div class="color-swatches">
                <div class="color-swatch" style="background: ${colors.primary};">
                    <div>Primária</div>
                    <small>${data.primaryColorHex || colors.primary}</small>
                </div>
                <div class="color-swatch" style="background: ${colors.secondary};">
                    <div>Secundária</div>
                    <small>${data.secondaryColorHex || colors.secondary}</small>
                </div>
                <div class="color-swatch" style="background: ${colors.accent};">
                    <div>Destaque</div>
                    <small>${data.accentColorHex || colors.accent}</small>
                </div>
            </div>

            <div class="grid grid-3">
                <div class="info-box">
                    <h3>Cor Primária: ${escapeHtmlFixed(data.primaryColorName) || '[Nome da Cor]'}</h3>
                    <p><strong>HEX:</strong> ${data.primaryColorHex || colors.primary}</p>
                    <p><strong>Uso:</strong> Logotipo, títulos principais, elementos de destaque</p>
                </div>
                <div class="info-box">
                    <h3>Cor Secundária: ${escapeHtmlFixed(data.secondaryColorName) || '[Nome da Cor]'}</h3>
                    <p><strong>HEX:</strong> ${data.secondaryColorHex || colors.secondary}</p>
                    <p><strong>Uso:</strong> Subtítulos, links, botões secundários</p>
                </div>
                <div class="info-box">
                    <h3>Cor de Destaque: ${escapeHtmlFixed(data.accentColorName) || '[Nome da Cor]'}</h3>
                    <p><strong>HEX:</strong> ${data.accentColorHex || colors.accent}</p>
                    <p><strong>Uso:</strong> Call-to-actions, alertas, destaques especiais</p>
                </div>
            </div>
        </section>

        <section class="section" id="tipografia">
            <h2>✍️ 5. Tipografia</h2>
            
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Fonte Principal</h3>
                    <p><strong>${escapeHtmlFixed(data.primaryFont) || '[Nome da Fonte]'}</strong></p>
                    <p><strong>Uso:</strong> ${escapeHtmlFixed(data.primaryFontUsage) || 'Títulos, logotipo, destaques'}</p>
                </div>
                <div class="info-box">
                    <h3>Fonte Secundária</h3>
                    <p><strong>${escapeHtmlFixed(data.secondaryFont) || '[Nome da Fonte]'}</strong></p>
                    <p><strong>Uso:</strong> ${escapeHtmlFixed(data.secondaryFontUsage) || 'Textos longos, corpo'}</p>
                </div>
            </div>
        </section>

        <section class="section" id="tom-voz">
            <h2>🗣️ 6. Tom de Voz</h2>
            
            <div class="info-box">
                <h3>Personalidade da Comunicação</h3>
                <p>${escapeHtmlFixed(data.voiceTone) || '[Como a marca deve se comunicar? Ex: Elegante, acolhedora, profissional...]'}</p>
            </div>

            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Nível de Formalidade</h3>
                    <p><strong>${escapeHtmlFixed(data.formalityLevel) || '[A definir]'}</strong></p>
                </div>
                <div class="info-box">
                    <h3>Tratamento Preferido</h3>
                    <p><strong>${escapeHtmlFixed(data.treatment) || '[A definir]'}</strong></p>
                </div>
            </div>
        </section>

        <section class="section" id="aplicacoes">
            <h2>📋 7. Aplicações da Marca</h2>
            
            <div class="info-box">
                <h3>Materiais Impressos</h3>
                <p>${escapeHtmlFixed(data.printMaterials) || '[Cartão de visita, papel timbrado, folhetos...]'}</p>
            </div>

            <div class="info-box">
                <h3>Sinalização</h3>
                <p>${escapeHtmlFixed(data.signage) || '[Placas externas, internas, direcionais...]'}</p>
            </div>

            <div class="info-box">
                <h3>Uniformes</h3>
                <p>${escapeHtmlFixed(data.uniforms) || '[Especificações de uniformes e aplicação da marca]'}</p>
            </div>

            <div class="info-box">
                <h3>Materiais Digitais</h3>
                <p>${escapeHtmlFixed(data.digitalMaterials) || '[Website, redes sociais, e-mail marketing...]'}</p>
            </div>
        </section>

        <section class="section" id="redes-sociais">
            <h2>📱 8. Redes Sociais</h2>
            
            ${generateSocialSection(data)}
        </section>

        <section class="section" id="contatos">
            <h2>📞 9. Contatos</h2>
            
            <div class="contact-grid">
                <div class="contact-item">
                    <h3>👤 Responsável pela Marca</h3>
                    <p><strong>${escapeHtmlFixed(data.brandManager) || '[Nome do responsável]'}</strong></p>
                    <p>📧 ${data.brandManagerEmail ? `<a href="mailto:${escapeHtmlFixed(data.brandManagerEmail)}">${escapeHtmlFixed(data.brandManagerEmail)}</a>` : '[email@hotel.com]'}</p>
                    <p>📱 ${escapeHtmlFixed(data.brandManagerPhone) || '[+55 (11) 99999-9999]'}</p>
                </div>
                <div class="contact-item">
                    <h3>🎨 Agência/Designer</h3>
                    <p><strong>${escapeHtmlFixed(data.designer) || '[Nome da agência ou designer]'}</strong></p>
                </div>
            </div>
        </section>
    `;
}

/**
 * Gerar seção de redes sociais
 */
function generateSocialSection(data) {
    const socialItems = [];
    
    if (data.instagram) {
        const instaHandle = data.instagram.replace('@', '');
        socialItems.push(`<a href="https://instagram.com/${instaHandle}" class="social-item" target="_blank">📸 Instagram: ${escapeHtmlFixed(data.instagram)}</a>`);
    }
    if (data.facebook) {
        socialItems.push(`<a href="#" class="social-item">📘 Facebook</a>`);
    }
    if (data.linkedin) {
        socialItems.push(`<a href="#" class="social-item">💼 LinkedIn</a>`);
    }
    
    return socialItems.length > 0 
        ? `<div class="social-links">${socialItems.join('')}</div>`
        : '<p style="text-align: center; color: #6c757d; font-style: italic;">Nenhuma rede social configurada</p>';
}

/**
 * JavaScript para o HTML exportado
 */
function getFixedJavaScript() {
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
            document.querySelector('.print-btn').style.display = 'none';
        });

        window.addEventListener('afterprint', function() {
            document.querySelector('.print-btn').style.display = 'block';
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
        
        BrandManualUtils.devLog('Download realizado', filename);
    } catch (error) {
        throw new Error('Falha no download: ' + error.message);
    }
}

/**
 * Escape HTML seguro
 */
function escapeHtmlFixed(text) {
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

// Substituir função global
window.exportHTML = exportHTML;