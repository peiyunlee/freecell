import { IPokerCard } from './interface/IPokerCard'
import { CARDTYPE } from './constants/enum/CARDTYPE'

class PokerCard implements IPokerCard {
  type: string;
  typeNum: number;
  num: number;
  color: string;
  cardId: string;
  tableType: string;
  tableIndex: number;

  constructor(cardId: string, tableType: string, tableIndex: number) {
    this.type = this.getType(cardId);
    this.typeNum = this.getTypeNum(this.type)
    this.num = this.getNumber(cardId);
    this.color = this.getColor();
    this.tableIndex = tableIndex;
    this.tableType = tableType;
    this.cardId = cardId;
  }

  static _isCardColorNotMatch = (card1: PokerCard, card2: PokerCard): boolean => {
    return !(card1.color == card2.color)
  }

  static _isCardNumberDecreaseByOne = (card1: PokerCard, card2: PokerCard): boolean => {
    return card1.num - 1 == card2.num
  }

  static _isCardNumberIncreaseByOne = (card1: PokerCard, card2: PokerCard): boolean => {
    return card1.num + 1 == card2.num
  }

  static _isCardTypeMatch = (card1: PokerCard, card2: PokerCard): boolean => {
    return card1.type == card2.type
  }

  getType = (cardId: string): string => {
    return cardId.charAt(0);
  }

  getTypeNum = (type: string): number => {
    switch (type) {
      case 'S':
        return CARDTYPE.S;
        break;
      case 'H':
        return CARDTYPE.H;
        break;
      case 'D':
        return CARDTYPE.D;
        break;
      case 'C':
        return CARDTYPE.C;
        break;
      default:
        return 0
        break;
    }
  }

  getNumber = (cardId: string): number => {
    return parseInt(cardId.slice(1));
  }

  getColor = (): string => {
    switch (this.type) {
      case 'H':
        return 'RED';
      case 'S':
        return 'BLACK';
      case 'D':
        return 'RED';
      case 'C':
        return 'BLACK';
      default:
        return '';
    }
  }

  setNewTable = (tableType: string, tableIndex: number) => {
    this.tableType = tableType;
    this.tableIndex = tableIndex;
  }
}

export default PokerCard;