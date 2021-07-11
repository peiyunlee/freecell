import PokerCard from '../../../lib/PokerCard';
import styles from '../../TableBlock/style.scss';
import TempTable from './TempTable';

interface MyProps {
    tempLayout: Array<PokerCard | null>,
    draggingItemId: string,
    handleCardMove:(index: number, from: string, to: string, fromIndex: number, toIndex: number) => void
    children?: React.ReactNode,
}

function TempTableList(props: MyProps) {
    const { tempLayout, draggingItemId,handleCardMove } = props;

    const _renderTable = (item: PokerCard | null, index: number) => {
        const propsToCard = {
            tableIndex: index,
            instance: item,
            draggingItemId: draggingItemId,
        }
        return <TempTable key={`temptable_${index}`} {...propsToCard} handleCardMove={handleCardMove}/>
    }

    return (
        <div className={`${styles.tablelist} ${styles.tablelist_left}`}>
            {tempLayout.map((item: PokerCard | null, index: number) => {
                return _renderTable(item, index);
            })}
        </div>
    );
}

export default TempTableList;