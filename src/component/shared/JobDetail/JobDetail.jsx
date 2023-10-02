import styles from "./styles.module.scss";
import {
  AttachMoney,
  Event,
  LocationOn,
  People,
  UpdateOutlined,
  Work,
} from "@mui/icons-material";
import { CardContent } from "@mui/material";
import { currencyFormat } from "utils/currencyFormat";
import format from "date-fns/format";

function JobDetail({ jobDetail }) {
  const getSalaryRange = (currencyObject) => {
    if (currencyObject?.minSalary && !currencyObject?.maxSalary) {
      return `Từ ${currencyFormat(
        currencyObject.minSalary,
        currencyObject.currency
      )}`;
    } else if (currencyObject?.maxSalary && !currencyObject?.minSalary) {
      return `Đến ${currencyFormat(
        currencyObject.maxSalary,
        currencyObject.currency
      )}`;
    } else if (currencyObject?.minSalary && currencyObject?.maxSalary) {
      return `${currencyFormat(
        currencyObject.minSalary,
        currencyObject.currency
      )} - ${currencyFormat(
        currencyObject.maxSalary,
        currencyObject.currency
      )}`;
    } else {
      return "Thỏa thuận";
    }
  };
  return (
    <CardContent className={styles.job}>
      <div className={styles.jobGeneralInfoContainer}>
        <div className={styles.jobGeneralInfoColumn}>
          <div className={styles.jobGeneralInfo}>
            <h4>
              <LocationOn /> Địa điểm
            </h4>
            <p>{jobDetail?.location?.map((item) => item.name)?.join(" | ")}</p>
          </div>
          <div className={styles.jobGeneralInfo}>
            <h4>
              <UpdateOutlined /> Cập nhật
            </h4>
            <p>
              {jobDetail?.updatedDate &&
                format(new Date(jobDetail?.updatedDate), "dd/LL/yyyy")}
            </p>
          </div>
          <div className={styles.jobGeneralInfo}>
            <h4>
              <Event /> Hết hạn nộp
            </h4>
            <p>
              {jobDetail?.expiredDate &&
                format(new Date(jobDetail?.expiredDate), "dd/LL/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.jobGeneralInfoColumn}>
          <div className={styles.jobGeneralInfo}>
            <h4>
              <AttachMoney /> Hình thức
            </h4>
            <p>{jobDetail?.jobType?.map((item) => item.type)?.join(" | ")}</p>
          </div>
          <div className={styles.jobGeneralInfo}>
            <h4>
              <Work /> Mức lương
            </h4>
            <p>{getSalaryRange(jobDetail?.salary)}</p>
          </div>
          <div className={styles.jobGeneralInfo}>
            <h4>
              <People /> Số lượng
            </h4>
            <p>{jobDetail?.recruitAmount || "Không xác định"}</p>
          </div>
        </div>
      </div>

      <div className={styles.jobDetailInfoContainer}>
        <div className={styles.jobDetailInfo}>
          <h3>Mô tả công việc</h3>
          {/* <p>{jobDetail?.description}</p> */}
          <div dangerouslySetInnerHTML={{ __html: jobDetail?.description }} />
        </div>
        <div className={styles.jobDetailInfo}>
          <h3>Yêu cầu ứng viên</h3>
          {/* <p>{jobDetail?.requirement}</p> */}
          <div dangerouslySetInnerHTML={{ __html: jobDetail?.requirement }} />
        </div>
        <div className={styles.jobDetailInfo}>
          <h3>Quyền lợi</h3>
          {/* <p>{jobDetail?.benefit}</p> */}
          <div dangerouslySetInnerHTML={{ __html: jobDetail?.benefit }} />
        </div>
      </div>
    </CardContent>
  );
}

export default JobDetail;
