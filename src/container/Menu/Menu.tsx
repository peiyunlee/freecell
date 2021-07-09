import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/cardActions';
import styles from './style.scss';
import info from '../../assets/images/info.png'
import Button from '../../components/Button/Button';
import { restartGame } from '../../store/actions/cardActions';

interface MyProps {
    setModalShow: (modalType: number | null) => void,
    children?: React.ReactNode,
}

function Menu(props: MyProps) {
    const { setModalShow } = props;

    const dispatch = useDispatch();

    const clickNewGame = () => {
        setModalShow(2);
    }

    const clickRestart = () => {
        dispatch(actions.restartGame());
    }

    const clickHint = () => {
        //
    }

    const clickUndo = () => {
        //
    }

    return (
        <div className={styles.menu}>
            <div className={styles.gamestate}>
                <div className={styles.info} onClick={()=>{setModalShow(3)}}><img src={info} alt="" /></div>
                <div>TIME: 00:00</div>
                <div>SCORE: 0</div>
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