import { NextResponse } from "next/server";

// Import Stripe with Secret Key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (request) => {
  try {
    // Access JSON payload from the request
    const { products } = await request.json();

    // Example: Log the products received
    console.log(products);

    // Example: Fetch products from Stripe
    const prods = await stripe.products.list();
    console.log(prods);

    // Return a JSON response
    return NextResponse.json({
      url: "",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return NextResponse.error(
      new Error("An error occurred while processing the request")
    );
  }
};

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
