/**
 * Sistema de Exportação do Manual da Marca
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
        
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        BrandManualStorage.downloadFile(blob, filename);
        
        BrandManualUtils.showSuccess('Manual exportado como HTML!');
        BrandManualUtils.devLog('HTML exportado', filename);
    } catch (error) {
        BrandManualUtils.devLog('Erro ao exportar HTML', error);
        BrandManualUtils.showError('Erro ao exportar HTML. Tente novamente.');
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Exportar como PDF (via print)
 */
function exportPDF() {
    BrandManualUtils.showLoading();
    
    try {
        const data = BrandManualStorage.collectFormData();
        const pdfHTML = generatePDFHTML(data);
        
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(pdfHTML);
            printWindow.document.close();
            BrandManualUtils.showSuccess('Janela de impressão aberta!');
            BrandManualUtils.devLog('PDF/Print gerado');
        } else {
            BrandManualUtils.showError('Pop-up bloqueado! Permita pop-ups para usar esta função.');
        }
    } catch (error) {
        BrandManualUtils.devLog('Erro ao gerar PDF', error);
        BrandManualUtils.showError('Erro ao gerar PDF. Tente novamente.');
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Gerar HTML completo do manual
 */
function generateCompleteHTML(data, logoSrc) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual da Marca - ${BrandManualUtils.escapeHtml(data.hotelName || 'Hotel')}</title>
    <style>
        ${getExportStyles(data)}
    </style>
</head>
<body>
    <div class="container">
        ${generateExportHeader(data)}
        ${generateTableOfContents()}
        ${generateExportContent(data, logoSrc)}
        ${generateExportFooter(data)}
    </div>
    
    <script>
        ${getExportScript(data)}
    </script>
</body>
</html>`;
}

/**
 * Obter estilos CSS para exportação
 */
function getExportStyles(data) {
    const colors = {
        primary: data.primaryColor || '#2c3e50',
        secondary: data.secondaryColor || '#3498db',
        accent: data.accentColor || '#e74c3c'
    };
    
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
            page-break-inside: avoid;
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
        
        .color-swatch { 
            display: inline-block;
            width: 100px; 
            height: 60px; 
            margin: 10px 10px 10px 0; 
            border-radius: 8px; 
            text-align: center; 
            line-height: 60px; 
            color: white; 
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .logo-container { text-align: center; margin: 30px 0; }
        .logo-container img { max-width: 300px; max-height: 150px; border-radius: 8px; }
        
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
        
        .social-links { 
            display: flex; 
            gap: 15px; 
            flex-wrap: wrap; 
            margin: 15px 0; 
            justify-content: center;
        }
        
        .social-item { 
            background: ${colors.secondary}; 
            color: white; 
            padding: 10px 20px; 
            border-radius: 25px; 
            text-decoration: none;
            font-weight: 500;
        }
        
        .guidelines-box {
            background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
            border: 1px solid #27ae60;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .guidelines-box h4 {
            color: #27ae60;
            margin-bottom: 10px;
        }
        
        .guidelines-box ul {
            margin-left: 20px;
        }
        
        .guidelines-box li {
            margin: 5px 0;
        }
        
        .footer {
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 8px;
            text-align: center;
            border: 2px solid ${colors.secondary};
        }
        
        @media print {
            body { background: white; }
            .section { 
                box-shadow: none; 
                border: 1px solid #ddd; 
                page-break-inside: avoid;
                margin-bottom: 20px;
            }
            .header { background: ${colors.primary} !important; }
            .toc { page-break-after: always; }
        }
        
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 2rem; }
            .section { padding: 20px; }
            .grid-2, .grid-3 { grid-template-columns: 1fr; }
            .toc ul { columns: 1; }
        }
    `;
}

/**
 * Gerar header para exportação
 */
function generateExportHeader(data) {
    return `
        <div class="header">
            <h1>📋 MANUAL DA MARCA</h1>
            <h2>${BrandManualUtils.escapeHtml(data.hotelName || '[NOME DO HOTEL]')}</h2>
            <p>Diretrizes de Identidade Visual e Comunicação</p>
            <p style="font-size: 0.9rem; margin-top: 15px;">
                Gerado em ${BrandManualUtils.formatDate()} • Versão 1.0
            </p>
        </div>
    `;
}

