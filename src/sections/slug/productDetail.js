import WebLayout from "@/layouts/web";
import ProductProvider from "@/provider/product/productProvider";
import Script from "next/script";
import ProductDetailSection from "../productDetail";

const ProductDetail = (props) => {
  const { layout, productDetails, similarProducts, itemCode } = props;
  return (
    <WebLayout layout={layout}>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://checkout.tabby.ai/integration.js"
        defer
      />
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://checkout.tabby.ai/tabby-promo.js"
        defer
      />
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://cdn.tamara.co/widget-v2/tamara-widget.js"
        defer
      />
      <ProductProvider>
        <ProductDetailSection
          productDetails={productDetails}
          similarProducts={similarProducts}
          itemCode={itemCode}
        />
      </ProductProvider>
    </WebLayout>
  );
};

export default ProductDetail;
