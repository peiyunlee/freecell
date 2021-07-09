import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../TableBlock/style.scss';
import Card from '../../Card/Card';
import PokerCard from '../../../lib/PokerCard';

interface MyProps {
    instance: (PokerCard | null),
    draggingItemId: string,
    tableIndex: number,
    children?: React.ReactNode,
}

function TempTable(props: MyProps) {
    const { instance, tableIndex, draggingItemId } = props

    //     canDrop: item => cardId == ''

    const propsToCard = {
        instance: instance,
        draggableIndex: tableIndex,
        draggingItemId: draggingItemId,
        cardChildren: [instance],
        canDrag: true,
    }

    return (
        <Droppable droppableId={`droppabletable_TempLayout_${tableIndex}`}>
            {(provided) => (
                <div className={styles.table} {...provided.droppableProps} ref={provided.innerRef}>
                    {instance == null ? <></> : <Card key={`card_TempLayout_${tableIndex}`} {...propsToCard} />}
                    <span style={{ display: 'none' }}>{provided.placeholder}</span>
                </div>
            )}
        </Droppable>
    );
}

export default TempTable;