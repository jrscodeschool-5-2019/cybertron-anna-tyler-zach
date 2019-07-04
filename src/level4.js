import { test } from 'tape-modern'
import getCards from './lib/get-cards'
import { map, filter, reduce, compose } from 'ramda'

export default function() {
  const ex1 = 'Use map to transform list of card data to list of images'
  const exercise1 = _ => {
    const data = getCards()

    const getImage = card => {
      return `<img src=${card.image} />`
    }
    const result = map(getImage, data.cards)
    return result
  }

  const ex2 = 'Use filter to filter list of cards of the suit clubs'
  const exercise2 = _ => {
    const data = getCards()
    const getClubs = card => {
      return card.suit === 'CLUBS'
    }
    const result = filter(getClubs, data.cards)
    return result
  }

  const ex3 =
    'Use reduce and count the number of cards that have a value of 8 or value of 6'
  const exercise3 = _ => {
    const data = getCards()
    // console.log(JSON.stringify(data.cards, null, 2))
    const cardCounter = (acc, card) => {
      if (card.value === '8' || card.value === '6') {
        acc = acc + 1
      }
      return acc
    }
    const result = reduce(cardCounter, 0, data.cards)
    return result
  }

  const ex4 = `Use map, filter and reduce with compose
    to show all cards as images that contain values of 8 or 6`
  const exercise4 = _ => {
    const data = getCards()
    const stringMaker = reduce((str, card) => {
      str = str + card
      return str
    }, '')
    const imgMaker = map(card => {
      return `<img src=${card.image} />`
    })
    const cardCounter = filter(card => {
      return card.value === '8' || card.value === '6'
    })
    const result = compose(
      stringMaker,
      imgMaker,
      cardCounter
    )
    return result(data.cards)
  }

  /* tests to validate exercises go here */
  test('Level 4', assert => {
    assert.deepequals(
      exercise1(),
      [
        '<img src=http://deckofcardsapi.com/static/img/6H.png />',
        '<img src=http://deckofcardsapi.com/static/img/7H.png />',
        '<img src=http://deckofcardsapi.com/static/img/KS.png />',
        '<img src=http://deckofcardsapi.com/static/img/2D.png />',
        '<img src=http://deckofcardsapi.com/static/img/QS.png />',
        '<img src=http://deckofcardsapi.com/static/img/0C.png />',
        '<img src=http://deckofcardsapi.com/static/img/8H.png />',
        '<img src=http://deckofcardsapi.com/static/img/JD.png />',
        '<img src=http://deckofcardsapi.com/static/img/8C.png />'
      ],
      ex1
    )

    assert.deepequals(
      exercise2(),
      [
        {
          code: '0C',
          image: 'http://deckofcardsapi.com/static/img/0C.png',
          images: {
            png: 'http://deckofcardsapi.com/static/img/0C.png',
            svg: 'http://deckofcardsapi.com/static/img/0C.svg'
          },
          suit: 'CLUBS',
          value: '10'
        },
        {
          code: '8C',
          image: 'http://deckofcardsapi.com/static/img/8C.png',
          images: {
            png: 'http://deckofcardsapi.com/static/img/8C.png',
            svg: 'http://deckofcardsapi.com/static/img/8C.svg'
          },
          suit: 'CLUBS',
          value: '8'
        }
      ],
      ex2
    )
    assert.equal(exercise3(), 3, ex3)
    assert.equal(
      exercise4(),
      '<img src=http://deckofcardsapi.com/static/img/6H.png /><img src=http://deckofcardsapi.com/static/img/8H.png /><img src=http://deckofcardsapi.com/static/img/8C.png />',
      ex4
    )
  })
}
