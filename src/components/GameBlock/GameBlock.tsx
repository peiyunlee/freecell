import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult, DragStart } from 'react-beautiful-dnd'
import { storeTypes } from '../../store/configureStore';
import * as cardActions from '../../store/actions/cardActions';
import * as gameActions from '../../store/actions/gameActions';
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
    const dispatch = useDispatch();
    const { setModalShow } = props;

    useEffect(() => {
        if (store.steps.length == store.stepCount) return;
        const step = store.steps[store.steps.length - 1];
        if (step) {
            _handleCardMove(step.resultIndex, step.to, step.from, step.toIndex, step.fromIndex, true, -step.score)
        }
    }, [store.stepCount])

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
        _setCardCanAuto(questionLayout);
        setoverLayout(store.overLayout)
        if (_isGameFinish()) {
            setModalShow(0)
        }
    }, [store.overLayout])

    const _isGameFinish = () => {
        var result = false;
        result = overLayout.every((item) => item.length == 13)
        return result;
    }

    const [draggingItemId, setdraggingItemId] = useState<string>('');

    const _setCardCanAuto = (layout: PokerCard[][]): PokerCard[][] => {
        var temp = layout;
        temp.map((item) => {
            item.map((item, index) => {
                item.setCanAuto(_isCardNumberDecreaseByOne(index, item.tableType, "OverLayout", item.tableIndex, item.typeNum));
            })
        })
        return layout;
    }

    const _handleCardMove = (index: number, from: string, to: string, fromIndex: number, toIndex: number, isUndo: boolean = false, score: number = 0) => {
        switch (to) {
            case "QuestionLayout":
                if (!(_isCardColorMatch(index, from, to, fromIndex, toIndex)
                    && _isCardNumberIncreaseByOne(index, from, to, fromIndex, toIndex)) && !isUndo)
                    return;
                _setCardToQuestionLayout(index, from, to, fromIndex, toIndex, isUndo, score)
                break;
            case "TempLayout":
                if (!(_isCardLastOne(index, from, fromIndex)
                    && tempLayout[toIndex] == null) && !isUndo)
                    return;
                _setCardToTempLayout(index, from, to, fromIndex, toIndex, isUndo, score)
                break;
            case "OverLayout":
                if (!(_isCardTypeMatch(index, from, to, fromIndex, toIndex)
                    && _isCardNumberDecreaseByOne(index, from, to, fromIndex, toIndex)
                    && _isCardLastOne(index, from, fromIndex)) && !isUndo)
                    return;
                _setCardToOverLayout(index, from, to, fromIndex, toIndex, isUndo, score)
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
        var item;
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

        var item;
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

        var item;
        if (from == 'QuestionLayout') item = questionLayout[fromIndex][index];
        else if (from == 'TempLayout') item = tempLayout[fromIndex];
        else item = overLayout[fromIndex][index];

        if (item == null) return true;
        return PokerCard._isCardNumberIncreaseByOne(item, questionLayout[toIndex][questionLayout[toIndex].length - 1])
    }

    const _isCardTypeMatch = (index: number, from: string, to: string, fromIndex: number, toIndex: number): boolean => {
        if (to != 'OverLayout') return true;

        var item;
        if (from == 'QuestionLayout') item = questionLayout[fromIndex][index];
        else if (from == 'TempLayout') item = tempLayout[fromIndex];
        else item = overLayout[fromIndex][index];

        if (item == null) return true;
        if (overLayout[toIndex].length == 0) return item.type == CARDTYPE[toIndex];
        return PokerCard._isCardTypeMatch(item, overLayout[toIndex][overLayout[toIndex].length - 1]);
    }

    const _setCardToQuestionLayout = (index: number, from: string, to: string, fromIndex: number, toIndex: number, isUndo: boolean, score = 0) => {
        var newQuestionLayout = questionLayout;
        var newTempLayout = tempLayout;
        var newOverLayout = overLayout;
        var instance: PokerCard | undefined | null;
        var resultIndex = newQuestionLayout[toIndex].length;
        switch (from) {
            case "QuestionLayout":
                var cardlist = newQuestionLayout[fromIndex].slice(index)
                newQuestionLayout[fromIndex] = newQuestionLayout[fromIndex].slice(0, index)
                cardlist.forEach((item) => {
                    item.setNewTable("QuestionLayout", toIndex)
                    newQuestionLayout[toIndex].push(item);
                })
                dispatch(cardActions.setQuestionLayout(newQuestionLayout))
                score = -5;
                break;
            case "TempLayout":
                instance = newTempLayout[fromIndex];
                if (instance == null) {
                    return false;
                }
                instance.setNewTable("QuestionLayout", toIndex)
                newQuestionLayout[toIndex].push(instance);
                newTempLayout[fromIndex] = null;
                dispatch(cardActions.setQuestionLayout(newQuestionLayout))
                dispatch(cardActions.setTempLayout(newTempLayout))
                break;
            case "OverLayout":
                instance = newOverLayout[fromIndex].pop();
                if (!instance) {
                    return false;
                }
                instance.setNewTable("QuestionLayout", toIndex)
                newQuestionLayout[toIndex].push(instance);
                dispatch(cardActions.setQuestionLayout(newQuestionLayout))
                dispatch(cardActions.setOverLayout(newOverLayout))
                break;
            default:
                return false;
        }
        if (isUndo)
            dispatch(cardActions.UndoStep());
        else
            dispatch(cardActions.AddStep({ resultIndex, from, to, fromIndex, toIndex, score }));
        dispatch(gameActions.addScore(score));
    }

    const _setCardToTempLayout = (index: number, from: string, to: string, fromIndex: number, toIndex: number, isUndo: boolean, score = 0) => {
        var newQuestionLayout = questionLayout;
        var newTempLayout = tempLayout;
        var newOverLayout = overLayout;
        var instance: PokerCard | undefined | null;
        var resultIndex = 0;
        switch (from) {
            case "QuestionLayout":
                instance = newQuestionLayout[fromIndex].pop();
                if (!instance) {
                    return false;
                }
                instance.setNewTable("TempLayout", toIndex)
                newTempLayout[toIndex] = instance;
                dispatch(cardActions.setQuestionLayout(newQuestionLayout))
                dispatch(cardActions.setTempLayout(newTempLayout))
                score = -5;
                break;
            case "TempLayout":
                instance = newTempLayout[fromIndex];
                if (instance == null) {
                    return false;
                }
                instance.setNewTable("TempLayout", toIndex)
                newTempLayout[toIndex] = instance;
                newTempLayout[fromIndex] = null;
                dispatch(cardActions.setTempLayout(newTempLayout))
                break;
            case "OverLayout":
                instance = newOverLayout[fromIndex].pop();
                if (!instance) {
                    return false;
                }
                instance.setNewTable("TempLayout", toIndex)
                newTempLayout[toIndex] = instance;
                dispatch(cardActions.setOverLayout(newOverLayout))
                dispatch(cardActions.setTempLayout(newTempLayout))
                score = -100;
                break;
            default:
                return false;
        }
        if (isUndo)
            dispatch(cardActions.UndoStep())
        else
            dispatch(cardActions.AddStep({ resultIndex, from, to, fromIndex, toIndex, score }));
        dispatch(gameActions.addScore(score));
    }

    const _setCardToOverLayout = (index: number, from: string, to: string, fromIndex: number, toIndex: number, isUndo: boolean, score = 0) => {
        var newQuestionLayout = questionLayout;
        var newTempLayout = tempLayout;
        var newOverLayout = overLayout;
        var instance: PokerCard | undefined | null;
        var resultIndex = newOverLayout[toIndex].length;
        switch (from) {
            case "QuestionLayout":
                instance = newQuestionLayout[fromIndex].pop();
                if (!instance) {
                    return false;
                }
                instance.setNewTable("OverLayout", toIndex)
                newOverLayout[toIndex].push(instance);
                dispatch(cardActions.setOverLayout(newOverLayout))
                dispatch(cardActions.setQuestionLayout(newQuestionLayout))
                score = 50;
                break;
            case "TempLayout":
                instance = newTempLayout[fromIndex];
                if (instance == null) {
                    return false;
                }
                instance.setNewTable("OverLayout", toIndex)
                newOverLayout[toIndex].push(instance);
                newTempLayout[fromIndex] = null;
                dispatch(cardActions.setOverLayout(newOverLayout))
                dispatch(cardActions.setTempLayout(newTempLayout))
                score = 50;
                break;
            case "OverLayout":
                instance = newOverLayout[fromIndex].pop();
                if (!instance) {
                    return false;
                }
                instance.setNewTable("OverLayout", toIndex)
                newOverLayout[toIndex].push(instance);
                dispatch(cardActions.setOverLayout(newOverLayout))
                break;
            default:
                return false;
        }
        if (isUndo)
            dispatch(cardActions.UndoStep())
        else
            dispatch(cardActions.AddStep({ resultIndex, from, to, fromIndex, toIndex, score }));
        dispatch(gameActions.addScore(score));
    }

    const _handleOnDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        setdraggingItemId('');

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        //result.destination.droppableId = {`table_${instance.tabvarype}_${instance.tableIndex}`}
        // result.draggableId={`card_${instance.tabvarype}_${instance.tableIndex}_${index}`}
        const draggableId = result.draggableId.split('_');
        const droppableId = destination.droppableId.split('_');

        _handleCardMove(
            parseInt(draggableId[3]),
            draggableId[1],
            droppableId[1],
            parseInt(draggableId[2]),
            parseInt(droppableId[2]),
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
            <TableBlock draggingItemId={draggingItemId} tempLayout={tempLayout} overLayout={overLayout} handleCardMove={_handleCardMove} />
            <CardBlock draggingItemId={draggingItemId} questionLayout={questionLayout} handleCardMove={_handleCardMove} />
        </DragDropContext>
    );
}

export default GameBlock;