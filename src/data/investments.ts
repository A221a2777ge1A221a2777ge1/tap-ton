export type Investment = {
  id: string;
  name: string;
  price: number;
  income: number;
};

export const investments: Investment[] = [
  { id: "gold_mine", name: "Gold Mine", price: 1000, income: 1 },
  { id: "oil_well", name: "Oil Well", price: 15000, income: 10 },
  { id: "diamond_mine", name: "Diamond Mine", price: 250000, income: 90 },
  { id: "cobalt_mine", name: "Cobalt Mine", price: 5000000, income: 850 },
];
