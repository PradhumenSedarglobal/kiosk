import WebLayout from "@/layouts/web";
import ProductPageSlugSection from "../productSlug";


const ProductSlug = (props) => {
  const { layout, productsSlugPageData, firstData } = props;
  return (
    <WebLayout layout={layout}>
      <ProductPageSlugSection
        productsSlugPageData={productsSlugPageData}
        firstData={firstData}
      />
    </WebLayout>
  );
};

export default ProductSlug;
