import React from 'react';

export default class Gerenciador extends React.Component{
    gabarito(i, j){
        var gabarito = [i][j];
        console.log(i + " " + j);
    }
}