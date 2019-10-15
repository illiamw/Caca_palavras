import React from 'react';
import Board from './Board';

/**
 * @param {Null} Null  Null
 * @description Classe geradora da função app
 * @constructor
 */

export default class App extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello</h1>
        <Board colunas={10} linhas={10}/>
      </div>
    );
  }
}
