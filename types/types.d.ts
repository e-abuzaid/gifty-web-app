export type SigninForm = {
  email: string;
  password: string;
};

export type SignupForm = SigninForm & {
  firstName: string;
  lastName: string;
  picture?: string;
  repeatPassword: string;
};

export type Event = {
  _id?: string;
  user: string;
  name: string;
  people: string[];
  date: string;
  picture?: string;
  timeRemaining?: number;
  timeRemainingInText?: string;
};

export type Person = {
  _id?: string;
  user: string;
  name: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  relationship:
    | "Partner"
    | "Sibling"
    | "Friend"
    | "Nephew/Niece"
    | "Uncle/Aunt"
    | "In-Law";
  anniversary?: string;
  picture: string;
  occupation: string;
  interests?: string[];
};

export type User = {
  email: string;
  name: string;
  password: string;
  _id: string;
  picture: ?string;
  events: ?Event[];
  people: ?Person[];
};

export type Price = {
  beforePrice: ?number;
  currentPrice: number;
  discounted: boolean;
  priceSymbol: string;
  priceFraction: string;
};

export type ProductImage = {
  description: string;
  url: string;
};

export type ProductType = {
  _id: ?string;
  user: ?string;
  amazonChoice: boolean;
  amazonPrime: boolean;
  asin: string;
  bestSeller: boolean;
  image: ProductImage;
  leftInStock: ?number;
  name: string;
  position: number;
  price: Price;
  rating: ?number;
  sponsored: boolean;
  totalReviews: ?number;
  url: string;
};
