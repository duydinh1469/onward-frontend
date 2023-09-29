import Button from "component/shared/Button/Button";
import { LIST_CATEGORIES } from "configs/constants/homePage";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const RenderListCat = ({ categoryData, index }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.categoryContainer}
      is-switch={(index % 2 === 1).toString()}
    >
      <img
        src={categoryData.imgSrc}
        alt={categoryData.title}
        className={styles.categoryImg}
      />
      <div className={styles.categoryInfo}>
        <h3 className={styles.categoryInfoTitle}>{categoryData.title}</h3>
        <p className={styles.categoryInfoDescription}>
          {categoryData.description}
        </p>
        <Button
          size="large"
          type="actionFill"
          onClickFnc={() => navigate(categoryData.redirectLink)}
        >
          {categoryData.btn}
        </Button>
      </div>
    </div>
  );
};

function ListCategoryComponent() {
  return (
    <div className={styles.listCatContainer}>
      <h2 className={styles.listCatTitle}>
        Tham gia vào cộng đồng sinh viên các trường
      </h2>
      {LIST_CATEGORIES.map((category, index) => (
        <RenderListCat categoryData={category} index={index} key={index} />
      ))}
    </div>
  );
}

export default ListCategoryComponent;
