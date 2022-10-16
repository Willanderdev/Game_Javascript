function nivel() {
    let select = document.getElementById('nivel').value;
    window.location.href = 'jogo.html?' + select;

}
let timerId = null; // variavel que armazena a chamada da função timeout

function iniciajogo() {
    let url = window.location.search;
    let link = url.replace('?', '');
    //1 facil = 120 segundos
    //2 normal = 60 segundos
    //3 dificil = 30 segundos
    let ts = 0;

    if (link == 1) {
        ts = 120;
    }
    if (link == 2) {
        ts = 60;
    }
    if (link == 3) {
        ts = 30;
    }

    document.getElementById('cronometro').innerHTML = ts;
    

    let q_baloes = 20;

    cria_baloes(q_baloes);

    document.getElementById('baloes_inteiros').innerHTML = q_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(ts);
}

function contagem_tempo(segundos) {
    segundos = segundos - 1;
    if (segundos == -1) {
        clearTimeout(timerId);
        game_over();
        return false
    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over() {
    alert('voce perdeu...')
}

function cria_baloes(q_baloes) {
    for (let i = 1; i <= q_baloes; i++) {

        let balao = document.createElement("img");
        balao.src = 'imagens/morceguinho.png';
        balao.style.margin = '12px';
        balao.id = 'b' + i;
        balao.onclick = function () { estoura(this); };
        
        document.getElementById('cenario').appendChild(balao);

    }
}

function estoura(b) {
    let id_balao = b.id;
    document.getElementById(id_balao).src = 'imagens/morceguinho2.png';
    
    pontuacao(-1);
    
}

function pontuacao(acao) {
    let baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    let baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
    
    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
    if (baloes_inteiros == 0) {
        alert('você ganhou, parabens!')

        parar_jogo();
    }
}

function parar_jogo() {
    clearTimeout(timerId);
}
