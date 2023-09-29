// import styles from "./styles.module.scss";
import {
  useCityQuery,
  useCompanyScaleQuery,
} from "services/apiQueries/queries/publicQueries";
import { useCompanyInfoQuery } from "services/apiQueries/queries/managerQueries";
import CompanyFormComponent from "component/hr/HRCompany/CompanyFormComponent/CompanyFormComponent";
import { useCompanyInfoMutation } from "services/apiQueries/mutations/managerMutations";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";
import { Backdrop, CircularProgress } from "@mui/material";

function HRCompanyPage() {
  const companyInfoQuery = useCompanyInfoQuery();
  const scaleQuery = useCompanyScaleQuery();
  const cityQuery = useCityQuery();

  const companyMutation = useCompanyInfoMutation();

  const handleSubmit = async (data, action) => {
    const form = new FormData();
    form.append("address", data.companyAddress);
    form.append("website", data.companyWebsite);
    form.append("scale", data.companyScale.value);
    form.append("districtId", data.companyDistrict.value);
    form.append("description", data.companyDescription);
    form.append("representer", data.companyRepresenter);

    form.append("avatar", data.companyAvatar);
    form.append("avatarLink", data.companyAvatarLink);

    form.append("wallpaper", data.companyWallpaper);
    form.append("wallpaperLink", data.companyWallpaperLink);

    data.companyIntroImages.forEach((item, index) =>
      form.append(`introImages[]`, JSON.stringify(item))
    );
    data.companyIntro.forEach((item) => form.append("intro", item));
    await companyMutation.mutate(form, action);
  };

  if (companyInfoQuery.isError || scaleQuery.isError || cityQuery.isError) {
    return <NoData />;
  }

  if (
    companyInfoQuery.isLoading ||
    scaleQuery.isLoading ||
    cityQuery.isLoading
  ) {
    return <Loading />;
  }

  return (
    <div style={{ position: "relative" }}>
      <CompanyFormComponent
        cityArray={cityQuery.data.map((city) => {
          return { label: city.name, value: city.id };
        })}
        scaleArray={scaleQuery.data}
        companyName={companyInfoQuery.data.name}
        handleSubmit={handleSubmit}
        pageData={{
          companyAddress: companyInfoQuery.data.address,
          companyScale: scaleQuery.data.find(
            (item) => item.value === companyInfoQuery.data.scale
          ),
          companyWebsite: companyInfoQuery.data.website,
          companyCity: {
            value: companyInfoQuery.data.district.city.id,
            label: companyInfoQuery.data.district.city.name,
          },
          companyDistrict: {
            value: companyInfoQuery.data.district.id,
            label: companyInfoQuery.data.district.name,
          },
          companyDescription: companyInfoQuery.data.description,
          companyRepresenter: companyInfoQuery.data.representer,
          companyIntroImages: companyInfoQuery.data.companyImages,
          companyMapLink: companyInfoQuery.data.mapLink,
          companyAvatarLink: companyInfoQuery.data.avatar,
          companyWallpaperLink: companyInfoQuery.data.wallpaper,
          companyAvatar: null,
          companyWallpaper: null,
          companyIntro: [],
        }}
      />
      {(companyMutation.isLoading || companyInfoQuery.isFetching) && (
        <Backdrop
          sx={{
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            color: "#2b3467",
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default HRCompanyPage;