/**
 * Gerar índice
 */
function generateTableOfContents() {
    return `
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
    `;
}

/**
 * Gerar conteúdo completo para exportação
 */
function generateExportContent(data, logoSrc) {
    return `
        ${generateBasicInfoSection(data)}
        ${generateIdentitySection(data)}
        ${generateLogoSection(data, logoSrc)}
        ${generateColorsSection(data)}
        ${generateTypographySection(data)}
        ${generateVoiceSection(data)}
        ${generateApplicationsSection(data)}
        ${generateSocialSection(data)}
        ${generateContactSection(data)}
    `;
}

/**
 * Seção Informações Básicas
 */
function generateBasicInfoSection(data) {
    return `
        <section class="section" id="info-basicas">
            <h2>🏢 1. Informações Básicas</h2>
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Nome do Hotel</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.hotelName) || '[A PREENCHER]'}</strong></p>
                </div>
                <div class="info-box">
                    <h3>Tipo/Conceito</h3>
                    <p>${BrandManualUtils.escapeHtml(data.hotelType) || '[A PREENCHER]'}</p>
                </div>
                <div class="info-box">
                    <h3>Localização</h3>
                    <p>${BrandManualUtils.escapeHtml(data.hotelLocation) || '[A PREENCHER]'}</p>
                </div>
                <div class="info-box">
                    <h3>Website</h3>
                    <p>${data.hotelWebsite ? `<a href="${BrandManualUtils.escapeHtml(data.hotelWebsite)}" target="_blank">${BrandManualUtils.escapeHtml(data.hotelWebsite)}</a>` : '[A PREENCHER]'}</p>
                </div>
            </div>
        </section>
    `;
}

/**
 * Seção Identidade da Marca
 */
function generateIdentitySection(data) {
    return `
        <section class="section" id="identidade">
            <h2>🎯 2. Identidade da Marca</h2>
            
            <div class="info-box">
                <h3>Missão</h3>
                <p>${BrandManualUtils.escapeHtml(data.mission) || '[A PREENCHER: Por que seu hotel existe? Qual é o propósito?]'}</p>
            </div>

            <div class="info-box">
                <h3>Visão</h3>
                <p>${BrandManualUtils.escapeHtml(data.vision) || '[A PREENCHER: Onde seu hotel quer chegar? Quais são as aspirações?]'}</p>
            </div>

            <div class="info-box">
                <h3>Posicionamento</h3>
                <p>${BrandManualUtils.escapeHtml(data.positioning) || '[A PREENCHER: Como seu hotel quer ser percebido no mercado?]'}</p>
            </div>

            <h3>Valores da Marca</h3>
            <div class="value-item">
                <h4>${BrandManualUtils.escapeHtml(data.value1) || 'Valor 1'}</h4>
                <p>${BrandManualUtils.escapeHtml(data.valueDesc1) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
            <div class="value-item">
                <h4>${BrandManualUtils.escapeHtml(data.value2) || 'Valor 2'}</h4>
                <p>${BrandManualUtils.escapeHtml(data.valueDesc2) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
            <div class="value-item">
                <h4>${BrandManualUtils.escapeHtml(data.value3) || 'Valor 3'}</h4>
                <p>${BrandManualUtils.escapeHtml(data.valueDesc3) || '[Descrição de como este valor se manifesta no hotel]'}</p>
            </div>
        </section>
    `;
}

/**
 * Seção Logotipo
 */
