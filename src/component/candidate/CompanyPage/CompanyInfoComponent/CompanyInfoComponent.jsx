// import styles from "./styles.module.scss";
import InfoCard from "component/shared/InfoCard/InfoCard";
import CompanyDetail from "component/shared/CompanyDetail/CompanyDetail";

function CompanyInfoComponent({ companyDetail }) {
  return (
    <InfoCard>
      <CompanyDetail
        companyDetail={companyDetail}
        hasFollowBtn={false}
        showJobs={false}
        carouselSize={5}
      />
    </InfoCard>
  );
}

export default CompanyInfoComponent;
