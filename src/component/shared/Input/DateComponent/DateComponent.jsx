import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { InputAdornment } from "@mui/material";

function DateComponent(props) {
  // Render function for start adornment
  const getStartAdornment = () => {
    return props.startAdornment ? (
      <InputAdornment position="start">{props.startAdornment}</InputAdornment>
    ) : (
      <></>
    );
  };

  const textFieldParams = {
    size: "small",
    variant: "outlined",
    error: props.error && !props.hideError ? true : false,
    helperText:
      props.error?.message && !props.hideError ? props.error?.message : " ",
    sx: { width: props.width },
    InputProps: {
      startAdornment: getStartAdornment(),
    },
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        inputFormat="MM/DD/YYYY"
        value={props.value ? props.value : null}
        onChange={props.onChange}
        slotProps={{ textField: textFieldParams }}
        disabled={props.disabled}
      />
    </LocalizationProvider>
  );
}

export default DateComponent;
