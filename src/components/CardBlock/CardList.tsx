import React from 'react';
// import { useDrop } from 'react-dnd';
import { Droppable, DraggableProvided } from 'react-beautiful-dnd';
import styles from './style.scss';
import Card from '../Card/Card'
import PokerCard from '../../lib/PokerCard';

interface MyProps {
    questionLayoutColumn: string[],
    handleCardMove: (from: string, to: string, fromIndex: number, toIndex: number) => void,
    tableIndex: number,
    children?: React.ReactNode,
}

function CardList(props: MyProps) {
    const { questionLayoutColumn, tableIndex, handleCardMove } = props;

    const _renderCard = (item: string, index: number) => {
        const propsToCard = {
            cardId: item,
            table: 'QuestionLayout',
            tableIndex: tableIndex,
            draggableIndex: index,
        }
        return <Card key={'card_' + item} {...propsToCard} />
    }

    // const [{ }, dropRef] = useDrop({
    //     accept: 'card',
    //     drop: (item: { tableIndex: number, table: string, pokerCard: PokerCard }) => {
    //         const from = item.table;
    //         const to = "QuestionLayout";
    //         const fromIndex = item.tableIndex;
    //         const toIndex = tableIndex;
    //         handleCardMove(from, to, fromIndex, toIndex);
    //     },
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
    //     }
    // });

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
        <Droppable droppableId={`cardlist_${tableIndex}`}>
            {(provided) => (
                <div className={styles.cardlist} {...provided.droppableProps} ref={provided.innerRef}>
                    {questionLayoutColumn.map((item: string, index: number) => { return _renderCard(item, index) })}
                    <span style={{ display: 'none' }}>{provided.placeholder}</span>
                </div>
            )}
        </Droppable>
    );
}

export default CardList;