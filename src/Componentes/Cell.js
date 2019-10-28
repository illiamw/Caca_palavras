import React from 'react';

export default class Cell extends React.Component{
    render(){
        var styleTeste ={
            width:'50px',
            height:'50px'
        };
        return(
            <button 
                style={styleTeste}
                className="cell" 
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}