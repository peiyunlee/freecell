import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import styles from './style.scss';
import images from '../../assets/Images';
import PokerCard from '../../lib/PokerCard'

interface MyProps {
    instance: PokerCard | null,
    draggingItemId: string,
    //draggingItemId 一定是 drag questionlayout's card
    draggableIndex: number,
    canDrag: boolean,
    cardChildren: (PokerCard | null)[],
    handleCardMove?: (index: number, from: string, to: string, fromIndex: number, toIndex: number) => void
    children?: React.ReactNode,
}

function Card(props: MyProps) {
    const { instance, draggableIndex, draggingItemId, cardChildren, canDrag, handleCardMove } = props

    const _handleCardClick = () => {
        if (instance == null || !handleCardMove) return;
        if (instance.canAuto) {
            handleCardMove(draggableIndex,instance.tableType,"OverLayout",instance.tableIndex,instance.typeNum)
        }
    }

    return instance == null ? (<></>
    ) : (
        <Draggable key={`draggablecard_${instance.tableType}_${instance.tableIndex}_${draggableIndex}`}
            draggableId={`draggablecard_${instance.tableType}_${instance.tableIndex}_${draggableIndex}`}
            index={draggableIndex} isDragDisabled={!canDrag}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                let className = styles.card;
                if (instance.tableType == "OverLayout")
                    className = `${className} ${styles.overlayout_card}`;

                let style = provided.draggableProps.style;
                let draggableProps = provided.draggableProps;
                let dragHandleProps;
                if (provided.dragHandleProps)
                    dragHandleProps = provided.dragHandleProps;

                const draggableId = "draggablecard".concat("_", instance.tableType).concat("_", instance.tableIndex.toString()).concat("_", draggableIndex.toString())

                if (!snapshot.isDragging) {
                    style = {
                        ...style,
                        transform: 'none'
                    };
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
                        className = `${className} ${styles.dragcard_children}`;
                    }

                    return (
                        //isnot dragging card
                        <div ref={provided.innerRef} {...draggableProps} {...dragHandleProps} style={style} className={className} onClick={() => _handleCardClick()}>
                            <img src={images[instance.cardId]} alt="" />
                        </div>
                    )
                }

                // if (provided.draggableProps.onTransitionEnd) {
                //     console.log(provided.draggableProps.style)
                // }                

                //is dragging card 
                return (
                    <div ref={provided.innerRef} {...draggableProps} {...dragHandleProps} className={className} style={style}>
                        {cardChildren.map((item, index) => { return item == null ? <></> : <img key={"cardImg_" + index} src={images[item.cardId]} alt="" /> })}
                    </div>
                )
            }}
        </Draggable>)
}

export default Card;