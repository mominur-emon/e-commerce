import Cart from "@/components/Cart";
import Product from "@/components/Product";

const products = [
  {
    id: "1",
    name: "DryCake",
    price: 67,
    quantity: 0,
  },
  {
    id: "2",
    name: "Mojo",
    price: 99.98,
    quantity: 0,
  },
  {
    id: "3",
    name: "Drinko",
    price: 25,
    quantity: 0,
  },
  {
    id: "4",
    name: "cocola",
    price: 65,
    quantity: 0,
  },
  {
    id: "5",
    name: "banana",
    price: 5,
    quantity: 0,
  },
  {
    id: "6",
    name: "mango",
    price: 31.36,
    quantity: 0,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl ">E-Commerce Cart Systems</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Cart />
      </div>
    </main>
  );
}
