import React, { Component } from 'react';

export class Menu extends Component {
	render(){
		const {gameWon, onClickPlayAgain} = this.props;
		const menuStyle = gameWon ? {display: "block"} : {display: "none"};
		return(
			<div className={"menu"} style={menuStyle}>
				<h2 className={"white"} >Congrats !</h2>

				<div className="menuItem" onClick={() => onClickPlayAgain()}> Play Again </div>
			</div>			
		)
	}
}

export default Menu; 