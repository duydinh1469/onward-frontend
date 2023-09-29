import styles from "./styles.module.scss";

// import CompanyMapComponent from "component/candidate/CompanyPage/CompanyMapComponent/CompanyMapComponent";
import CompanyInfoComponent from "component/candidate/CompanyPage/CompanyInfoComponent/CompanyInfoComponent";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoData from "component/shared/NoData/NoData";

function CompanyInfoPage() {
  const { companyId } = useParams();
  const queryClient = useQueryClient();
  const companyData = queryClient.getQueryData([
    "public",
    "companyDetail",
    companyId,
  ]);
  if (!companyData) return <NoData />;
  return (
    <CompanyInfoComponent
      companyDetail={{
        address: companyData.address,
        represent: companyData.representer,
        scale: companyData.scale,
        website: companyData.website,
        follower: companyData.followNumber,
        about: companyData.description,
        companyImages: companyData.companyImages?.map((img) => img.imageLink),
        isFollowed: companyData.isFollowed,
      }}
    />
  );
}

export default CompanyInfoPage;
