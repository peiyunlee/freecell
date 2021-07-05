import React from 'react';
import { useDrag } from 'react-dnd'
import styles from './style.scss';

interface MyProps {
    cardUrl: string,
    columnIndex: number,
    children?: React.ReactNode,
}

function CardList({ cardUrl }: MyProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }),
        []);

    return (
        <>
            <img className={isDragging ? styles.cardImg_drag : styles.cardImg} ref={drag} src={cardUrl} alt="" />
        </>
    );
}

export default CardList;