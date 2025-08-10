export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 44900,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.HdFzMBPOKKKvmqjw28b1NAHaE7?w=300&h=300&c=7",
    category: "Phone",
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 74900,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.hz-sCwdtIL3FA9riLKJjKQHaFj?w=300&h=300&c=7",
    category: "Laptop",
  },
  {
    id: 3,
    name: "iPad Air",
    price: 23900,
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-model-unselect-gallery-1-202405_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=80&.v=azZtTlRzREZ3NzhWaHRDQW5YeUV0UEs0TkxxOFYxN2dtSHJMdW5sNDFVOEtiMHY1dmF4VytTZDhOL2dEbXE1ZFBTRzhFbXhrSlpyaVYxRTU4VUZ2NXlaSE1Qa0haZTFvMWVJTkxjaWwxSnhzU2tBRmNTUk5NcFVzTHFXWkV1NXNCbUhBVEg3d3ovajZBUmEvZU1rb1NR&traceId=1",
    category: "Tablet",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 15900,
    image: "https://media.studio7thailand.com/153509/Apple_Watch_Series_9_GPS_45mm_Midnight_Aluminum_Midnight_Sport_Band_1.png",
    category: "Watch",
  },
  {
    id: 5,
    name: "AirPods Pro (2nd Gen)",
    price: 8990,
    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQD83?wid=600&hei=600&fmt=jpeg&qlt=90&.v=1660803972361",
    category: "Audio",
  },
  {
    id: 6,
    name: "Apple Vision Pro",
    price: 124900,
    image: "https://dl.lnwfile.com/heol90.webp",
    category: "AR",
  },
];
