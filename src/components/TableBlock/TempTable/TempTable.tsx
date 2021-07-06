import React from 'react';
import { useDrop } from 'react-dnd'
import styles from '../../TableBlock/style.scss';
import Card from '../../Card/Card';

interface MyProps {
    cardId: string,
    tableIndex: number,
    handleCardMove: (from: string, to: string, fromIndex: number, toIndex: number) => void,
    children?: React.ReactNode,
}

function TempTable(props: MyProps) {
    const { cardId, tableIndex, handleCardMove } = props

    const [{ }, dropRef] = useDrop({
        accept: 'card',
        drop: (item: { tableIndex: number, table: string }) => {
            const from = item.table;
            const to = "TempLayout";
            const fromIndex = item.tableIndex;
            const toIndex = tableIndex;
            handleCardMove(from, to, fromIndex, toIndex);
        },
        canDrop: item => cardId == ''
    });

    const propsToCard = {
        cardId: cardId,
        table: 'TempLayout',
        tableIndex: tableIndex,
    }

    return (
        <div ref={dropRef} className={styles.table}>
            {cardId == '' ? <></> : <Card key={'temp_' + tableIndex} {...propsToCard} />}
        </div>
    );
}

export default TempTable;