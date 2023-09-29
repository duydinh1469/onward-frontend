import { Card, CardActions, CardContent } from "@mui/material";
import styles from "./styles.module.scss";

function CustomCard({ onClick, cardImage, cardAction, children, className }) {
  return (
    <Card
      className={styles.customCard}
      variant="outlined"
      onClick={onClick}
      data-clickable={Boolean(onClick)}
    >
      <CardContent className={styles.customCardContainer}>
        {cardImage && (
          <div className={styles.customCardLogoContainer}>
            <img
              src={cardImage}
              alt="customCard-profile"
              className={styles.customCardLogo}
            />
          </div>
        )}
        <div className={className} style={{ flexGrow: 1 }}>
          {children}
        </div>
      </CardContent>
      {cardAction && <CardActions>{cardAction}</CardActions>}
    </Card>
  );
}

export default CustomCard;
