import React, { Component } from 'react'

export default class ExchangeInfluences extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
             influences: props.influences,
             keep: [],
             totalInf: props.influences.length
        }
    }
    

    selectInfluence = (index) => {
        // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
        this.state.keep.push(this.state.influences.splice(index,1)[0])
        this.setState({ influences: this.state.influences, putBack: this.state.putBack })
        if(this.state.keep.length === (this.state.totalInf-2)) {
            const res = {
                playerName: this.props.name,
                kept: this.state.keep,
                putBack: this.state.influences
            }
            this.props.socket.emit('g-chooseExchangeDecision', res);
            this.props.doneExchangeInfluence();
        }
    }

    render() {

    

        const CardImages = {
            duke: "https://cdn.discordapp.com/attachments/821027469028491269/893882361509449768/duke.jpg",
            assassin: "https://cdn.discordapp.com/attachments/821027469028491269/893882367289200701/assassin.jpg",
            captain: "https://cdn.discordapp.com/attachments/821027469028491269/893882370518818916/captain.jpg",
            ambassador: "https://cdn.discordapp.com/attachments/821027469028491269/893882364437069844/ambassador.jpg",
            contessa: "https://cdn.discordapp.com/attachments/821027469028491269/893882374188855326/contessa.jpg",
        };

        const card_color = {
            duke: "#D55DC7",
            assassin: "#2B2B2B",
            captain: "#1f83ad",
            ambassador: "#119500",
            contessa: "#E35646",
        }

        const newCardTranslated = {
            duke: "ຂຸນນາງ",
            assassin: "ມືສັງຫານ",
            ambassador: "ນັກການທູດ",
            captain: "ກັບຕັນ",
            contessa: "ຄອນເທສຊາ",
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

        function CardColorTranslate(influence){
            if(influence === "assassin"){
                return card_color.assassin;
            }
            if(influence === "captain"){
                return card_color.captain;
            }
            if(influence === "duke"){
                return card_color.duke;
            }
            if(influence === "ambassador"){
                return card_color.ambassador;
            }
            if(influence === "contessa"){
                return card_color.contessa;
            }
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
     


        const influences = this.state.influences.map((x, index) => {
            return <button className="card_button" key={index} onClick={() => this.selectInfluence(index)} style={{backgroundColor: `${CardColorTranslate(x)}`}}>
                 <div className="card_button_img_container">
                    <img src={CardImageTranslate(x)} alt={x} style={{borderRadius: 0}}/>
                    <p>{translatedCard(x)}</p>
                </div>
            </button>
        })
        return ( 
            <div>
                <p className="DecisionTitle">ເລືອກໄພ້ທີ່ເຈົ້າຕ້ອງການ</p>
                {influences}
            </div>
        )
    }
}
