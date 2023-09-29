import styles from "./styles.module.scss";

import { Card, CardContent } from "@mui/material";
import FormItem from "component/shared/Form/FormItem/FormItem";
import {
  SearchComponent,
  SelectComponent,
  TextInputComponent,
} from "component/shared/Input";

function JobGeneralInputComponent({
  isEdit = false,
  cityArray,
  workTypeArray,
  currencyArray,
}) {
  return (
    <Card variant="outlined" className={styles.modifyJobGeneralInfoCard}>
      <CardContent className={styles.modifyJobGeneralInfoCardContent}>
        <FormItem
          name={"jobType"}
          clearError={true}
          label="Work Type"
          required={isEdit}
        >
          <SearchComponent
            placeholder="Work Type"
            options={workTypeArray}
            multiple={true}
            disabled={!isEdit}
            showText={!isEdit}
          />
        </FormItem>
        <FormItem
          name={"jobHiredAmount"}
          clearError={true}
          label="Hired Amount"
          required={isEdit}
        >
          <TextInputComponent
            placeholder="Hired Amount"
            type="number"
            disabled={!isEdit}
            showText={!isEdit}
          />
        </FormItem>
        <FormItem
          name={"jobCity"}
          clearError={true}
          label="Location"
          required={isEdit}
        >
          <SearchComponent
            placeholder="Location"
            options={cityArray}
            multiple={true}
            disabled={!isEdit}
            showText={!isEdit}
          />
        </FormItem>

        <p className={styles.modifyJobCustomLabel}>Salary</p>
        <FormItem
          name={"jobMinSalary"}
          clearError={true}
          label="Min"
          layout="row"
          labelExtraStyle={{ fontWeight: "normal" }}
        >
          <TextInputComponent
            placeholder="Min Salary"
            type="number"
            disabled={!isEdit}
            showText={!isEdit}
            endAdornment={
              <FormItem name={"jobSalaryCurrency"} clearError={true}>
                <SelectComponent
                  options={currencyArray}
                  isAdornment={true}
                  disabled={!isEdit}
                  showText={!isEdit}
                />
              </FormItem>
            }
          />
        </FormItem>
        <FormItem
          name={"jobMaxSalary"}
          clearError={true}
          label="Max"
          layout="row"
          labelExtraStyle={{ fontWeight: "normal" }}
        >
          <TextInputComponent
            placeholder="Max Salary"
            type="number"
            disabled={!isEdit}
            showText={!isEdit}
            endAdornment={
              <FormItem name={"jobSalaryCurrency"} clearError={true}>
                <SelectComponent
                  options={currencyArray}
                  isAdornment={true}
                  disabled={!isEdit}
                  showText={!isEdit}
                />
              </FormItem>
            }
          />
        </FormItem>
      </CardContent>
    </Card>
  );
}

export default JobGeneralInputComponent;
