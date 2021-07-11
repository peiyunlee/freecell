import React from 'react';
import styles from './style.scss';

interface MyProps {
    content: string,
    disable: boolean,
    onClickFC: () => void,
    children?: React.ReactNode,
}

function Button(props: MyProps) {
    const { disable, content, onClickFC } = props

    return (
        <button disabled={disable} className={disable ? `${styles.button_disable}` : `${styles.button}`} onClick={() => onClickFC()}>{content}</button>
    );
}

export default Button;