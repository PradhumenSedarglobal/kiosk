import WebLayout from "@/layouts/web";
import ProductProvider from "@/provider/product/productProvider";
import Product from "../product";


const ProductLists = (props) => {
  const {
    layout,
    products,
    pageCount,
    activePage,
    firstData,
    productFilterDropdown,
    productFilterData,
    getFilterKeysValuesData,
  } = props;
  return (
    <WebLayout layout={layout}>
      <ProductProvider>
        <Product
          products={products}
          pageCount={pageCount}
          activePage={activePage}
          firstData={firstData}
          productFilterDropdown={productFilterDropdown}
          productFilterData={productFilterData}
          getFilterKeysValuesData={getFilterKeysValuesData}
        />
      </ProductProvider>
    </WebLayout>
  );
};

export default ProductLists;
