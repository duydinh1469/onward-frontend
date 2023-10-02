import { BusinessOutlined, Event, LocationOn } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent } from "@mui/material";
import styles from "./styles.module.scss";
import format from "date-fns/format";
import { differenceInDays } from "date-fns";

function JobCard({ cardData, onClick, cardAction }) {
  //----------------------------------------------------
  const renderLocation = (locations = []) => {
    return locations.map((city) => city.label).join(" | ");
  };

  return (
    <Card
      className={styles.jobCard}
      variant="outlined"
      onClick={() => {
        onClick && onClick(cardData.id);
      }}
    >
      <CardActionArea>
        <CardContent className={styles.jobCardContainer}>
          {cardData?.company?.avatar ? (
            <img
              src={cardData.company.avatar}
              alt="company-profile"
              className={styles.jobCardCompanyLogo}
            />
          ) : (
            <div className={styles.jobCardCompanyEmptyLogo}>
              <BusinessOutlined className={styles.jobCardCompanyDefaultIcon} />
            </div>
          )}

          <div className={styles.jobCardInfo}>
            {cardData?.postDate &&
            differenceInDays(new Date(), new Date(cardData.postDate)) <= 2 ? (
              <p className={styles.jobCardInfoStatus}>New</p>
            ) : (
              <>&nbsp;</>
            )}

            <p className={styles.jobCardInfoPosition}>{cardData.position}</p>
            <a
              href={`/company/${cardData?.company?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.jobCardInfoCompany}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {cardData?.company?.name}
            </a>
            <p className={styles.jobCardInfoLocation}>
              <LocationOn /> {renderLocation(cardData?.location)}
            </p>
            <p className={styles.jobCardInfoPostDate}>
              <Event />{" "}
              {cardData?.postDate &&
                format(new Date(cardData?.postDate), "dd/LL/yyyy")}
            </p>
            <div className={styles.jobCardInfoRequirement}>
              <i className="fa-solid fa-feather-pointed"></i>
              <span>Requirement:</span>
              {/* {cardData?.requirement} */}
              {/* <div
                dangerouslySetInnerHTML={{ __html: cardData?.requirement }}
              /> */}
              {cardData?.requirement?.replace(/<(.|\n)*?>/g, " ")}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      {cardAction && <CardActions>{cardAction}</CardActions>}
    </Card>
  );
}

export default JobCard;
