import React from "react";
import Jumbotron from "./components/cards/Jumbotron";
import CategoryList from "./components/category/CategoryList";
import BestSellers from "./components/home/BestSellers";
import NewArrivals from "./components/home/NewArrivals";
import SubList from "./components/sub/SubList";

const Home = () => {
  return (
    <div>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron
          text={["The Tech Store", "Recently Launched", "Best Sellers"]}
        />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        Best Sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        Sub Categories
      </h4>
      <SubList />

      <br />
      <br />
    </div>
  );
};

export default Home;