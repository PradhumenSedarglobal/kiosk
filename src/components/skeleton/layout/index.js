import Box from "@mui/material/Box";
import TopBarSkeleton from "./topbar";
import HeaderSkeleton from "./header";
import FooterSkeleton from "./footer";

const WebLayoutSkeleton = (props) => {
  const { children } = props;
  return (
    <Box>
      <TopBarSkeleton />
      <HeaderSkeleton />
      {children}
      <FooterSkeleton />
    </Box>
  );
};

export default WebLayoutSkeleton;
