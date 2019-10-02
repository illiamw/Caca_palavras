import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component{
    renderCells(i,j){
        // {""+i+j} conversão compactada para string
        return <Cell value={""+i+j} key={parseInt(""+i+j)} />;
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

    renderBoard(col, lin){
        var rowsBoard = [];
        for(let index = 0; index < lin; index++){
            rowsBoard.push(this.renderCol(col,index));
        }
        console.log(rowsBoard);
        return React.createElement('div', {className: "main-board"},rowsBoard);
        
    }

    render(){
        return(
            <div>
                <div className="titulo">Esse é o tabuleiro</div>                
                {this.renderBoard(10,10)}
            </div>
        );
    }
}