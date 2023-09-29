import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function SearchComponent({
  options,
  multiple = false,
  placeholder,
  disabled,
  error,
  hideError,
  value,
  initValue,
  onChange,
  isControlled,
  startAdornment,
  width = "100%",
  limitTags = 1,
  freeSolo = false,
  showText = false,
  helperReserve = true,
}) {
  const [internalValue, setInternalValue] = useState(null);
  const defaultValue = multiple ? [] : "";

  useEffect(() => {
    multiple
      ? setInternalValue(Array.isArray(initValue) ? initValue : [])
      : setInternalValue(initValue ? initValue : "");
  }, []);

  const internalOnChange = (value, updateFnc, onChange) => {
    updateFnc(value);
    onChange && onChange(value);
  };

  // Render function for start adornment
  const getStartAdornment = () => {
    return startAdornment ? (
      <InputAdornment
        position="start"
        sx={{ position: "relative", left: "8px", paddingRight: "5px" }}
      >
        {startAdornment}
      </InputAdornment>
    ) : (
      <></>
    );
  };

  return (
    <Autocomplete
      freeSolo={freeSolo}
      multiple={multiple}
      limitTags={showText && disabled ? -1 : limitTags}
      sx={
        showText && disabled
          ? {
              width: width,
              label: { color: "red" },
              "& fieldset": {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: "0",
              },
              "& 	.MuiAutocomplete-tag": {
                opacity: "1 !important",
              },
              "& .MuiChip-deleteIcon": {
                display: "none",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "rgba(0, 0, 0, 1) !important",
              },
            }
          : {
              width: width,
              // "& .MuiAutocomplete-inputRoot": {
              //   flexWrap: "nowrap",
              // },
            }
      }
      disabled={disabled}
      size="small"
      options={options}
      autoHighlight
      getOptionLabel={(option) => (option.label ? option.label : "")}
      // Change here
      isOptionEqualToValue={(option, value) => {
        if (value === "" || value.length === 0) {
          return true;
        } else {
          return option?.value === value?.value;
        }
      }}
      value={value || internalValue || defaultValue}
      onChange={(e, newValue) => {
        !isControlled
          ? internalOnChange(newValue, setInternalValue, onChange)
          : internalOnChange(newValue, onChange);
      }}
      onInputChange={(e, newValue, reason) => {
        // if (reason === "clear") {
        //   return !isControlled
        //     ? internalOnChange(multiple ? [] : "", setInternalValue, onChange)
        //     : internalOnChange(multiple ? [] : "", onChange);
        // }
        return freeSolo && !multiple
          ? !isControlled
            ? internalOnChange(
                { label: newValue, value: "unknown" },
                setInternalValue,
                onChange
              )
            : internalOnChange({ label: newValue, value: "unknown" }, onChange)
          : null;
      }}
      // renderOption={(props, option) => <Box>{option.label}</Box>}
      renderInput={(params) => (
        <TextField
          error={error && !hideError ? true : false}
          helperText={
            error?.message && !hideError
              ? error?.message
              : helperReserve
              ? " "
              : null
          }
          placeholder={
            placeholder && (!value || value?.length === 0) ? placeholder : ""
          }
          disabled={disabled}
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: "off", // disable autocomplete and autofill
          }}
          InputProps={
            showText && disabled
              ? {
                  ...params.InputProps,
                  startAdornment: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {getStartAdornment()}
                      <div>{params.InputProps.startAdornment}</div>
                    </div>
                  ),
                  endAdornment: null,
                }
              : {
                  ...params.InputProps,
                  startAdornment: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {getStartAdornment()}
                      <div>{params.InputProps.startAdornment}</div>
                    </div>
                  ),
                }
          }
        />
      )}
    />
  );
}

export default SearchComponent;
