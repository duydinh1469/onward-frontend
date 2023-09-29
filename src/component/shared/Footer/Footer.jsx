import styles from "./styles.module.scss";
import {
  FOOTER_CATEGORY,
  FOOTER_MEDIA,
  FOOTER_SITE_INFO,
} from "./../../../configs/constants/footer";
import { Link } from "react-router-dom";

import { BRAND_NAME } from "./../../../configs/constants/common";

const RenderFooter = ({ inputData }) => {
  return (
    <>
      {inputData.map((data, dataIndex) => {
        return data.hasOwnProperty("title") ? (
          <div className={styles.footerCategory} key={data.title}>
            <p className={styles.footerCategoryTitle}>
              {data.title.toUpperCase()}
            </p>
            {data.link.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={styles.footerCategoryText}
                >
                  {item.linkInfo}
                </Link>
              );
            })}
          </div>
        ) : (
          <Link
            to={data.link[0].href}
            className={
              data.hasOwnProperty("type") && data.type === "icon"
                ? styles.socialMediaLink
                : ""
            }
            key={dataIndex}
          >
            {data.link[0].linkInfo}
          </Link>
        );
      })}
    </>
  );
};

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerLogo}>
        <img src={require("../../../assets/images/logo.png")} alt="logo-img" />
        <span>{BRAND_NAME}</span>
      </div>
      <div className={styles.footerContent}>
        <div className={styles.socialMedia}>
          <p className={styles.footerCategoryTitle}>
            KẾT NỐI VỚI {BRAND_NAME.toUpperCase()}
          </p>
          <div style={{ display: "flex" }}>
            <RenderFooter inputData={FOOTER_MEDIA} />
          </div>
        </div>
        <div className={styles.footerCategoryContainer}>
          <RenderFooter inputData={FOOTER_CATEGORY} />
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <p>
          Copyright © {year} {BRAND_NAME}. All rights reserved.
        </p>
        <div className={styles.footerCopyrightInfo}>
          <RenderFooter inputData={FOOTER_SITE_INFO} />
        </div>
      </div>
      <a
        href="https://www.freepik.com/author/pch-vector"
        className={styles.footerExtraRef}
        target="_blank"
        rel="noopener noreferrer"
      >
        * Image by pch.vector on Freepik
      </a>
    </div>
  );
}

export default Footer;
