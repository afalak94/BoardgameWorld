export interface GameData {
  category: [];
  description: string;
  id?: number;
  imgUrl: string;
  name: string;
  onSale: boolean;
  price: string;
  salePrice: string;
  score: string;
}

export interface CategoryInterface {
  key: string | null;
  value: string;
}

export interface Boardgame {
  key: string | null;
  value: GameData;
}
