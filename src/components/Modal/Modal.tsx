import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/cardActions';
import styles from './style.scss';
import happyImg from '../../assets/images/king_happy.png'
import joyImg from '../../assets/images/king_joy.png'
import sadImg from '../../assets/images/king_sad.png'
import angryImg from '../../assets/images/king_angry.png'
import Button from '../Button/Button'
import { newGame, restartGame } from '../../store/actions/cardActions';

const content = [
    {
        img: joyImg,
        title: 'CONGRATULATIONS!',
        content: ['You win the game!'],
        btn: ["PLAY AGAIN", "NEW GAME"]
    },
    {
        img: sadImg,
        title: 'NO MORE MOVES!',
        content: ['There are no moves available.'],
        btn: ["RESTART", "NEW GAME", "UNDO"]
    },
    {
        img: angryImg,
        title: 'START A NEW GAME!',
        content: ['Are you sure you want to give up?'],
        btn: ["NEW GAME"]
    },
    {
        img: happyImg,
        title: 'FREE CELL',
        content: ['1.將紙牌移動到某一欄時的順序必須為由大到小，而且是不同的顏色（即黑、紅兩種顏色）。',
            '2.  將紙牌移至本位欄框時，必須以相同花色，將牌按照從低（A）到高（K）的順序移動。',
            '3. 某欄最底端的紙牌可移到空白欄框、另一欄的最底端或本位欄框。',
            '4. 空白欄框中的紙牌可移至某一欄的最底端或本位欄框。',],
        btn: []
    }
]

interface MyProps {
    modalType: number,
    setModalShow: (modalType: number | null) => void,
    children?: React.ReactNode,
}

function Modal(props: MyProps) {
    const { modalType, setModalShow } = props;

    const dispatch = useDispatch();

    const setClickFC = (title: string) => {
        switch (title) {
            case "PLAY AGAIN":
                return _clickPlayAgain;
            case "NEW GAME":
                return _clickNewGame;
            case "RESTART":
                return _clickRestart;
            case "UNDO":
                return _clickUndo;
            default:
                return () => { };
        }
    }

    const _clickPlayAgain = () => {
        dispatch(actions.restartGame());
    }

    const _clickNewGame = () => {
        dispatch(actions.newGame());
        setModalShow(1);
    }

    const _clickRestart = () => {
        dispatch(actions.restartGame());
    }

    const _clickUndo = () => {
        //
    }

    return (
        <div className={styles.modal_wrapper}>
            <div className={modalType == 3 ? `${styles.modal} ${styles.modal3}` : `${styles.modal}`}>
                <div className={styles.closebtn} onClick={() => setModalShow(null)}>
                    <div className={`${styles.line} ${styles.line1}`}></div>
                    <div className={`${styles.line} ${styles.line2}`}></div>
                </div>
                <img src={content[modalType].img} alt="" />
                <div className={styles.title}>{content[modalType].title}</div>
                <div className={modalType == 3 ? `${styles.content} ${styles.content3}` : `${styles.content}`}>
                    {content[modalType].content.map((item, index) => {
                        return (<span key={index}>{item}<br /><br /></span>)
                    })}
                </div>
                <div className={styles.btn_wrapper}>
                    {content[modalType].btn.map((item, index) => {
                        const onClickFC = setClickFC(item);
                        return <Button key={"modalbtn" + index} content={item} onClickFC={onClickFC} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Modal;