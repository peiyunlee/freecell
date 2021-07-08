import React, { Children, useEffect } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
// import { useDrag } from 'react-dnd'
// import { getEmptyImage } from "react-dnd-html5-backend";
import styles from './style.scss';
import images from '../../assets/Images';
import PokerCard from '../../lib/PokerCard'

interface MyProps {
    instance: PokerCard | null,
    draggingItemId: string,
    //draggingItemId 一定是 drag questionlayout's card
    draggableIndex: number,
    cardChildren: (PokerCard | null)[]
    children?: React.ReactNode,
}

function Card(props: MyProps) {
    const { instance, draggableIndex, draggingItemId, cardChildren } = props

    return instance == null ? (<></>
    ) : (
        <Draggable key={`draggablecard_${instance.tableType}_${instance.tableIndex}_${draggableIndex}`}
            draggableId={`draggablecard_${instance.tableType}_${instance.tableIndex}_${draggableIndex}`}
            index={draggableIndex} >
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                let className = styles.card;
                let style = provided.draggableProps.style;
                let draggableProps = provided.draggableProps;
                let dragHandleProps;
                if (provided.dragHandleProps)
                    dragHandleProps = provided.dragHandleProps;

                const draggableId = "draggablecard".concat("_", instance.tableType).concat("_", instance.tableIndex.toString()).concat("_", draggableIndex.toString())

                if (!snapshot.isDragging) {
                    style = { ...style, transform: 'none' };
                    draggableProps = {
                        ...draggableProps,
                        'data-rbd-draggable-id': draggableId,
                    };
                    dragHandleProps = {
                        ...dragHandleProps,
                        'data-rbd-drag-handle-draggable-id': draggableId,
                    }

                    if (instance.tableType == "QuestionLayout"
                        && instance.tableIndex == parseInt(draggingItemId.split('_')[2])
                        && draggableIndex > parseInt(draggingItemId.split('_')[3])) {
                        className = styles.dragcard_children;
                    }

                    return (
                        //isnot dragging card
                        <div ref={provided.innerRef} {...draggableProps} {...dragHandleProps} style={style} className={className}>
                            <img src={images[instance.cardId]} alt="" />
                        </div>
                    )
                }

                //is dragging card 
                return (
                    <div ref={provided.innerRef} {...draggableProps} {...dragHandleProps} className={className} >
                        {cardChildren.map((item, index) => { return item == null ? <></> : <img key={"cardImg_" + index} src={images[item.cardId]} alt="" /> })}
                    </div>
                )
            }}
        </Draggable>)
}

export default Card;