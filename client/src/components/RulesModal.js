import React, { Component } from 'react';
import ReactModal from 'react-modal';

export default class RulesModal extends Component {

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
            <h2>ກົດກະຕິກາ</h2>
            <p>ສາມາດຫຼິ້ນໄດ້ຕັ້ງແຕ່ 2-6 ຄົນ</p>
            <p>ເຈົ້າຈະໄດ້ຮັບໄພ້ 2 ໃບ ແລະ ຫຼຽນ 2 ຫຼຽນໃນເວລາເລີ່ມເກມ. ໄພ້ຈະມີ "ຄວາມສາມາດ" ສະເພາະຂອງແຕ່ລະໃບ. ເຈົ້າສາມາດຕົວະຄົນອື່ນ ເພື່ອໃຊ້ຄວາມສາມາດຂອງໄພ້ໃບທີ່ເຈົ້າບໍ່ມີ ໂດຍບໍ່ໃຫ້ຄົນອື່ນຈັບພິລຸດໄດ້.</p>

            {/* //ANCHOR challenge */}
            <div className="actionContainer">
                            <div className="actionBox">
                                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893894193754296360/challenge.png" alt="challenge" width="35"/>
                            </div>
                            <p><b>ທ້າທາຍ</b>: ເມື່ອຜູ້ຫຼິ້ນປະກາດໃຊ້ຄວາມສາມາດຂອງຕົນ ເຈົ້າຈະສາມາດເລືອກ: "ທ້າທາຍ" ຫຼື "ຜ່ານ". ເມື່ອເຈົ້າຮູ້ສືກວ່າຜູ້ຫຼິ້ນຄົນນັ້ນກຳລັງຕົວະຢູ່ ເຈົ້າສາມາດກົດ "ທ້າທາຍ" ຖ້າຜູ້ຫຼິ້ນຄົນນັ້ນບໍ່ມີໄພ້ທີ່ມີ "ຄວາມສາມາດ" ນັ້ນຢູ່ ລາວຈະຕ້ອງໄດ້ເລືອກໄພ້ເພື່ອຖີ້ມໄປໃບໜື່ງ. 
                            ແຕ່ຖ້າລາວມີໄພ້ໃບນັ້ນເຈົ້າຈະເປັນຄົນທີ່ຕ້ອງຖີ້ມໄພ້ໄປໃບໜື່ງແທນ. ແລະ ເມື່ອຮອດຕາຂອງເຈົ້າຄົນອື່ນກໍສາມາດ "ທ້າທາຍ" ເຈົ້າໄດ້ເຊັ່ນກັນ. 
                            </p>
            </div>
             {/* //ANCHOR bloack */}
             <div className="actionContainer">
                            <div className="actionBox">
                                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893894196174417970/block.png" alt="block" width="35"/>
                            </div>
                            <p><b>ປ້ອງກັນ</b>: ການປ້ອງກັນຈະສາມາດເກີດຂື້ນໄດ້ 3 ກໍລະນີ້ຄື: "ປ້ອງກັນການຖືກສັງຫານ", "ປ້ອງກັນການຮັບເງິນຊ່ວຍເຫຼືອ", "ປ້ອງກັນການຖືກຍຶດຫຼຽນ".</p>
            </div>

