import React from 'react';
import { useDrop } from 'react-dnd';
import styles from './style.scss';
import Card from '../../Card/Card'

interface MyProps {
    questionLayoutColumn: string[],
    handleCardMove: (from: string, to: string, fromIndex: number, toIndex: number) => void,
    tableIndex: number,
    children?: React.ReactNode,
}

function CardList(props: MyProps) {
    const { questionLayoutColumn, tableIndex, handleCardMove } = props;

    const _renderCard = (item: string, index: number) => {
        const propsToCard = {
            cardId: item,
            table: 'QuestionLayout',
            tableIndex: tableIndex,
        }
        return <Card key={'card_' + item} {...propsToCard} />
    }

    const [{ }, dropRef] = useDrop({
        accept: 'card',
        drop: (item: { tableIndex: number, table: string }) => {
            const from = item.table;
            const to = "QuestionLayout";
            const fromIndex = item.tableIndex;
            const toIndex = tableIndex;
            handleCardMove(from, to, fromIndex, toIndex);
        },
        canDrop: item => item.table !== 'QuestionLayout' || item.tableIndex !== tableIndex
    });

    return (
        <div className={styles.cardlist} ref={dropRef}>
            {questionLayoutColumn.map((item: string, index: number) => { return _renderCard(item, index) })}
        </div>
    );
}

export default CardList;