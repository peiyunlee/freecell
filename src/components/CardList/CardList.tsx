import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import styles from './style.scss';
import Card from '../Card/card'
import images from './Images';

interface MyProps {
    questionLayoutColumn: string[],
    handleCardMove: (type: string, fromIndex: number, toIndex: number) => void,
    columnIndex: number,
    children?: React.ReactNode,
}

function CardList(props: MyProps) {
    const { questionLayoutColumn, columnIndex, handleCardMove } = props;

    const _renderCard = (item: string, index: number) => {
        let cardId: string[] = item.split('_');

        let type: string;
        switch (cardId[0]) {
            case 'spades': type = 'S';
                break;
            case 'heart': type = 'H';
                break;
            case 'diamond': type = 'D';
                break;
            case 'club': type = 'C';
                break;
            default:
                return;
                break;
        }

        const propsToCard = {
            cardUrl: images[type.concat('', cardId[1])],
            columnIndex: columnIndex,
        }
        return <Card key={'card_' + item} {...propsToCard} />
    }

    const [{ }, dropRef] = useDrop({
        accept: 'card',
        drop: () => {
            const from = 2;
            const to = 3;
            handleCardMove("QuestionLayout", from, to);
        },
        // canDrop: item => item.columnIndex !== columnIndex
    });

    return (
        <div className={styles.cardlist} ref={dropRef}>
            {questionLayoutColumn.map((item: string, index: number) => { return _renderCard(item, index) })}
        </div>
    );
}

export default CardList;