function generateLogoSection(data, logoSrc) {
    return `
        <section class="section" id="logotipo">
            <h2>🎨 3. Logotipo</h2>
            
            ${logoSrc ? `<div class="logo-container"><img src="${logoSrc}" alt="Logo do Hotel"></div>` : '<div class="info-box"><p>📁 <em>Logo será inserido aqui após upload</em></p></div>'}
            
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Dimensão Mínima</h3>
                    <p>${BrandManualUtils.escapeHtml(data.logoMinSize) || '[Ex: 50mm de largura]'}</p>
                </div>
                <div class="info-box">
                    <h3>Área de Proteção</h3>
                    <p>${BrandManualUtils.escapeHtml(data.logoProtection) || '[Ex: 2x altura da letra principal]'}</p>
                </div>
            </div>

            <div class="guidelines-box">
                <h4>⚠️ Diretrizes de Uso do Logotipo</h4>
                <ul>
                    <li>✅ Sempre respeitar a dimensão mínima especificada</li>
                    <li>✅ Manter a área de proteção livre de outros elementos</li>
                    <li>✅ Usar sempre as versões oficiais do logotipo</li>
                    <li>✅ Verificar contraste em diferentes fundos</li>
                    <li>❌ Nunca distorcer ou alterar as proporções</li>
                    <li>❌ Não alterar as cores sem autorização</li>
                    <li>❌ Não aplicar efeitos ou sombras não aprovados</li>
                    <li>❌ Não utilizar o logo em baixa resolução</li>
                </ul>
            </div>
        </section>
    `;
}

/**
 * Seção Paleta de Cores
 */
function generateColorsSection(data) {
    return `
        <section class="section" id="cores">
            <h2>🎨 4. Paleta de Cores</h2>
            
            <h3>Cores Principais</h3>
            <div style="margin: 20px 0;">
                <div class="color-swatch" style="background: ${data.primaryColor || '#2c3e50'};">
                    Primária<br><small>${data.primaryColorHex || data.primaryColor || '#2c3e50'}</small>
                </div>
                <div class="color-swatch" style="background: ${data.secondaryColor || '#3498db'};">
                    Secundária<br><small>${data.secondaryColorHex || data.secondaryColor || '#3498db'}</small>
                </div>
                <div class="color-swatch" style="background: ${data.accentColor || '#e74c3c'};">
                    Destaque<br><small>${data.accentColorHex || data.accentColor || '#e74c3c'}</small>
                </div>
            </div>

            <div class="grid grid-3">
                <div class="info-box">
                    <h3>Cor Primária: ${BrandManualUtils.escapeHtml(data.primaryColorName) || '[Nome da Cor]'}</h3>
                    <p><strong>HEX:</strong> ${data.primaryColorHex || data.primaryColor || '#2c3e50'}</p>
                    <p><strong>RGB:</strong> ${hexToRgbString(data.primaryColor || '#2c3e50')}</p>
                    <p><strong>Uso:</strong> Logotipo, títulos principais, elementos de destaque</p>
                </div>
                <div class="info-box">
                    <h3>Cor Secundária: ${BrandManualUtils.escapeHtml(data.secondaryColorName) || '[Nome da Cor]'}</h3>
                    <p><strong>HEX:</strong> ${data.secondaryColorHex || data.secondaryColor || '#3498db'}</p>
                    <p><strong>RGB:</strong> ${hexToRgbString(data.secondaryColor || '#3498db')}</p>
                    <p><strong>Uso:</strong> Subtítulos, links, botões secundários</p>
                </div>
                <div class="info-box">
                    <h3>Cor de Destaque: ${BrandManualUtils.escapeHtml(data.accentColorName) || '[Nome da Cor]'}</h3>
                    <p><strong>HEX:</strong> ${data.accentColorHex || data.accentColor || '#e74c3c'}</p>
                    <p><strong>RGB:</strong> ${hexToRgbString(data.accentColor || '#e74c3c')}</p>
                    <p><strong>Uso:</strong> Call-to-actions, alertas, destaques especiais</p>
                </div>
            </div>
        </section>
    `;
}

/**
 * Seção Tipografia
 */
