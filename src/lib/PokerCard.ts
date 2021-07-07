import { IPokerCard } from './interface/IPokerCard'

enum TYPE {
  'S' = 0,
  'H',
  'D',
  'C'
}

class PokerCard implements IPokerCard {
  type: string;
  num: number;
  color: string;

  constructor(cardId: string) {
    this.type = this.getType(cardId);
    this.num = this.getNumber(cardId);
    this.color = this.getColor();
  }

  static numberIsPowerUp = (cardId1: string, num2: number): boolean => {
    return parseInt(cardId1.slice(1)) === --num2
  }

  static numberIsPowerDown = (cardId1: string, num2: number): boolean => {
    return parseInt(cardId1.slice(1)) === ++num2
  }

  static compareType = (type1: string, typeIndex2: number): boolean => {
    return type1 === TYPE[typeIndex2]
  };

  static compareColor = (cardId1: string, color2: string): boolean => {
    switch (cardId1.charAt(0)) {
      case 'H' || 'D':
        return 'RED' === color2;
      case 'S' || 'C':
        return 'BLACK' === color2;
      default:
        return true
        break;
    }
  };

  getType = (cardId: string): string => {
    return cardId.charAt(0);
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
}

export default PokerCard;