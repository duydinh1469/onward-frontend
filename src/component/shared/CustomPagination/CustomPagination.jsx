import { Pagination, ThemeProvider } from "@mui/material";
import { THEME } from "configs/constants/muiCustomTheme";
import { PropTypes } from "prop-types";
import styles from "./styles.module.scss";

function CustomPagination({ totalPage, current, onChange, range, style }) {
  const onChangeFnc = (_, page) => {
    onChange(page);
  };

  const getRange = (expectRange) => {
    // boundaryCount by default is 1 (set as default now, not config to reduce component complication)
    // ... width is same as 1 pagination item
    // 1 from current selected
    // => 2 side so (1+1)x2 + 1 = 5
    // expectRange is the number of pagination item will be shown
    // need to calculate the real range to input into siblingCount

    // Visual range (not the return down here) WILL ALWAYS BE ODD NUMBER FOR CONSISTENT (same as default behavior)
    const result =
      expectRange && expectRange > 0 ? Math.round((expectRange - 5) / 2) : 2;
    return result;
  };

  return (
    <div style={style} className={styles.paginationContainer}>
      <ThemeProvider theme={THEME}>
        <Pagination
          count={totalPage}
          page={current}
          onChange={onChangeFnc}
          // siblingCount={getRange(range)}
          shape="rounded"
          color="blueTheme"
        />
      </ThemeProvider>
    </div>
  );
}

CustomPagination.propTypes = {
  totalPage: PropTypes.number,
  current: PropTypes.number,
  onChange: PropTypes.func,
  range: PropTypes.number,
  style: PropTypes.object,
};

export default CustomPagination;