function generateTypographySection(data) {
    return `
        <section class="section" id="tipografia">
            <h2>✍️ 5. Tipografia</h2>
            
            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Fonte Principal</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.primaryFont) || '[Nome da Fonte]'}</strong></p>
                    <p><strong>Uso:</strong> ${BrandManualUtils.escapeHtml(data.primaryFontUsage) || 'Títulos, logotipo, destaques'}</p>
                </div>
                <div class="info-box">
                    <h3>Fonte Secundária</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.secondaryFont) || '[Nome da Fonte]'}</strong></p>
                    <p><strong>Uso:</strong> ${BrandManualUtils.escapeHtml(data.secondaryFontUsage) || 'Textos longos, corpo'}</p>
                </div>
            </div>

            <div class="info-box">
                <h3>Hierarquia Tipográfica</h3>
                <div style="margin: 20px 0;">
                    <h1 style="margin-bottom: 10px; font-size: 2.5rem;">Título Principal (H1) - 32-48pt</h1>
                    <h2 style="border: none; margin-bottom: 10px; font-size: 2rem;">Título Secundário (H2) - 24-32pt</h2>
                    <h3 style="margin-bottom: 10px; font-size: 1.5rem;">Subtítulo (H3) - 18-24pt</h3>
                    <p style="margin-bottom: 10px; font-size: 1rem;">Corpo do texto - 14-16pt. Este é um exemplo de texto corrido que deve ser legível e manter a consistência visual da marca em todos os materiais.</p>
                    <small style="font-size: 0.9rem;">Texto pequeno/legendas - 12pt</small>
                </div>
            </div>
        </section>
    `;
}

/**
 * Seção Tom de Voz
 */
function generateVoiceSection(data) {
    return `
        <section class="section" id="tom-voz">
            <h2>🗣️ 6. Tom de Voz</h2>
            
            <div class="info-box">
                <h3>Personalidade da Comunicação</h3>
                <p>${BrandManualUtils.escapeHtml(data.voiceTone) || '[Como a marca deve se comunicar? Ex: Elegante, acolhedora, profissional...]'}</p>
            </div>

            <div class="grid grid-2">
                <div class="info-box">
                    <h3>Nível de Formalidade</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.formalityLevel) || '[A definir]'}</strong></p>
                </div>
                <div class="info-box">
                    <h3>Tratamento Preferido</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.treatment) || '[A definir]'}</strong></p>
                </div>
            </div>

            ${data.keywordsUse || data.keywordsAvoid ? `
                <div class="grid grid-2">
                    <div class="info-box">
                        <h3>✅ Palavras-chave (sempre usar)</h3>
                        <p>${BrandManualUtils.escapeHtml(data.keywordsUse) || '[Liste palavras que representam a marca]'}</p>
                    </div>
                    <div class="info-box">
                        <h3>❌ Palavras a evitar</h3>
                        <p>${BrandManualUtils.escapeHtml(data.keywordsAvoid) || '[Liste palavras que não combinam com a marca]'}</p>
                    </div>
                </div>
            ` : ''}
        </section>
    `;
}

/**
 * Seção Aplicações
 */
function generateApplicationsSection(data) {
    return `
        <section class="section" id="aplicacoes">
            <h2>📋 7. Aplicações da Marca</h2>
            
            <div class="info-box">
                <h3>Materiais Impressos</h3>
                <p>${BrandManualUtils.escapeHtml(data.printMaterials) || '[Cartão de visita, papel timbrado, folhetos...]'}</p>
            </div>

            <div class="info-box">
                <h3>Sinalização</h3>
                <p>${BrandManualUtils.escapeHtml(data.signage) || '[Placas externas, internas, direcionais...]'}</p>
            </div>

            <div class="info-box">
                <h3>Uniformes</h3>
                <p>${BrandManualUtils.escapeHtml(data.uniforms) || '[Especificações de uniformes e aplicação da marca]'}</p>
            </div>

            <div class="info-box">
                <h3>Materiais Digitais</h3>
                <p>${BrandManualUtils.escapeHtml(data.digitalMaterials) || '[Website, redes sociais, e-mail marketing...]'}</p>
            </div>
        </section>
    `;
}

/**
 * Seção Redes Sociais
 */
