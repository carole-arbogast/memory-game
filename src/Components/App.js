import React, { Component } from 'react';
import Menu from "./Menu";
import Game from "./Game";
const shuffle = require('fisher-yates-shuffle'); //pourquoi require au lieu de import?

const cardNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]; 
const cardSuits = ["clubs", "diamonds", "hearts", "spades"];
const deckSize = 8; 

const getRandomItem = (array) => array[Math.floor(Math.random()*array.length)];
const getRandomCard = (id) => {
	return {
		number: getRandomItem(cardNumbers),
		suit: getRandomItem(cardSuits),
		pairId: id
	}
}; 

export class App extends Component {

	constructor(props){
		super(props); 
		this.state = this.setNewGame(); 
	}

	setNewGame=() => {
		const deck = shuffle(Array(deckSize)
			.fill()
			.reduce((acc, next, i) => {
				next = i%2===0 ? getRandomCard(i) : acc[i-1]; 
				acc.push(next); 
				return acc;
			},[]))
		const game = {
			deck: deck, 
			currentClicks: 0, 
			visibleCards: [], 
			gameWon: false
		}
		return game; 
	}

	handleWin = () => {
		this.setState({
			gameWon: true
		})
	}

	handlePlayAgain = () => {
		this.setState(this.setNewGame()); 
	}
	
	handleClickCard = (index) => {
		const {currentClicks} = this.state; 

		if(currentClicks < 2){
			this.setState(prevState => {
				const {currentClicks, visibleCards} = prevState; 
				return {
					currentClicks: currentClicks +1,
					visibleCards: [index, ...visibleCards]
				}
			}, () => {
				const {currentClicks, visibleCards, deck} = this.state;
				if(currentClicks === 2) {
					const check = visibleCards.map((card) => {
						return deck[card]; 
					})
					if(check[0] !== check[1]){
						setTimeout(() => {
							const checkedCards = visibleCards.slice(2); 
							this.setState({
								visibleCards: checkedCards
							}); 
						}, 500)
					}
					if(visibleCards.length === deckSize){
						this.handleWin(); 
					}
					this.setState({
						currentClicks: 0
					})
				}
			})
		}
	}; 

	render(){
		const {deck, visibleCards, gameWon} = this.state; 

		return(
			<div className={"game"}>

				<Menu gameWon={gameWon} onClickPlayAgain={this.handlePlayAgain}/>

				<Game deck={deck} visibleCards={visibleCards} onClickCard={this.handleClickCard}/>

			</div>		
		)
	}
}

export default App; 