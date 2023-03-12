import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

const emojis = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😆',
  '😇',
  '😉',
  '😊',
  '🙂',
  '🙃',
  '😋',
  '😌',
  '😍',
];

const MemoryGame = () => {
  const [cards, setCards] = useState<any>([]);
  const [selectedCards, setSelectedCards] = useState<any>([]);
  const [score, setScore] = useState<any>(0);

  useEffect(() => {
    const shuffledEmojis = shuffle(emojis.concat(emojis));
    const initialCards = shuffledEmojis.map((emoji: any, index: any) => ({
      id: index,
      emoji: emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setSelectedCards([]);
    setScore(0);
  }, []);

  const shuffle = (array: string | any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const flipCard = (id: any) => {
    const newCards = [...cards];
    const selectedCard = newCards.find(card => card.id === id);

    if (selectedCard.isMatched || selectedCards.length === 2) {
      return;
    }

    selectedCard.isFlipped = true;
    setSelectedCards([...selectedCards, selectedCard]);

    if (selectedCards.length === 1) {
      if (selectedCard.emoji === selectedCards[0].emoji) {
        selectedCard.isMatched = true;
        selectedCards[0].isMatched = true;
        setScore(score + 2);
      } else {
        setTimeout(() => {
          selectedCard.isFlipped = false;
          selectedCards[0].isFlipped = false;
          setScore(score - 1);
        }, 1000);
      }
      setSelectedCards([]);
    }
    setCards(newCards);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.gameBoard}>
        {cards.map(
          (card: {
            id: React.Key | null | undefined;
            isFlipped: any;
            isMatched: any;
            emoji:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                card.isFlipped ? styles.cardFlipped : null,
                card.isMatched ? styles.cardMatched : null,
              ]}
              onPress={() => flipCard(card.id)}
              disabled={
                card.isFlipped || card.isMatched || selectedCards.length === 2
              }>
              {card.isFlipped && !card.isMatched && (
                <Text style={styles.cardText}>{card.emoji}</Text>
              )}
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 5,
    width: 60,
    height: 60,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 40,
  },
  cardFlipped: {
    backgroundColor: '#fff',
  },
  cardMatched: {
    backgroundColor: '#8cff66',
  },
});

export default MemoryGame;
