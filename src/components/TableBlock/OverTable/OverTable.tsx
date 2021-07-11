import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../TableBlock/style.scss';
import Card from '../../Card/Card';
import C from '../../../assets/images/C.png'
import D from '../../../assets/images/D.png'
import H from '../../../assets/images/H.png'
import S from '../../../assets/images/S.png'
import PokerCard from '../../../lib/PokerCard';

interface MyProps {
    overLayout: PokerCard[],
    tableIndex: number,
    draggingItemId: string,
    children?: React.ReactNode,
}

function OverTable(props: MyProps) {
    const { overLayout, tableIndex, draggingItemId } = props
    const [tableImg, settableImg] = useState([S, H, D, C]);

    const _renderCardList = (item: PokerCard, index: number) => {
        const propsToCard = {
            instance: item,
            draggableIndex: index,
            draggingItemId: draggingItemId,
            cardChildren: [item],
            canDrag: true,
        }
        return item.cardId == '' ? <></> : <Card key={`card_OverLayout_${tableIndex}_${index}`} {...propsToCard} />
    }

    return (
        <Droppable droppableId={`droppabletable_OverLayout_${tableIndex}`}>
            {(provided) => (
                <div className={styles.table} {...provided.droppableProps} ref={provided.innerRef}>
                    <img className={styles.tableBg} src={tableImg[tableIndex]} alt="" />
                    {overLayout.map((item: PokerCard, index: number) => { return _renderCardList(item, index) })}
                    <span style={{ display: 'none' }}>{provided.placeholder}</span>
                </div>
            )}
        </Droppable>
    );
}

export default OverTable;