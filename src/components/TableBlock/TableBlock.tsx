import React, { Component } from 'react';
import styles from './style.scss';
import logo from '../../assets/images/king_happy.png'
import C from '../../assets/images/C.png'
import D from '../../assets/images/D.png'
import H from '../../assets/images/H.png'
import S from '../../assets/images/S.png'

class TableBlock extends React.Component {
    render() {
        return (
            <div className={styles.tableblock}>
                <div className={`${styles.tablelist} ${styles.tablelist_left}`}>
                    <div className={styles.table}></div>
                    <div className={styles.table}></div>
                    <div className={styles.table}></div>
                    <div className={styles.table}></div>
                </div>
                <div className={styles.logo}>
                    <img src={logo} alt="" />
                    <h1>FREECELL</h1></div>
                <div className={`${styles.tablelist} ${styles.tablelist_right}`}>
                    <div className={styles.table}>
                        <img src={S} alt="" />
                    </div>
                    <div className={styles.table}>
                        <img src={H} alt="" /></div>
                    <div className={styles.table}>
                        <img src={D} alt="" /></div>
                    <div className={styles.table}>
                        <img src={C} alt="" /></div></div>
            </div>
        );
    }
}

export default TableBlock;