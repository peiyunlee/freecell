
import React, { Component } from 'react';
import GameBlock from '../GameBlock/index';
import Menu from '../Menu/index';
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