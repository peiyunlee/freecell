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
    const store = useSelector((store: storeTypes) => store.gameReducer)
    const dispatch = useDispatch();
    const { setModalShow } = props;
    const [score, setscore] = useState(store.score);
    
    useEffect(() => {
        setscore(store.score);
    }, [store.score]);

    const [time, settime] = useState("0:0");

    useEffect(() => {
        setInterval(() => {
            dispatch(gameActions.addSeconds());
        }, 1000)
    }, []);

    useEffect(() => {
        _transSecondsToTime(store.seconds);
    }, [store.seconds]);

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
        //
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
                <div>SCORE: {score}</div>
            </div>
            <div className={styles.gamecontroller}>
                <Button content={"NEW GAME"} onClickFC={clickNewGame} />
                <Button content={"RESTART"} onClickFC={clickRestart} />
                <Button content={"HINT"} onClickFC={clickHint} />
                <Button content={"UNDO"} onClickFC={clickUndo} />
            </div>
        </div>
    );
}

export default Menu;