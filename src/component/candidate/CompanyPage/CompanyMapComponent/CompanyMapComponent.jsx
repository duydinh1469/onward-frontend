import styles from "./styles.module.scss";
import { LocationOn } from "@mui/icons-material";
import InfoCard from "component/shared/InfoCard/InfoCard";

function CompanyMapComponent({ location, locationSrc }) {
  return (
    <InfoCard>
      <div className={styles.mapContainer}>
        <h3>Vị trí công ty</h3>
        <p>
          <LocationOn /> Địa chỉ: {location}
        </p>
        <div className={styles.mapIframeContainer}>
          <iframe
            src={locationSrc}
            className={styles.mapIframe}
            title="locationMap"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </InfoCard>
  );
}

export default CompanyMapComponent;
