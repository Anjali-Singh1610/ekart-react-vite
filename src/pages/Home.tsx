import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import type { CartResponse, ApiProduct } from "../types";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axiosInstance.get<CartResponse>("/carts");

        const allProducts = response.data.carts.flatMap(cart => cart.products);

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching carts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) return <h2 style={{ padding: 20 }}>Loading products...</h2>;

  return (
  <div className="container">
    <div className="row g-4">

      {products.map(product => (
        <div className="col-md-4 col-lg-3" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}

    </div>
  </div>
);
};

export default Home;