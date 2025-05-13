import { CartItem } from "./CartItem";

export function CartList({ item}) {
  console.log(item);
  if (item.length === 0) {
    return (
      <div
        className="bg-light d-flex justify-content-center align-items-center text-muted rounded mb-4 "
        style={{ minHeight: "500px" }}
      >
        <p className="mb-0 h5">Your Cart is empty</p>
      </div>
    );
  }

  return (
    <div>
      {item.map((i, k) => (
        <CartItem key={k} item={i} />
      ))}
    </div>
  );
}
