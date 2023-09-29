import styles from "./styles.module.scss";

import { Card, CardContent, Checkbox, FormControlLabel } from "@mui/material";
import FormItem from "component/shared/Form/FormItem/FormItem";
import { RadioComponent } from "component/shared/Input";
import Button from "component/shared/Button/Button";
import { useRef, useState } from "react";
import { compareDesc, add } from "date-fns";
import { useFormContext } from "react-hook-form";
import CustomDialog from "component/shared/CustomDialog/CustomDialog";

function JobPackageInputComponent({ isEdit = false, expiredDate, jobPackage }) {
  const isCreate = !expiredDate || expiredDate?.toString() === "Invalid Date";
  const mustExtend =
    isCreate || compareDesc(expiredDate, new Date()) === 1 ? true : false;
  const { getValues, reset } = useFormContext();
  const [isExtend, setIsExtend] = useState(
    // isCreate || compareDesc(expiredDate, new Date()) === 1 ? true : false
    mustExtend
  );
  const [extendDate, setExtendDate] = useState(
    isCreate
      ? add(new Date(), { days: getValues("jobPackage") })
      : compareDesc(expiredDate, new Date()) === 1
      ? add(new Date(), { days: getValues("jobPackage") })
      : add(expiredDate, { days: getValues("jobPackage") })
  );
  const [openDialog, setOpenDialog] = useState(false);
  const submitBtnRef = useRef(null);

  const radioOnChange = (value) => {
    const today = new Date();
    const currentExpired = expiredDate
      ? today > expiredDate
        ? today
        : expiredDate
      : today;
    setExtendDate(add(currentExpired, { days: parseInt(value) }));
  };

  return (
    <>
      <Card variant="outlined" className={styles.modifyJobPackageCard}>
        <CardContent className={styles.modifyJobPackageCardContent}>
          <p className={styles.modifyJobPackageCardHeader}>Status</p>

          {isEdit && (
            <FormItem
              name={"jobPackage"}
              clearError={true}
              onChange={radioOnChange}
            >
              <RadioComponent
                options={jobPackage}
                isRow={true}
                rowWrap={"40%"}
                disabled={!isEdit || !isExtend}
              />
            </FormItem>
          )}

          {!isCreate && (
            <p
              className={styles.modifyJobPackageCardInfo}
            >{`Expired at: ${expiredDate}`}</p>
          )}

          {isExtend && isEdit && (
            <p className={styles.modifyJobPackageCardInfo}>
              {`Extend to: ${extendDate}`}
            </p>
          )}

          {isEdit && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isExtend}
                  onChange={() => {
                    setIsExtend(!isExtend);
                  }}
                />
              }
              label="Extend package"
              disabled={mustExtend}
            />
          )}

          {isCreate && (
            <Button
              // isSubmit={true}
              extraStyle={{ width: "100%", marginBottom: "10px" }}
              onClickFnc={() => setOpenDialog(true)}
            >
              Create Job
            </Button>
          )}
          <button hidden={true} ref={submitBtnRef} type={"submit"} />
        </CardContent>
      </Card>
      <CustomDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title={"Create job?"}
        message={"This action will create new job post"}
        actionBtn={[
          {
            label: "Cancel",
            onClick: () => setOpenDialog(false),
            type: "text",
          },
          {
            label: "Create job",
            onClick: () => {
              setOpenDialog(false);
              submitBtnRef?.current?.click();
            },
            type: "extraFill",
            size: "small",
            isSubmit: true,
          },
        ]}
      />
    </>
  );
}

export default JobPackageInputComponent;
