import useCartContext from "@/provider/cart/cartContext";
import DialogContent from "@mui/material/DialogContent";
import DialogBox from "./dialog";
import CartList from "./list";
import NotFound from "./not-found";

const CartPopup = ({ open = false, handleClose }) => {
  const { cartState } = useCartContext();
  const { isCartLoading, cart } = cartState;
  const showNotFound =
    !isCartLoading && !cart?.complete?.length && !cart?.free_sample?.length;

  return (
    <DialogBox open={open} handleClose={handleClose}>
      <DialogContent
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          maxHeight: "700px",
        }}
        onClick={handleClose}
      >
        {showNotFound ? (
          <NotFound handleClose={handleClose} />
        ) : (
          <CartList handleClose={handleClose} />
        )}
      </DialogContent>
    </DialogBox>
  );
};

export default CartPopup;
