import React from 'react';
import Cell from './Cell';
import Data from '../conteudo/palavras08102019';

export default class Board extends React.Component{
    constructor(props){
        super(props);
        const colunas = 10;
        const linhas = 10;
        this.state = {
            colunas : colunas,
            linhas : linhas,
            conteudo: Array(colunas*linhas).fill("a"),
            gabarito: Array(colunas*linhas).fill(0)
        };
        this.geradorChar();
        this.geradorGabarito();
    }


    geradorGabarito(){

        var palavras = Array(6).fill(" ");
        var palavra = "";
        var len = this.state.colunas+1;
        for (let index = 0; index < palavras.length; index++) {
            len = this.state.colunas+1;
            while(len > this.state.colunas){
                palavras[index] = Data[Math.floor(Math.random()*Data.length)]["Resposta"];
               len = palavras[index].length;
            }            
        }
        palavras.forEach(element => {
            console.log(element.length);
        });     
        console.log(palavras);  
    }

    /**
     * @description geração Aleatória de letras 
     * @returns {Char} "c"
     */
    geradorChar(){
        var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        
        for (let index = 0; index < this.state.conteudo.length; index++) {
            this.state.conteudo[index] = alfabeto[Math.floor(Math.random()*alfabeto.length)];           
        }
    }

    eventoUpdate(c){
        this.state.gabarito[c] = this.state.gabarito[c] === 0 ? this.state.conteudo[c] : 0;
    }

    /**
     * @description Função que gera os buttons de forma individual
     * @param {int} j Quantidades de linhas do tabuleiro
     * @param {int} i Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button></div>
     */
    renderCells(i,j){
        // {""+i+j} conversão compactada para string
        return <Cell 
                    value={this.state.conteudo[parseInt(""+j+i)]}
                    key={parseInt(""+j+i)} 
                    onClick = {() => {this.eventoUpdate(parseInt(""+j+i))}}
                />;
    }

    /**
     * @description Função que gera os buttons compositores das colunas da matriz
     * @param {int} lin Quantidades de linhas do tabuleiro
     * @param {int} col Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div>
     */
    renderCol(col, lin){
        var colBoard = [];      
        
        for(let index = 0; index < col; index++){
            colBoard.push(this.renderCells(index, lin));
        }
        return React.createElement('div', {className: "col-board", key: lin},colBoard);
    }
    /**
     * @description Função que gera os a Matriz de buttons
     * @param {int} lin Quantidades de linhas do tabuleiro
     * @param {int} col Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div>
     */
    renderBoard(col, lin){
        var rowsBoard = [];
        for(let index = 0; index < lin; index++){
            rowsBoard.push(this.renderCol(col,index));
        }
        console.log(rowsBoard);
        return React.createElement('div', {className: "main-board"},rowsBoard);
        
    }
    /**
     * 
     * @description Função que instância o tabuleiro como this.renderBoard(i,j) i - coluna e j- linhas
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div>
     */
    render(){
        return(
            <div>
                <div className="titulo">Esse é o tabuleiro</div>                
                {this.renderBoard(this.state.colunas,this.state.linhas)}                
            </div>
        );
    }
}