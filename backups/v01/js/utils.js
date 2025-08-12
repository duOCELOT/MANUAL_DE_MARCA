/**
 * Funções Utilitárias para o Manual da Marca
 */

// Mostrar loading
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
    }
}

// Esconder loading
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Mostrar mensagem de sucesso
function showSuccess(message = '✅ Operação realizada com sucesso!') {
    const msg = document.getElementById('successMessage');
    if (msg) {
        msg.textContent = message;
        msg.style.display = 'block';
        setTimeout(() => {
            msg.style.display = 'none';
        }, 3000);
    }
}

// Mostrar mensagem de erro
function showError(message = '❌ Ocorreu um erro. Tente novamente.') {
    // Criar elemento de erro se não existir
    let errorMsg = document.getElementById('errorMessage');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.id = 'errorMessage';
        errorMsg.className = 'error-message';
        const container = document.querySelector('.container');
        const firstSection = container.querySelector('.section');
        container.insertBefore(errorMsg, firstSection);
    }
    
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 5000);
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Gerar slug a partir de texto
function generateSlug(text) {
    if (!text) return 'manual';
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/-+/g, '-') // Remove hífens duplos
        .replace(/^-|-$/g, ''); // Remove hífens do início e fim
}

// Validar URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar campos obrigatórios
function validateRequiredFields() {
    const required = ['hotelName', 'mission', 'vision'];
    const missing = [];
    
    required.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            missing.push(fieldId);
        }
    });
    
    return {
        isValid: missing.length === 0,
        missing: missing
    };
}

// Obter nome do campo para exibição
function getFieldDisplayName(fieldId) {
    const fieldNames = {
        'hotelName': 'Nome do Hotel',
        'mission': 'Missão',
        'vision': 'Visão',
        'positioning': 'Posicionamento',
        'primaryColor': 'Cor Primária',
        'secondaryColor': 'Cor Secundária',
        'accentColor': 'Cor de Destaque',
        'brandManager': 'Responsável pela Marca',
        'brandManagerEmail': 'E-mail do Responsável'
    };
    return fieldNames[fieldId] || fieldId;
}

// Debounce para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para limitação de chamadas
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Converter cor HEX para RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Verificar se cor é clara ou escura
function isColorLight(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return true;
    
    // Fórmula de luminância
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5;
}

// Gerar cor de contraste
function getContrastColor(hex) {
    return isColorLight(hex) ? '#000000' : '#ffffff';
}

// Copiar texto para clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showSuccess('Texto copiado para a área de transferência!');
        return true;
    } catch (err) {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showSuccess('Texto copiado para a área de transferência!');
            return true;
        } catch (err) {
            showError('Erro ao copiar texto');
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

// Formatar data para exibição
function formatDate(date) {
    if (!date) date = new Date();
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Gerar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Verificar se é mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Smooth scroll para elemento
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Comprimir imagem (para otimização de upload)
function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Verificar suporte a recursos
const browserSupport = {
    localStorage: (() => {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    })(),
    
    fileReader: typeof FileReader !== 'undefined',
    canvas: (() => {
        const elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    })()
};

// Log de desenvolvimento
function devLog(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[Manual da Marca] ${message}`, data || '');
    }
}

// Exportar funções para uso global
window.BrandManualUtils = {
    showLoading,
    hideLoading,
    showSuccess,
    showError,
    escapeHtml,
    generateSlug,
    isValidUrl,
    isValidEmail,
    validateRequiredFields,
    getFieldDisplayName,
    debounce,
    throttle,
    hexToRgb,
    isColorLight,
    getContrastColor,
    copyToClipboard,
    formatDate,
    generateId,
    isMobile,
    smoothScrollTo,
    compressImage,
    browserSupport,
    devLog
};      