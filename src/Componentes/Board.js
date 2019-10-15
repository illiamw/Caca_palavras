import React from 'react';
import Cell from './Cell';
import Construtor from'./Construtor';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.teste = Array(100);
        var Gerenciador = new Construtor(props);
        this.state = {
            gerenciador: Gerenciador,
            conteudo: Gerenciador.geradorChar(props.colunas*props.linhas),
            gabarito: Gerenciador.geradorGabarito(props.colunas,props.linhas), 
            
        };
        console.log(this.state.conteudo);
        console.log(this.state.gabarito);
    }

    eventoUpdate(c) {
        this.state.gabarito[c] = this.state.gabarito[c] === 0 ? this.state.conteudo[c] : 0;
        console.log(this.state.gabarito[c]);
        console.log(this.state.gabarito);
        console.log(this.state.tentativas);
    }

    /**
     * @description Função que gera os buttons de forma individual
     * @param {int} j Quantidades de linhas do tabuleiro
     * @param {int} i Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button></div>
     */
    renderCells(i, j) {
        // {""+i+j} conversão compactada para string
        return <Cell
            value={this.state.conteudo[parseInt("" + j + i)]}
            key={parseInt("" + j + i)}
            onClick={() => { this.eventoUpdate(parseInt("" + j + i)) }}
        />;
    }

    /**
     * @description Função que gera os buttons compositores das colunas da matriz
     * @param {int} lin Quantidades de linhas do tabuleiro
     * @param {int} col Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div>
     */
    renderCol(col, lin) {
        var colBoard = [];

        for (let index = 0; index < col; index++) {
            colBoard.push(this.renderCells(index, lin));
        }
        return React.createElement('div', { className: "col-board", key: lin }, colBoard);
    }
    /**
     * @description Função que gera os a Matriz de buttons
     * @param {int} lin Quantidades de linhas do tabuleiro
     * @param {int} col Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div>
     */
    renderBoard(col, lin) {
        var rowsBoard = [];
        for (let index = 0; index < lin; index++) {
            rowsBoard.push(this.renderCol(col, index));
        }
        return React.createElement('div', { className: "main-board" }, rowsBoard);
    }
    /**
     * 
     * @description Função que instância o tabuleiro como this.renderBoard(i,j) i - coluna e j- linhas
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div>
     */
    render() {
        return (
            <div>
                <div className="titulo">Esse é o tabuleiro</div>
                {this.renderBoard(this.state.colunas, this.state.linhas)}
            </div>
        );
    }
}