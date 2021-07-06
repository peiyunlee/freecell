
import { FC } from 'react';
import styles from './style.scss';
import GameBlock from '../../components/GameBlock/GameBlock';
import Menu from '../Menu/Menu';

const App: FC = () => {
    return (
        <div className={styles.app}>
            <GameBlock />
            <Menu />
        </div>
    );
}

export default App;