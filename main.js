/**
 * ============================================================
 *  🌾 AGROTECH PARANÁ - MAIN.JS
 *  Sistema Interativo para o Agro Brasileiro
 *  Versão 1.0 - 2023
 * ============================================================
 * 
 *  Este arquivo contém:
 *  - Configurações Globais
 *  - Inicialização do Sistema
 *  - Dashboard de Mercado
 *  - Calculadora de Solo
 *  - Calendário de Safra
 *  - Gestão de Talhões
 *  - Gerenciador de Temas
 *  - Animações e Efeitos
 *  - Utilitários
 * 
 * ============================================================
 */

// ------------------------------------------------------------
// 1. CONFIGURAÇÕES GLOBAIS DO SISTEMA
// ------------------------------------------------------------

/**
 * Objeto central de configurações do sistema.
 * Altere os valores aqui para customizar o site.
 */
const AgroTechConfig = {
    // ==================== TEMAS E CORES ====================
    theme: {
        current: 'light', // 'light' ou 'dark'
        autoDetect: true
    },
    
    colors: {
        // Tema Claro
        light: {
            primary: '#2E7D32',        // Verde Folha
            primaryDark: '#1B5E20',
            primaryLight: '#66BB6A',
            secondary: '#FBC02D',      // Amarelo Soja
            soil: '#5D4037',         // Marrom Terra
            bgBody: '#F5F5F5',
            bgCard: '#FFFFFF',
            textMain: '#333333',
            textSecondary: '#666666',
            success: '#4CAF50',
            danger: '#D32F2F',
            warning: '#FF9800'
        },
        // Tema Escuro
        dark: {
            primary: '#66BB6A',
            primaryDark: '#2E7D32',
            primaryLight: '#81C784',
            secondary: '#FFD54F',
            soil: '#8D6E63',
            bgBody: '#121212',
            bgCard: '#1E1E1E',
            textMain: '#E0E0E0',
            textSecondary: '#B0B0B0',
            success: '#66BB6A',
            danger: '#EF5350',
            warning: '#FFB74D'
        }
    },

    // ==================== DADOS DO MERCADO ====================
    market: {
        updateInterval: 30000, // ms (30 segundos)
        baseData: [
            {
                id: 'soja',
                symbol: 'SOJA',
                name: 'Soja (Sc 60kg)',
                price: 185.50,
                variation: 1.2,
                icon: 'fa-seedling',
                unit: 'R$/sc'
            },
            {
                id: 'milho',
                symbol: 'MILHO',
                name: 'Milho (Sc 60kg)',
                price: 88.00,
                variation: -0.5,
                icon: 'fa-wheat-awn',
                unit: 'R$/sc'
            },
            {
                id: 'trigo',
                symbol: 'TRIGO',
                name: 'Trigo (Sc 60kg)',
                price: 124.00,
                variation: 0.8,
                icon: 'fa-bread-slice',
                unit: 'R$/sc'
            },
            {
                id: 'cafe',
                symbol: 'CAFÉ',
                name: 'Café Arábica (Sc)',
                price: 985.00,
                variation: 2.1,
                icon: 'fa-mug-hot',
                unit: 'R$/sc'
            },
            {
                id: 'boi',
                symbol: 'BOI',
                name: 'Boi Gordo (@)',
                price: 310.00,
                variation: 0.2,
                icon: 'fa-cow',
                unit: 'R$/@'
            },
            {
                id: 'suino',
                symbol: 'SUÍNO',
                name: 'Suíno (kg)',
                price: 8.50,
                variation: -0.3,
                icon: 'fa-piggy-bank',
                unit: 'R$/kg'
            }
        ]
    },

    // ==================== REGIÕES DO PARANÁ ====================
    regions: {
        cascavel: {
            key: 'cascavel',
            name: 'Cascavel',
            zone: 'Oeste',
            crops: [
                { name: 'Soja 2ª Safra', planting: '09-15', harvest: '01-15', icon: 'fa-seedling' },
                { name: 'Milho 2ª Safra', planting: '01-20', harvest: '06-10', icon: 'fa-wheat-awn' }
            ]
        },
        londrina: {
            key: 'londrina',
            name: 'Londrina',
            zone: 'Norte',
            crops: [
                { name: 'Milho 1ª Safra', planting: '08-20', harvest: '12-10', icon: 'fa-wheat-awn' },
                { name: 'Soja 1ª Safra', planting: '09-01', harvest: '01-05', icon: 'fa-seedling' }
            ]
        },
        curitiba: {
            key: 'curitiba',
            name: 'Curitiba',
            zone: 'Sudeste',
            crops: [
                { name: 'Trigo', planting: '04-01', harvest: '10-01', icon: 'fa-bread-slice' },
                { name: 'Cevada', planting: '04-15', harvest: '10-15', icon: 'fa-wheat-awn' }
            ]
        },
        mares: {
            key: 'maringa',
            name: 'Maringá',
            zone: 'Norte',
            crops: [
                { name: 'Soja', planting: '09-10', harvest: '01-20', icon: 'fa-seedling' },
                { name: 'Algodão', planting: '12-01', harvest: '05-01', icon: 'fa-cloud' }
            ]
        },
        foz: {
            key: 'foz',
            name: 'Foz do Iguaçu',
            zone: 'Oeste',
            crops: [
                { name: 'Soja', planting: '09-20', harvest: '01-25', icon: 'fa-seedling' },
                { name: 'Milho', planting: '02-01', harvest: '06-20', icon: 'fa-wheat-awn' }
            ]
        }
    },

    // ==================== TALHÕES (Mapa) ====================
    farms: [
        { id: 1, name: 'Talhão 01', crop: 'Soja', area: 120, status: 'Desenvolvimento', productivity: 3500, lat: 30, lng: 40 },
        { id: 2, name: 'Talhão 02', crop: 'Milho', area: 85, status: 'Germinação', productivity: 0, lat: 60, lng: 70 },
        { id: 3, name: 'Talhão 03', crop: 'Trigo', area: 150, status: 'Pronto para Colheita', productivity: 3200, lat: 45, lng: 25 },
        { id: 4, name: 'Talhão 04', crop: 'Soja', area: 200, status: 'Em Plantio', productivity: 0, lat: 75, lng: 55 }
    ],

    // ==================== CONFIGURAÇÕES DE ANIMAÇÃO ====================
    animation: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out'
    }
};

