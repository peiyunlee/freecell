import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { storeTypes } from '../../store/configureStore';
import styles from './style.scss';
import CardList from '../CardList/CardList';

interface IDispatcherProps {
    // deleteTodo: () => void;
    // toggleTodo: () => void;
    // editTodo: (text: string) => void;
}

const mapStateToProps = (store: storeTypes) => ({
    question: store.cardReducer.question,
});

const mapDispatcherToProps = (dispatch: Dispatch): IDispatcherProps => ({
    // deleteTodo: () => dispatch(actions.deleteTodo(ownProps.id)),
    // toggleTodo: () => dispatch(actions.toggleTodo(ownProps.id)),
    // editTodo: (text: string) => dispatch(actions.editTodo(ownProps.id, text))
});

export type ReduxType = ReturnType<typeof mapStateToProps>;

interface MyState {
    cardList: JSX.Element[]
}

class CardBlock extends React.Component<ReduxType, MyState> {
    state: MyState = {
        cardList: []
    }

    componentDidMount() {
        this._setCardQuestion();
    }

    render() {
        return (
            <div className={styles.cardblock}>
                {this.state.cardList}
            </div>
        );
    }

    _setCardQuestion() {
        const { question } = this.props;
        let list = [];
        for (let i = 0; i < 8; i++) {
            list.push(<CardList question={question[i]} key={"cardlist_" + i} />)
    }
        this.setState({ cardList: list })
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(CardBlock);