import React from 'react';
import Data from '../conteudo/palavras08102019';
import { switchCase } from '@babel/types';
export default class Construtor extends React.Component {
    constructor(props) {
        super(props);
        this.colunas = props.colunas;
        this.linhas = props.linhas;
        this.tentativas = this.vetorPosibilidades();
        this.gabarito = Array(this.colunas * this.linhas).fill(0)
        console.log(this.tentativas);
        console.log(this.gabarito);
    }
    criandoLevel(col, lin) {
        this.state.colunas = col;
        this.state.linhas = lin;
    }

    testOcupa(rot, possibilidade, palavra) {
        var finalposicao;
        var inicialposicao = possibilidade;
        switch (rot) {
            case 0:
                //horizontal
                finalposicao = palavra.length + possibilidade;

                if (finalposicao > this.colunas * this.linhas) return true;


                for (let index = inicialposicao; index < finalposicao; index++) if (this.gabarito[index] != 0 && this.gabarito[index] != palavra[index - possibilidade]) return true;


                for (let index = inicialposicao, inpalavras = 0; index < finalposicao; index++ , inpalavras++) {
                    this.gabarito[index] = palavra[inpalavras];
                }
                //this.tentativas.pop();
                console.log("horizontal " + this.tentativas.length);
                return false;


                break;
            case 1:
                //vertical
                finalposicao = (palavra.length * this.colunas) + possibilidade;

                if (finalposicao > this.colunas * this.linhas) return true;
                for (let index = inicialposicao; index < finalposicao; index += this.colunas) {
                    if (this.gabarito[index] != 0 && this.gabarito[index] != palavra[index - possibilidade]) return true;
                }

                for (let index = inicialposicao, inpalavras = 0; index < finalposicao; index += this.colunas, inpalavras++) {
                    this.gabarito[index] = palavra[inpalavras];
                }
                //this.tentativas.pop();
                console.log("vertical " + this.tentativas.length);
                return false;

                break;
            case 2:
                //diagonal
                //vertical
                finalposicao = palavra.length + possibilidade;
                finalposicao = (palavra.length * this.colunas) + finalposicao;

                if (finalposicao > this.colunas * this.linhas) return true;
                for (let index = inicialposicao, inpalavras = 0; index < finalposicao; index += this.colunas + 1, inpalavras) {
                    if (this.gabarito[index] != 0 && this.gabarito[index] != palavra[inpalavras]) return true;
                }

                for (let index = inicialposicao, inpalavras = 0; index < finalposicao; index += this.colunas + 1, inpalavras++) {
                    this.gabarito[index] = palavra[inpalavras];
                }
                //this.tentativas.pop();
                console.log("diagonal " + this.tentativas.length);
                return false;
                break;
            default:
                console.log("Erro de rotação");

        }

        //Manter o loop
        return true;
    }

    setPosicao(palavra, rot, possibilidade) {
        var xespaco;
        var yespaco;
        switch (rot) {
            case 0:
                //horizontal
                xespaco = this.colunas - possibilidade % this.linhas;

                if (palavra.length <= xespaco) {

                    return this.testOcupa(rot, possibilidade, palavra);

                }
                break;
            case 1:
                //vertical
                yespaco = this.linhas - possibilidade / this.colunas;

                if (palavra.length <= yespaco) {

                    return this.testOcupa(rot, possibilidade, palavra);

                }
                break;
            case 2:
                //diagonal
                xespaco = this.colunas - possibilidade % this.linhas;
                yespaco = this.linhas - possibilidade / this.colunas;

                if (palavra.length <= xespaco && palavra.length <= yespaco) {

                    return this.testOcupa(rot, possibilidade, palavra);

                }

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
        var rot = 0;
        var percorrer = 1;
        var naoinserido = true;

        for (let index = 0; index <= 2; index++) {
            do {
                if (naoinserido) palavra = this.selecionarPalavras(rot);
                do {
                    possibilidade = this.tentativas[this.tentativas.length - percorrer];
                    console.log("Possibilidae " + possibilidade + " palavra " + palavra);
                    percorrer++;
                    naoinserido = this.setPosicao(palavra, rot, possibilidade);
                } while (naoinserido && percorrer < this.tentativas.length);
                console.log("nao inserido: " + naoinserido)
                percorrer = 1;
            } while (naoinserido);
            if (rot >= 2) rot = 0;
            else rot++;
            naoinserido = true;
            console.log("index -------------------------------- " + index + " palavra " + palavra + " rot " + rot + " possibilidade " + possibilidade + " flag " + naoinserido);

        }
        return this.gabarito;
    }

    vetorPosibilidades() {
        var tam = this.colunas * this.linhas;
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
        return posicoes;
    }


    selecionarPalavras(rot) {
        var palavra;
        var MAX;
        switch (rot) {
            case 0:
                MAX = this.props.colunas;
                break;
            case 1:
                MAX = this.props.linhas;
                break;
            case 2:
                MAX = this.props.colunas > this.props.linhas ? this.props.colunas : this.props.linhas;
                break;
            default:
                console.log("Erro rotação")

        }

        var len = MAX + 1;
        var index = 0;
        while (len > MAX) {
            palavra = Data[Math.floor(Math.random() * Data.length)]["Resposta"];
            len = palavra[index].length;
            index++;
        }

        return palavra;
    }

    /**
     * @description geração Aleatória de letras 
     * @returns {Char} "c"
     */
    geradorChar(value) {
        var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var conteudo = Array(value);
        for (let index = 0; index < value; index++) {
            // conteudo[index] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            conteudo[index] = " ";
        }

        for (let index = 0; index < conteudo.length; index++) {
            if (this.gabarito[index] != 0) conteudo[index] = this.gabarito[index];
        }
        return conteudo;
    }

}
