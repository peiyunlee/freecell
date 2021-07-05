import React from 'react';
import { useDrag } from 'react-dnd'
import styles from './style.scss';

interface MyProps {
    cardUrl: string,
    columnIndex: number,
    children?: React.ReactNode,
}

function Card(props: MyProps) {
    const { cardUrl, columnIndex } = props

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: 'card',
        item: { columnIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }),
        []);

    return (
        <>
            <img className={isDragging ? styles.cardImg_drag : styles.cardImg} ref={dragRef} src={cardUrl} alt="" />
        </>
    );
}

export default Card;