import '../styles/pages/CreditCardFeature.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ActionButton from '../components/ActionButton'
import CardScroll from '../components/CardScroll'
import Navbar from '../components/Navbar'
import TransactionHistory from '../components/TransactionHistory'
// import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import Carousel from '../components/CardCarousel'
import { useState } from 'react'

const CreditCardFeature = () => {

    // const bankAccountNumber = '1234 5678 9012 3456'

    // const creditCards = ['Card 1', 'Card 2', 'Card 3']; // Replace with your credit card data

    // // Dropdown
    // const initialSelectedCard = '1234 5678 9012 3456';

    // const [selectedCard, setSelectedCard] = useState(initialSelectedCard);

    // const cardList = [
    //     { cardNumber: '1234 5678 9012 3456', cardHolder: 'John Doe', expiryDate: '12/23', cardType: 'Visa' },
    //     { cardNumber: '9876 5432 1098 7654', cardHolder: 'Jane Doe', expiryDate: '11/22', cardType: 'MasterCard' },
    //     // Add more cards as needed
    // ];

    // const handleCardSelect = (cardNumber) => {
    //     setSelectedCard(cardNumber);
    // };

    const [transactions, setTransactions] = useState([
        // Transactions data as you have it in the Carousel component
        {
          paymentType: 'Credit Card',
          amount: '$50.00',
          merchantCode: '902',
          status: 'Completed',
          datetime: '2022-01-10T08:00:00',
          cardNumber: '5542123412341234',
        },
        {
          paymentType: 'Credit Card',
          amount: '$25.00',
          merchantCode: '902',
          status: 'Pending',
          datetime: '2022-01-10T08:15:00', // Replace with the actual datetime
          cardNumber: '5542123412341234', // Card number without masking
        },
        {
          paymentType: 'Credit Card',
          amount: '$80.00',
          merchantCode: '902',
          status: 'Failed',
          datetime: '2022-01-10T08:30:00', // Replace with the actual datetime
          cardNumber: '5542123412341234', // Card number without masking
        },
        {
          paymentType: 'Credit Card',
          amount: '$80.00',
          merchantCode: '902',
          status: 'Failed',
          datetime: '2022-02-10T08:30:00', // Replace with the actual datetime
          cardNumber: '5542123412341234', // Card number without masking
        },
        {
          paymentType: 'Credit Card',
          amount: '$80.00',
          merchantCode: '902',
          status: 'Failed',
          datetime: '2024-01-10T08:30:00', // Replace with the actual datetime
          cardNumber: '5542123412341234', // Card number without masking
        },
      ]);
    
      const [cards, setCards] = useState([
        {
          number: '4111111111111111',
          name: 'John Doe',
          expiry: '12/23',
          cvc: '123',
          focus: 'number',
        },
        { cvc: '123', expiry: '2020', focus: '', name: 'tom', number: '5542123412341234' },
        { cvc: '246', expiry: '2021', focus: '', name: 'jerry', number: '6134123412341234' },
        { cvc: '369', expiry: '2022', focus: '', name: 'tim', number: '4343123412341234' },
        { cvc: '322', expiry: '2022', focus: '', name: 'trey', number: '374312341234125' },
        { cvc: '387', expiry: '2022', focus: '', name: 'angus', number: '36431234123434' },
        { cvc: '365', expiry: '2022', focus: '', name: 'bob', number: '6243123412341234' },
        { cvc: '324', expiry: '2022', focus: '', name: 'bailey', number: '3543123412341234' }
        // Add other card data as needed
      ]);

    return (
        <div className="CreditCardPage">
            <div className='left-column'>
                <Navbar />
            </div>

            <div className='right-column'>
                <div className='top'>
                <h1>Credit Card</h1>
                </div>

                <div className='middle'>
                    <div className='card-display'>
                    <Carousel transactions={transactions} cards={cards} />
                    </div>
                    <div className='credit-card-button-list'>
                        <ActionButton>
                        <i className='bi bi-credit-card' />
                        <span className='ms-2'>Cards</span>
                        </ActionButton>
                        <ActionButton>
                        <i className='bi bi-gift' />
                        <span className='ms-2'>Cashback</span>
                        </ActionButton>
                    </div>
                </div>
                <hr />
                <div className='bottom'>
                    <div className='bottom-left'>
                        <h2>Transaction History</h2>
                        <TransactionHistory />
                    </div>
                    <div className='bottom-right'>
                    <div className='button-list'>
                            <NavLink to="/credit-cards">
                                <ActionButton>
                                    <i className='bi bi-credit-card' />
                                    <span className='ms-2'>Cards</span>
                                </ActionButton>
                            </NavLink>
                            <ActionButton>
                                <i className='bi bi-gift' />
                                <span className='ms-2'>Cashback</span>
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreditCardFeature;