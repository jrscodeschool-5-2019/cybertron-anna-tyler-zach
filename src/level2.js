import {test} from 'tape-modern';
import hex2color from './lib/hex2color';
import {map, filter, reduce, compose} from 'ramda';

export default function() {
  /* Level 2 - colors */

  const ex1 =
    'Use map and the hex2color function to convert list of hex values to list of colors';
  const exercise1 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500'];
    const result = map(hex2color, hexes);
    return result;
  };

  const ex2 =
    'Use filter and the hex2color function to filter list of hex values to only list colors that are not blue, red, or green';
  const exercise2 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500'];
    function RGBfilter(colors) {
      const colorName = hex2color(colors);
      if (colorName === 'red' || colorName === 'blue' || colorName === 'green') {
        return false;
      } else {
        return true;
      }
    }
    const result = filter(RGBfilter, hexes);
    return result;
  };

  const ex3 =
    'Use reduce and the hex2color function to count list of hex values than have r in their name';
  const exercise3 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500'];
    const colorNames = map(hex2color, hexes);
    const containsR = color => {
      if (color.includes('r')) {
        return true;
      } else {
        return false;
      }
    };
    const filterer = filter(containsR, colorNames);
    const reducerFunction = (acc, value) => {
      return acc + 1;
    };
    const result = reduce(reducerFunction, 0, filterer);
    return result;
  };

  const ex4 =
    'Use map, filter and reduce with compose to convert all hex codes to colors then filter out (blue, red, green) and count all the colors that contain a "b"';
  const exercise4 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500'];
    const colorNames = map(hex2color);
    const RGBfilter = color =>
      color !== 'red' && color !== 'blue' && color !== 'green';
    const colorFilter = filter(RGBfilter);
    const colorReduce = reduce((acc, color) => {
      if (color.includes('b')) {
        acc = acc + 1;
      }
      return acc;
    }, 0);
    const result = compose(
      colorReduce,
      colorFilter,
      colorNames
    );
    return result(hexes);
  };

  /* tests to validate exercises go here */
  test('Level 2', assert => {
    assert.deepequals(
      exercise1(),
      ['blue', 'beige', 'peru', 'rebeccapurple', 'orange'],
      ex1
    );
    assert.deepequals(
      exercise2(),
      ['#f5f5dc', '#cd853f', '#663399', '#ffa500'],
      ex2
    );
    assert.equal(exercise3(), 3, ex3);
    assert.equal(exercise4(), 2, ex4);
  });
}