function generateSocialSection(data) {
    const socialItems = [];
    
    if (data.instagram) {
        const instaHandle = data.instagram.replace('@', '');
        socialItems.push(`<a href="https://instagram.com/${instaHandle}" class="social-item" target="_blank">📸 Instagram: ${BrandManualUtils.escapeHtml(data.instagram)}</a>`);
    }
    if (data.facebook) {
        const fbUrl = data.facebook.includes('http') ? data.facebook : 'https://' + data.facebook;
        socialItems.push(`<a href="${BrandManualUtils.escapeHtml(fbUrl)}" class="social-item" target="_blank">📘 Facebook</a>`);
    }
    if (data.linkedin) {
        const liUrl = data.linkedin.includes('http') ? data.linkedin : 'https://' + data.linkedin;
        socialItems.push(`<a href="${BrandManualUtils.escapeHtml(liUrl)}" class="social-item" target="_blank">💼 LinkedIn</a>`);
    }
    
    return `
        <section class="section" id="redes-sociais">
            <h2>📱 8. Redes Sociais</h2>
            
            ${socialItems.length > 0 ? `<div class="social-links">${socialItems.join('')}</div>` : '<p style="text-align: center; color: #6c757d; font-style: italic;">Nenhuma rede social configurada</p>'}

            <div class="guidelines-box">
                <h4>📋 Checklist para Posts</h4>
                <ul>
                    <li>✅ Logo aplicado corretamente</li>
                    <li>✅ Cores da paleta utilizadas</li>
                    <li>✅ Tom de voz consistente</li>
                    <li>✅ Qualidade de imagem adequada</li>
                    <li>✅ Hashtags relevantes incluídas</li>
                    <li>✅ Call-to-action claro quando necessário</li>
                </ul>
            </div>
        </section>
    `;
}

/**
 * Seção Contatos
 */
function generateContactSection(data) {
    return `
        <section class="section" id="contatos">
            <h2>📞 9. Contatos</h2>
            
            <div class="contact-grid">
                <div class="contact-item">
                    <h3>👤 Responsável pela Marca</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.brandManager) || '[Nome do responsável]'}</strong></p>
                    <p>📧 ${data.brandManagerEmail ? `<a href="mailto:${BrandManualUtils.escapeHtml(data.brandManagerEmail)}">${BrandManualUtils.escapeHtml(data.brandManagerEmail)}</a>` : '[email@hotel.com]'}</p>
                    <p>📱 ${BrandManualUtils.escapeHtml(data.brandManagerPhone) || '[+55 (11) 99999-9999]'}</p>
                </div>
                <div class="contact-item">
                    <h3>🎨 Agência/Designer</h3>
                    <p><strong>${BrandManualUtils.escapeHtml(data.designer) || '[Nome da agência ou designer]'}</strong></p>
                </div>
            </div>
        </section>
    `;
}

/**
 * Gerar footer
 */
function generateExportFooter(data) {
    return `
        <div class="footer">
            <h3>📝 Informações do Manual</h3>
            <p><strong>Versão:</strong> 1.0</p>
            <p><strong>Data de Criação:</strong> ${BrandManualUtils.formatDate()}</p>
            <p><strong>Próxima Revisão:</strong> ${BrandManualUtils.formatDate(new Date(Date.now() + 365*24*60*60*1000))}</p>
            <p style="margin-top: 20px; font-style: italic;">
                Este manual é um documento vivo e deve ser atualizado sempre que houver mudanças na identidade visual da marca.
            </p>
        </div>
    `;
}

/**
 * Script para exportação
 */
