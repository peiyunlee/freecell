import styles from '../../TableBlock/style.scss';
import TempTable from './TempTable';

interface MyProps {
    tempLayout: string[],
    handleCardMove: (from: string, to: string, fromIndex: number, toIndex: number) => void,
    children?: React.ReactNode,
}

function TempTableList(props: MyProps) {
    const { tempLayout, handleCardMove } = props;

    const _renderTable = (item: string, index: number) => {
        let propsToCard = {
            handleCardMove: handleCardMove,
            tableIndex: index,
            cardId: item,
        }
        return <TempTable key={'temptable_' + index} {...propsToCard} />
    }

    return (
        <div className={`${styles.tablelist} ${styles.tablelist_left}`}>
            {tempLayout.map((item: string, index: number) => {
                return _renderTable(item, index);
            })}
        </div>
    );
}

export default TempTableList;