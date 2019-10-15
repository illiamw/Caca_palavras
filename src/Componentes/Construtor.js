import React from 'react';
import Data from '../conteudo/palavras08102019';
export default class Construtor extends React.Component {
    constructor(props) {
        super(props);
        this.tentativas = this.vetorPosibilidades(props.colunas * props.linhas)
    }
    criandoLevel(col, lin) {
        this.state.colunas = col;
        this.state.linhas = lin;
    }

    testePosicao(col, lin, palavra, index) {
        for (let index = 0; index < this.tentativas.length; index++) {
                        
        }
    }

    geradorGabarito(col, lin) {
        var gabarito = Array(col * lin).fill(0);
        var palavra;

        for (let index = 0; index < 6; index++) {
            do {
                palavra = this.selecionarPalavras();
            } while (this.testePosicao(col, lin, palavra, index));
        }
    }

    vetorPosibilidades(value) {
        var posicoes = Array(value);
        for (let i = 0; i < value; i++) posicoes[i] = i;
        let aux = 0, ind1, ind2;
        for (let i = 0; i < value; i++) {
            ind1 = Math.floor(Math.random() * value);
            ind2 = Math.floor(Math.random() * value);
            aux = posicoes[ind1];
            posicoes[ind1] = posicoes[ind2];
            posicoes[ind2] = aux;
        }
        console.log(posicoes);
        return posicoes
    }


    selecionarPalavras() {
        var palavra;
        len = this.props.colunas + 1;
        while (len > this.state.colunas) {
            palavra = Data[Math.floor(Math.random() * Data.length)]["Resposta"];
            len = palavra[index].length;
        }

        console.log(palavra);
        return palavra;
    }

    /**
     * @description geração Aleatória de letras 
     * @returns {Char} "c"
     */
    geradorChar(value) {
        console.log("olha só");
        var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var conteudo = Array(value)
        for (let index = 0; index < value; index++) {
            conteudo[index] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
        }
        return conteudo;
    }

}
