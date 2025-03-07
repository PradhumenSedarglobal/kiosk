import Skeleton from "@mui/material/Skeleton";
import React from "react";
import dynamic from "next/dynamic";
import Card from "@mui/material/Card";

const Stack = dynamic(() => import("@mui/material/Stack"), {
  loading: () => <></>,
  ssr: true,
});

const MobileMenuSkeleton = () => {
  return (
    <Card
      sx={{
        borderRadius: "0px",
        zIndex: 9,
        boxShadow: "none!important",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        columnGap={3}
        width="100%"
        height="157px"
      >
        {[...Array(4)].map((item, index) => (
          <Stack
            key={`MOBILE-MENU-SKELETON-${index}-${item}`}
            alignItems="center"
            spacing={1}
          >
            <Skeleton variant="circular" width={70} height={70} />
            <Skeleton variant="rounded" width={80} height={20} />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default MobileMenuSkeleton;
