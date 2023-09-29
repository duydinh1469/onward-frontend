import { Card } from "@mui/material";
import styles from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";

function CustomLink({ href, children, icon, segmentAt = 1 }) {
  const location = useLocation();
  const locationSegment = location.pathname.split("/");
  const selectedLocation =
    href.trim().charAt(0) === "/" ? href.split("/")[1] : href.split("/")[0];
  return (
    <Link
      to={href}
      className={
        selectedLocation === locationSegment[segmentAt]
          ? styles.categoryActive
          : ""
      }
    >
      <li>
        {icon}
        {children}
      </li>
    </Link>
  );
}

function CardNavigate({ categories, className }) {
  return (
    <Card
      variant="outlined"
      className={`${styles.cardNavigateContainer} ${className && className}`}
    >
      <ul className={styles.categoryList}>
        {categories.map((cate) => (
          <CustomLink
            href={cate?.path}
            segmentAt={2}
            icon={cate?.icon}
            key={`cate-${cate?.title}`}
          >
            {cate?.title}
          </CustomLink>
        ))}
      </ul>
    </Card>
  );
}

export default CardNavigate;
