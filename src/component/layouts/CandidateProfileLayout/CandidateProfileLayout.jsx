import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import CardNavigate from "component/shared/CardNavigate/CardNavigate";
import {
  AssignmentInd,
  BookmarkAdded,
  Checklist,
  Star,
} from "@mui/icons-material";

const categories = [
  {
    title: "Profile",
    path: "profile",
    icon: <AssignmentInd />,
  },
  {
    title: "Applied jobs",
    path: "applied",
    icon: <Checklist />,
  },
  {
    title: "Interested jobs",
    path: "interested",
    icon: <Star />,
  },
  {
    title: "Follow companies",
    path: "follow",
    icon: <BookmarkAdded />,
  },
];

function CandidateProfileLayout() {
  return (
    <div className={styles.candidateProfile}>
      <CardNavigate
        categories={categories}
        className={styles.candidateProfileCategories}
      />
      <div className={styles.candidateProfileDetail}>
        <Outlet />
      </div>
    </div>
  );
}

export default CandidateProfileLayout;
