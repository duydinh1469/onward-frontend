import styles from "./styles.module.scss";
import { PropTypes } from "prop-types";

function Button({
  children,
  type,
  size,
  onClickFnc,
  extraStyle,
  isSubmit,
  isReset,
  disabled = false,
}) {
  return (
    <button
      className={`${styles["buttonType" + type]} ${
        styles["buttonSize" + size]
      } ${disabled ? styles.buttonDisabled : ""}`}
      onClick={onClickFnc}
      style={extraStyle}
      type={isSubmit ? "submit" : isReset ? "reset" : "button"}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  onClickFnc: PropTypes.func,
  extraStyle: PropTypes.object,
  isSubmit: PropTypes.bool,
  isReset: PropTypes.bool,
};

Button.defaultProps = {
  type: "actionFill",
  size: "normal",
  extraStyle: {},
};

export default Button;
