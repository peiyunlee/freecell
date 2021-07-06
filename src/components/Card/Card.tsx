import React from 'react';
import { useDrag } from 'react-dnd'
import styles from './style.scss';
import images from '../../assets/Images';

interface MyProps {
    cardId: string,
    table: string,
    tableIndex: number,
    children?: React.ReactNode,
}

function Card(props: MyProps) {
    const { tableIndex, cardId, table } = props

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'card',
        item: { tableIndex, table },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }),
        []);

    return (
        <>
            <img className={isDragging ? styles.cardImg_drag : styles.cardImg} ref={dragRef} src={images[cardId]} alt="" />
        </>
    );
}

export default Card;