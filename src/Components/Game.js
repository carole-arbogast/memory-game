import React, { Component } from 'react';
import Card from "./Card"; 

export class Game extends Component {
	render(){
		const {deck, visibleCards, onClickCard} = this.props;
		return(
			<div className="cards">

				{
					deck.map((card, index) => {
						const {suit, number} = card;
						const visibility = visibleCards.includes(index) ? "" : "hidden"; 
						return(
							<Card 
								suit={suit} 
								number={number} 
								visibility={visibility}
								key={index}
								onClickCard={onClickCard}
								index={index}
							/> 
						)
					})
				}
			</div>			
		)
	}
}

export default Game; 