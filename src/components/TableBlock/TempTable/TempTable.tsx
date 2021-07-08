import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../TableBlock/style.scss';
import Card from '../../Card/Card';
import PokerCard from '../../../lib/PokerCard';

interface MyProps {
    instance: PokerCard | null,
    tableIndex: number,
    children?: React.ReactNode,
}

function TempTable(props: MyProps) {
    const { instance, tableIndex } = props

    //     canDrop: item => cardId == ''

    const propsToCard = {
        instance: instance,
        draggableIndex: tableIndex,
    }

    return (
        <Droppable droppableId={`table_TempLayout_${tableIndex}`}>
            {(provided) => (
                <div className={styles.table} {...provided.droppableProps} ref={provided.innerRef}>
                    {instance == null ? <></> : <Card key={'temp_' + tableIndex} {...propsToCard} />}
                    <span style={{ display: 'none' }}>{provided.placeholder}</span>
                </div>
            )}
        </Droppable>
    );
}

export default TempTable;