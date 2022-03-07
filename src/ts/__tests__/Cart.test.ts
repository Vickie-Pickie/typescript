import Cart from '../service/Cart';
import Movie from '../domain/Movie';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('в корзину можно положить фильм', () => {
  const cart = new Cart();
  const movie = new Movie(1, "Avengers", 2000, '', 2017, "USA", ['action', 'fantasy'], 150);
  cart.add(movie);
  expect(cart.items).toEqual([movie]);
});

test('в корзину можно положить несколько фильмов', () => {
  const cart = new Cart();
  const movie1 = new Movie(1, "Avengers", 2000, '', 2017, "USA", ['action', 'fantasy'], 150)
  const movie2 = new Movie(2, "Spiderman", 2000, '', 2017, "USA", ['action', 'fantasy'], 150)
  const movie3 = new Movie(3, "Titanic", 2000, '', 2017, "USA", ['action', 'fantasy'], 150)

  cart.add(movie1);
  expect(cart.items).toEqual([movie1]);
  cart.add(movie2);
  expect(cart.items).toEqual([movie1, movie2]);
  cart.add(movie3);
  expect(cart.items).toEqual([movie1, movie2, movie3]);
});

test('Общая стоимость товаров в корзине считается верно', () => {
  const cart = new Cart();
  const movie1 = new Movie(1, "Avengers", 2000, '', 2017, "USA", ['action', 'fantasy'], 150)
  const movie2 = new Movie(2, "Spiderman", 1000, '', 2017, "USA", ['action', 'fantasy'], 150)
  const movie3 = new Movie(3, "Titanic", 1500, '', 2017, "USA", ['action', 'fantasy'], 150)

  cart.add(movie1);
  expect(cart.totalPrice).toBe(2000);
  cart.add(movie2);
  expect(cart.totalPrice).toBe(3000);
  cart.add(movie3);
  expect(cart.totalPrice).toEqual(4500);
});


test.each([
  [2000, 20, 1600],
  [1000, 50, 500],
  [100, 10, 90],
])('Товар в корзине с ценой %i с учетом скидки %i стоит %i', (price: number, discount: number, expected: number) => {
  const cart = new Cart();
  const movie1 = new Movie(1, "Avengers", price, '', 2017, "USA", ['action', 'fantasy'], 150);
  cart.add(movie1);
  const received = cart.getDiscountedPrice(discount);
  expect(received).toBe(expected);
});

test('Товар из корзины удален', () => {
  const cart = new Cart();
  const movie1 = new Movie(1, "Avengers", 2000, '', 2017, "USA", ['action', 'fantasy'], 150)
  const movie2 = new Movie(2, "Spiderman", 1000, '', 2017, "USA", ['action', 'fantasy'], 150)
  const movie3 = new Movie(3, "Titanic", 1500, '', 2017, "USA", ['action', 'fantasy'], 150)

  cart.add(movie1);
  cart.add(movie2);
  cart.add(movie3);
  cart.removeItem(1);
  expect(cart.items).toEqual([movie2, movie3]);
});
