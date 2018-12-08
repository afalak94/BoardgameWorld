//adding item to cart
export function addToCart(item) {
  return { type: 'ADD', payload: item };
}
