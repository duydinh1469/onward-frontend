import styles from "./styles.module.scss";

import CompanyListJobsComponent from "component/candidate/CompanyPage/CompanyListJobsComponent/CompanyListJobsComponent";
import CompanyJobDetailComponent from "component/candidate/CompanyPage/CompanyJobDetailComponent/CompanyJobDetailComponent";

function CompanyJobsPage() {
  return (
    <div className={styles.companyJobsPageContainer}>
      <div>
        <CompanyListJobsComponent />
      </div>
      <div>
        <CompanyJobDetailComponent />
      </div>
    </div>
  );
}

export default CompanyJobsPage;
