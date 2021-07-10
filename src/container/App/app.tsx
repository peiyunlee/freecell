
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as gameActions from '../../store/actions/gameActions';
import styles from './style.scss';
import GameBlock from '../../components/GameBlock/GameBlock';
import Modal from '../../components/Modal/Modal';
import Menu from '../Menu/Menu';

function App(){
    const [isModalShow, setisModalShow] = useState(false);
    const [modalType, setmodalType] = useState(0);
    const dispatch = useDispatch();

    const setModalShow = (modalType: number | null) => {
        if (modalType != null)
            setmodalType(modalType);
        setisModalShow(!isModalShow);
        dispatch(gameActions.pauseGame(!isModalShow));
    }

    return (
        <div className={styles.app}>
            {isModalShow ? <Modal modalType={modalType} setModalShow={setModalShow} /> : <></>}
            <GameBlock setModalShow={setModalShow} />
            <Menu setModalShow={setModalShow}/>
        </div>
    );
}

export default App;