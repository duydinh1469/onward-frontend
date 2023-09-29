import styles from "./styles.module.scss";
import companyDetailImage from "assets/images/company_profile.jpg";

import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BusinessOutlined } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";

import InfoCard from "component/shared/InfoCard/InfoCard";
import Button from "component/shared/Button/Button";
import {
  useFollowCompanyMutation,
  useUnFollowCompanyMutation,
} from "services/apiQueries/mutations/candidateMutation";
import { useQueryClient } from "@tanstack/react-query";

function CompanyPFPComponent({
  wallpaper,
  avatar,
  name,
  followNumber,
  isFollowed,
  companyId,
}) {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    const segment = location.pathname.split("/");
    const lastSegment = segment[segment.length - 1];
    if (lastSegment === "jobs") {
      setTabValue(1);
    }
  }, []);

  const followCompanyMutation = useFollowCompanyMutation(() => {
    queryClient.setQueryData(
      ["public", "companyDetail", companyId],
      (oldData) => {
        return {
          ...oldData,
          isFollowed: true,
          followNumber: oldData.followNumber + 1,
        };
      }
    );
    queryClient.invalidateQueries(["public", "companyDetail", companyId], {
      exact: true,
    });
  });
  const unFollowCompanyMutation = useUnFollowCompanyMutation(() => {
    queryClient.setQueryData(
      ["public", "companyDetail", companyId],
      (oldData) => {
        return {
          ...oldData,
          isFollowed: false,
          followNumber: oldData.followNumber - 1,
        };
      }
    );
    queryClient.invalidateQueries(["public", "companyDetail", companyId], {
      exact: true,
    });
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      navigate("");
    } else if (newValue === 1) {
      navigate("jobs");
    }
  };

  const handleFollowCompany = () => {
    isFollowed
      ? unFollowCompanyMutation.mutate(companyId)
      : followCompanyMutation.mutate(companyId);
  };

  return (
    <>
      <InfoCard
        wallpaper={wallpaper ? wallpaper : companyDetailImage}
        title={name}
        avatarIcon={<BusinessOutlined />}
        avatar={avatar}
        useMedia={false}
        actions={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              extraStyle={{ padding: "0.5rem 2rem" }}
              onClickFnc={handleFollowCompany}
              type={isFollowed ? "extraFill" : "actionFill"}
            >
              {isFollowed ? "Followed!" : "Follow now"}
            </Button>
            {followNumber === 1 ? (
              <p>{followNumber} follower</p>
            ) : (
              followNumber > 1 && <p>{followNumber} followers</p>
            )}
          </div>
        }
      ></InfoCard>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className={styles.companyPFPTabs}
      >
        <Tab label="Company information" className={styles.companyPFPTab} />
        <Tab label="Open positions" className={styles.companyPFPTab} />
      </Tabs>
    </>
  );
}

CompanyPFPComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CompanyPFPComponent;
