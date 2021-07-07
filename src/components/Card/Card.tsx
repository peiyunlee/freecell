import React, { useEffect } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
// import { useDrag } from 'react-dnd'
// import { getEmptyImage } from "react-dnd-html5-backend";
import styles from './style.scss';
import images from '../../assets/Images';
import PokerCard from '../../lib/PokerCard'

interface MyProps {
    instance: PokerCard | null,
    draggableIndex: number,
    children?: React.ReactNode,
}

function Card(props: MyProps) {
    const { instance, draggableIndex } = props

    // const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    //     type: 'card',
    //     item: { tableIndex, table, pokerCard },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging(),
    //     }),
    // }),
    //     []);


    return instance == null ? (<></>
    ) : (
        <Draggable key={`card_${instance.cardId}`} draggableId={`card_${instance.cardId}`} index={draggableIndex} >
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                let style;
                if (snapshot.isDragging) {
                    style = { ...provided.draggableProps.style };
                }
                else {
                    style = { ...provided.draggableProps.style, transform: 'none' };
                }
                // <img className={isDragging ? styles.cardImg_drag : styles.cardImg} ref={dragRef} src={images[cardId]} alt="" />
                return (<img ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.cardImg} style={style} src={images[instance.cardId]} alt="" />)
            }}
        </Draggable>)
}

export default Card;