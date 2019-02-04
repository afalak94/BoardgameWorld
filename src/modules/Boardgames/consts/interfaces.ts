interface GameData {
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
  key: string;
  value: string;
}

export interface Boardgame {
  key: string;
  value: GameData;
}
