import React from "react";
import ProductListTwo from "../../../components/ProductList2/ProductListTwo";
import ProductList from "../../../components/ProductList/ProductList";
import Header from "./SubComponent/BidHeader";
import SlideDeisgn from "../../../components/SlideDeisgn/SlideDeisgn";
import BannerFour from "../../../components/Banner4/BannerFour";
import ChatQNA from "../../../components/ChatQNA/ChatQNA";
import "./BidAnItem.css";

const BidAnItem = () => {
  return (
    <div className="BidAnItem">
      <ChatQNA />
      <section>
        <Header />
        <SlideDeisgn />
        <h2
          style={{
            textAlign: "center",
            marginTop: "70px",
            marginBottom: "70px",
          }}
          className=" neon-border"
        >
          <span className="SpanTag">More items to consider</span>
        </h2>
        <ProductListTwo />

        <h2
          style={{
            textAlign: "center",
            marginTop: "70px",
            marginBottom: "70px",
          }}
          className=" neon-border"
        >
          <span className="SpanTag">Today or Tommorow ? </span>
        </h2>

        <BannerFour />
        <h2
          style={{
            textAlign: "center",
            marginTop: "110px",
            marginBottom: "70px",
          }}
          className=" neon-border"
        >
          <span className="SpanTag">You may like</span>
        </h2>
        <ProductList />
      </section>
    </div>
  );
};

export default BidAnItem;
