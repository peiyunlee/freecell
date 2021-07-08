import styles from './style.scss';
import logo from '../../assets/images/king_happy.png'
import TempTableList from './TempTable/TempTableList'
import OverTableList from './OverTable/OverTableList'
import PokerCard from '../../lib/PokerCard';

interface MyProps {
    tempLayout: Array<PokerCard | null>,
    overLayout: PokerCard[][]
    children?: React.ReactNode,
}

function TableBlock(props: MyProps) {
    const { tempLayout, overLayout } = props;

    return (
        <div className={styles.tableblock}>
            <TempTableList tempLayout={tempLayout}/>
            <div className={styles.logo}>
                <img src={logo} alt="" />
                <h1>FREECELL</h1>
            </div>
            <OverTableList overLayout={overLayout}/>
        </div>
    );
}

export default TableBlock;