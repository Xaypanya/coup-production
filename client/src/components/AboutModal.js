import React, { Component } from 'react';
import ReactModal from 'react-modal';

export default class AboutModal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            showRulesModal: false,
            // showRulesModal: true,
        }
    }

    handleOpenRulesModal = () => {
        this.setState({ showRulesModal: true });
    }

    handleCloseRulesModal = () => {
        this.setState({ showRulesModal: false });
    }
    
    render() {
        let modal = <ReactModal 
        isOpen={this.state.showRulesModal}
        contentLabel="Minimal Modal Example"
        onRequestClose={this.handleCloseRulesModal}
        shouldCloseOnOverlayClick={true}
        style={{  overlay: {
     background: "#000000ac"
   }}}
    >
    <div className="CloseModalButtonContainer">
        <button className="CloseModalButton" onClick={this.handleCloseRulesModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                <g id="more_info" data-name="more info" transform="translate(-39 -377)">
                    <g id="Ellipse_1" data-name="Ellipse 1" class="cls-5" transform="translate(39 377)">
                    <circle class="cls-7" cx="10.5" cy="10.5" r="10.5"/>
                    <circle class="cls-8" cx="10.5" cy="10.5" r="10"/>
                    </g>
                    <text id="x" class="cls-6" transform="translate(46 391)"><tspan x="0" y="0">x</tspan></text>
                </g>
            </svg>
        </button>
    </div>
   
    <div className="RulesContainer">
        <div className="RulesContent">
            <h2>ກ່ຽວກັບ</h2>
            <p>
                <b>coup online</b> ພັດທະນາໂດຍທີມ <a href="https://www.facebook.com/K4IDAODEV" target="_blank" style={{textDecoration: 'underline', display: 'inline-block',borderRadius: 5,padding: '0px 5px' , lineHeight: '20%',color: '#000000ae'}}><p><b>Kaidao.Dev</b></p></a> ໂດຍໄດ້ Source Code ຈາກ <a href="https://github.com/cheneth" target="_blank" style={{textDecoration: 'underline', display: 'inline-block',borderRadius: 5,padding: '0px 5px' , lineHeight: '20%',color: '#000000ae'}}><p><b>Ethan Chen</b></p></a> ແລ້ວນຳມາພັດທະນາຕໍ່ໂດຍແປເປັນພາສາລາວ ແລະ ແກ້ UI ໃໝ່, ພ້ອມທັງມີິການເພີ່ມ Graphic ທີ່ສວຍງາມ ແລະ ເຂົ້າໃຈງ່າຍ.
            </p>
            
            <h2>ທີມງານ Kaidao.Dev</h2>
            {/* //TODO Gan */}
            <h3 style={{textDecoration: 'none'}}># Coder</h3>
                <div className="cardInfoBox"  style={{marginBottom: 10}}>
                <img src="https://cdn.discordapp.com/attachments/826834529435648000/894591318913851422/gan_card.jpg" alt="captain" width="90"/>
                <div className="detailsBox">
                <h5>ຊື່: ໄຊປັນຍາ ພົງສາ</h5>
                <h5>ບົດບາດ: ຂຽນ Code, Testing</h5>
                <div className="actionBox">
                    <img src="https://img-premium.flaticon.com/png/512/2115/premium/2115955.png?token=exp=1633354446~hmac=32c0a9c0f4e4ee53a15638518a5d684b" alt="steal" width="30"/>
                    <img src="https://cdn-icons-png.flaticon.com/512/2721/2721278.png" alt="block_steal" width="30"/>
                </div>
                </div>
                </div>
            {/* //TODO Pap */}
            <h3 style={{textDecoration: 'none'}}># Graphic Designer</h3>
                <div className="cardInfoBox"  style={{marginBottom: 10}}>
                <img src="https://cdn.discordapp.com/attachments/826834529435648000/894591320344104960/pap_card.jpg" alt="captain" width="90"/>
                <div className="detailsBox">
                <h5>ຊື່: ທະນູທອງ ນັນທາວົງ</h5>
                <h5>ບົດບາດ: ອອກແບບ, ເຮັດ Graphic</h5>
                <div className="actionBox">
                    <img src="https://img-premium.flaticon.com/png/512/1882/premium/1882734.png?token=exp=1633354519~hmac=9e4b5f6e756d68b89ab1eb57b0c08090" alt="steal" width="30"/>
                    <img src="https://cdn-icons-png.flaticon.com/512/922/922699.png" alt="block_steal" width="30"/>
                </div>
                </div>
                </div>
            {/* //TODO Zang */}
            <h3 style={{textDecoration: 'none'}}># Author / Translator</h3>
                <div className="cardInfoBox"  style={{marginBottom: 10}}>
                <img src="https://cdn.discordapp.com/attachments/826834529435648000/894591316502130799/zang_card.jpg" alt="captain" width="90"/>
                <div className="detailsBox">
                <h5>ຊື່: ອາຫຼຽງ ແກ້ວລະນີ</h5>
                <h5>ບົດບາດ: ແປ, ຮຽບຮຽງ</h5>
                <div className="actionBox">
                    <img src="https://img-premium.flaticon.com/png/512/576/premium/576515.png?token=exp=1633354578~hmac=9705d69abc7661e8722d59d9cfdb22f6" alt="steal" width="30"/>
                    <img src="https://cdn-icons-png.flaticon.com/512/1162/1162280.png" alt="block_steal" width="30"/>
                </div>
                </div>
                </div>
        </div>
    </div>
    </ReactModal>
        if(this.props.home) {
            return(
                <>
                    <div className="HomeRules" onClick={this.handleOpenRulesModal}>
                        <p>ກ່ຽວກັບ</p>  
                        <i class="fas fa-info-circle"></i>
                    </div>
                    {modal}
                </>
            )
        }
        
    }
}
