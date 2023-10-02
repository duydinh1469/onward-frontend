import "./styles.scss";
import { FormControl, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function QuillText({
  placeholder,
  disabled,
  error,
  hideError,
  value,
  initValue,
  onChange,
  isControlled,
  showText = false,
  helperReserve = true,
}) {
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    initValue && setInternalValue(initValue);
  }, []);
  const internalOnChange = (value, updateFnc, onChange) => {
    updateFnc(value);
    onChange && onChange(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <>
      <ReactQuill
        theme={"snow"}
        onChange={(value) => {
          !isControlled
            ? internalOnChange(value, setInternalValue, onChange)
            : internalOnChange(value, onChange);
        }}
        value={value || internalValue}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
        className={`${error ? "ql-error" : ""} ${
          showText && disabled ? "ql-showtext" : ""
        }`}
      />

      {error?.message && !hideError ? (
        <FormControl>
          <FormHelperText error={true}>{error?.message}</FormHelperText>
        </FormControl>
      ) : helperReserve ? (
        <p>&nbsp;</p>
      ) : null}
    </>
  );
}

export default QuillText;
