import CompanyPFPComponent from "component/candidate/CompanyPage/CompanyPFPComponent/CompanyPFPComponent";
import Error404 from "component/shared/Error404/Error404";
import Loading from "component/shared/Loading/Loading";
import { Outlet, useParams } from "react-router-dom";
import { useCompanyDetailQuery } from "services/apiQueries/queries/publicQueries";

function CompanyPage() {
  const { companyId } = useParams();
  const companyDetailQuery = useCompanyDetailQuery(companyId);
  if (companyDetailQuery.isError) return <Error404 />;
  if (companyDetailQuery.isLoading) return <Loading />;
  return (
    <div style={{ marginBottom: "2rem" }}>
      <CompanyPFPComponent
        name={companyDetailQuery.data.name}
        followNumber={companyDetailQuery.data.followNumber}
        isFollowed={companyDetailQuery.data.isFollowed}
        avatar={companyDetailQuery.data.avatar}
        wallpaper={companyDetailQuery.data.wallpaper}
        companyId={companyId}
      />
      <Outlet />
    </div>
  );
}

export default CompanyPage;
