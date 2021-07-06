import styles from './style.scss';
import logo from '../../assets/images/king_happy.png'
import TempTableList from './TempTable/TempTableList'
import OverTableList from './OverTable/OverTableList'

interface MyProps {
    tempLayout: string[],
    overLayout: string[][]
    handleCardMove: (from: string, to: string, fromIndex: number, toIndex: number) => void,
    children?: React.ReactNode,
}

function TableBlock(props: MyProps) {
    const { tempLayout, overLayout, handleCardMove } = props;

    return (
        <div className={styles.tableblock}>
            <TempTableList tempLayout={tempLayout} handleCardMove={handleCardMove} />
            <div className={styles.logo}>
                <img src={logo} alt="" />
                <h1>FREECELL</h1>
            </div>
            <OverTableList overLayout={overLayout} handleCardMove={handleCardMove} />
        </div>
    );
}

export default TableBlock;