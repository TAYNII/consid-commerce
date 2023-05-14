import React from "react";
import { Image } from "react-datocms/image";
import { StructuredText } from "react-datocms/structured-text";
import style from "../styles/Home.module.css";
import Link from "next/link";

// ALL PRODUCTS
const Products = (props) => {
  const { data } = props;
  const products = data.data.allProducts;

  return (
    <div className={style.container}>
      {products.map((p, i) => {
        return (
          <Link href={`/products/${p.id}`} key={i}>
            <div className={style.products}>
              <h2>{p.name}</h2>
              <Image
                className={style.image}
                data={p.mainImage.responsiveImage}
                alt={p.mainImage.responsiveImage.alt}
              />
              <div className={style.altImage}>
                {p.alternativeImages.map((a, id) => {
                  return (
                    <Image
                      key={id}
                      data={a.responsiveImage}
                      alt={a.responsiveImage.alt}
                    />
                  );
                })}
              </div>

              <h3>{p.price}:-</h3>
              <StructuredText data={p.description} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Products;
