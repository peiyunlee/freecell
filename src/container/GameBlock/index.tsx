import React, { Component } from 'react';
import styles from './style.scss';
import TableBlock from '../../components/TableBlock/index';
import CardBlock from '../../components/CardBlock/index';

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