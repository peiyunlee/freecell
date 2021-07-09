
import { FC, useState } from 'react';
import styles from './style.scss';
import GameBlock from '../../components/GameBlock/GameBlock';
import Modal from '../../components/Modal/Modal';
import Menu from '../Menu/Menu';

const App: FC = () => {
    const [modalShow, setmodalShow] = useState(false);
    const [modalType, setmodalType] = useState(0);

    const setModalShow = (modalType: number | null) => {
        if (modalType != null)
            setmodalType(modalType);
        setmodalShow(!modalShow);
    }

    return (
        <div className={styles.app}>
            {modalShow ? <Modal modalType={modalType} setModalShow={setModalShow} /> : <></>}
            <GameBlock setModalShow={setModalShow} />
            <Menu setModalShow={setModalShow} />
        </div>
    );
}

export default App;