function getExportScript(data) {
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

        // Função para imprimir
        function printManual() {
            window.print();
        }

        // Adicionar botão de impressão
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '🖨️ Imprimir Manual';
        printBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; padding: 12px 20px; background: #27ae60; color: white; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-weight: bold;';
        printBtn.onclick = printManual;
        document.body.appendChild(printBtn);
    `;
}

/**
 * Gerar HTML para PDF/Impressão
 */
function generatePDFHTML(data) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Manual da Marca - ${BrandManualUtils.escapeHtml(data.hotelName || 'Hotel')}</title>
    <style>
        body { font-family: Arial; margin: 20px; font-size: 12pt; line-height: 1.4; }
        .header { text-align: center; margin-bottom: 30px; padding: 30px; background: #f8f9fa; border-radius: 10px; }
        h1 { font-size: 24pt; color: #2c3e50; margin-bottom: 10pt; }
        h2 { font-size: 18pt; color: #2c3e50; margin: 20pt 0 10pt 0; border-bottom: 2pt solid #3498db; padding-bottom: 5pt; }
        h3 { font-size: 14pt; color: #2c3e50; margin: 15pt 0 8pt 0; }
        .info-box { border: 1pt solid #ddd; padding: 15pt; margin: 10pt 0; background: #f9f9f9; border-radius: 5pt; }
        .page-break { page-break-before: always; }
        @media print { 
            .no-print { display: none !important; }
            body { margin: 0; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 MANUAL DA MARCA</h1>
        <h2 style="border: none; margin: 0;">${BrandManualUtils.escapeHtml(data.hotelName || '[NOME DO HOTEL]')}</h2>
    </div>
    
    <div class="page-break">
        <h2>🏢 Informações Básicas</h2>
        <div class="info-box">
            <p><strong>Nome:</strong> ${BrandManualUtils.escapeHtml(data.hotelName) || '[A PREENCHER]'}</p>
            <p><strong>Tipo:</strong> ${BrandManualUtils.escapeHtml(data.hotelType) || '[A PREENCHER]'}</p>
            <p><strong>Localização:</strong> ${BrandManualUtils.escapeHtml(data.hotelLocation) || '[A PREENCHER]'}</p>
            <p><strong>Website:</strong> ${BrandManualUtils.escapeHtml(data.hotelWebsite) || '[A PREENCHER]'}</p>
        </div>
    </div>
    
    <div class="page-break">
        <h2>🎯 Identidade da Marca</h2>
        <div class="info-box">
            <h3>Missão</h3>
            <p>${BrandManualUtils.escapeHtml(data.mission) || '[A PREENCHER]'}</p>
        </div>
        <div class="info-box">
            <h3>Visão</h3>
            <p>${BrandManualUtils.escapeHtml(data.vision) || '[A PREENCHER]'}</p>
        </div>
        <div class="info-box">
            <h3>Posicionamento</h3>
            <p>${BrandManualUtils.escapeHtml(data.positioning) || '[A PREENCHER]'}</p>
        </div>
    </div>
    
    <div class="page-break">
        <h2>🎨 Paleta de Cores</h2>
        <div class="info-box">
            <p><strong>Cor Primária:</strong> ${BrandManualUtils.escapeHtml(data.primaryColorName) || '[Nome]'} - ${data.primaryColorHex || data.primaryColor || '#2c3e50'}</p>
            <p><strong>Cor Secundária:</strong> ${BrandManualUtils.escapeHtml(data.secondaryColorName) || '[Nome]'} - ${data.secondaryColorHex || data.secondaryColor || '#3498db'}</p>
            <p><strong>Cor de Destaque:</strong> ${BrandManualUtils.escapeHtml(data.accentColorName) || '[Nome]'} - ${data.accentColorHex || data.accentColor || '#e74c3c'}</p>
        </div>
    </div>
    
    <div class="page-break">
        <h2>📞 Contatos</h2>
        <div class="info-box">
            <p><strong>Responsável:</strong> ${BrandManualUtils.escapeHtml(data.brandManager) || '[Nome]'}</p>
            <p><strong>Email:</strong> ${BrandManualUtils.escapeHtml(data.brandManagerEmail) || '[Email]'}</p>
            <p><strong>Telefone:</strong> ${BrandManualUtils.escapeHtml(data.brandManagerPhone) || '[Telefone]'}</p>
        </div>
    </div>
    
    <script>
        window.onload = function() { 
            window.print(); 
            setTimeout(() => window.close(), 1000);
        };
    </script>
</body>
</html>`;
}

/**
 * Converter HEX para string RGB
 */
function hexToRgbString(hex) {
    const rgb = BrandManualUtils.hexToRgb(hex);
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'N/A';
}

// Exportar funções para uso global
window.BrandManualExport = {
    exportHTML,
    exportPDF,
    generateCompleteHTML,
    generatePDFHTML,
    
    // Generators
    generateExportContent,
    generateBasicInfoSection,
    generateIdentitySection,
    generateLogoSection,
    generateColorsSection,
    generateTypographySection,
    generateVoiceSection,
    generateApplicationsSection,
    generateSocialSection,
    generateContactSection
};