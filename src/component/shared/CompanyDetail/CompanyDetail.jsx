import styles from "./styles.module.scss";
import { CardContent } from "@mui/material";
import { Link, LocationOn, People, Person } from "@mui/icons-material";
import Button from "component/shared/Button/Button";
import JobCard from "component/shared/JobCard/JobCard";
import Carousel from "../Carousel/Carousel";
import PictureCard from "../PictureCard/PictureCard";
import { useCompanyJobsQuery } from "services/apiQueries/queries/publicQueries";
import { useState } from "react";
import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import { useNavigate } from "react-router-dom";

function CompanyDetail({
  companyId,
  companyDetail,
  hasFollowBtn = true,
  showJobs = true,
  showInfo = true,
  handleFollow,
  carouselSize = 3,
}) {
  const [companyJobPage, setCompanyJobPage] = useState(1);
  const companyJobPageSize = 3;
  const companyJobsQuery = useCompanyJobsQuery(companyId, {
    page: companyJobPage,
    pageSize: companyJobPageSize,
  });
  const navigate = useNavigate();
  return (
    <CardContent className={styles.companyDetail}>
      {showInfo && (
        <>
          <div className={styles.companyDetailGeneralInfoContainer}>
            <h3>Thông tin công ty</h3>
            <div className={styles.companyDetailGeneralInfo}>
              <div>
                <p>
                  <LocationOn /> Địa chỉ: {companyDetail?.address}
                </p>
                <p>
                  <Person /> Người liên hệ: {companyDetail?.represent}
                </p>
                <p>
                  <People /> Quy mô: {companyDetail?.scale}
                </p>
                <p>
                  <Link /> Website: {companyDetail?.website}
                </p>
              </div>
              {hasFollowBtn && (
                <div className={styles.companyDetailFollowAction}>
                  <Button
                    extraStyle={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    onClickFnc={handleFollow}
                    type={
                      companyDetail?.isFollowed ? "extraFill" : "actionFill"
                    }
                  >
                    {companyDetail?.isFollowed ? "Followed!" : "Follow now"}
                  </Button>
                  <p>
                    {companyDetail?.follower > 0 &&
                      `${companyDetail?.follower} follower(s)`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {companyDetail?.about && (
            <div className={styles.companyDetailInfo}>
              <h3>Giới thiệu công ty</h3>
              <p>{companyDetail.about}</p>
            </div>
          )}

          {companyDetail?.companyImages?.length > 0 && (
            <div className={styles.companyDetailInfo}>
              <h3>Hình ảnh công ty</h3>
              <div style={{ padding: "0 1rem" }}>
                <Carousel
                  imageArray={companyDetail.companyImages.map(
                    (imgLink, index) => (
                      <PictureCard
                        imageSrc={imgLink}
                        imageAlt={`compIntroImg - ${index}`}
                        key={`compIntroImg - ${index}`}
                        imageId={index}
                      />
                    )
                  )}
                  size={carouselSize}
                />
              </div>
            </div>
          )}
        </>
      )}

      {showJobs && companyJobsQuery?.data?.jobs?.length > 0 && (
        <div className={styles.companyDetailInfo}>
          <h3>Tuyển dụng</h3>
          {companyJobsQuery?.data?.jobs?.map((item) => (
            <JobCard
              key={item.id}
              cardData={{
                id: item.id,
                position: item.title,
                location: item.cities.map((city) => {
                  return { value: city.id, label: city.name };
                }),
                postDate: item.updateAt,
                company: item.company,
                requirement: item.requirement,
              }}
              isFavorite={item.isMarked}
              displayAction={false}
              onClick={() => navigate(`/job/${item.id}`)}
            />
          ))}
          <CustomPagination
            totalPage={
              companyJobsQuery?.data?.totalCount
                ? Math.ceil(
                    companyJobsQuery?.data?.totalCount / companyJobPageSize
                  )
                : 1
            }
            current={companyJobPage}
            onChange={(page) => setCompanyJobPage(page)}
            range={5}
          />
        </div>
      )}
    </CardContent>
  );
}

export default CompanyDetail;
