import React, { Component } from 'react';
import { ConcatenationScope, Module } from 'webpack';
import styles from './style.scss';
import A from '../../assets/images/cards/C1.png'


interface IImagesKeys {
    [key: string]: any
}

const requireContext = require.context("../../assets/images/cards", false, /^\.\/.*\.png$/);

let images: IImagesKeys = {}

requireContext.keys().map((item: string) => {
    let property = item.replace('./', '').replace('.png', '')
    images[property] = requireContext(item).default;
});

interface MyProps {
    question: string[]
}

interface MyState {
    cardList: JSX.Element[]
}

class CardList extends React.Component<MyProps, MyState> {
    state: MyState = {
        cardList: []
    }

    componentDidMount() {
        this._setCard();
    }

    render() {
        return (
            <div className={styles.cardlist}>
                {this.state.cardList}
            </div>
        );
    }

    _setCard() {
        const { question } = this.props;

        let list = [];

        for (let i = 0; i < question.length; i++) {
            let cardId: string[] = question[i].split('_');

            let type: string;
            switch (cardId[0]) {
                case 'spades': type = 'S';
                    break;
                case 'heart': type = 'H';
                    break;
                case 'diamond': type = 'D';
                    break;
                case 'club': type = 'C';
                    break;
                default:
                    return;
                    break;
            }

            list.push(<img key={'card' + question[i]} src={images[type.concat('', cardId[1])]} alt="" />)
        }

        this.setState({ cardList: list })
    }
}

export default CardList;