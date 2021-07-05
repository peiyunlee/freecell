import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './style.scss';
import TableBlock from '../../components/TableBlock/TableBlock';
import CardBlock from '../../components/CardBlock/CardBlock';

function GameBlock() {
    return (

        <DndProvider backend={HTML5Backend}>
            <div className={styles.gameblock}>
                <TableBlock />
                <CardBlock />
            </div>
        </DndProvider>
    );
}

export default GameBlock;