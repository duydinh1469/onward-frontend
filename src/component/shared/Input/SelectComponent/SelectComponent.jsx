import { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "fit-content",
    },
  },
};

function SelectComponent({
  name,
  defaultOption,
  defaultOptionDisable,
  label,
  disabled,
  multiple,
  options,
  renderOption,
  width = "100%",
  error,
  hideError,
  value,
  initValue,
  renderValue,
  onChange,
  isControlled,
  showText = false,
  isAdornment = false,
  sx = {},
  helperReserve = true,
}) {
  const defaultValue = multiple ? [] : "";
  const defaultLabel = defaultOption ? (multiple ? defaultOption : "") : label;

  const [internalValue, setInternalValue] = useState(undefined);

  useEffect(() => {
    multiple
      ? setInternalValue(Array.isArray(initValue) ? initValue : [])
      : setInternalValue(initValue ? initValue : "");
  }, []);

  const internalOnChange = (selectValue) => {
    setInternalValue(selectValue);
  };

  const internalRenderOption = (option) => {
    return renderOption ? renderOption(option) : option.label;
  };

  const internalRenderValue = (value) => {
    return renderValue && renderValue(value);
  };

  return (
    <FormControl
      sx={{ width: width, ...sx }}
      error={error && !hideError ? true : false}
      disabled={disabled}
      size="small"
      variant="outlined"
    >
      {
        <InputLabel id={`${name}-label`} shrink={false}>
          {value?.length === 0 ||
          (internalValue?.length === 0 && !isControlled) ||
          (!value && isControlled)
            ? defaultLabel
            : ""}
        </InputLabel>
      }
      <Select
        sx={
          (showText && disabled) || isAdornment
            ? {
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
              }
            : {}
        }
        inputProps={
          isAdornment
            ? {
                sx: { padding: "7px 0 !important" },
                IconComponent: () => null,
              }
            : {}
        }
        displayEmpty
        labelId={`${name}-label`}
        id={`${name}-id`}
        value={value || internalValue || defaultValue}
        label={
          value?.length === 0 ||
          (internalValue?.length === 0 && !isControlled) ||
          (!value && isControlled)
            ? defaultLabel
            : ""
        }
        notched={false}
        onChange={(e) => {
          !isControlled && internalOnChange(e.target.value);
          onChange && onChange(e.target.value);
        }}
        multiple={multiple}
        MenuProps={MenuProps}
        renderValue={renderValue && internalRenderValue}
      >
        {defaultOption && (
          <MenuItem value={""} disabled={defaultOptionDisable || multiple}>
            {defaultOption}
          </MenuItem>
        )}
        {options?.map((option, index) => (
          <MenuItem value={option.value} key={`${name}-selectItem-${index}`}>
            {internalRenderOption(option)}
          </MenuItem>
        ))}
      </Select>
      {!isAdornment && (
        <FormHelperText>
          {error?.message && !hideError
            ? error?.message
            : helperReserve
            ? " "
            : null}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default SelectComponent;
