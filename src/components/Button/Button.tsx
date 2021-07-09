import React from 'react';
import styles from './style.scss';

interface MyProps {
    content: string,
    onClickFC: () => void,
    children?: React.ReactNode,
}

function Button(props: MyProps) {
    const { content, onClickFC } = props

    return (
        <button className={styles.button} onClick={() => onClickFC()}>{content}</button>
    );
}

export default Button;