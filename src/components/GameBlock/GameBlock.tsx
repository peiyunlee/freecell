import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult, DragStart } from 'react-beautiful-dnd'
import { storeTypes } from '../../store/configureStore';
import * as actions from '../../store/actions/cardActions';
import TableBlock from '../../components/TableBlock/TableBlock';
import CardBlock from '../../components/CardBlock/CardBlock';
import PokerCard from '../../lib/PokerCard';
import { CARDTYPE } from '../../lib/constants/enum/CARDTYPE';

interface MyProps {
    setModalShow: (modalType: number | null) => void,
    children?: React.ReactNode,
}

function GameBlock(props: MyProps) {
    const store = useSelector((store: storeTypes) => store.cardReducer)
    const { setModalShow } = props;

    const [questionLayout, setquestionLayout] = useState<PokerCard[][]>(store.questionLayout)

    useEffect(() => {
        setquestionLayout(store.questionLayout)
    }, [store.questionLayout])

    const [tempLayout, settempLayout] = useState<Array<PokerCard | null>>(store.tempLayout)

    useEffect(() => {
        settempLayout(store.tempLayout)
    }, [store.tempLayout])

    const [overLayout, setoverLayout] = useState<PokerCard[][]>(store.overLayout)

    useEffect(() => {
        setoverLayout(store.overLayout)
        if (_IsGameFinish()) {
            setModalShow(0)
        }
    }, [store.overLayout])

    const [draggingItemId, setdraggingItemId] = useState<string>('');

    const dispatch = useDispatch();

    const _IsGameFinish = () => {
        let result = false;
        result = overLayout.every((item) => item.length == 13)
        return result;
    }

    const _handleCardMove = (index: number, from: string, to: string, fromIndex: number, toIndex: number) => {
        switch (to) {
            case "QuestionLayout":
                if (!(_isCardColorMatch(index, from, to, fromIndex, toIndex)
                    && _isCardNumberIncreaseByOne(index, from, to, fromIndex, toIndex)))
                    return;
                _setCardToQuestionLayout(index, from, fromIndex, toIndex)
                break;
            case "TempLayout":
                if (!(_isCardLastOne(index, from, fromIndex)
                    && tempLayout[toIndex] == null))
                    return;
                _setCardToTempLayout(from, fromIndex, toIndex)
                break;
            case "OverLayout":
                if (!(_isCardTypeMatch(index, from, to, fromIndex, toIndex)
                    && _isCardNumberDecreaseByOne(index, from, to, fromIndex, toIndex)
                    && _isCardLastOne(index, from, fromIndex)))
                    return;
                _setCardToOverLayout(from, fromIndex, toIndex)
                break;
            default:
                break;
        }
    }

    const _isCardLastOne = (index: number, from: string, fromIndex: number): boolean => {
        if (from != 'QuestionLayout') return true;

        return index == questionLayout[fromIndex].length - 1;
    }

    const _isCardColorMatch = (index: number, from: string, to: string, fromIndex: number, toIndex: number): boolean => {
        let item;
        if (to != 'QuestionLayout') return true;
        if (questionLayout[toIndex].length == 0) return true;

        if (from == 'QuestionLayout') item = questionLayout[fromIndex][index];
        else if (from == 'TempLayout') item = tempLayout[fromIndex];
        else item = overLayout[fromIndex][index];

        if (item == null) return true;
        return PokerCard._isCardColorNotMatch(item, questionLayout[toIndex][questionLayout[toIndex].length - 1])
    }

    const _isCardNumberDecreaseByOne = (index: number, from: string, to: string, fromIndex: number, toIndex: number): boolean => {
        //from - 1 = to
        if (to != 'OverLayout') return true;

        let item;
        if (from == 'QuestionLayout') item = questionLayout[fromIndex][index];
        else if (from == 'TempLayout') item = tempLayout[fromIndex];
        else item = overLayout[fromIndex][index];

        if (item == null) return true;

        if (overLayout[toIndex].length == 0) return item.num == 1;
        return PokerCard._isCardNumberDecreaseByOne(item, overLayout[toIndex][overLayout[toIndex].length - 1])
    }

    const _isCardNumberIncreaseByOne = (index: number, from: string, to: string, fromIndex: number, toIndex: number): boolean => {
        //from + 1 = to
        if (to != 'QuestionLayout') return true;
        if (questionLayout[toIndex].length == 0) return true;

        let item;
        if (from == 'QuestionLayout') item = questionLayout[fromIndex][index];
        else if (from == 'TempLayout') item = tempLayout[fromIndex];
        else item = overLayout[fromIndex][index];

        if (item == null) return true;
        return PokerCard._isCardNumberIncreaseByOne(item, questionLayout[toIndex][questionLayout[toIndex].length - 1])
    }

    const _isCardTypeMatch = (index: number, from: string, to: string, fromIndex: number, toIndex: number): boolean => {
        if (to != 'OverLayout') return true;

        let item;
        if (from == 'QuestionLayout') item = questionLayout[fromIndex][index];
        else if (from == 'TempLayout') item = tempLayout[fromIndex];
        else item = overLayout[fromIndex][index];

        if (item == null) return true;
        if (overLayout[toIndex].length == 0) return item.type == CARDTYPE[toIndex];
        return PokerCard._isCardTypeMatch(item, overLayout[toIndex][overLayout[toIndex].length - 1]);
    }

    const _setCardToQuestionLayout = (index: number, from: string, fromIndex: number, toIndex: number) => {
        let newQuestionLayout = questionLayout;
        let instance: PokerCard | undefined | null;
        switch (from) {
            case "QuestionLayout":
                let cardlist = newQuestionLayout[fromIndex].slice(index)
                newQuestionLayout[fromIndex] = newQuestionLayout[fromIndex].slice(0, index)
                cardlist.forEach((item) => {
                    item.setNewTable("QuestionLayout", toIndex)
                    newQuestionLayout[toIndex].push(item);
                })
                dispatch(actions.setQuestionLayout(newQuestionLayout))
                break;
            case "TempLayout":
                let newTempLayout = tempLayout;
                instance = newTempLayout[fromIndex];
                if (instance == null) {
                    return
                }
                instance.setNewTable("QuestionLayout", toIndex)
                newQuestionLayout[toIndex].push(instance);
                newTempLayout[fromIndex] = null;
                dispatch(actions.setQuestionLayout(newQuestionLayout))
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            case "OverLayout":
                let newOverLayout: PokerCard[][] = overLayout;
                instance = newOverLayout[fromIndex].pop();
                if (!instance) {
                    return
                }
                instance.setNewTable("QuestionLayout", toIndex)
                newQuestionLayout[toIndex].push(instance);
                dispatch(actions.setQuestionLayout(newQuestionLayout))
                dispatch(actions.setOverLayout(newOverLayout))
                break;
            default:
                return
                break;
        }
    }

    const _setCardToTempLayout = (from: string, fromIndex: number, toIndex: number) => {
        let newTempLayout = tempLayout;
        let instance: PokerCard | undefined | null;
        switch (from) {
            case "QuestionLayout":
                let newQuestionLayout = questionLayout;
                instance = newQuestionLayout[fromIndex].pop();
                if (!instance) {
                    return
                }
                instance.setNewTable("TempLayout", toIndex)
                newTempLayout[toIndex] = instance;
                dispatch(actions.setQuestionLayout(newQuestionLayout))
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            case "TempLayout":
                instance = newTempLayout[fromIndex];
                if (instance == null) {
                    return
                }
                instance.setNewTable("TempLayout", toIndex)
                newTempLayout[toIndex] = instance;
                newTempLayout[fromIndex] = null;
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            case "OverLayout":
                let newOverLayout = overLayout;
                instance = newOverLayout[fromIndex].pop();
                if (!instance) {
                    return
                }
                instance.setNewTable("TempLayout", toIndex)
                newTempLayout[toIndex] = instance;
                dispatch(actions.setOverLayout(newOverLayout))
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            default:
                return
                break;
        }
    }

    const _setCardToOverLayout = (from: string, fromIndex: number, toIndex: number) => {
        let newOverLayout = overLayout;
        let instance: PokerCard | undefined | null;
        switch (from) {
            case "QuestionLayout":
                let newQuestionLayout = questionLayout;
                instance = newQuestionLayout[fromIndex].pop();
                if (!instance) {
                    return
                }
                instance.setNewTable("OverLayout", toIndex)
                newOverLayout[toIndex].push(instance);
                dispatch(actions.setOverLayout(newOverLayout))
                dispatch(actions.setQuestionLayout(newQuestionLayout))
                break;
            case "TempLayout":
                let newTempLayout = tempLayout;
                instance = newTempLayout[fromIndex];
                if (instance == null) {
                    return
                }
                instance.setNewTable("OverLayout", toIndex)
                newOverLayout[toIndex].push(instance);
                newTempLayout[fromIndex] = null;
                dispatch(actions.setOverLayout(newOverLayout))
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            case "OverLayout":
                instance = newOverLayout[fromIndex].pop();
                if (!instance) {
                    return
                }
                instance.setNewTable("OverLayout", toIndex)
                newOverLayout[toIndex].push(instance);
                dispatch(actions.setOverLayout(newOverLayout))
                break;
            default:
                break;
        }
    }

    const _handleOnDragEnd = (result: DropResult) => {
        setdraggingItemId('');

        if (!result.destination) {
            return
        }

        //result.destination.droppableId = {`table_${instance.tableType}_${instance.tableIndex}`}
        // result.draggableId={`card_${instance.tableType}_${instance.tableIndex}_${index}`}
        const draggableId = result.draggableId.split('_');
        const droppableId = result.destination.droppableId.split('_');

        _handleCardMove(
            parseInt(draggableId[3]),
            draggableId[1],
            droppableId[1],
            parseInt(draggableId[2]),
            parseInt(droppableId[2])
        );
    }

    const _onDragStart = (start: DragStart) => {
        const draggableId = start.draggableId.split('_');
        if (draggableId[1] == 'QuestionLayout') {
            setdraggingItemId(start.draggableId);
        }
    }

    return (
        <DragDropContext onBeforeDragStart={(start: DragStart) => { _onDragStart(start) }} onDragEnd={(result: DropResult) => _handleOnDragEnd(result)}>
            <TableBlock draggingItemId={draggingItemId} tempLayout={tempLayout} overLayout={overLayout} />
            <CardBlock draggingItemId={draggingItemId} questionLayout={questionLayout} />
        </DragDropContext>
    );
}

export default GameBlock;