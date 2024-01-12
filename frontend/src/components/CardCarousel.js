import React, { useState } from 'react';
import Cards from 'react-credit-cards-2'; 
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../styles/components/Carousel.css'
import CreditCardTransaction from './CreditCardTransactionHistory';
  
const maskCardNumber = (number) => {
  const cardLength = number.length;
  const firstFourDigits = number.slice(0, 4);
  const lastFourDigits = number.slice(-4);
  const maskedDigits = '*'.repeat(cardLength - 8); // Replace middle digits with asterisks
  return `${firstFourDigits}${maskedDigits}${lastFourDigits}`;
};

const maskCVC = (cvc) => {
  return '*'.repeat(cvc.length); // Replace all CVV digits with asterisks
};

const Carousel = ( {transactions, cards} ) => {

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [transactionData, setTransactionData] = useState({
    0: [], // Initialize with an empty array for each card index
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  });

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const handleTransactionUpdate = (cardIndex, newTransactions) => {
    setTransactionData((prevData) => ({
      ...prevData,
      [cardIndex]: newTransactions,
    }));
  };

  const maskedCardNumber = maskCardNumber(cards[currentCardIndex].number);
  const maskedCVC = maskCVC(cards[currentCardIndex].cvc);

  return (
    <div className="carousel-container">
      <Cards {...cards[currentCardIndex]} 
      number={maskedCardNumber}
      cvc={maskedCVC}/>
      <div className="button-container">
        <button onClick={handlePrevCard}>Previous</button>
        <button onClick={handleNextCard}>Next</button>
      </div>
      <CreditCardTransaction
        selectedCard={currentCardIndex}
        transactions={transactions}
        cards={cards} // Pass the 'cards' array here
      />
    </div>
  );
};

export default Carousel;