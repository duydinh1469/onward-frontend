import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";

function Carousel({ size = 5, imageArray = [] }) {
  const [carouselData, setCarouselData] = useState({
    itemWidth: 0,
    gapWidth: 0,
    step: 0,
  });
  const [currentItem, setCurrentItem] = useState(0);
  const [prevLength, setPrevLength] = useState(0);

  const itemRef = useRef(null);
  const contentRef = useRef(null);
  const validSize = [1, 2, 3, 4, 5];
  const animatedTime = 0.5;

  useEffect(() => {
    if (imageArray.length > prevLength) {
      setCurrentItem(0);
    }
    setPrevLength(imageArray.length);

    const observer = new ResizeObserver((entries) => {
      setCarouselData({
        itemWidth: entries[1]?.contentRect?.width,
        gapWidth: parseFloat(getComputedStyle(entries[0]?.target)?.gap),
        step: Math.floor(
          entries[0]?.contentRect?.width / entries[1]?.contentRect?.width
        ),
      });
    });

    imageArray.length > 0 && observer.observe(contentRef.current);
    imageArray.length > 0 && observer.observe(itemRef.current);

    currentItem > imageArray.length - 1 && currentItem > 0 && onClickPrev();
    return () => {
      observer.disconnect();
    };
  }, [imageArray]);

  const onClickNext = () => {
    setCurrentItem(
      currentItem + 2 * carouselData.step <= imageArray.length
        ? currentItem + carouselData.step
        : imageArray.length - carouselData.step
    );
  };

  const onClickPrev = () => {
    setCurrentItem(
      currentItem - carouselData.step >= 0 ? currentItem - carouselData.step : 0
    );
  };

  return (
    <div className={styles.carousel}>
      <motion.div className={styles.carouselContainer}>
        <motion.div
          className={styles.carouselContent}
          animate={{
            x:
              currentItem > 0
                ? -(
                    currentItem *
                    (carouselData.itemWidth + carouselData.gapWidth)
                  )
                : 0,
          }}
          initial={{ x: 0 }}
          transition={{
            duration: animatedTime,
            type: "spring",
          }}
          ref={contentRef}
        >
          {imageArray.map((image, index) =>
            index === 0 ? (
              <div
                className={styles.carouselItem}
                data-carouselsize={validSize.includes(size) ? size : 5}
                ref={itemRef}
                key={`carousel-item-${index}`}
              >
                {image}
              </div>
            ) : (
              <div
                className={styles.carouselItem}
                data-carouselsize={validSize.includes(size) ? size : 5}
                key={`carousel-item-${index}`}
              >
                {image}
              </div>
            )
          )}
        </motion.div>
      </motion.div>
      {currentItem > 0 && (
        <KeyboardArrowLeftRounded
          onClick={onClickPrev}
          className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
        />
      )}

      {currentItem + carouselData.step <= imageArray.length - 1 && (
        <KeyboardArrowRightRounded
          onClick={onClickNext}
          className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
        />
      )}
    </div>
  );
}

export default Carousel;