// ------------------------------------------------------------
// 2. VARIÁVEIS GLOBAIS (CACHE DO DOM)
// ------------------------------------------------------------

const DOM = {
    // Loading
    loader: document.getElementById('loader'),
    
    // Header
    mainHeader: document.getElementById('main-header'),
    themeToggle: document.getElementById('theme-toggle'),
    navLinks: document.querySelectorAll('.nav-item'),
    
    // Sections
    hero: document.getElementById('hero'),
    dashboard: document.getElementById('dashboard'),
    calculator: document.getElementById('calculator'),
    calendar: document.getElementById('calendar'),
    mapSection: document.getElementById('map-section'),
    
    // Dashboard Elements
    lastUpdate: document.getElementById('last-update'),
    marketCards: document.getElementById('market-cards'),
    
    // Calculator Elements
    soilForm: document.getElementById('soil-form'),
    phInput: document.getElementById('ph-input'),
    ctcInput: document.getElementById('ctc-input'),
    targetPh: document.getElementById('target-ph'),
    resultBox: document.getElementById('result-box'),
    limeRecommendation: document.getElementById('lime-recommendation'),
    
    // Calendar Elements
    regionSelect: document.getElementById('region-select'),
    cropTimeline: document.getElementById('crop-timeline'),
    
    // Map Elements
    markers: document.querySelectorAll('.marker'),
    talhoesInfo: document.getElementById('talhoes-info'),
    
    // Footer
    footer: document.querySelector('footer')
};

// ------------------------------------------------------------
// 3. INICIALIZAÇÃO DO SISTEMA
// ------------------------------------------------------------

/**
 * Função principal de inicialização.
 * Chama todas as funções de setup quando o DOM estiver pronto.
 */
function AgroTechInit() {
    console.log('%c🌾 AgroTech Paraná - Sistema Inicializado', 'color: #2E7D32; font-size: 14px; font-weight: bold;');
    console.log('%c   ✅ Versão 1.0', 'color: #666; font-size: 12px;');
    
    // Temporizador para simular carregamento
    setTimeout(() => {
        hideLoader();
        
        // Inicializa todos os módulos
        initThemeSystem();
        initDashboard();
        initCalculator();
        initCalendar();
        initMapSystem();
        initSmoothScroll();
        
        console.log('%c   ✅ Todos os módulos carregados', 'color: #4CAF50; font-size: 12px;');
    }, 1500);
}

// ------------------------------------------------------------
// 4. SISTEMA DE TEMAS
// ------------------------------------------------------------

/**
 * Inicializa o sistema de temas (claro/escuro)
 */
function initThemeSystem() {
    const toggleBtn = DOM.themeToggle;
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            toggleTheme();
        });
    }
    
    // Aplica tema inicial
    applyTheme(AgroTechConfig.theme.current);
}

/**
 * Alterna entre tema claro e escuro
 */
