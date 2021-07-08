import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './style.scss';
import Card from '../Card/Card'
import PokerCard from '../../lib/PokerCard';

interface MyProps {
    questionLayoutColumn: PokerCard[],
    draggingItemId: string,
    tableIndex: number,
    children?: React.ReactNode,
}

function CardList(props: MyProps) {
    const { questionLayoutColumn, tableIndex, draggingItemId } = props;

    const _renderCard = (item: PokerCard, index: number) => {
        let childChildren: PokerCard[] = []
        if (tableIndex == parseInt(draggingItemId.split('_')[2])
            && index == parseInt(draggingItemId.split('_')[3])) {
            childChildren = questionLayoutColumn.slice(index);
        }
        const propsToCard = {
            instance: item,
            draggingItemId: draggingItemId,
            draggableIndex: index,
            cardChildren: childChildren
        }
        return <Card key={`card_QuestionLayout_${tableIndex}_${index}`} {...propsToCard} />
    }

    //     canDrop: item => {
    //         console.log(item.pokerCard.num)
    //         const tableRight = !(item.table === 'QuestionLayout' && item.tableIndex === tableIndex);
    //         let colorRight = true;
    //         let numberRight = true;
    //         if (!(questionLayoutColumn && !questionLayoutColumn.length)) {
    //             colorRight = PokerCard.compareColor(questionLayoutColumn[questionLayoutColumn.length - 1], item.pokerCard.color,);
    //             numberRight = PokerCard.numberIsPowerDown(questionLayoutColumn[questionLayoutColumn.length - 1], item.pokerCard.num)
    //         }
    //         return tableRight && !colorRight && numberRight

    // const canDrop = () => {
    //     const tableRight = !(item.table === 'QuestionLayout' && item.tableIndex === tableIndex);
    //     let colorRight = true;
    //     let numberRight = true;
    //     if (!(questionLayoutColumn && !questionLayoutColumn.length)) {
    //         colorRight = PokerCard.compareColor(questionLayoutColumn[questionLayoutColumn.length - 1], item.pokerCard.color,);
    //         numberRight = PokerCard.numberIsPowerDown(questionLayoutColumn[questionLayoutColumn.length - 1], item.pokerCard.num)
    //     }
    //     return tableRight && !colorRight && numberRight
    // }

    return (
        <Droppable droppableId={`table_QuestionLayout_${tableIndex}`}>
            {(provided) => (
                <div className={styles.cardlist} {...provided.droppableProps} ref={provided.innerRef}>
                    {questionLayoutColumn.map((item: PokerCard, index: number) => { return _renderCard(item, index) })}
                    <span style={{ display: 'none' }}>{provided.placeholder}</span>
                </div>
            )}
        </Droppable>
    );
}

export default CardList;