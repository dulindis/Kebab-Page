const data = {
  products: [
    {
      name: "Adana Kebab",
      slug: "adana-kebab",
      category: "food",
      image: "/images/p1.jpg", // 679px × 829px
      price: 1590,
      currency: "ISK",
      countInStock: 10,
      flavour: "spicy",
      rating: 4.5,
      numReviews: 10,
      description:
        "A Turkish dish that consists of long, hand-minced meat kebab mounted on a wide iron skewer and grilled on an open mangal.",
    },
    {
      name: "Seekh Kebab",
      slug: "seesh-kebab",
      category: "food",
      image: "/images/p2.jpg",
      price: 2000,
      currency: "ISK",
      countInStock: 20,
      flavour: "mild",
      rating: 4.0,
      numReviews: 10,
      description:
        "One of the famous kebabs that are relished all over the world is Sheekh kebab. Mainly considered as appetizer or snack, it originated in the Indian subcontinent.",
    },
    {
      name: "Reshmi Kebab",
      slug: "reshmi-kebab",
      category: "food",
      image: "/images/p3.jpg",
      price: 2350,
      currency: "ISK",
      countInStock: 15,
      flavour: "mild",
      rating: 4.5,
      numReviews: 14,
      description:
        "The traditional Mughlai appetizer is succulent, juicy, silky-textured and delectable. Also known as malai kebab, it is usually made of large chunks of chicken that are marinated with yogurt, fresh cream, ground cashews, and almonds.",
    },
    {
      name: "Hariyali Kebab",
      slug: "hariyali-kebab",
      category: "food",
      image: "/images/p4.jpg",
      price: 1765,
      currency: "ISK",
      countInStock: 5,
      flavour: "spicy",
      rating: 4.5,
      numReviews: 10,
      description:
        "The famous starter is made with boneless chicken cubes or chunks infused in an aromatic green paste of coriander, mint, and other exotic spices. If you are a vegan you can use paneer instead of chicken and get it customized.",
    },
    {
      name: "Coca Cola",
      slug: "coca-cola",
      category: "drinks",
      image: "/images/p5.jpg",
      price: 300,
      currency: "ISK",
      flavour: "normal",
      rating: 4.5,
      numReviews: 10,
      description: "Coca cola drink.",
      variants: [
        {
          name: "Coca Cola Classic",
          slug: "coca-cola-classic",
          image: "/images/p7.jpg",
          countInStock: 5,
        },
        {
          name: "Coca Cola Light",
          slug: "coca-cola-classic",
          image: "/images/p6.jpg",
          countInStock: 2,
        },
        {
          name: "Coca Cola Zero",
          slug: "coca-cola-zero",
          image: "/images/p8.jpg",
          countInStock: 1,
        },
      ],
    },
  ],
};
export default data;
