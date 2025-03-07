import { useTranslation } from "next-i18next";
import Head from "next/head";

export default function PdpShema(props) {
  const { t } = useTranslation("common");
  const { listings, router, seoData } = props || {};
  const schema_url = process.env.NEXT_PUBLIC_SCHEMA_URL || "https://schema.org";
  const url =
    process.env.NEXT_PUBLIC_LOCAL_API_URL || "https://www.sedarglobal.com/";
  const strExists = [
    "[PRODUCT_COLOR]",
    "[PRODUCT_NAME]",
    "[CATEGORY_NAME]",
    "[COUNTRY]",
  ];
  const seo = seoData && seoData !== "null" ? seoData : "";
  let meta_desc =
    seo &&
      seo.SEO_META_DESC &&
      seo.SEO_META_DESC.replace(/(<([^>]+)>)/gi, "") &&
      seo.SEO_META_DESC !== "null"
      ? seo.SEO_META_DESC.replace(/(<([^>]+)>)/gi, "")
      : "";
  let country_iso =
    seo &&
      seo.country_iso &&
      seo.country_iso.toUpperCase() &&
      seo.country_iso !== "null"
      ? seo.country_iso.toUpperCase()
      : "";
  let metaDescInclude = strExists.some((el) => meta_desc.includes(el));

  if (metaDescInclude) {
    const colorQuery = router.query.color || "";
    const mapObj = {
      "[CATEGORY_NAME]": listings?.SFP_TITLE || "",
      "[COUNTRY]": country_iso,
      "[PRODUCT_COLOR]": t(colorQuery),
      "[PRODUCT_NAME]": seo?.SPI_DESC || "",
    };
    meta_desc = meta_desc.replace(
      /\[CATEGORY_NAME]|\[COUNTRY]|\[PRODUCT_COLOR]|\[PRODUCT_NAME]/gi,
      (matched) => mapObj[matched]
    );
  }

  let mpn = listings?.defaultSelectItem?.SII_CODE;
  let img_path = `${listings?.defaultSelectItem?.gallery.find(
    (item) => item.SLI_SII_CODE === mpn
  )?.SLI_IMAGE_PATH || `${url}assets/images/logo.png`
    }`;
  let availability = listings?.defaultSelectItem?.STOCK_STATUS || "";

  const getItemCode = (code) => {
    const codeToRemove = code?.split("-").shift();
    const newCode = code?.replace(`${codeToRemove}-`, "");
    return newCode;
  };

  const cleanUrl = (url) => {
    return url.split("?")[0]; // Remove query parameters˝
  };
  const schemaData = {
    "@context": `${schema_url}`,
    "@type": "Product",
    name: `${listings?.SFP_TITLE || ""} - ${listings?.defaultSelectItem?.SII_COLOR_DESC || ""
      }`,
    image: `${img_path}`,
    description: `${props?.meta_desc || ""}`,
    brand: {
      "@type": "Brand",
      name: `${t(listings?.BRAND_DESC) || ""}`,
    },
    offers: {
      "@type": "Offer",
      url: cleanUrl(`${url}${router.locale}${router.asPath}`),
      priceCurrency: `${listings?.SFP_CCY_CODE || "USD"}`,
      price: `${listings?.PRICE || ""}`,
      itemCondition: `${schema_url}/NewCondition`,
      availability: `${schema_url}/${availability == "ONDEMAND" ? "PreOrder" : "InStock"
        }`, //`https://schema.org/${t(availability)}`,
      seller: {
        "@type": "Organization",
        name: "Sedar Global",
      },
    },
    sku: getItemCode(listings?.defaultSelectItem?.SII_ITEM_ID),
    mpn: mpn,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <meta property="og:image" content={img_path} />
      <meta property="twitter:image" content={img_path} />
    </Head>
  );
}
