import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import './index.css';


function RPS(props) {
    return (
        <button 
            className="rps" 
            onClick={(i) => props.onClick(i)}  
        >
        {props.value}
        </button>
    );

}



class Game extends React.Component {
    constructor(props){
        super(props);
        this.history = []
        this.state = {
            gameButtons: ['Rock', 'Paper', 'Scissors'],
            computer: null,
            start: true,
            player: null,
            status: 'Pick Rock, Paper, or Scissors',
        }
    }


    handleClick(x){
        if (this.state.start) {
            let computerPlay = this.state.gameButtons[Math.floor(Math.random() * 3)]
            let winState = this.winner(computerPlay, x)
            this.history.push({
                playerMove: this.state.gameButtons[x],
                computerMove: computerPlay,
                winner: winState,
            });
            this.setState({
                gameButtons: ['Play Again', '', ''],
                computer: computerPlay ,
                start: false,
                player: this.state.gameButtons[x],
                status: winState,
            });
        } else {
            this.playAgain(x)
        }
          
    }

    playAgain(x){
        if (x === 0){
            this.setState({
                gameButtons: ['Rock', 'Paper', 'Scissors'],
                computer: null,
                start: true,
                player: null,
                status: 'Pick Rock, Paper, or Scissors',
            })
        }  
    }

    renderButton(x){
        return (
            <RPS
              value= {this.state.gameButtons[x]}
              onClick={() => this.handleClick(x)}
            />  
        );
    }

    winner(computer, x){
        let winState;
        if (this.state.gameButtons[x] === 'Rock') {

            if (computer === 'Paper') {
                winState = 'Computer Wins'
            } else if (computer === 'Scissors'){
                winState = 'Player Wins'
            } else {
                winState = 'Tie'
            }

        } else if (this.state.gameButtons[x]  === 'Paper') {

            if (computer === 'Scissors') {
                winState = 'Computer Wins'
            } else if (computer === 'Rock'){
                winState = 'Player Wins'
            } else {
                winState = 'Tie'
            }

        } else if (this.state.gameButtons[x]  === 'Scissors') {

            if (computer === 'Rock') {
                winState = 'Computer Wins'
            } else if (computer === 'Paper'){
                winState = 'Player Wins'
            } else {
                winState = 'Tie'
            }

        }

        return winState
    }

    


    render(){
        let computerPlay = this.state.start ? '' : 'Computer Played: ' + this.state.computer 
        let playerPlay = this.state.start ? '' : 'Player Played: ' + this.state.player
        return (
            
            <div className="page">
            
            <body>
                <div className="status">
                    {this.state.status}
                </div>
                <div>
                    {this.renderButton(0)}
                    {this.renderButton(1)}
                    {this.renderButton(2)}
                </div>
                <div className="computer">{computerPlay}</div>
                <div className="player">{playerPlay}</div>
                
            </body>
            </div>
        );
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root')
    
);

