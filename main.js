function criarInimigo(id) {
    const container = document.createElement('div');
    container.className = 'enemy';

    const nome = document.createElement('input');
    nome.type = 'text';
    nome.placeholder = 'Nome do inimigo';
    nome.className = 'enemy-name';

    // Campo para vida máxima
    const vidaMaxInput = document.createElement('input');
    vidaMaxInput.type = 'number';
    vidaMaxInput.value = '';
    vidaMaxInput.min = 1;
    vidaMaxInput.className = 'vida-max-input';
    vidaMaxInput.placeholder = 'Vida Máxima';
    vidaMaxInput.style.marginBottom = '8px';

    const vidaInput = document.createElement('input');
    vidaInput.type = 'number';
    vidaInput.value = '';
    vidaInput.min = 0;
    vidaInput.className = 'vida-input';
    vidaInput.placeholder = 'Vida Atual'; // personalizado

    const barra = document.createElement('div');
    barra.className = 'life-bar';
    const barraInterna = document.createElement('div');
    barraInterna.className = 'life-bar-inner';
    barra.appendChild(barraInterna);

    // Barra de dano total
    const danoTotalBar = document.createElement('div');
    danoTotalBar.className = 'dano-total-bar';
    danoTotalBar.style.margin = '8px 0';
    let danoTotal = 0;
    danoTotalBar.textContent = 'Dano total recebido: 0';

    // Flag para saber se já houve dano/cura
    let vidaModificada = false;

    function atualizarBarra() {
        const vida = parseInt(vidaInput.value);
        const vidaMax = parseInt(vidaMaxInput.value);
        if (isNaN(vida) || isNaN(vidaMax) || vidaMax === 0) {
            barraInterna.style.width = '0%';
            barraInterna.textContent = '';
            barraInterna.style.background = '#222';
            return;
        }
        const percent = Math.max(0, Math.min(vida, vidaMax)) / vidaMax * 100;
        barraInterna.style.width = percent + '%';
        barraInterna.textContent = vida > 0 ? percent.toFixed(1) + '% (' + vida + ' HP)' : 'Morto';
        barraInterna.style.background = percent > 30 ? '#4caf50' : (percent > 0 ? '#ff9800' : '#b71c1c');
    }
    vidaInput.addEventListener('input', () => {
        vidaModificada = true;
        atualizarBarra();
    });
    vidaMaxInput.addEventListener('input', () => {
        const vidaMax = parseInt(vidaMaxInput.value);
        if (!vidaModificada && !isNaN(vidaMax)) {
            vidaInput.value = vidaMax;
        } else {
            if (parseInt(vidaInput.value) > vidaMax) {
                vidaInput.value = vidaMax;
            }
        }
        atualizarBarra();
    });

    // Input para dano
    const danoInput = document.createElement('input');
    danoInput.type = 'number';
    danoInput.placeholder = 'Dano';
    danoInput.className = 'dano-input';
    danoInput.style.width = '60px';
    danoInput.style.marginRight = '4px';

    const danoBtn = document.createElement('button');
    danoBtn.textContent = '- Dano';
    danoBtn.onclick = () => {
        const dano = parseInt(danoInput.value) || 0;
        vidaInput.value = Math.max(0, parseInt(vidaInput.value) - dano);
        danoTotal += dano;
        danoTotalBar.textContent = 'Dano total recebido: ' + danoTotal;
        vidaModificada = true;
        atualizarBarra();
    };

    // Input para cura
    const curaInput = document.createElement('input');
    curaInput.type = 'number';
    curaInput.placeholder = 'Cura';
    curaInput.className = 'cura-input';
    curaInput.style.width = '60px';
    curaInput.style.marginRight = '4px';

    const curaBtn = document.createElement('button');
    curaBtn.textContent = '+ Cura';
    curaBtn.onclick = () => {
        const cura = parseInt(curaInput.value) || 0;
        const vidaMax = parseInt(vidaMaxInput.value);
        vidaInput.value = Math.min(vidaMax, parseInt(vidaInput.value) + cura);
        vidaModificada = true;
        atualizarBarra();
    };

    // Botão de remover inimigo
    const removerBtn = document.createElement('button');
    removerBtn.textContent = 'Remover Inimigo';
    removerBtn.style.background = 'linear-gradient(90deg, #b71c1c 0%, #ff9800 100%)';
    removerBtn.style.marginTop = '10px';
    removerBtn.onclick = () => {
        container.remove();
    };

    container.appendChild(nome);
    container.appendChild(vidaMaxInput);
    container.appendChild(vidaInput);
    container.appendChild(barra);
    container.appendChild(danoTotalBar);
    container.appendChild(danoInput);
    container.appendChild(danoBtn);
    container.appendChild(curaInput);
    container.appendChild(curaBtn);
    container.appendChild(removerBtn);

    document.getElementById('enemies-container').appendChild(container);
    atualizarBarra();
}

document.getElementById('add-enemy').onclick = function() {
    criarInimigo(Date.now());
};

// Adiciona um inimigo inicial
criarInimigo(1);