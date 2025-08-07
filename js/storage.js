/**
 * Gerenciamento de Dados e Storage
 */

// Constantes
const STORAGE_KEY = 'hotelBrandManual';
const AUTO_SAVE_DELAY = 1000; // 1 segundo

// Cache dos dados
let dataCache = {};

/**
 * Coletar todos os dados do formulário
 */
function collectFormData() {
    const data = {};
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        if (input.id) {
            data[input.id] = input.value || '';
        }
    });
    
    // Incluir logo se existir
    const logoImg = document.querySelector('#logoPreview img');
    if (logoImg) {
        data.logoData = logoImg.src;
    }
    
    // Adicionar metadados
    data._metadata = {
        version: '1.0',
        lastSaved: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    dataCache = data;
    return data;
}

/**
 * Preencher formulário com dados
 */
function populateForm(data) {
    if (!data || typeof data !== 'object') {
        BrandManualUtils.showError('Dados inválidos para carregar');
        return false;
    }
    
    try {
        // Preencher campos do formulário
        Object.keys(data).forEach(key => {
            if (key.startsWith('_')) return; // Pular metadados
            
            const input = document.getElementById(key);
            if (input && key !== 'logoData') {
                input.value = data[key] || '';
            }
        });
        
        // Restaurar logo
        if (data.logoData) {
            const logoPreview = document.getElementById('logoPreview');
            if (logoPreview) {
                logoPreview.innerHTML = `<img src="${data.logoData}" alt="Logo Preview">`;
            }
        }
        
        // Atualizar preview das cores
        if (window.updateColorPreview) {
            window.updateColorPreview();
        }
        
        dataCache = data;
        BrandManualUtils.devLog('Formulário preenchido com sucesso', data);
        return true;
    } catch (error) {
        BrandManualUtils.devLog('Erro ao preencher formulário', error);
        BrandManualUtils.showError('Erro ao carregar dados no formulário');
        return false;
    }
}

/**
 * Auto-save no localStorage
 */
const autoSave = BrandManualUtils.debounce(function() {
    if (!BrandManualUtils.browserSupport.localStorage) {
        BrandManualUtils.devLog('localStorage não suportado');
        return;
    }
    
    try {
        const data = collectFormData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        BrandManualUtils.devLog('Auto-save realizado', Object.keys(data).length + ' campos');
    } catch (error) {
        BrandManualUtils.devLog('Erro no auto-save', error);
    }
}, AUTO_SAVE_DELAY);

/**
 * Carregar dados do localStorage
 */
function autoLoad() {
    if (!BrandManualUtils.browserSupport.localStorage) {
        return false;
    }
    
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            populateForm(data);
            BrandManualUtils.devLog('Auto-load realizado');
            return true;
        }
    } catch (error) {
        BrandManualUtils.devLog('Erro no auto-load', error);
        localStorage.removeItem(STORAGE_KEY); // Limpar dados corrompidos
    }
    
    return false;
}

/**
 * Salvar dados em arquivo JSON
 */
function saveData() {
    BrandManualUtils.showLoading();
    
    try {
        const data = collectFormData();
        const hotelName = data.hotelName || 'hotel';
        const filename = `manual-marca-${BrandManualUtils.generateSlug(hotelName)}.json`;
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { 
            type: 'application/json' 
        });
        
        downloadFile(blob, filename);
        
        BrandManualUtils.showSuccess('Dados salvos com sucesso!');
        BrandManualUtils.devLog('Dados salvos em arquivo', filename);
    } catch (error) {
        BrandManualUtils.devLog('Erro ao salvar dados', error);
        BrandManualUtils.showError('Erro ao salvar dados. Tente novamente.');
    } finally {
        BrandManualUtils.hideLoading();
    }
}

/**
 * Carregar dados de arquivo JSON
 */
function loadData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        BrandManualUtils.showLoading();
        
        if (!BrandManualUtils.browserSupport.fileReader) {
            BrandManualUtils.showError('Seu navegador não suporta leitura de arquivos');
            BrandManualUtils.hideLoading();
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (populateForm(data)) {
                    BrandManualUtils.showSuccess('Dados carregados com sucesso!');
                    BrandManualUtils.devLog('Dados carregados do arquivo', file.name);
                }
            } catch (error) {
                BrandManualUtils.devLog('Erro ao processar arquivo', error);
                BrandManualUtils.showError('Arquivo JSON inválido ou corrompido');
            } finally {
                BrandManualUtils.hideLoading();
            }
        };
        
        reader.onerror = function() {
            BrandManualUtils.showError('Erro ao ler o arquivo');
            BrandManualUtils.hideLoading();
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

/**
 * Limpar todos os dados
 */
function clearAllData() {
    const confirmation = confirm('⚠️ Tem certeza que deseja limpar todos os dados?\n\nEsta ação não pode ser desfeita.');
    
    if (!confirmation) return;
    
    try {
        // Limpar formulário
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.value = '';
        });
        
        // Limpar preview do logo
        const logoPreview = document.getElementById('logoPreview');
        if (logoPreview) {
            logoPreview.innerHTML = '';
        }
        
        // Resetar preview das cores
        if (window.updateColorPreview) {
            // Resetar cores para valores padrão
            document.getElementById('primaryColor').value = '#2c3e50';
            document.getElementById('secondaryColor').value = '#3498db';
            document.getElementById('accentColor').value = '#e74c3c';
            window.updateColorPreview();
        }
        
        // Limpar localStorage
        if (BrandManualUtils.browserSupport.localStorage) {
            localStorage.removeItem(STORAGE_KEY);
        }
        
        // Limpar cache
        dataCache = {};
        
        BrandManualUtils.showSuccess('Todos os dados foram limpos!');
        BrandManualUtils.devLog('Dados limpos');
    } catch (error) {
        BrandManualUtils.devLog('Erro ao limpar dados', error);
        BrandManualUtils.showError('Erro ao limpar dados');
    }
}

