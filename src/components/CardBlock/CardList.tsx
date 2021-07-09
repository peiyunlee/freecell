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

    const _setCanDrag = (cardChildren: PokerCard[]) => {
        if (cardChildren.length >= 2) {
            for (let i = 1; i < cardChildren.length; i++) {
                const card1 = cardChildren[i - 1];
                const card2 = cardChildren[i];
                if (card1 != null && card2 != null) {
                    if (!PokerCard._isCardNumberDecreaseByOne(card1, card2)
                        || PokerCard._isCardColorNotMatch(card1, card2))
                        return false;
                }
            }
        }
        return true;
    }

    const _renderCard = (item: PokerCard, index: number) => {
        let childChildren: PokerCard[] = []
        childChildren = questionLayoutColumn.slice(index);

        // if (tableIndex == parseInt(draggingItemId.split('_')[2])
        //     && index == parseInt(draggingItemId.split('_')[3])) {
        //     childChildren = questionLayoutColumn.slice(index);
        // }

        const propsToCard = {
            instance: item,
            draggingItemId: draggingItemId,
            draggableIndex: index,
            cardChildren: childChildren,
            canDrag: _setCanDrag(childChildren),
        }
        return <Card key={`card_QuestionLayout_${tableIndex}_${index}`} {...propsToCard} />
    }


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