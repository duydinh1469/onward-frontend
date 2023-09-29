import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateLayout from "./component/layouts/CandidateLayout/CandidateLayout";
import ComingSoon from "./pages/ComingSoonPage/ComingSoon";
import CandidateHomePage from "./pages/candidate/CandidateHomePage/CandidateHomePage";
import ListJobsPage from "pages/candidate/ListJobsPage/ListJobsPage";
import CompanyInfoPage from "pages/candidate/CompanyInfoPage/CompanyInfoPage";
import CompanyPage from "pages/candidate/CompanyPage/CompanyPage";
import CompanyJobsPage from "pages/candidate/CompanyJobsPage/CompanyJobsPage";
import SignInPage from "pages/authenticate/SignInPage/SignInPage";
import AuthenticateLayout from "component/layouts/AuthenticateLayout/AuthenticateLayout";
import RegisterPage from "pages/authenticate/RegisterPage/RegisterPage";
import CompanyCreatePage from "pages/authenticate/CompanyCreatePage/CompanyCreatePage";
import HRLayout from "component/layouts/HRLayout/HRLayout";
import HRPostJobPage from "pages/hr/HRPostJobPage/HRPostJobPage";
import AuthProvider from "contexts/AuthContext/AuthContext";
import HRCompanyPage from "pages/hr/HRCompanyPage/HRCompanyPage";
import HRListJobsPage from "pages/hr/HRListJobsPage/HRListJobsPage";
import HREditJobPage from "pages/hr/HREditJobPage/HREditJobPage";
import UserSettingPage from "pages/user/UserSettingPage/UserSettingPage";
import CandidateProfileLayout from "component/layouts/CandidateProfileLayout/CandidateProfileLayout";
import CandidateListApplyPage from "pages/candidate/CandidateListApplyPage/CandidateListApplyPage";
import CandidateListFavoritePage from "pages/candidate/CandidateListFavoritePage/CandidateListFavoritePage";
import CandidateListFollowPage from "pages/candidate/CandidateListFollowPage/CandidateListFollowPage";
import HRJobCandidatePage from "pages/hr/HRJobCandidatePage/HRJobCandidatePage";
import ProtectedRoute from "route/ProtectedRoute/ProtectedRoute";
import Error404 from "component/shared/Error404/Error404";
import HRManagementPage from "pages/hr/HRManagementPage/HRManagementPage";
import JobDetailComponent from "component/candidate/ListJobsPage/JobDetailComponent/JobDetailComponent";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="authenticate"
            element={
              <ProtectedRoute authorization={["ANONYMOUS"]} redirect={"/"}>
                <AuthenticateLayout />
              </ProtectedRoute>
            }
          >
            <Route path="signin" element={<SignInPage />} />
            <Route path="jobseeker-register" element={<RegisterPage />} />
            <Route path="employer-register" element={<CompanyCreatePage />} />
          </Route>
          <Route
            path="/hr"
            element={
              <ProtectedRoute
                authorization={["HR", "MANAGER"]}
                redirect={"/404"}
              >
                <HRLayout />
              </ProtectedRoute>
            }
          >
            <Route path="post-job" element={<HRPostJobPage />} />
            <Route path="jobs" element={<HRListJobsPage />} />
            <Route path="jobs/edit/:jobId" element={<HREditJobPage />} />
            <Route
              path="jobs/candidate/:jobId"
              element={<HRJobCandidatePage />}
            />
            <Route path="management" element={<HRManagementPage />} />
            <Route path="company" element={<HRCompanyPage />} />
            <Route
              path="setting"
              element={<UserSettingPage userType={"hr"} />}
            />
          </Route>
          <Route element={<CandidateLayout />}>
            {/* PUBLIC PATH */}
            <Route path="/" element={<CandidateHomePage />} />
            <Route path="/jobs" element={<ListJobsPage />} />
            <Route path="/company/:companyId" element={<CompanyPage />}>
              <Route path="" element={<CompanyInfoPage />} />
              <Route path="jobs" element={<CompanyJobsPage />} />
            </Route>
            <Route
              path="/job/:jobId"
              element={<JobDetailComponent asPage={true} />}
            />
            <Route path="/questions" element={<ComingSoon />} key="questions" />
            <Route
              path="/experiences"
              element={<ComingSoon />}
              key="experiences"
            />
            <Route path="/documents" element={<ComingSoon />} key="documents" />
            <Route path="/about" element={<ComingSoon />} key="about" />

            {/* LOGIN PATH */}
            <Route
              path="/user"
              element={
                <ProtectedRoute authorization={["CANDIDATE"]}>
                  <CandidateProfileLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="profile"
                element={<UserSettingPage userType={"candidate"} />}
              />
              <Route path="applied" element={<CandidateListApplyPage />} />
              <Route
                path="interested"
                element={<CandidateListFavoritePage />}
              />
              <Route path="follow" element={<CandidateListFollowPage />} />
            </Route>
            {/* ERROR PATH */}
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
