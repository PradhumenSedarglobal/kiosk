// import { useAuthContext } from "@/auth/useAuthContext";
import Box from "@mui/material/Box";

const RightArrow = ({ others }) => {
  // const { state } = useAuthContext();
  // const { cookies } = state;
  // const { langName } = cookies || {};
  return (
    <Box
      component="span"
      {...others}
      display="grid"
      alignItems="center"
      // sx={{
      //   direction: "ltr",
      //   ...(langName == "ar" && {
      //     transform: "rotate(180deg)",
      //   }),
      // }}
      sx={(theme) => ({
        ...(theme.direction == "rtl" && {
          transform: "scaleX(-1)",
        }),
      })}
    >
      <svg
        viewBox="0 0 24 24"
        className="text-dark"
        role="button"
        height="18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
      </svg>
    </Box>
  );
};

export default RightArrow;
