import React, { Component } from 'react';
import styles from './style.scss';
import TableBlock from '../../components/TableBlock/TableBlock';
import CardBlock from '../../components/CardBlock/CardBlock';

class GameBlock extends React.Component {
    render() {
        return (
            <div className={styles.gameblock}>
                <TableBlock />
                <CardBlock />
            </div>
        );
    }
}

export default GameBlock;