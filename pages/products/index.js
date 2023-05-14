import React from "react";

import { request } from "../../lib/datocms";
import AllProducts from "../../component/AllProducts";
import Layout from "../../component/Layout";

// ALL PRODUCTS
const product = (props) => {
  return (
    <>
      <Layout>
        <AllProducts data={props} />
      </Layout>
    </>
  );
};

export default product;

const PRODUCTS_QUERY = `
query MyQuery($id: ItemId) {
  allProducts(filter: {id: {eq: $id}}) {
    id
    name
    price
    mainImage {
      responsiveImage(imgixParams: {w: "300"}) {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
    alternativeImages {
      responsiveImage(imgixParams: {w: "150"}) {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
    description {
      value
    }
  }
}
`;
export async function getStaticProps() {
  const data = await request({
    query: PRODUCTS_QUERY,
  });
  return {
    props: { data },
  };
}
