import { Box, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import "./TablePaginationActions.scss";

interface TablePaginationActionsProps {
  page: number;
  setPage: (page: number) => void;
  totalResults: number;
}

const TablePaginationActions = ({
  page,
  setPage,
  totalResults,
}: TablePaginationActionsProps): JSX.Element => {
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }} id="table-pagination-actions">
      <IconButton
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        aria-label="previous-page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => setPage(page + 1)}
        disabled={page === Math.ceil(totalResults / 10)}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};
export default TablePaginationActions;
