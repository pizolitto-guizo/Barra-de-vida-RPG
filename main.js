function criarInimigo(id) {
    const container = document.createElement('div');
    container.className = 'enemy';

    const nome = document.createElement('input');
    nome.type = 'text';
    nome.placeholder = 'Nome do inimigo';
    nome.className = 'enemy-name';

    const vidaInput = document.createElement('input');
    vidaInput.type = 'number';
    vidaInput.value = 100;
    vidaInput.min = 1;
    vidaInput.className = 'vida-input';

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

    function atualizarBarra() {
        const vida = parseInt(vidaInput.value);
        barraInterna.style.width = Math.max(vida, 0) + '%';
        barraInterna.textContent = vida > 0 ? vida + ' HP' : 'Morto';
        barraInterna.style.background = vida > 0 ? '#4caf50' : '#b71c1c';
    }
    vidaInput.addEventListener('input', atualizarBarra);

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
        vidaInput.value = Math.min(100, parseInt(vidaInput.value) + cura);
        atualizarBarra();
    };

    container.appendChild(nome);
    container.appendChild(vidaInput);
    container.appendChild(barra);
    container.appendChild(danoTotalBar);
    container.appendChild(danoInput);
    container.appendChild(danoBtn);
    container.appendChild(curaInput);
    container.appendChild(curaBtn);

    document.getElementById('enemies-container').appendChild(container);
    atualizarBarra();
}

document.getElementById('add-enemy').onclick = function() {
    criarInimigo(Date.now());
};

// Adiciona um inimigo inicial
criarInimigo(1);