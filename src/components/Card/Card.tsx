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
        <Draggable key={`card_${instance.tableType}_${instance.tableIndex}_${draggableIndex}`} draggableId={`card_${instance.tableType}_${instance.tableIndex}_${draggableIndex}`}
            index={draggableIndex} >
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                let style;
                let draggableProps, dragHandleProps;
                const draggableId = "card".concat("_", instance.tableType).concat("_", instance.tableIndex.toString()).concat("_", draggableIndex.toString())
                if (snapshot.isDragging) {
                    style = { ...provided.draggableProps.style };
                    draggableProps = provided.draggableProps
                    dragHandleProps = provided.dragHandleProps
                }
                else {
                    style = { ...provided.draggableProps.style, transform: 'none' };
                    draggableProps = {
                        ...provided.draggableProps,
                        'data-rbd-draggable-id': draggableId,
                    };
                    dragHandleProps = {
                        ...provided.dragHandleProps,
                        'data-rbd-drag-handle-draggable-id': draggableId,
                    }
                }
                // <img className={isDragging ? styles.cardImg_drag : styles.cardImg} ref={dragRef} src={images[cardId]} alt="" />
                return (<img ref={provided.innerRef} {...draggableProps} {...dragHandleProps} className={styles.cardImg} style={style} src={images[instance.cardId]} alt="" />)
            }}
        </Draggable>)
}

export default Card;