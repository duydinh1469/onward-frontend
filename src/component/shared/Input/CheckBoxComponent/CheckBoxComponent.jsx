import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";

function CheckBoxComponent({
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
}) {
  const [internalValue, setInternalValue] = useState([]);

  useEffect(() => {
    Array.isArray(initValue) && setInternalValue(initValue);
  }, []);

  const internalOnChange = (value, result = [], updateFnc, onChange) => {
    const checkedValues = result.includes(value)
      ? result.filter((i) => i !== value)
      : [...result, value];
    updateFnc(checkedValues);
    onChange && onChange(checkedValues);
  };

  return (
    <FormControl
      error={error && !hideError ? true : false}
      component="fieldset"
      variant="standard"
      disabled={disabled}
      value={value || internalValue || []}
      onChange={(e) => {
        !isControlled
          ? internalOnChange(
              e.target.value,
              internalValue,
              setInternalValue,
              onChange
            )
          : internalOnChange(e.target.value, value, onChange);
      }}
    >
      <FormGroup row={isRow}>
        {options?.map((item, index) => (
          <FormControlLabel
            labelPlacement={labelPlacement}
            control={
              <Checkbox
                checked={
                  value?.includes(item.value.toString()) ||
                  internalValue?.includes(item.value.toString()) ||
                  false
                }
                value={item.value}
              />
            }
            label={item.label}
            key={`${name}-checkboxItem-${index}`}
          />
        ))}
      </FormGroup>
      <FormHelperText>
        {error?.message && !hideError ? error?.message : " "}
      </FormHelperText>
    </FormControl>
  );
}

export default CheckBoxComponent;
