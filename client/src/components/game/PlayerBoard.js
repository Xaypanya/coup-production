import React from 'react'
import './PlayerBoardStyles.css'

export default function PlayerBoard(props) {
    let boardItems = null
    if(props.players.length > 1) {
        boardItems = props.players.map((player, index) =>
            <div className="PlayerBoardItem" style={{ backgroundColor: `${player.color}` }} key={index}>
                <h2>{player.name}</h2>
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center',width: '100%'}}>
                <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876460429910087/coin.png" alt="coin" style={{margin: 0, height: 20, width: 20}}/>
                <p style={{marginLeft: 5}}>{player.money} <span>/10</span></p>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center',width: '100%'}}>
                <img src="https://cdn.discordapp.com/attachments/821027469028491269/893917255300177920/card_icon.png" alt="cards" style={{margin: 0, height: 20, width: 20}}/>
                <p style={{marginLeft: 5}}>{player.influences.length}</p>
                </div>
                
                {/* <p>{player.influences.join(', ')}</p> */}
            </div>
        );
    }
    return (
        <div className="PlayerBoardContainer" style={{textAlign: "center"}}>
            {boardItems}
        </div>
    )
  }



