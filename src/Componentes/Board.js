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
            gabarito: Gerenciador.geradorGabarito(props.colunas,props.linhas),
            conteudo: Gerenciador.geradorChar(props.colunas*props.linhas)          
            
        };
        console.log(this.state.conteudo);
        console.log(this.state.gabarito);
    }

    eventoUpdate(c) {
        this.state.gabarito[c] = this.state.gabarito[c] === 0 ? this.state.conteudo[c] : 0;
    }

    /**
     * @description Função que gera os buttons de forma individual
     * @param {int} lin Quantidades de linhas do tabuleiro
     * @param {int} col Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button></div>
     */
    renderCells(col, lin) {
        return <Cell
            value={this.state.conteudo[lin*this.props.colunas + col]}
            key={col*this.props.colunas + lin}
            onClick={() => { this.eventoUpdate(col*this.props.colunas + lin) }}
        />;
    }

    /**
     * @description Função que gera os buttons compositores das colunas da matriz
     * @param {int} lin Quantidades de linhas do tabuleiro
     * @param {int} col Quantidades de colunas do tabuleiro
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div>
     */
    renderCol(linhas) {
        var colBoard = [];

        for (let index = 0; index < this.props.colunas; index++) {
            colBoard.push(this.renderCells(index, linhas));
            console.log("Colunas: "+ index);
        }
        return React.createElement('div', { className: "col-board", key: linhas }, colBoard);
    }
    /**
     * @description Função que gera os a Matriz de buttons
     * @returns {ElementDOM} <div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div><div><button>1</button><button>...</button><button>lin</button></div>
     */
    renderBoard() {
        var rowsBoard = [];
        for (let index = 0; index < this.props.linhas; index++) {
            rowsBoard.push(this.renderCol(index));
            console.log("Linha: "+ index);
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
                {this.renderBoard()}
            </div>
        );
    }
}