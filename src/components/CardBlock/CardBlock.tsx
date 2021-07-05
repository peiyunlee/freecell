import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeTypes } from '../../store/configureStore';
import styles from './style.scss';
import CardList from '../CardList/CardList';
import { setQuestionLayout } from '../../actions/cardActions';

function CardBlock() {
    const questionLayoutStore = useSelector((store: storeTypes) => store.cardReducer.questionLayout)
    const [questionLayout, setquestionLayout] = useState<Array<Array<string>>>(questionLayoutStore)

    useEffect(() => {
        setquestionLayout(questionLayoutStore)
    }, [questionLayoutStore])

    const dispatch = useDispatch();

    const handleCardMove = (type: string, fromIndex: number, toIndex: number) => {
        switch (type) {
            case "QuestionLayout":
                _setCardToQuestionLayout(fromIndex, toIndex)
                break;
            case "TempLayout":
                break;
            case "OverLayout":
                break;
            default:
                break;
        }
    }

    const _setCardToQuestionLayout = (fromIndex: number, toIndex: number) => {
        let newQuestionLayout: Array<Array<string>> = questionLayoutStore;
        let cardId: string | undefined = questionLayoutStore[fromIndex].pop()
        if (cardId) {
            newQuestionLayout[toIndex].push(cardId);
            dispatch(setQuestionLayout(newQuestionLayout))
        }
    }

    const _renderCardList = (item: string[], index: number) => {
        const propsToCardList = {
            questionLayoutColumn: item,
            handleCardMove,
            columnIndex: index,
        }
        return <CardList {...propsToCardList} key={"cardlist_" + index} />
    }

    return (
        <div className={styles.cardblock}>
            {questionLayout.map((item: string[], index: number) => { return _renderCardList(item,index) })}
        </div>
    );
}

export default CardBlock;