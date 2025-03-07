import { useAuthContext } from "@/auth/useAuthContext";
import { TabbyBox } from "@/styles/cartPage";
import { useEffect } from "react";

const TabbyPromoMgs = (props) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, cniso, CCYCODE } = cookies || {};
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.TabbyPromo !== "undefined" &&
      typeof new window.TabbyPromo() !== "undefined"
    ) {
      new window.TabbyPromo({
        selector: "#tabby_" + props.tab_name, // required, content of tabby Promo Snippet will be placed in element with that selector
        currency: CCYCODE, // required, currency of your product
        price: props.amount, // required, price or your product
        installmentsCount: 4, // Optional - custom installments number for tabby promo snippet (if not downpayment + 3 installments)
        lang: langName, // optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag
        // source: 'product', // optional, snippet placement; `product` for product page and `cart` for cart page
        //  api_key: 'pk_92c99761-2b28-4a51-a560-43c4e4eb2d59', // optional, public key which identifies your account when communicating with tabby
        publicKey: "pk_92c99761-2b28-4a51-a560-43c4e4eb2d59",
      });
      if (
        typeof window !== "undefined" &&
        typeof window.TabbyPromoDefault !== "undefined"
      ) {
        window.TabbyPromoDefault({
          selector: "#tabby_" + props.tab_name, // required, content of tabby Promo Snippet will be placed in element with that selector
          currency: CCYCODE, // required, currency of your product
          price: props.amount, // required, price or your product
          installmentsCount: 4, // Optional - custom installments number for tabby promo snippet (if not downpayment + 3 installments)
          lang: langName, // optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag
          // source: 'product', // optional, snippet placement; `product` for product page and `cart` for cart page
          //  api_key: 'pk_92c99761-2b28-4a51-a560-43c4e4eb2d59', // optional, public key which identifies your account when communicating with tabby
          publicKey: "pk_92c99761-2b28-4a51-a560-43c4e4eb2d59",
        });
      }
    }
  }, [props.amount, CCYCODE, props.tab_name, langName, cniso]);

  if (
    props.amount == 0 ||
    props.amount == "" ||
    ["AE", "SA"].indexOf(cniso) == -1 ||
    ["AED", "SAR"].indexOf(CCYCODE) == -1
  ) {
    return false;
  }

  return (
    <>
      <TabbyBox
        my={3}
        className="tabystyle"
        id={"tabby_" + props.tab_name}
        lang="ar"
        sx={{
          fontFamily: (theme) => theme.fontFaces.helveticaNeue,
          "& .styles__tabbyPromoSnippetContent--ef3e6": {
            display: "none",
            fontFamily: (theme) => theme.fontFaces.helveticaNeue,
            fontWeight: "normal !important",
          },
        }}
      ></TabbyBox>
    </>
  );
};

export default TabbyPromoMgs;
