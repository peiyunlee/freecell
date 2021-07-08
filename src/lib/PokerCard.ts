import { IPokerCard } from './interface/IPokerCard'

enum TYPE {
  'S' = 0,
  'H',
  'D',
  'C',
}

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

  // static numberIsPowerUp = (cardId1: string, num2: number): boolean => {
  //   return parseInt(cardId1.slice(1)) === --num2
  // }

  // static numberIsPowerDown = (cardId1: string, num2: number): boolean => {
  //   return parseInt(cardId1.slice(1)) === ++num2
  // }

  // static compareType = (type1: string, typeIndex2: number): boolean => {
  //   return type1 === TYPE[typeIndex2]
  // };

  // static compareColor = (cardId1: string, color2: string): boolean => {
  //   switch (cardId1.charAt(0)) {
  //     case 'H' || 'D':
  //       return 'RED' === color2;
  //     case 'S' || 'C':
  //       return 'BLACK' === color2;
  //     default:
  //       return true
  //       break;
  //   }
  // };

  getType = (cardId: string): string => {
    return cardId.charAt(0);
  }

  getTypeNum = (type: string): number => {
    switch (type) {
      case 'S':
        return TYPE.S;
        break;
      case 'H':
        return TYPE.H;
        break;
      case 'D':
        return TYPE.D;
        break;
      case 'C':
        return TYPE.C;
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