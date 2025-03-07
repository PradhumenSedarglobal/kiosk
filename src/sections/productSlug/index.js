import React from "react";
import Banner from "./banner";
import ProductBox from "./productBox";

const ProductPageSlugSection = ({ productsSlugPageData, firstData }) => {
  return (
    <>
      {productsSlugPageData &&
        productsSlugPageData?.result?.COMPONENT &&
        productsSlugPageData?.result?.COMPONENT?.length > 0 &&
        productsSlugPageData?.result?.COMPONENT.map((item, index) => {
          switch (item?.PARENT?.component_url) {
            case "Component/categoryBanner/categoryBanner":
              return (
                <React.Fragment key={`${item?.PARENT?.component_url}-${index}`}>
                  <Banner
                    data={
                      firstData?.result?.BANNER &&
                        firstData?.result?.BANNER?.length > 0
                        ? firstData?.result?.BANNER[0]
                        : {}
                    }
                  />
                  <ProductBox data={item?.PARENT} />
                </React.Fragment>
              );
            case "Component/ProductPage/ProductPage":
              return (
                <React.Fragment key={`${item?.PARENT?.component_url}-${index}`}>
                  <Banner
                    data={
                      firstData?.result?.BANNER &&
                        firstData?.result?.BANNER?.length > 0
                        ? firstData?.result?.BANNER[0]
                        : {}
                    }
                  />
                  <ProductBox data={item?.PARENT} />
                </React.Fragment>
              );
            default:
              null;
          }
        })}
    </>
  );
};

export default ProductPageSlugSection;
