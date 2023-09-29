// import styles from "./styles.module.scss";
import { useUserProfileQuery } from "services/apiQueries/queries/userQueries";
import { useUserProfileMutation } from "services/apiQueries/mutations/userMutations";
import UserSettingFormComponent from "component/user/UserSetting/UserSettingFormComponent/UserSettingFormComponent";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";
import { Backdrop, CircularProgress } from "@mui/material";

function UserSettingPage({ userType }) {
  const userProfileQuery = useUserProfileQuery();
  const userProfileMutation = useUserProfileMutation();

  const handleSubmit = (data, action) => {
    const form = new FormData();
    form.append("givenName", data.userGivenName);
    form.append("surname", data.userSurname);
    form.append("avatar", data.userAvatar);
    form.append("avatarLink", data.userAvatarLink);
    // Candidate only fields
    form.append("cv", data.userCV);
    form.append("cvLink", data.userCVLink);
    // HR and Manager only fields
    form.append("phoneNumber", data.userPhoneNumber);

    userProfileMutation.mutate(form, action);
  };

  if (userProfileQuery.isError) return <NoData />;
  // Tricky part: Because mutation loading state a different component, it will switch between component
  // => reset state inside UserSettingFormComponent
  if (userProfileQuery.isLoading) return <Loading />;

  return (
    <div style={{ position: "relative" }}>
      <UserSettingFormComponent
        pageData={{
          // General props
          userGivenName: userProfileQuery.data.givenName,
          userSurname: userProfileQuery.data.surname,
          userAvatar: null,
          userAvatarLink: userProfileQuery.data.avatar,
          // user only props
          userCV: null,
          userCVLink: userProfileQuery.data.candidateProfile?.cvLink || null,
          // HR and Manager only props
          userPhoneNumber: userProfileQuery.data.hrProfile?.phoneNumber || null,
        }}
        handleSubmit={handleSubmit}
        userType={userType}
        userEmail={userProfileQuery.data.email}
      />
      {(userProfileMutation.isLoading || userProfileQuery.isFetching) && (
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

export default UserSettingPage;
