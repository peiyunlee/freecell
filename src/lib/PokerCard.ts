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
      case 'H' || 'D':
        return 'RED';
      case 'S' || 'C':
        return 'BLACK';
      default:
        return '';
        break;
    }
  }

  setNewTable = (tableType: string, tableIndex: number) => {
    this.tableType = tableType;
    this.tableIndex = tableIndex;
  }
}

export default PokerCard;