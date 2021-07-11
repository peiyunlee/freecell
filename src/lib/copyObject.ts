import PokerCard from "./PokerCard";

export const copyObjectProperties = (properties:PokerCard[][]) : PokerCard[][] => {
    return properties.map((item, i) => {
        return item.map((item, j) => {
            return item;
        })
    })
}