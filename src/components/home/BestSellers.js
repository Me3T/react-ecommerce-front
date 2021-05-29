import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]); // states are for storing data
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // useEffect runs when the page loads
    loadAllProducts(); // this function runs when the page loads
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    // it is a function which gets all the products from the backend
    setLoading(true);
    // sort,order,limit
    getProducts("sold", "desc", page).then((res) => {
      // getProductbycount is a functions in products page which gets data from backend
      setProducts(res.data); // recieved data is put in the setProducts state
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((
              product //* map is used to loop through the products
            ) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />{" "}
                {/* Product card is a component which forms a card like design it is taken from ant design*/}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </div>
  );
};

export default BestSellers;
