// @mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { alpha } from "@mui/material/styles";
import SkeletonCommon from "../SkeletonCommon";
import Box from "@mui/material/Box";
import WebLayoutSkeleton from "../layout";

// ----------------------------------------------------------------------

export default function SkeletonContracts({ ...other }) {
  return (
    <WebLayoutSkeleton>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: 400, borderRadius: 1, "&.MuiSkeleton-root": {
                    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.4),
                    "::after": {
                      background: (theme) => `linear-gradient(90deg, transparent, ${alpha(theme.palette.grey[900], 0.08)}, transparent)`
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <SkeletonCommon
        parentSkeletonKeyName=" PARENT-Banner"
        parentCount={1}
        childSkeletonKeyName="CHILD-Banner"
        childCount={1}
        stackSpacing={2}
        imageVariant="linear"
        row="row"
        imgSx={{
          width: "100%",
          height: "500px",
          borderRadius: "5px",
        }}
        lineSx={{
          width: "100%",
          height: "300px",
          borderRadius: "10px",
        }}
        lineVariant="rectangular"
        lineRow="row"
        imageAnimation="wave"
        lineAnimation="wave"
        childWidth="100%"
        isImageShow={true}
      />
      <Box mt={2}>
        <SkeletonCommon
          parentSkeletonKeyName=" PARENT-Banner"
          parentCount={3}
          childSkeletonKeyName="CHILD-Banner"
          childCount={1}
          stackSpacing={2}
          imageVariant="linear"
          row="row"
          imgSx={{
            width: "100%",
            height: "400px",
            borderRadius: "5px",
          }}
          lineSx={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
          }}
          lineVariant="rectangular"
          lineRow="row"
          imageAnimation="wave"
          lineAnimation="wave"
          childWidth="100%"
          isImageShow={true}
        />
      </Box>
      <Box mt={2}>
        <SkeletonCommon
          parentSkeletonKeyName=" PARENT-Banner"
          parentCount={1}
          childSkeletonKeyName="CHILD-Banner"
          childCount={1}
          stackSpacing={2}
          imageVariant="linear"
          row="row"
          imgSx={{
            width: "100%",
            height: "400px",
            borderRadius: "5px",
          }}
          lineSx={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
          }}
          lineVariant="rectangular"
          lineRow="row"
          imageAnimation="wave"
          lineAnimation="wave"
          childWidth="100%"
          isImageShow={true}
        />
      </Box>
      <Box mt={2}>
        <SkeletonCommon
          parentSkeletonKeyName=" PARENT-Banner"
          parentCount={1}
          childSkeletonKeyName="CHILD-Banner"
          childCount={1}
          stackSpacing={2}
          imageVariant="linear"
          row="row"
          imgSx={{
            width: "100%",
            height: "400px",
            borderRadius: "5px",
          }}
          lineSx={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
          }}
          lineVariant="rectangular"
          lineRow="row"
          imageAnimation="wave"
          lineAnimation="wave"
          childWidth="100%"
          isImageShow={true}
        />
      </Box>
      <Box mt={2}>
        <SkeletonCommon
          parentSkeletonKeyName=" PARENT-Banner"
          parentCount={5}
          childSkeletonKeyName="CHILD-Banner"
          childCount={1}
          stackSpacing={3}
          imageVariant="linear"
          row="row"
          imgSx={{
            width: "100%",
            height: "60px",
            borderRadius: "5px",
          }}
          lineSx={{
            width: "100%",
            height: "60px",
            borderRadius: "10px",
          }}
          lineVariant="rectangular"
          lineRow="row"
          imageAnimation="wave"
          lineAnimation="wave"
          childWidth="100%"
          isImageShow={true}
        />
      </Box>
      <Box mt={2}>
        <SkeletonCommon
          parentSkeletonKeyName=" PARENT-Banner"
          parentCount={1}
          childSkeletonKeyName="CHILD-Banner"
          childCount={4}
          stackSpacing={3}
          imageVariant="linear"
          row="row"
          imgSx={{
            width: "100%",
            height: "60px",
            borderRadius: "5px",
          }}
          lineSx={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
          }}
          lineVariant="rectangular"
          lineRow="row"
          imageAnimation="wave"
          lineAnimation="wave"
          childWidth="100%"
          isImageShow={false}
        />
      </Box>
    </WebLayoutSkeleton>
  );
}
