import { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";

function RadioComponent({
  name,
  labelPlacement,
  disabled,
  options,
  error,
  hideError,
  value,
  initValue,
  onChange,
  isControlled,
  isRow,
  rowWrap,
}) {
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    initValue && setInternalValue(initValue);
  }, []);

  const internalOnChange = (value, updateFnc, onChange) => {
    updateFnc(value);
    onChange && onChange(value);
  };

  return (
    <FormControl
      error={error && !hideError ? true : false}
      disabled={disabled}
      value={value || internalValue || ""}
      onChange={(e) => {
        !isControlled
          ? internalOnChange(e.target.value, setInternalValue, onChange)
          : internalOnChange(e.target.value, onChange);
      }}
    >
      <RadioGroup row={isRow}>
        {options?.map((item, index) => (
          <FormControlLabel
            labelPlacement={labelPlacement}
            sx={{ width: rowWrap }}
            control={
              <Radio
                checked={
                  value?.toString() === item.value.toString() ||
                  internalValue?.toString() === item.value.toString() ||
                  false
                }
                value={item.value}
              />
            }
            label={item.label}
            key={`${name}-radioItem-${index}`}
          />
        ))}
      </RadioGroup>
      <FormHelperText>
        {error?.message && !hideError ? error?.message : ""}
        {/* Below will make sure there is an empty line for error msg because " " instead of empty "" */}
        {/* {error?.message && !hideError ? error?.message : " "} */}
      </FormHelperText>
    </FormControl>
  );
}

export default RadioComponent;
