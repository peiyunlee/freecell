import React, { Component } from 'react';
import styles from './style.scss';
import CardList from '../CardList';

class CardBlock extends React.Component {
    render() {
        return (
            <div className={styles.cardblock}>
                <CardList />
                <CardList />
                <CardList />
                <CardList />
                <CardList />
                <CardList />
                <CardList />
                <CardList />
            </div>
        );
    }
}

export default CardBlock;