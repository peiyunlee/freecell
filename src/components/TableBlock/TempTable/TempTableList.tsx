import PokerCard from '../../../lib/PokerCard';
import styles from '../../TableBlock/style.scss';
import TempTable from './TempTable';

interface MyProps {
    tempLayout: Array<PokerCard | null>,
    children?: React.ReactNode,
}

function TempTableList(props: MyProps) {
    const { tempLayout } = props;

    const _renderTable = (item: PokerCard | null, index: number) => {
        let propsToCard = {
            tableIndex: index,
            instance: item,
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