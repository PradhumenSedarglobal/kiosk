import GridOnIcon from "@mui/icons-material/GridOn";
import GridViewIcon from "@mui/icons-material/GridView";
import SquareIcon from "@mui/icons-material/Square";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

const GridListView = ({ handleChangeGridView = () => { }, gridView }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        "&.MuiCard-root": {
          borderRadius: "0px",
          borderColor: "divider",
          boxShadow: "none",
        },
      }}
    >
      <CardContent
        sx={{
          p: "11px 10px!important",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <IconButton
            onClick={() => handleChangeGridView(6)}
            size="small"
            sx={{ mx: 1 }}
            aria-label="square"
          >
            <SquareIcon
              sx={(theme) => ({
                color:
                  gridView == 6
                    ? theme.palette.common.black
                    : theme.palette.divider,
              })}
              fontSize="small"
            />
          </IconButton>
          <IconButton
            onClick={() => handleChangeGridView(4)}
            size="small"
            sx={{ mx: 1 }}
            aria-label="grid view"
          >
            <GridViewIcon
              sx={(theme) => ({
                color:
                  gridView == 4
                    ? theme.palette.common.black
                    : theme.palette.divider,
              })}
              fontSize="small"
            />
          </IconButton>
          <IconButton
            onClick={() => handleChangeGridView(3)}
            size="small"
            sx={{ mx: 1 }}
            aria-label="grid on"
          >
            <GridOnIcon
              sx={(theme) => ({
                color:
                  gridView == 3
                    ? theme.palette.common.black
                    : theme.palette.divider,
              })}
              fontSize="small"
            />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

GridListView.propTypes = {
  handleChangeGridView: PropTypes.func,
  gridView: PropTypes.number,
};

export default GridListView;
