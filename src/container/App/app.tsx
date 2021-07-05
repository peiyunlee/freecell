
import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './style.scss';
import TableBlock from '../../components/TableBlock/TableBlock';
import CardBlock from '../../components/CardBlock/CardBlock';
import Menu from '../Menu/Menu';

const App: FC = () => {
    return (
        <div className={styles.app}>
            <DndProvider backend={HTML5Backend}>
                <TableBlock />
                <CardBlock />
            </DndProvider>
            <Menu />
        </div>
    );
}

export default App;