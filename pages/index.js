import { Image } from "react-datocms/image";
import { request } from "../lib/datocms";
import style from "../styles/Home.module.css";
import { StructuredText } from "react-datocms/structured-text";
import Head from "next/head";
import { renderMetaTags } from "react-datocms/seo";
import Layout from "../component/Layout";

// STARTSIDA
export default function Home(props) {
  const { data } = props;
  const startpage = data.startpage;
  return (
    <>
      <Head>{renderMetaTags(startpage.seo)}</Head>
      <Layout>
        <div className={style.main}>
          <h1 className={style.title}>{startpage.title}</h1>
          <Image
            className={style.mainImage}
            data={startpage.mainImage.responsiveImage}
            alt={startpage.mainImage.responsiveImage.alt}
          />
          <StructuredText
            data={startpage.content}
            className={style.description}
          />
        </div>
      </Layout>
    </>
  );
}

const STARTPAGE_QUERY = `
query MyQuery {
  startpage {
    title
    mainImage {
      responsiveImage(imgixParams: {w: "500"}) {
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
    content {
      value
    }
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
  }
}
`;

export async function getStaticProps() {
  const data = await request({
    query: STARTPAGE_QUERY,
  });
  return {
    props: { data },
  };
}
