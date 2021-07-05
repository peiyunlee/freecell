
import { FC } from 'react';
import GameBlock from '../GameBlock/GameBlock';
import Menu from '../Menu/Menu';
import styles from './style.scss';

const App: FC = () => {
    return (
        <div className={styles.app}>
            <GameBlock />
            <Menu />
        </div>
    );
}

export default App;