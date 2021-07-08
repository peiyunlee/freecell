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
    children?: React.ReactNode,
}

function OverTable(props: MyProps) {
    const { overLayout, tableIndex } = props
    const [tableImg, settableImg] = useState([S, H, D, C]);

    // const [{ }, dropRef] = useDrop({
    //     accept: 'card',
    //     drop: (item: { tableIndex: number, table: string, pokerCard: PokerCard }) => {
    //         const from = item.table;
    //         const to = "OverLayout";
    //         const fromIndex = item.tableIndex;
    //         const toIndex = tableIndex;
    //         handleCardMove(from, to, fromIndex, toIndex);
    //     },
    //     canDrop: item => {
    //         const tableRight = !(item.table === 'OverLayout' && item.tableIndex === tableIndex);
    //         const typeRight = PokerCard.compareType(item.pokerCard.type, tableIndex);
    //         let numberRight = true;
    //         if (overLayout && !overLayout.length) {
    //             numberRight = item.pokerCard.num === 1;
    //         }
    //         else{
    //             numberRight = PokerCard.numberIsPowerUp(overLayout[overLayout.length - 1], item.pokerCard.num)
    //         }
    //         return tableRight && typeRight && numberRight;

    //     }
    // });

    const _renderCardList = (item: PokerCard, index: number) => {
        const propsToCard = {
            instance: item,
            draggableIndex: index,
        }
        return item.cardId == '' ? <></> : <Card key={'card_' + item} {...propsToCard} />
    }

    return (
        <Droppable droppableId={`table_OverLayout_${tableIndex}`}>
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