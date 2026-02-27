import { useContext } from "react";
import CartContext from "../context/CartContext";
import type { ApiProduct } from "../types";

const ProductCard = ({ product }: { product: ApiProduct }) => {
  const { dispatch, getItemQuantity } = useContext(CartContext);
  const quantity = getItemQuantity(product.id);

  return (
    <div className="card h-100 shadow-sm">

      <img src={product.thumbnail} className="card-img-top p-3" />

      <div className="card-body text-center">

        <h6 className="card-title">{product.title}</h6>

        <p className="fw-bold">₹ {product.price}</p>

        {quantity === 0 ? (
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "ADD", payload: product })}
          >
            Add to Cart
          </button>
        ) : (
          <div className="d-flex justify-content-center align-items-center gap-2">

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => dispatch({ type: "DECREMENT", payload: product.id })}
            >
              -
            </button>

            <span className="fw-bold">{quantity}</span>

            <button
              className="btn btn-outline-success btn-sm"
              disabled={quantity >= 5}
              onClick={() => dispatch({ type: "ADD", payload: product })}
            >
              +
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProductCard;