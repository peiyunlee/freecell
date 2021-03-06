import styles from './style.scss';
import CardList from './CardList';
import PokerCard from '../../lib/PokerCard';

interface MyProps {
    questionLayout: PokerCard[][],
    draggingItemId: string,
    handleCardMove:(index: number, from: string, to: string, fromIndex: number, toIndex: number) => void
    children?: React.ReactNode,
}

function CardBlock(props: MyProps) {
    const { questionLayout, draggingItemId,handleCardMove } = props;

    const _renderCardList = (item: PokerCard[], index: number) => {
        const propsToCardList = {
            questionLayoutColumn: item,
            draggingItemId: draggingItemId,
            tableIndex: index,
        }
        return <CardList {...propsToCardList} key={"cardlist_" + index} handleCardMove={handleCardMove} />
    }

    return (
        <div className={styles.cardblock}>
            {questionLayout.map((item: PokerCard[], index: number) => { return _renderCardList(item, index) })}
        </div>
    );
}

export default CardBlock;