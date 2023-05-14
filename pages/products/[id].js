// import style from "../styles/Home.module.css";

import { Image } from "react-datocms/image";
import { request } from "../../lib/datocms";
import { StructuredText } from "react-datocms/structured-text";
import style from "../../styles/Home.module.css";
import Layout from "../../component/Layout";
import Link from "next/link";

// 1 PRODUCT
export default function Item(data) {
  return (
    <>
      <Layout>
        <div className={style.container2}>
          <Link className={style.backButton} href="/products">
            Tillbaka till produkter
          </Link>
          <div className={style.productContainer}>
            <div className={style.leftProductC}>
              <h2>{data.product.name}</h2>
              <Image
                data={data.product.mainImage.responsiveImage}
                alt={data.product.mainImage.responsiveImage.alt}
              />
              <div className={style.altImage2}>
                {data.product.alternativeImages.map((a, id) => {
                  return (
                    <Image
                      key={id}
                      data={a.responsiveImage}
                      alt={a.responsiveImage.alt}
                    />
                  );
                })}
              </div>
            </div>
            <div className={style.rightProductC}>
              <h3>{data.product.price}:-</h3>
              <StructuredText data={data.product.description} />
              <Link className={style.button} href="#">
                Köp
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  let paths = [];
  return {
    paths,
    fallback: "blocking",
  };
}
const PRODUCT_QUERY = `
query ProductQuery($id: ItemId) {
  product(filter: {id: {eq: $id}}) {
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
export async function getStaticProps({ params }) {
  const data = await request({
    query: PRODUCT_QUERY,
    variables: { id: params.id },
  });

  return {
    props: data,
    revalidate: 60,
  };
}
