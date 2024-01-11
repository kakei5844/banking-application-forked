import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/components/CardCarousel.css'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const cardData = [
    { cvc: '123', expiry: '2020', focus: '', name: 'tom', number: '5542123412341234' },
    { cvc: '246', expiry: '2021', focus: '', name: 'jerry', number: '6134123412341234' },
    { cvc: '369', expiry: '2022', focus: '', name: 'tim', number: '4343123412341234' },
    { cvc: '322', expiry: '2022', focus: '', name: 'trey', number: '3743123412341234' },
    { cvc: '387', expiry: '2022', focus: '', name: 'angus', number: '3643123412341234' },
    { cvc: '365', expiry: '2022', focus: '', name: 'bob', number: '6243123412341234' },
    { cvc: '324', expiry: '2022', focus: '', name: 'bailey', number: '3543123412341234' }
];

const CardCarousel = () => {
    return (
        <div className="container">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className='swiper-container'
            >
                {cardData.map((card, cardIndex) => (
                    <SwiperSlide key={cardIndex}>
                        <div className="card-item">
                            <Cards
                                cvc={card.cvc}
                                expiry={card.expiry}
                                focus={card.focus}
                                name={card.name}
                                number={card.number}
                            />
                        </div>
                    </SwiperSlide>
                ))}

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow"></div>
                    <div className="swiper-button-next slider-arrow"></div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default CardCarousel;
