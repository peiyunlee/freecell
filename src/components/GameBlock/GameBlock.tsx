import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeTypes } from '../../store/configureStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableBlock from '../../components/TableBlock/TableBlock';
import CardBlock from '../../components/CardBlock/CardBlock';
import * as actions from '../../actions/cardActions';

function GameBlock() {
    const store = useSelector((store: storeTypes) => store.cardReducer)
    const [questionLayout, setquestionLayout] = useState<string[][]>(store.questionLayout)

    useEffect(() => {
        setquestionLayout(store.questionLayout)
    }, [store.questionLayout])

    const [tempLayout, settempLayout] = useState<string[]>(store.tempLayout)

    useEffect(() => {
        settempLayout(store.tempLayout)
    }, [store.tempLayout])

    const [overLayout, setoverLayout] = useState<string[][]>(store.overLayout)

    useEffect(() => {
        setoverLayout(store.overLayout)
    }, [store.overLayout])

    const dispatch = useDispatch();

    const handleCardMove = (from: string, to: string, fromIndex: number, toIndex: number) => {
        switch (to) {
            case "QuestionLayout":
                _setCardToQuestionLayout(from, fromIndex, toIndex)
                break;
            case "TempLayout":
                _setCardToTempLayout(from, fromIndex, toIndex)
                break;
            case "OverLayout":
                break;
            default:
                break;
        }
    }

    const _setCardToQuestionLayout = (from: string, fromIndex: number, toIndex: number) => {
        let newQuestionLayout: Array<Array<string>> = questionLayout;
        switch (from) {
            case "QuestionLayout":
                let cardId: string | undefined;
                cardId = questionLayout[fromIndex].pop();
                if (cardId) {
                    newQuestionLayout[toIndex].push(cardId);
                    dispatch(actions.setQuestionLayout(newQuestionLayout))
                }
                break;
            case "TempLayout":
                let newTempLayout: Array<string> = tempLayout;
                newQuestionLayout[toIndex].push(newTempLayout[fromIndex]);
                newTempLayout[fromIndex] = '';
                dispatch(actions.setQuestionLayout(newQuestionLayout))
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            case "OverLayout":
                break;
            default:
                break;
        }
    }

    const _setCardToTempLayout = (from: string, fromIndex: number, toIndex: number) => {
        let newTempLayout: Array<string> = tempLayout;
        switch (from) {
            case "QuestionLayout":
                let newQuestionLayout: Array<Array<string>> = questionLayout;
                let cardId: string | undefined;
                cardId = questionLayout[fromIndex].pop();
                if (cardId) {
                    newTempLayout[toIndex] = cardId;
                    dispatch(actions.setQuestionLayout(newQuestionLayout))
                    dispatch(actions.setTempLayout(newTempLayout))
                }
                break;
            case "TempLayout":
                newTempLayout[toIndex] = newTempLayout[fromIndex];
                newTempLayout[fromIndex] = '';
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            case "OverLayout":
                break;
            default:
                break;
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <TableBlock tempLayout={tempLayout} overLayout={overLayout} handleCardMove={handleCardMove} />
            <CardBlock questionLayout={questionLayout} handleCardMove={handleCardMove} />
        </DndProvider>
    );
}

export default GameBlock;