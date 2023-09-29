import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";

function CandidateLayout() {
  return (
    <div className={styles.candidateLayoutContainer}>
      <Navbar />
      <div className={styles.candidateLayoutContent}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default CandidateLayout;
