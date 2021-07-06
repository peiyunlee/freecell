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

  static numberIsPowerUp = (cardId: string, num2: number): boolean => {
    return parseInt(cardId.slice(1)) === --num2
  }

  static compareType = (type: string, typeIndex: number): boolean => {
    return type === TYPE[typeIndex]
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