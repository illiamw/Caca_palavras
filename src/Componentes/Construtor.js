import React from 'react';
import Data from '../conteudo/palavras08102019';
export default class Construtor extends React.Component {
    constructor(props) {
        super(props);
        this.colunas = props.colunas;
        this.linhas = props.linhas;
        this.tentativas = this.vetorPosibilidades();
        this.gabarito = Array(this.colunas * this.linhas).fill(0)
        console.log(this.tentativas.sort());
        console.log(this.gabarito);
    }
    criandoLevel(col, lin) {
        this.state.colunas = col;
        this.state.linhas = lin;
    }

    testOcupa(rot,possibilidade,palavra){
        switch (rot) {
            case 0:
                //horizontal
                if(possibilidade+palavra.length > this.colunas*this.linhas) return false;
                let finalposicao = palavra.length + possibilidade;
                let inicialposicao = possibilidade;
                console.log(finalposicao+"  "+inicialposicao);
                for (let index = inicialposicao; index < finalposicao; index++) {if(this.gabarito[index] != 0) return true;  console.log(this.gabarito[index]); }                 
                console.log("--------------------------é pra colocar");
                
                for (let index = inicialposicao; index < finalposicao; index++) {
                    this.gabarito[index] = palavra[index-possibilidade];
                    console.log(palavra[index-possibilidade]);
                }
                this.tentativas.pop();
                console.log("------------------------ Colocou -------------------------");
                return false;
                

                break;
            case 1:
                //vertical
                break;
            case 2:
                //diagonal
                break;
            default:
                console.log("Erro de rotação");               

        }
        //Manter o loop
        return true;
    }

    setPosicao(palavra, rot, possibilidade) {
        switch (rot) {
            case 0:
                //horizontal
                let espaco = this.colunas - possibilidade % this.linhas;
                console.log(rot + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa col " + this.colunas + "  possibilidade " + possibilidade + "  lin " + this.linhas + "  esp " + espaco);

                if (palavra.length <= espaco) {
                    console.log("cabe "+ palavra.length);
                    
                    return this.testOcupa(rot,possibilidade,palavra);
                    
                }
                break;
            case 1:
                //vertical
                break;
            case 2:
                //diagonal
                break;
            default:
                console.log("Erro de rotação");

                
        }
        //Manter o loop
        return true;

    }
    geradorGabarito() {
        var palavra;
        var possibilidade = 0;
        var rot = -1;
        var percorrer = 0;

        for (let index = 0; index <= 6; index++) {
            do {
                palavra = this.selecionarPalavras();
                if (rot >= 2) rot = 0;
                else rot++;
                possibilidade = this.tentativas[this.tentativas.length-percorrer];
                percorrer++;
                console.log("loop " +rot);
            } while (this.setPosicao(palavra, rot, possibilidade)==true && percorrer <this.tentativas.length);
            console.log("index -------------------------------- " +index);
            percorrer = 0;
        }
        console.log(this.gabarito );
        return this.gabarito;
    }

    vetorPosibilidades() {
        var tam = this.colunas * this.linhas;
        console.log(this.linhas);
        var posicoes = Array(tam);
        for (let i = 0; i < tam; i++) posicoes[i] = i;
        let aux = 0, ind1, ind2;
        for (let i = 0; i < tam; i++) {
            ind1 = Math.floor(Math.random() * tam);
            ind2 = Math.floor(Math.random() * tam);
            aux = posicoes[ind1];
            posicoes[ind1] = posicoes[ind2];
            posicoes[ind2] = aux;
        }
        console.log(posicoes);
        return posicoes;
    }


    selecionarPalavras() {
        console.log(this.props.colunas);
        var palavra;
        var MAX = this.props.colunas;
        var len = this.props.colunas + 1;
        var index = 0;
        while (len > MAX) {
            palavra = Data[Math.floor(Math.random() * Data.length)]["Resposta"];
            len = palavra[index].length;
            index++;
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

        for (let index = 0; index < conteudo.length; index++) {
            if(this.gabarito[index] != 0) conteudo[index] = this.gabarito[index];            
        }
        return conteudo;
    }

}
