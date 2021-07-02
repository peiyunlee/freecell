import React, { Component } from 'react';
import styles from './style.scss';
import C1 from '../../../assets/cards/C1.png'
import C2 from '../../../assets/cards/C2.png'
import C3 from '../../../assets/cards/C3.png'
import C4 from '../../../assets/cards/C4.png'

class CardList extends React.Component {
    render() {
        return (
            <div className={styles.cardlist}>
                <img src={C1} alt="" />
                <img src={C2} alt="" />
                <img src={C3}alt="" />
                <img src={C4} alt="" />
            </div>
        );
    }
}

export default CardList;