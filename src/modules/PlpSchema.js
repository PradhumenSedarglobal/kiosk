import Head from "next/head";

export default function PlpSchema(props) {
  const { listings, total_listings, router, banner, page } = props || {};
  const url =
    process.env.NEXT_PUBLIC_LOCAL_API_URL || "https://www.sedarglobal.com/";
  const schema_url = process.env.NEXT_PUBLIC_SCHEMA_URL || "https://schema.org";

  const cleanUrl = (url) => {
    return url.split("?")[0]; // Remove query parameters
  };

  let data = [];
  listings &&
    listings?.length > 0 &&
    listings.forEach(function (item, index) {
      const position = parseInt(index) + 1;
      const itemUrl =
        page != "product"
          ? `${url}${router.locale}${item?.url}/${item?.defaultSelectItem?.SII_CODE}`
          : `${url}${router.locale}${router.asPath}`;
      data.push({
        "@type": "ListItem",
        position: `${position}`,
        url: cleanUrl(itemUrl),
      });
    });

  const schemasData = {
    "@context": `${schema_url}`,
    "@type": "ItemList",
    url: cleanUrl(`${url}${router.locale}${router.asPath}`),
    numberOfItems: `${total_listings || 0}`,
    itemListElement: [...data],
  };

  //}
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasData) }}
      />

      <meta
        property="og:image"
        content={banner?.SC_IMAGE_PATH || `${url}assets/images/logo.png`}
      />
      <meta
        property="twitter:image"
        content={banner?.SC_IMAGE_PATH || `${url}assets/images/logo.png`}
      />
    </Head>
  );
}
