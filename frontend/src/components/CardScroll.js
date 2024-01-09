import React, { useRef } from 'react';
import { animated, interpolate, useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import move from 'lodash-move';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Cards from 'react-credit-cards-2'; 
import 'react-credit-cards-2/dist/es/styles-compiled.css'; 
import '../styles/components/CardScroll.css'; 

const cardData = [
  { cvc: '123', expiry: '2020', focus: '', name: 'tom', number: '5542123412341234' },
  { cvc: '246', expiry: '2021', focus: '', name: 'jerry', number: '6134123412341234' },
  { cvc: '369', expiry: '2022', focus: '', name: 'tim', number: '4343123412341234' },
  { cvc: '322', expiry: '2022', focus: '', name: 'trey', number: '3743123412341234' },
  { cvc: '387', expiry: '2022', focus: '', name: 'angus', number: '3643123412341234' },
  { cvc: '365', expiry: '2022', focus: '', name: 'bob', number: '6243123412341234' },
  { cvc: '324', expiry: '2022', focus: '', name: 'bailey', number: '3543123412341234' }
];

const config = { tension: 400, friction: 20 };
const CARD_RATIO = '63.1%';
const CARD_COUNT = cardData.length;
const CARD_OFFSET = -10;

const setScale = count => 1 - count / 20;

const setter = (order, curIndex, y, down) => index => {
  index = order.indexOf(index);
  const isBelow = y < -100;

  return down && index === curIndex
    ? {
        scale: isBelow ? setScale(CARD_COUNT) : 1,
        y,
        zIndex: isBelow ? 1 : CARD_COUNT + 1,
        config,
        immediate: key => key === 'y' || key === 'zIndex',
      }
    : {
        scale: setScale(index),
        y: index * CARD_OFFSET,
        zIndex: CARD_COUNT - index + 1,
        immediate: key => key === 'zIndex',
      };
};

const CardScroll = () => {
  const ref = useRef(null);
  const cardOrder = useRef(cardData.map((_, index) => index));

  const [springs, setSprings] = useSprings(
    CARD_COUNT,
    setter(cardOrder.current)
  );

  const bind = useDrag(event => {
    const {
      args: [origlIndex],
      down,
      movement: [, y],
    } = event;
    const curIndex = cardOrder.current.indexOf(origlIndex);
    const newOrder = move(cardOrder.current, 0, CARD_COUNT);
    disableBodyScroll(ref.current, { reserveScrollBarGap: true });

    if (!down) {
      cardOrder.current = newOrder;
      enableBodyScroll(ref.current);
    }

    setSprings(setter(cardOrder.current, curIndex, y, down));
  });

  return (
    <div className="wrap">
      <div ref={ref} className="card-wrap">
        {springs.map(({ scale, y, zIndex }, index) => {
          const card = cardData[index];

          return (
            <animated.div
              {...bind(index)}
              style={{
                borderRadius: '3% / 5%',
                cursor: 'grab',
                left: 0,
                paddingTop: CARD_RATIO,
                position: 'absolute',
                right: 0,
                transform: interpolate(
                  [y, scale],
                  (y, scale) => `translateY(${y}px) scale(${scale})`
                ),
                transformOrigin: 'top center',
                zIndex,
              }}
              key={index}
            >
              <Cards {...card} />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

export default CardScroll;
