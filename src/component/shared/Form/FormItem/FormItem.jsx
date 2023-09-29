import styles from "./styles.module.scss";
import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

function FormItem({
  children,
  name,
  clearError,
  onChange,
  initValue,
  label,
  required = false,
  layout = "column",
  labelExtraStyle = {},
}) {
  const formMethods = useFormContext();
  const [hideError, setHideError] = useState(false);

  // Hide error when form need to re-enter due to error (error disable when change input)
  useEffect(() => {
    clearError &&
      formMethods?.formState?.isSubmitting &&
      hideError &&
      setHideError(false);
    // eslint-disable-next-line
  }, [formMethods?.formState?.isSubmitting, clearError]);

  useEffect(() => {
    initValue && formMethods.setValue(name, initValue);
  }, []);

  return (
    <div
      className={`${styles.formItemContainer} ${
        layout === "row"
          ? styles.formItemContainerRow
          : styles.formItemContainerColumn
      }`}
    >
      {label && (
        <p
          className={`${styles.formItemLabel} ${
            layout === "row"
              ? styles.formItemLabelRow
              : styles.formItemLabelColumn
          }`}
          style={labelExtraStyle}
        >
          {label}
          {required && <span>*</span>}
        </p>
      )}
      {formMethods && (
        <Controller
          control={formMethods.control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <>
              {React.Children.map(children, (child) => {
                return React.cloneElement(
                  child,
                  {
                    name,
                    error,
                    hideError,
                    value: field.value,
                    onChange: (value) => {
                      field.onChange(value);
                      onChange && onChange(value);
                      clearError && !hideError && setHideError(true);
                    },
                    isControlled: true,
                  },
                  null
                );
              })}
            </>
          )}
        />
      )}
    </div>
  );
}

export default FormItem;
