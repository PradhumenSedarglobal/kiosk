import Pagination from "@mui/material/Pagination";

const PaginationComponent = ({ count, page, handleChange, paginationSx }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={handleChange}
      sx={paginationSx}
    />
  );
};

export default PaginationComponent;
