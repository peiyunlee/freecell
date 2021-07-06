import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import styles from '../../TableBlock/style.scss';
import Card from '../../Card/Card';
import C from '../../../assets/images/C.png'
import D from '../../../assets/images/D.png'
import H from '../../../assets/images/H.png'
import S from '../../../assets/images/S.png'

interface MyProps {
    overLayout: string[],
    tableIndex: number,
    handleCardMove: (from: string, to: string, fromIndex: number, toIndex: number) => void,
    children?: React.ReactNode,
}

function OverTable(props: MyProps) {
    const { overLayout, tableIndex, handleCardMove } = props
    const [tableImg, settableImg] = useState([S, H, D, C]);

    const [{ }, dropRef] = useDrop({
        accept: 'card',
        drop: (item: { tableIndex: number, table: string }) => {
            const from = item.table;
            const to = "OverLayout";
            const fromIndex = item.tableIndex;
            const toIndex = tableIndex;
            handleCardMove(from, to, fromIndex, toIndex);
        },
        canDrop: item => item.table !== 'OverLayout' || item.tableIndex !== tableIndex
    });

    const _renderCardList = (item: string, index: number) => {
        const propsToCard = {
            cardId: item,
            table: 'OverLayout',
            tableIndex: tableIndex,
        }
        return item == '' ? <></> : <Card key={'card_' + item} {...propsToCard} />
    }

    return (
        <div ref={dropRef} className={styles.table}>
            <img className={styles.tableBg} src={tableImg[tableIndex]} alt="" />
            {overLayout.map((item: string, index: number) => { return _renderCardList(item, index) })}
        </div>
    );
}

export default OverTable;