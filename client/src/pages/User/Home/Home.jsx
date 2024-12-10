import React from "react";
import List from "../../../components/List/List";
import ProductList from "../../../components/ProductList/ProductList";
import Banner from "../../../components/Banner/Banner";
import BannerTwo from "../../../components/Banner2/BannerTwo";
import ProductListTwo from "../../../components/ProductList2/ProductListTwo";
import "./Home.css"; // Ensure the correct path is provided

const Home = () => {
  return (
    <>
      <div style={{ padding: "20px" }}>
        <section style={{ marginBottom: "15px", marginTop: "120px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Banner />
          </div>
        </section>

        {/* Product Listings Section */}
        <section>
          <h2
            style={{
              textAlign: "center",
              marginTop: "35px",
              marginBottom: "70px",
            }}
            className="neon-border"
          >
            <span className="SpanTag">Featured Products</span>
          </h2>
          <List />
        </section>

        <section>
          <h2
            style={{
              textAlign: "center",
              marginTop: "70px",
              marginBottom: "70px",
            }}
            className="neon-border"
          >
            <span className="SpanTag">LATEST BIDS</span>
          </h2>
          <div className="neon-border">
            <ProductListTwo />
          </div>
        </section>

        <section>
          <div
            style={{
              textAlign: "center",
              marginTop: "70px",
              marginBottom: "70px",
            }}
          >
            <BannerTwo />
          </div>
        </section>

        <section>
          <h2
            style={{
              textAlign: "center",
              marginTop: "110px",
              marginBottom: "70px",
            }}
            className="neon-border"
          >
            <span className="SpanTag">More to explore</span>
          </h2>
          <ProductList />
        </section>
      </div>
    </>
  );
};

export default Home;
