import React from 'react';
import Cell from './Cell';
import gerenciador from './distribuicaoPalavras'

export default class Board extends React.Component{
    /**
     * @description geração Aleatória de letras 
     * @returns {Char} "c"
     */
    geradorChar(){
        var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        
        console.log(Math.floor(Math.random()*alfabeto.length));
        return alfabeto[Math.floor(Math.random()*alfabeto.length)];
    }

    /**
     * @description Função que gera os buttons de forma individual
     * @param {int} lin Quantidades de linhas do tabuleiro
     * @param {int} col Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button></div>
     */
    renderCells(i,j){
        // {""+i+j} conversão compactada para string
        return <Cell value={this.geradorChar()} status={0} key={parseInt(""+i+j)} />;
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
        //var fase1 = gerenciador(col,lin);
        return React.createElement('div', {className: "main-board"},rowsBoard);
        
    }
    /**
     * @constructor Função renderizadora
     * @description Função que instância o tabuleiro como this.renderBoard(i,j) i - coluna e j- linhas
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div>
     */
    render(){
        return(
            <div>
                <div className="titulo">Esse é o tabuleiro</div>                
                {this.renderBoard(10,10)}
                
            </div>
        );
    }
}