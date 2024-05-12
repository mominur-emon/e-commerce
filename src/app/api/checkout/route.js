// import { NextResponse } from "next/server";

// // Import Stripe with Secret Key
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const getActiveProduct = async () => {
//   const checkProducts = await stripe.products.list();
//   const availableProducts = checkProducts.data.filter(
//     (product) => product.active === true
//   );
//   return availableProducts;
// };
// export const POST = async (request) => {
//   try {
//     const { products } = await request.json();
//     const data = products;

//     let activeProducts = await getActiveProduct();

//     // Use map to create an array of promises
//     const createProductPromises = data.map(async (product) => {
//       const stripeProduct = activeProducts.find(
//         (stripeProduct) =>
//           stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
//       );

//       if (stripeProduct === undefined) {
//         try {
//           const prod = await stripe.products.create({
//             name: product.name,
//             default_price_data: {
//               unit_amount: product.price * 100,
//               currency: "usd",
//             },
//           });
//           console.log("Created product:", prod);
//         } catch (error) {
//           console.error("Error creating product:", error);
//         }
//       }
//     });

//     // Wait for all promises to resolve
//     await Promise.all(createProductPromises);

//     return NextResponse.json({ url: "" });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.error(
//       new Error("An error occurred while processing the request")
//     );
//   }
// };

// import { NextResponse } from "next/server";

// // Import Stripe with Secret Key
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const getActiveProduct = async () => {
//   const checkProducts = await stripe.products.list();
//   const availableProducts = checkProducts.data.filter(
//     (product) => product.active === true
//   );
//   return availableProducts;
// };
// export const POST = async (request) => {
//   try {
//     const { products } = await request.json();
//     const data = products;

//     let activeProducts = await getActiveProduct();

//     // Use map to create an array of promises
//     const createProductPromises = data.map(async (product) => {
//       const stripeProduct = activeProducts.find(
//         (stripeProduct) =>
//           stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
//       );

//       if (stripeProduct === undefined) {
//         try {
//           const prod = await stripe.products.create({
//             name: product.name,
//             default_price_data: {
//               unit_amount: product.price * 100,
//               currency: "usd",
//             },
//           });
//           console.log("Created product:", prod);
//         } catch (error) {
//           console.error("Error creating product:", error);
//         }
//       }
//     });

//     // Wait for all promises to resolve
//     await Promise.all(createProductPromises);

//     activeProducts = await getActiveProduct();
//     let stripeItems = [];
//     for (const product of data) {
//       const stripeProduct = activeProducts?.find(
//         stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
//       );

//       if (stripeProduct) {
//         stripeItems.push({
//           price: stripeProduct?.default_price,
//           quantity: product?.quantity,
//         });
//       }
//     }
//     const session = await stripe.checkout.sessions.create({
//       line_items: stripeItems,
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.error(
//       new Error("An error occurred while processing the request")
//     );
//   }
// };

import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getActiveProduct = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product) => product.active === true
  );
  return availableProducts;
};

export const POST = async (request) => {
  const { products } = await request.json();
  const data = products;

  // Example: Fetch products from Stripe
  // const prods = await stripe.products.list();
  // console.log(prods);
  let activeProducts = await getActiveProduct();

  try {
    for (const product of data) {
      const stripeProduct = activeProducts?.find(
        (stripeProduct) =>
          stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
      );
      //create new product
      if (stripeProduct == undefined) {
        const prod = await stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount: product.price * 100,
            currency: "usd",
          },
        });
      }
    }
  } catch (error) {
    console.error("Error in creating new product ", error);
  }

  //update product
  activeProducts = await getActiveProduct();
  let stripeItems = [];

  for (const product of data) {
    const stripeProduct = activeProducts?.find(
      (prod) => prod?.name?.toLowerCase() == product?.name?.toLowerCase()
    );
    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct?.default_price,
        quantity: product?.quantity,
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return NextResponse.json({ url: session.url });
};