            <p>
                ຖ້າ "ຜູ້ຫຼິ້ນ" ເສຍໄພ້ໝົດ "ຜູ້ຫຼິ້ນຄົນນັ້ນ" ຈະຖືກຕັດອອກຈາກເກມ. ຜູ້ຫຼິ້ນທີ່ຢູ່ເປັນຄົນສຸດທ້າຍຈະຊະນະເກມນີ້!, ເມື່ອຫຼຽນຄົບ 7 ຫຼຽນເຈົ້າຈະສາມາດ "ລັດຖະປະຫານ" ໃຜກໍໄດ້, ໂດຍບໍ່ມີໃຜໃບໃດສາມາດປ້ອງກັນໄດ້.
            </p>
            <p>
                <b>ໝາຍເຫດ</b>: ຖ້າເກມຫຼຸດຜູ້ຫຼິ້ນຈະບໍ່ສາມາດກັບເຂົ້າມາຫຼິ້ນເກມຕໍ່ໄດ້. ຈະຕ້ອງສ້າງຫ້ອງໃໝ່ເທົ່ານັ້ນ....
            </p>
            <h2>ໄພ້ / ບົດບາດ</h2>
            <h3># ກັບຕັນ</h3>
                <div className="cardInfoBox">
                <img src="https://cdn.discordapp.com/attachments/821027469028491269/893882370518818916/captain.jpg" alt="captain" width="90"/>
                <div className="detailsBox">
                <h5>ບົດບາດ: ກັບຕັນ</h5>
                <h5>ຄວາມສາມາດ: ຍຶດຫຼຽນ, ປ້ອງກັນການຖືກຍຶດຫຼຽນ</h5>
                <div className="actionBox">
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876304640888952/steal.png" alt="steal" width="30"/>
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876432260968458/block_steal.png" alt="block_steal" width="30"/>
                </div>
                </div>
                </div>
                <p>- <b id="captain-color">ຍຶດຫຼຽນ</b>: ຍຶດ 2 ຫຼຽນຈາກໃຜກໍໄດ້. ຖືກປ້ອງກັນໄດ້ໂດຍ <hl id="captain-color">ກັບຕັນ</hl> ແລະ <hl id="ambassador-color">ນັກການທູດ</hl>. ແລະ ສາມາດປ້ອງກັນ<hl id="captain-color">ການຖືກຍຶດຫຼຽນ</hl>.</p>
                <h3># ມືສັງຫານ</h3>
                <div className="cardInfoBox">
                <img src="https://cdn.discordapp.com/attachments/821027469028491269/893882367289200701/assassin.jpg" alt="assasin" width="90"/>
                <div className="detailsBox">
                <h5>ບົດບາດ: ມືສັງຫານ</h5>
                <h5>ຄວາມສາມາດ: ສັງຫານ</h5>
                <div className="actionBox">
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876306717077565/assasiness.png" alt="assasiness" width="30"/>
                </div>
                </div>
                </div>
            <p>- <b id="assassin-color">ການສັງຫານ</b>: ຈ່າຍ 3 ຫຼຽນ ເພື່ອເລືອກເປົ້າຫຼາຍທີ່ຈະ "ສັງຫານ". (ເປົ້າໝາາຍຈະເສຍ ໄພ້ໃບໜື່ງ). ປ້ອງກັນໄດ້ໂດຍ <hl id="contessa-color">ຄອນເທສຊາ</hl>.</p>
            <h3># ຂຸນນາງ</h3>
                <div className="cardInfoBox">
                <img src="https://cdn.discordapp.com/attachments/821027469028491269/893882361509449768/duke.jpg" alt="duke" width="90"/>
                <div className="detailsBox">
                <h5>ບົດບາດ: ຂຸນນາງ</h5>
                <h5>ຄວາມສາມາດ: ເກັບພາສີ(+3 ຫຼຽນ), ປ້ອງກັນການຮັບເງິນຊ່ວຍເຫຼືອ</h5>
                <div className="actionBox">
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893879790933774376/tax.png" alt="tax" width="30"/>
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893877691902734366/block_foreign_aid.png" alt="block_foreign_aid" width="30"/>
                </div>
                </div>
                </div>
            <p>- <b id="duke-color">ການເກັບພາສີ</b>: ເອົາ 3 ຫຼຽນຈາກຄັງຫຼວງ. ບໍ່ມີໄພ້ໃດປ້ອງກັນໄດ້. ສາມາດປ້ອງກັນການຮັບເງິນຊ່ວຍເຫຼືອໄດ້.</p>
            <h3># ນັກການທູດ</h3>
                <div className="cardInfoBox">
                <img src="https://cdn.discordapp.com/attachments/821027469028491269/893882364437069844/ambassador.jpg" alt="ambassador" width="90"/>
                <div className="detailsBox">
                <h5>ບົດບາດ: ນັກການທູດ</h5>
                <h5>ຄວາມສາມາດ: ປ່ຽນໄພ້, ປ້ອງກັນການຍຶດຫຼຽນ</h5>
                <div className="actionBox">
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876299192500224/exchange.png" alt="exchange" width="30"/>
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876432260968458/block_steal.png" alt="block_steal" width="30"/>
                </div>
                </div>
                </div>
            <p>- <b id="ambassador-color">ການປ່ຽນໄພ້</b>: ຈົກໄພ້ 2 ໃບມາໂຮມກັບໄພ້ທີ່ມີຢູ່ ຫຼັງຈາກໂຮມແລ້ວໃຫ້ເລືອກໄພ້ທີ່ບໍ່ຕ້ອງການ 2 ໃບອອກໄວ້ຄືນ. ບໍ່ມີໄພ້ໃດປ້ອງກັນໄດ້. ສາມາດປ້ອງກັນ<hl id="captain-color"> ການຍຶດຫຼຽນ</hl>.</p>
            <h3># ຄອນເທສຊາ</h3>
                <div className="cardInfoBox">
                <img src="https://cdn.discordapp.com/attachments/821027469028491269/893882374188855326/contessa.jpg" alt="contessa" width="90"/>
                <div className="detailsBox">
                <h5>ບົດບາດ: ຄອນເທສຊາ</h5>
                <h5>ຄວາມສາມາດ: ປ້ອງກັນການສັງຫານ</h5>
                <div className="actionBox">
                    <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876415429238794/block_assasiness.png" alt="block_assasiness" width="30"/>
                </div>
                </div>
                </div>
            <p>- <b id="contessa-color">ປ້ອງກັນການສັງຫານ</b>: ສາມາດປ້ອງກັນ <b id="assassin-color">ການສັງຫານ</b> ໂດຍ ມືສັງຫານໄດ້</p>
            <h2>ຄວາມສາມາດ / ເຫດການເພີ່ມເຕີມ</h2>
            {/* //ANCHOR income */}
            <div className="actionContainer">
                <div className="actionBox">
                        <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876301537099816/income.png" alt="income" width="35"/>
                </div>
                <p><b> ເງິນເດືອນ</b>: ເອົາ 1 ຫຼຽນຈາກ ຄັງຫຼວງ, ແລ້ວຈະຂ້າມໄປຜູ້ຫຼິ້ນຖັດໄປ.</p>
            </div>
            {/* //ANCHOR foreign aid */}
            <div className="actionContainer">
                <div className="actionBox">
                        <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876300144586752/foreign_aid.png" alt="foreign_aid" width="35"/>
                </div>
                <p><b> ເງິນຊ່ວຍເຫຼືອ</b>: ເອົາ 2 ຫຼຽນຈາກ ຄັງຫຼວງ. ຖືກປ້ອງກັນໄດ້ໂດຍ <hl id="duke-color">ຂຸນນາງ</hl>.</p>
            </div>
            {/* //ANCHOR coup */}
            <div className="actionContainer">
                <div className="actionBox">
                        <img src="https://cdn.discordapp.com/attachments/826834529435648000/893907064328429639/coup.png" alt="coup" width="35"/>
                </div>
                <p><b>ລັດຖະປະຫານ</b>: ຈ່າຍ 7 ຫຼຽນເລືອກເປົ້າໝາຍແລ້ວ "ລັດຖະປະຫານ" ຜູ້ທີ່ຖືກລັດຖະປະຫານຈະເສຍໄພ້ໄປໃບໜຶ່ງ. ຖ້າຜູ້ຫຼິ້ນມີຫຼຽນຄົບ 10 ຫຼຽນ ຫຼື ຫຼາຍກວ່ານັ້ນ, ຜູ້ຫຼິ້ນ ຄົນນັ້ນຈະຕ້ອງ "ລັດຖະປະຫານ" ໂດຍທີ່ບໍ່ສາມາດຂ້າມໄດ້. ການລັດຖະປະຫານບໍ່ສາມາດຖືກປ້ອງກັນໄດ້ໂດຍໄພ້ໃດໆກໍຕາມ.</p>
            </div>
        </div>
    </div>
    </ReactModal>
        if(this.props.home) {
            return(
                <>
                    <div className="HomeRules" onClick={this.handleOpenRulesModal}>
                        <p>ກົດກະຕິກາ</p>  
                        {/* <svg className="InfoIcon"xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 21 22">
                            <g id="more_info" data-name="more info" transform="translate(-39 -377)">
                                <g id="Ellipse_1" data-name="Ellipse 1" className="cls-1" transform="translate(39 377)">
                                <circle className="cls-3" cx="10.5" cy="10.5" r="10.5"/>
                                <circle className="cls-4" cx="10.5" cy="10.5" r="10"/>
                                </g>
                                <text id="i" className="cls-2" transform="translate(48 393)"><tspan x="0" y="0">i</tspan></text>
                            </g>
                        </svg> */}
                        <i class="fas fa-question-circle"></i>
                    </div>
                    {modal}
                </>
            )
        }
        return (
            <>
            <div className="Rules" onClick={this.handleOpenRulesModal}>
                        <p>ກົດກະຕິກາ</p>  
                                    {/* <svg className="InfoIcon"xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 21 22">
                                        <g id="more_info" data-name="more info" transform="translate(-39 -377)">
                                            <g id="Ellipse_1" data-name="Ellipse 1" className="cls-1" transform="translate(39 377)">
                                            <circle className="cls-3" cx="10.5" cy="10.5" r="10.5"/>
                                            <circle className="cls-4" cx="10.5" cy="10.5" r="10"/>
                                            </g>
                                            <text id="i" className="cls-2" transform="translate(48 393)"><tspan x="0" y="0">i</tspan></text>
                                        </g>
                                    </svg> */}
                                    <i class="fas fa-question-circle"></i>
            </div>
            {modal}
            </>
        )
    }
}
