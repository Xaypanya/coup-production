import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AboutModal from './AboutModal';
import RulesModal from './RulesModal';

export default class Home extends Component {
    render() {
        return (
            <>
            <div className="homeContainer">
                <h1>ຍິນດີຕ້ອນຮັບສູ່ Coup</h1>
                <h3>ເກມແຫ່ງການຂີ້ຕົວະ</h3>
                <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876298500415518/coup_icon.png" alt="chicken-leg" style={{margin: 0}}/>
                <div className="input-group-btn">
                    <Link className="home" to="/create" ><span style={{fontSize: 15}}>ສ້າງຫ້ອງ</span></Link>
                </div>
                <div className="input-group-btn">
                    <Link className="home" to="/join" ><span style={{fontSize: 15}}>ເຂົ້າຮ່ວມ</span></Link>
                </div>
                <div>
                    <RulesModal home={true}/> 
                </div>
                <div>
                    <AboutModal home={true}/> 
                </div>
            </div>
            {/* <p className="footer-2">Powered by <a className="website-link" href="https://github.com/Cheneth" target="_blank" rel="noopener noreferrer">Ethan Chen</a></p>
            <p className="footer">Developed by <a className="website-link" href="https://www.facebook.com/K4IDAODEV" target="_blank" rel="noopener noreferrer">Kaidao.Dev</a></p> */}
            <p className="version-number">Beta v0.9</p>
            </>
        )
    }
}
