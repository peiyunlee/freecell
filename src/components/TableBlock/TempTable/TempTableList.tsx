import PokerCard from '../../../lib/PokerCard';
import styles from '../../TableBlock/style.scss';
import TempTable from './TempTable';

interface MyProps {
    tempLayout: Array<PokerCard | null>,
    draggingItemId: string,
    children?: React.ReactNode,
}

function TempTableList(props: MyProps) {
    const { tempLayout,draggingItemId } = props;

    const _renderTable = (item: PokerCard | null, index: number) => {
        const propsToCard = {
            tableIndex: index,
            instance: item,
            draggingItemId: draggingItemId,
        }
        return <TempTable key={'temptable_' + index} {...propsToCard} />
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