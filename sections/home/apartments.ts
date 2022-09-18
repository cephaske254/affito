import { Apartment } from "../../models/apartment";

const apartments: Apartment[] = [
  {
    name: "Opulence Apartments",
    price: 5673,
    per: "month",
    image: require("../../assets/images/01.webp"),
  },
  {
    name: "Amanda Apartments",
    price: 5673 / 4,
    per: "week",
    image: require("../../assets/images/02.webp"),
  },
  {
    name: "Double Swing Apartments",
    price: 5673,
    per: "month",
    image: require("../../assets/images/03.jpg"),
  },
  {
    name: "Rosewood Apartments",
    price: 5673,
    per: "month",
    image: require("../../assets/images/04.webp"),
  },
  {
    name: "Appa Apartments",
    price: 5673,
    per: "month",
    image: require("../../assets/images/05.jpg"),
  },
];

export { apartments };
