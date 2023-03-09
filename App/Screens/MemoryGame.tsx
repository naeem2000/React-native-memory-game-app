import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const symbols = ['🍎', '🍉', '🍇', '🍓', '🥭', '🍊', '🍌', '🥝'];

export default function App() {
  const [cards, setCards] = useState<any>(shuffle([...symbols, ...symbols]));
  const [flippedCards, setFlippedCards] = useState<any>([]);
  const [solvedCards, setSolvedCards] = useState<any>([]);

  const handleCardPress = (index: any) => {
    if (flippedCards.length === 2 || solvedCards.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [cardIndex1, cardIndex2] = newFlippedCards;
      const [card1, card2] = [cards[cardIndex1], cards[cardIndex2]];

      if (card1 === card2) {
        setSolvedCards([...solvedCards, cardIndex1, cardIndex2]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleNewGamePress = () => {
    setCards(shuffle([...symbols, ...symbols]));
    setFlippedCards([]);
    setSolvedCards([]);
  };

  const renderCard = (index: React.Key | null | undefined) => {
    const isFlipped = flippedCards.includes(index);
    const isSolved = solvedCards.includes(index);
    const cardSymbol = isFlipped || isSolved ? cards[index] : '❓';

    return (
      <TouchableOpacity
        key={index}
        style={[styles.card, isFlipped && styles.flippedCard]}
        onPress={() => handleCardPress(index)}
        disabled={isFlipped || isSolved}>
        <Text style={styles.cardText}>{cardSymbol}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <View style={styles.cardContainer}>
        {cards.map((_: any, index: any) => renderCard(index))}
      </View>
      <TouchableOpacity
        style={styles.newGameButton}
        onPress={handleNewGamePress}>
        <Text style={styles.newGameButtonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const shuffle = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 70,
    height: 70,
    margin: 10,
    backgroundColor: '#DDD',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flippedCard: {
    backgroundColor: '#6FCF97',
  },
  cardText: {
    fontSize: 30,
  },
  newGameButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6FCF97',
    borderRadius: 5,
  },
  newGameButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
