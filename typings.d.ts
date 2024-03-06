interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  images: Image[];
  price: number;
  reviews: Review[];
  categories: Category[];
  collections: Collection[];
}

interface Image {
  width: number;
  height: number;
  url: string;
  key: string;
}

interface Review {
  headline: ReactNode;
  id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
}

interface Collection {
  id: number;
  name: string;
}