function toggleTheme() {
    const currentTheme = AgroTechConfig.theme.current;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
    
    // Atualiza ícone
    const icon = DOM.themeToggle.querySelector('i');
    if (icon) {
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/**
 * Aplica o tema especificado
 * @param {string} themeName - 'light' ou 'dark'
 */
function applyTheme(themeName) {
    const root = document.documentElement;
    const colors = AgroTechConfig.colors[themeName];
    
    // Atualiza variáveis CSS
    root.style.setProperty('--primary-green', colors.primary);
    root.style.setProperty('--dark-green', colors.primaryDark);
    root.style.setProperty('--primary-light', colors.primaryLight);
    root.style.setProperty('--accent-yellow', colors.secondary);
    root.style.setProperty('--soil-brown', colors.soil);
    root.style.setProperty('--bg-light', colors.bgBody);
    root.style.setProperty('--text-dark', colors.textMain);
    root.style.setProperty('--text-light', colors.textSecondary);
    
    // Altera classe no body para tema escuro
    if (themeName === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Atualiza estado global
    AgroTechConfig.theme.current = themeName;
    
    console.log(`%c🎨 Tema alterado para: ${themeName.toUpperCase()}`, 'color: #FBC02D; font-size: 12px;');
}

// ------------------------------------------------------------
// 5. DASHBOARD DE MERCADO
// ------------------------------------------------------------

/**
 * Inicializa o dashboard de mercado
 */
function initDashboard() {
    renderMarketCards();
    updateDateTime();
    
    // Atualiza preços automaticamente
    setInterval(() => {
        simulatePriceUpdate();
    }, AgroTechConfig.market.updateInterval);
}

/**
 * Renderiza os cards de preços do mercado
 */
function renderMarketCards() {
    const container = DOM.marketCards;
    
    if (!container) return;
    
    container.innerHTML = '';
    
    const marketData = AgroTechConfig.market.baseData;
    
    marketData.forEach(item => {
        const card = createMarketCard(item);
        container.appendChild(card);
    });
    
    // Aplica estilos aos cards
    styleMarketCards();
}

/**
 * Cria um elemento card de mercado
 * @param {Object} item - Dados do produto
 * @returns {HTMLElement}
 */
function createMarketCard(item) {
    const card = document.createElement('div');
    card.className = 'market-card';
    card.dataset.id = item.id;
    
    const variationClass = item.variation >= 0 ? 'positive' : 'negative';
    const variationIcon = item.variation >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    const variationText = item.variation >= 0 ? `+${item.variation}%` : `${item.variation}%`;
    
    card.innerHTML = `
        <div class="card-icon-container">
            <i class="fas ${item.icon}"></i>
        </div>
        <div class="card-content">
            <h4 class="card-symbol">${item.symbol}</h4>
            <p class="card-name">${item.name}</p>
        </div>
        <div class="card-price-container">
            <span class="card-price">R$ ${item.price.toFixed(2)}</span>
            <span class="card-variation ${variationClass}">
                <i class="fas ${variationIcon}"></i> ${variationText}
            </span>
        </div>
    `;
    
    // Adiciona evento de clique
    card.addEventListener('click', () => {
        showProductDetails(item);
    });
    
    return card;
}

/**
 * Aplica estilos CSS aos cards via JavaScript
 */
function styleMarketCards() {
    const cards = document.querySelectorAll('.market-card');
    const colors = AgroTechConfig.colors[AgroTechConfig.theme.current];
    
    cards.forEach(card => {
        card.style.background = colors.bgCard;
        card.style.padding = '20px';
        card.style.borderRadius = '8px';
        card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.gap = '15px';
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.3s, box-shadow 0.3s';
        
        // Efeitos hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
    });
    
    // Estiliza ícones
    document.querySelectorAll('.card-icon-container').forEach(icon => {
        icon.style.width = '50px';
        icon.style.height = '50px';
        icon.style.borderRadius = '50%';
        icon.style.background = colors.primary;
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.color = 'white';
        icon.style.fontSize = '20px';
    });
}

/**
 * Simula atualização de preços
 */
function simulatePriceUpdate() {
    const marketData = AgroTechConfig.market.baseData;
    
    marketData.forEach(item => {
        // Gera variação aleatória entre -1% e +1%
        const fluctuation = (Math.random() * 2 - 1);
        item.price = item.price + (item.price * (fluctuation / 100));
        item.variation = item.variation + fluctuation;
    });
    
    renderMarketCards();
    updateDateTime();
}

/**
 * Exibe detalhes de um produto
 * @param {Object} item - Dados do produto
 */
function showProductDetails(item) {
    alert(`
📊 Detalhes do Produto: ${item.name}
━━━━━━━━━━━━━━━━━━━━━
💰 Preço Atual: R$ ${item.price.toFixed(2)} ${item.unit}
📈 Variação: ${item.variation >= 0 ? '+' : ''}${item.variation.toFixed(2)}%
🔄 Símbolo: ${item.symbol}
    `);
}

// ------------------------------------------------------------
// 6. CALCULADORA DE SOLO
// ------------------------------------------------------------