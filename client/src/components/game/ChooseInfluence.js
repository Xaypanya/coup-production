import React, { Component } from 'react'

export default class ChooseInfluence extends Component {
    
    selectInfluence = (influence) => {
        // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
        const res = {
            influence: influence,
            playerName: this.props.name
        }
        console.log(res)
        this.props.socket.emit('g-chooseInfluenceDecision', res);
        this.props.doneChooseInfluence();
    }

    render() {

        const CardImages = {
            duke: "https://cdn.discordapp.com/attachments/821027469028491269/893882361509449768/duke.jpg",
            assassin: "https://cdn.discordapp.com/attachments/821027469028491269/893882367289200701/assassin.jpg",
            captain: "https://cdn.discordapp.com/attachments/821027469028491269/893882370518818916/captain.jpg",
            ambassador: "https://cdn.discordapp.com/attachments/821027469028491269/893882364437069844/ambassador.jpg",
            contessa: "https://cdn.discordapp.com/attachments/821027469028491269/893882374188855326/contessa.jpg",
        };

        const newCardTranslated = {
            duke: "ຂຸນນາງ",
            assassin: "ມືສັງຫານ",
            ambassador: "ນັກການທູດ",
            captain: "ກັບຕັນ",
            contessa: "ຄອນເທສຊາ",
        }

        function translatedCard(cardName){
            if(cardName === "duke"){
                return newCardTranslated.duke;
            }
            if(cardName === "assassin"){
                return newCardTranslated.assassin;
            }
            if(cardName === "ambassador"){
                return newCardTranslated.ambassador;
            }
            if(cardName === "captain"){
                return newCardTranslated.captain;
            }
            if(cardName === "contessa"){
                return newCardTranslated.contessa;
            }   
        }

        function CardImageTranslate(influence){
            if(influence === "assassin"){
                return CardImages.assassin;
            }
            if(influence === "captain"){
                return CardImages.captain;
            }
            if(influence === "duke"){
                return CardImages.duke;
            }
            if(influence === "ambassador"){
                return CardImages.ambassador;
            }
            if(influence === "contessa"){
                return CardImages.contessa;
            }
        }

        const influences = this.props.influences.map((x, index) => {
            return <button className="card_button" id={`${x}`} key={index} onClick={() => this.selectInfluence(x)}>
                 <div className="card_button_img_container">
                    <img src={CardImageTranslate(x)} alt={x} style={{borderRadius: 0}}/>
                    <p>{translatedCard(x)}</p>
                </div>
                </button>
        })
        return ( 
            <div>
                <p className="DecisionTitle">ເລືອກໄພ້ທີ່ຈະຖິ້ມ</p>
                {influences}
            </div>
        )
    }
}
