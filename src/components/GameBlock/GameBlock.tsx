import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult, DragStart } from 'react-beautiful-dnd'
import { storeTypes } from '../../store/configureStore';
import * as actions from '../../store/actions/cardActions';
import TableBlock from '../../components/TableBlock/TableBlock';
import CardBlock from '../../components/CardBlock/CardBlock';
import PokerCard from '../../lib/PokerCard';

function GameBlock() {
    const store = useSelector((store: storeTypes) => store.cardReducer)
    const [questionLayout, setquestionLayout] = useState<PokerCard[][]>(store.questionLayout)

    useEffect(() => {
        setquestionLayout(store.questionLayout)
        console.log(store.questionLayout)
    }, [store.questionLayout])

    const [tempLayout, settempLayout] = useState<Array<PokerCard | null>>(store.tempLayout)

    useEffect(() => {
        settempLayout(store.tempLayout)
        console.log(store.tempLayout)
    }, [store.tempLayout])

    const [overLayout, setoverLayout] = useState<PokerCard[][]>(store.overLayout)

    useEffect(() => {
        setoverLayout(store.overLayout)
        console.log(store.overLayout)
    }, [store.overLayout])

    const [draggingItemId, setdraggingItemId] = useState<string>('');

    const dispatch = useDispatch();

    const handleCardMove = (index: number, from: string, to: string, fromIndex: number, toIndex: number) => {
        switch (to) {
            case "QuestionLayout":
                _setCardToQuestionLayout(index, from, fromIndex, toIndex)
                break;
            case "TempLayout":
                _setCardToTempLayout(index, from, fromIndex, toIndex)
                break;
            case "OverLayout":
                _setCardToOverLayout(index, from, fromIndex, toIndex)
                break;
            default:
                break;
        }
    }

    const _setCardToQuestionLayout = (index: number, from: string, fromIndex: number, toIndex: number) => {
        let newQuestionLayout = questionLayout;
        let instance: PokerCard | undefined | null;
        switch (from) {
            case "QuestionLayout":
                //要檢查Layout可不可以放
                let cardlist = newQuestionLayout[fromIndex].slice(index)
                newQuestionLayout[fromIndex] = newQuestionLayout[fromIndex].slice(0, index)
                cardlist.forEach((item) => {
                    item.setNewTable("QuestionLayout", toIndex)
                    newQuestionLayout[toIndex].push(item);
                })
                dispatch(actions.setQuestionLayout(newQuestionLayout))
                break;
            case "TempLayout":
                //要檢查Lable是不是空 && 卡片是不是一張
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
                //要檢查數字花色 && 卡片是不是一張
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

    const _setCardToTempLayout = (index: number, from: string, fromIndex: number, toIndex: number) => {
        let newTempLayout = tempLayout;
        let instance: PokerCard | undefined | null;
        switch (from) {
            case "QuestionLayout":
                //要檢查是不是多個
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
                instance.setNewTable("OverLayout", toIndex)
                newTempLayout[toIndex] = instance;
                dispatch(actions.setOverLayout(newOverLayout))
                dispatch(actions.setTempLayout(newTempLayout))
                break;
            default:
                return
                break;
        }
    }

    const _setCardToOverLayout = (index: number, from: string, fromIndex: number, toIndex: number) => {
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
        if (result.draggableId.split('_')[1] == 'QuestionLayout')
            setdraggingItemId('');

        //result.destination.droppableId = {`table_${instance.tableType}_${instance.tableIndex}`}
        // result.draggableId={`card_${instance.tableType}_${instance.tableIndex}_${index}`}
        if (!result.destination) {
            return
        }

        const draggableId = result.draggableId.split('_');
        const droppableId = result.destination.droppableId.split('_');

        handleCardMove(
            parseInt(draggableId[3]),
            draggableId[1],
            droppableId[1],
            parseInt(draggableId[2]),
            parseInt(droppableId[2]));
    }

    const _onDragStart = (start: DragStart) => {
        if (start.draggableId.split('_')[1] == 'QuestionLayout')
            setdraggingItemId(start.draggableId);
    }

    return (
        <DragDropContext onBeforeDragStart={(start: DragStart) => { _onDragStart(start) }} onDragEnd={(result: DropResult) => _handleOnDragEnd(result)}>
            <TableBlock draggingItemId={draggingItemId} tempLayout={tempLayout} overLayout={overLayout} />
            <CardBlock draggingItemId={draggingItemId} questionLayout={questionLayout} />
        </DragDropContext>
    );
}

export default GameBlock;