import { useContext } from "react";
import CartContext from "../context/CartContext";

interface CartItem {
  id: string | number;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const { cart, dispatch, totalPrice } = useContext(CartContext);

  return (
    <div className="container">

      <h2 className="mb-4">Your Cart</h2>

      {cart.map((item: CartItem) => (
        <div key={item.id} className="card mb-3 p-3">

          <div className="row align-items-center">

            <div className="col-md-2">
              <img src={item.thumbnail} className="img-fluid" />
            </div>

            <div className="col-md-4">
              <h6>{item.title}</h6>
              <p>₹ {item.price}</p>
            </div>

            <div className="col-md-3 d-flex gap-2">

              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}
              >
                -
              </button>

              <span className="fw-bold">{item.quantity}</span>

              <button
                className="btn btn-success btn-sm"
                disabled={item.quantity >= 5}
                onClick={() => dispatch({ type: "ADD", payload: item })}
              >
                +
              </button>

            </div>

          </div>

        </div>
      ))}

      <h4 className="text-end mt-4">
        Total: ₹ {totalPrice.toFixed(2)}
      </h4>

    </div>
  );
};

export default Cart;