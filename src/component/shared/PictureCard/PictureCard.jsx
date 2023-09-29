import { Add, CancelRounded } from "@mui/icons-material";
import styles from "./styles.module.scss";
import { Card, Modal } from "@mui/material";
import { useState } from "react";

function PictureCard({
  useDelete = false,
  useAdd = false,
  handleDelete,
  handleAdd,
  imageSrc,
  imageAlt,
  imageId,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClickDelete = (event) => {
    event.stopPropagation();
    useDelete && handleDelete && handleDelete(imageId);
  };

  const onClickCard = () => {
    !useAdd && setIsOpen(true);
  };

  const onClickAdd = (event) => {
    if (event.target.files.length > 0) {
      handleAdd && handleAdd(event.target.files);
    }
  };

  const handleCloseView = () => setIsOpen(false);

  return (
    <>
      <Card
        variant="outlined"
        className={styles.pictureCardContainer}
        onClick={onClickCard}
      >
        <div className={styles.pictureCardContent}>
          {useDelete && (
            <div className={styles.pictureCardContentClose}>
              <CancelRounded onClick={onClickDelete} />
            </div>
          )}

          {useAdd ? (
            <label
              className={styles.pictureCardContentAdd}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="file"
                name="wallpaper"
                onChange={onClickAdd}
                accept="image/png, image/jpeg"
                multiple
              />
              <Add />
              <p>Add Image</p>
            </label>
          ) : (
            <img src={imageSrc} alt={imageAlt} />
          )}
        </div>
      </Card>

      <Modal
        open={isOpen}
        onClose={handleCloseView}
        className={styles.pictureModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <img src={imageSrc} alt={imageAlt} />
      </Modal>
    </>
  );
}

export default PictureCard;
