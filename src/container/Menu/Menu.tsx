import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as gameActions from '../../store/actions/gameActions';
import * as cardActions from '../../store/actions/cardActions';
import { storeTypes } from '../../store/configureStore';
import styles from './style.scss';
import info from '../../assets/images/info.png'
import Button from '../../components/Button/Button';

interface MyProps {
    setModalShow: (modalType: number | null) => void,
    children?: React.ReactNode,
}

function Menu(props: MyProps) {
    const gameStore = useSelector((store: storeTypes) => store.gameReducer)
    const cardStore = useSelector((store: storeTypes) => store.cardReducer)
    const dispatch = useDispatch();
    const { setModalShow } = props;

    const [time, settime] = useState("0:0");

    useEffect(() => {
        setInterval(() => {
            dispatch(gameActions.addSeconds());
        }, 1000)
    }, []);

    useEffect(() => {
        _transSecondsToTime(gameStore.seconds);
    }, [gameStore.seconds]);

    const clickNewGame = () => {
        setModalShow(2);
    }

    const clickRestart = () => {
        dispatch(cardActions.restartLayout());
        dispatch(gameActions.newGame());
    }

    const clickHint = () => {
        //
    }

    const clickUndo = () => {
        dispatch(cardActions.UndoStepCount())
    }

    const _transSecondsToTime = (seconds: number) => {
        const fillToTwoNum = (value: number) => {
            const str = String(value);
            return str.length === 1 ? `0${str}` : str;
        };
        settime(`${fillToTwoNum(Math.floor(seconds / 60))}:${fillToTwoNum(seconds % 60)}`);
    }

    return (
        <div className={styles.menu}>
            <div className={styles.gamestate}>
                <div className={styles.info} onClick={() => { setModalShow(3) }}><img src={info} alt="" /></div>
                <div>TIME: {time}</div>
                <div>SCORE: {gameStore.score}</div>
            </div>
            <div className={styles.gamecontroller}>
                <Button disable={false} content={"NEW GAME"} onClickFC={clickNewGame} />
                <Button disable={cardStore.stepCount > 0 ? false : true} content={"RESTART"} onClickFC={clickRestart} />
                <Button disable={true} content={"HINT"} onClickFC={clickHint} />
                <Button disable={cardStore.stepCount > 0 ? false : true} content={"UNDO"} onClickFC={clickUndo} />
            </div>
        </div>
    );
}

export default Menu;