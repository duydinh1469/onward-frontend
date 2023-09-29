import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./styles.module.scss";
import image404 from "assets/images/404.jpg";

function Error404() {
  const navigate = useNavigate();
  return (
    <div className={styles.errorContainer}>
      <img
        className={styles.errorImage}
        alt="NOT FOUND"
        src={image404}
        width={"500px"}
        height={"500px"}
      />
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not seem to exist</p>
      <Button
        onClickFnc={() => navigate("/")}
        extraStyle={{ padding: "0.6rem 2rem" }}
      >
        Go to Homepage
      </Button>
    </div>
  );
}

export default Error404;
