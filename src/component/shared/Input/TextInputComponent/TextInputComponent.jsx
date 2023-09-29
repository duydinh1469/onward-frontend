import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

function TextInputComponent({
  placeholder,
  disabled,
  error,
  hideError,
  value,
  initValue,
  onChange,
  isControlled,
  rows,
  type,
  passwordSwitch,
  startAdornment,
  endAdornment,
  width = "100%",
  showText = false,
  helperReserve = true,
}) {
  const [internalValue, setInternalValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    initValue && setInternalValue(initValue);
  }, []);

  const internalOnChange = (value, updateFnc, onChange) => {
    updateFnc(value);
    onChange && onChange(value);
  };

  // Render function for start adornment
  const getStartAdornment = () => {
    return startAdornment ? (
      <InputAdornment position="start">{startAdornment}</InputAdornment>
    ) : (
      <></>
    );
  };

  // Render function for end adornment
  const getEndAdornment = () => {
    return endAdornment || (passwordSwitch && type === "password") ? (
      <InputAdornment position="end">
        {passwordSwitch && type === "password"
          ? passwordAdornment()
          : endAdornment}
      </InputAdornment>
    ) : (
      <></>
    );
  };

  // Hide/show password function
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent password to be able to copy (meaningless if allow hide/show password)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Render function for end adornment
  const passwordAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {!Array.isArray(endAdornment) ? (
            showPassword ? (
              <VisibilityOff />
            ) : (
              <Visibility />
            )
          ) : showPassword ? (
            endAdornment[1]
          ) : (
            endAdornment[0]
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <TextField
      sx={
        showText && disabled
          ? {
              width: width,
              "& fieldset": {
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: "0",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }
          : { width: width }
      }
      variant="outlined"
      size="small"
      onChange={(e) => {
        !isControlled
          ? internalOnChange(e.target.value, setInternalValue, onChange)
          : internalOnChange(e.target.value, onChange);
      }}
      value={value || internalValue || ""}
      error={error && !hideError ? true : false}
      helperText={
        error?.message && !hideError
          ? error?.message
          : helperReserve
          ? " "
          : null
      }
      multiline={rows ? true : false}
      rows={rows}
      disabled={disabled}
      placeholder={placeholder}
      type={!passwordSwitch ? type : showPassword ? "text" : "password"}
      InputProps={{
        startAdornment: getStartAdornment(),
        endAdornment: getEndAdornment(),
      }}
    />
  );
}

export default TextInputComponent;
