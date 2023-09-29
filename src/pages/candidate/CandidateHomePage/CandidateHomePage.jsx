// import styles from "./styles.module.scss";
import IntroductionComponent from "./../../../component/candidate/HomePage/IntroductionComponent/IntroductionComponent";
import ListRecentJobsComponent from "../../../component/candidate/HomePage/ListRecentJobsComponent/ListRecentJobsComponent";
import ListCategoryComponent from "./../../../component/candidate/HomePage/ListCategoryComponent/ListCategoryComponent";
import GetStartedComponent from "./../../../component/candidate/HomePage/GetStartedComponent/GetStartedComponent";
import EmployeeSectionComponent from "./../../../component/candidate/HomePage/EmployeeSectionComponent/EmployeeSectionComponent";

function CandidateHomePage() {
  return (
    <>
      <IntroductionComponent />
      <ListRecentJobsComponent />
      <ListCategoryComponent />
      <GetStartedComponent />
      <EmployeeSectionComponent />
    </>
  );
}

export default CandidateHomePage;
