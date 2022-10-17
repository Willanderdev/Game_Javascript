function nivel() {
    let select = document.getElementById('nivel').value;
    window.location.href = 'jogo.html?' + select;

}
let timerId = null; // variavel que armazena a chamada da função timeout

function iniciajogo() {
    let url = window.location.search;
    let link = url.replace('?', '');
    //1 facil = 20 segundos
    //2 normal = 15 segundos
    //3 dificil = 10 segundos
    let ts = 0;

    if (link == 1) {
        ts = 20;
    }
    if (link == 2) {
        ts = 15;
    }
    if (link == 3) {
        ts = 10;
    }

    document.getElementById('cronometro').innerHTML = ts;
    

    let num_morcego = 20;

    cria_baloes(num_morcego);

    document.getElementById('morcego').innerHTML = num_morcego;
    document.getElementById('morcego2').innerHTML = 0;

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

function cria_baloes(num_morcego) {
    for (let i = 1; i <= num_morcego; i++) {
        
        let batman = document.createElement("img");
        batman.src = 'imagens/morceguinho.png';
        batman.style.margin = '12px';
        batman.id = 'b' + i;
        batman.onclick = function () {
            if (batman.id == 'clicado') {
                restoura(this);
            }     
            estoura(this);
            batman.id = 'clicado'; 
            console.log(batman.id)    
           
          


           
            
        };
        
        document.getElementById('cenario').appendChild(batman);

    }
}
function restoura(m) {
    let morcegofeliz = m.id;

    document.getElementById(morcegofeliz).src = 'imagens/morceguinho.png';

    pontuacao(+1)
}

function estoura(m) {
    let morcegofeliz = m.id;
    
    document.getElementById(morcegofeliz).src = 'imagens/morceguinho2.png';
 
    pontuacao(-1)
    
}

function pontuacao(acao) {
    let morcego_inteiros = document.getElementById('morcego').innerHTML;
    let morcego_estourados = document.getElementById('morcego2').innerHTML;

    morcego_inteiros = parseInt( morcego_inteiros);
    morcego_estourados = parseInt( morcego_estourados);

    morcego_inteiros =  morcego_inteiros + acao;
    morcego_estourados =  morcego_estourados - acao;

    document.getElementById('morcego').innerHTML =  morcego_inteiros;
    document.getElementById('morcego2').innerHTML =  morcego_estourados;
    
    situacao_jogo(morcego_inteiros);
}

function situacao_jogo(morcego_inteiros) {
    if (morcego_inteiros == 0) {
        alert('você ganhou, parabens!')

        parar_jogo();
    }
}

function parar_jogo() {
    clearTimeout(timerId);
}