/**
 * Duplicar dados (criar cópia)
 */
function duplicateData() {
    try {
        const data = collectFormData();
        
        // Adicionar sufixo de cópia
        const originalName = data.hotelName || 'Hotel';
        data.hotelName = originalName + ' - Cópia';
        
        // Criar arquivo
        const filename = `manual-marca-${BrandManualUtils.generateSlug(data.hotelName)}.json`;
        const blob = new Blob([JSON.stringify(data, null, 2)], { 
            type: 'application/json' 
        });
        
        downloadFile(blob, filename);
        
        BrandManualUtils.showSuccess('Cópia criada com sucesso!');
        BrandManualUtils.devLog('Dados duplicados', filename);
    } catch (error) {
        BrandManualUtils.devLog('Erro ao duplicar dados', error);
        BrandManualUtils.showError('Erro ao criar cópia');
    }
}

/**
 * Fazer download de arquivo
 */
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Limpar URL após um tempo
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Exportar dados para diferentes formatos
 */
function exportDataAs(format) {
    const data = collectFormData();
    const hotelName = data.hotelName || 'hotel';
    const slug = BrandManualUtils.generateSlug(hotelName);
    
    switch (format) {
        case 'csv':
            exportAsCSV(data, `manual-marca-${slug}.csv`);
            break;
        case 'txt':
            exportAsTXT(data, `manual-marca-${slug}.txt`);
            break;
        default:
            BrandManualUtils.showError('Formato não suportado');
    }
}

/**
 * Exportar como CSV
 */
function exportAsCSV(data, filename) {
    const csvRows = [];
    csvRows.push('Campo,Valor');
    
    Object.keys(data).forEach(key => {
        if (!key.startsWith('_') && key !== 'logoData') {
            const displayName = BrandManualUtils.getFieldDisplayName(key);
            const value = (data[key] || '').replace(/"/g, '""'); // Escapar aspas
            csvRows.push(`"${displayName}","${value}"`);
        }
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, filename);
    
    BrandManualUtils.showSuccess('Dados exportados como CSV!');
}

/**
 * Exportar como TXT
 */
function exportAsTXT(data, filename) {
    const txtLines = [];
    txtLines.push('MANUAL DA MARCA - DADOS');
    txtLines.push('========================');
    txtLines.push('');
    
    Object.keys(data).forEach(key => {
        if (!key.startsWith('_') && key !== 'logoData' && data[key]) {
            const displayName = BrandManualUtils.getFieldDisplayName(key);
            txtLines.push(`${displayName}:`);
            txtLines.push(data[key]);
            txtLines.push('');
        }
    });
    
    txtLines.push('------------------------');
    txtLines.push(`Gerado em: ${BrandManualUtils.formatDate()}`);
    
    const txtString = txtLines.join('\n');
    const blob = new Blob([txtString], { type: 'text/plain;charset=utf-8;' });
    downloadFile(blob, filename);
    
    BrandManualUtils.showSuccess('Dados exportados como TXT!');
}

/**
 * Verificar se há dados não salvos
 */
function hasUnsavedChanges() {
    const currentData = collectFormData();
    const savedData = dataCache;
    
    // Comparação básica (pode ser melhorada)
    return JSON.stringify(currentData) !== JSON.stringify(savedData);
}

/**
 * Configurar event listeners para auto-save
 */
function setupAutoSave() {
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        input.addEventListener('input', autoSave);
        input.addEventListener('change', autoSave);
    });
    
    BrandManualUtils.devLog('Auto-save configurado para', inputs.length, 'campos');
}

/**
 * Aviso antes de sair da página se há mudanças não salvas
 */
function setupBeforeUnload() {
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges()) {
            const confirmationMessage = 'Você tem alterações não salvas. Deseja realmente sair?';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        }
    });
}

// Exportar funções para uso global
window.BrandManualStorage = {
    collectFormData,
    populateForm,
    autoSave,
    autoLoad,
    saveData,
    loadData,
    clearAllData,
    duplicateData,
    exportDataAs,
    hasUnsavedChanges,
    setupAutoSave,
    setupBeforeUnload,
    
    // Getters
    get data() { return dataCache; },
    get storageKey() { return STORAGE_KEY; }
};