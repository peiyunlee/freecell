import styles from './style.scss';
import CardList from './CardList';

interface MyProps {
    questionLayout: string[][],
    handleCardMove: (from: string, to: string, fromIndex: number, toIndex: number) => void,
    children?: React.ReactNode,
}

function CardBlock(props: MyProps) {
    const { questionLayout, handleCardMove } = props;

    const _renderCardList = (item: string[], index: number) => {
        const propsToCardList = {
            questionLayoutColumn: item,
            handleCardMove,
            tableIndex: index,
        }
        return <CardList {...propsToCardList} key={"cardlist_" + index} />
    }

    return (
        <div className={styles.cardblock}>
            {questionLayout.map((item: string[], index: number) => { return _renderCardList(item, index) })}
        </div>
    );
}

export default CardBlock;