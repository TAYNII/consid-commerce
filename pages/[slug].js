import style from "../styles/Home.module.css";
import { Image } from "react-datocms/image";
import { request } from "../lib/datocms";
import { StructuredText } from "react-datocms/structured-text";
import Head from "next/head";
import { renderMetaTags } from "react-datocms/seo";
import Layout from "../component/Layout";

// ABOUT OCH CONTACT
export default function Page({ data }) {
  const page = data.allPages[0];

  return (
    <>
      <Head>{renderMetaTags(page.seo)}</Head>
      <Layout>
        <div className={style.main}>
          <h1>{page.title}</h1>

          <div>
            <Image
              className={style.mainImage}
              data={page.mainImage.responsiveImage}
              alt={page.mainImage.responsiveImage.alt}
            />
            <StructuredText data={page.content} />
          </div>
        </div>
      </Layout>
    </>
  );
}

const PATH_QUERY = `
query MyQuery {
    allPages {
      slug
    }
  }
  
`;

export async function getStaticPaths() {
  let paths = [];

  return {
    paths,
    fallback: "blocking",
  };
}
const PAGES_QUERY = `
  query MyQuery($slug: String) {
  allPages(filter: {slug: {eq: $slug}}) {
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
    slug
    seo: _seoMetaTags {
        attributes
        content
        tag
      }
  }
}

`;

export async function getStaticProps({ params }) {
  const data = await request({
    query: PAGES_QUERY,
    variables: { slug: params.slug },
  });
  return {
    props: { data },
    revalidate: 60,
  };
}
