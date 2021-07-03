
import React, { Component } from 'react';
import GameBlock from '../GameBlock/GameBlock';
import Menu from '../Menu/Menu';
import styles from './style.scss';

class App extends React.Component {
    render() {
        return (
            <div className={styles.app}>
                <GameBlock />
                <Menu />
            </div>
        );
    }
}

export default App;