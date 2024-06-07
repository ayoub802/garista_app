import { atom } from 'jotai';

export const notificationsAtom = atom([]);
export const restoAtom = atom([]);
export const orderAtom = atom([]);
export const userId = atom(null);
export const restoId = atom(null);
export const cartAtom = atom([]);
export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});