import '../styles/pages/CreditCardFeature.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ActionButton from '../components/ActionButton'
import CardScroll from '../components/CardScroll'
import Navbar from '../components/Navbar'
import TransactionHistory from '../components/TransactionHistory'
// import { useState } from 'react';
import { NavLink } from 'react-router-dom'

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
                        <CardScroll />
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