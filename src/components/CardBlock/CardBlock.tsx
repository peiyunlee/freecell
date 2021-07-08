import styles from './style.scss';
import CardList from './CardList';
import PokerCard from '../../lib/PokerCard';

interface MyProps {
    questionLayout: PokerCard[][],
    children?: React.ReactNode,
}

function CardBlock(props: MyProps) {
    const { questionLayout } = props;

    const _renderCardList = (item: PokerCard[], index: number) => {
        const propsToCardList = {
            questionLayoutColumn: item,
            tableIndex: index,
        }
        return <CardList {...propsToCardList} key={"cardlist_" + index} />
    }

    return (
        <div className={styles.cardblock}>
            {questionLayout.map((item: PokerCard[], index: number) => { return _renderCardList(item, index) })}
        </div>
    );
}

export default CardBlock;