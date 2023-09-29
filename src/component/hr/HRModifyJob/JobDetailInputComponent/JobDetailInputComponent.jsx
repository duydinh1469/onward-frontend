import styles from "./styles.module.scss";
import { Card, CardContent } from "@mui/material";
import FormItem from "component/shared/Form/FormItem/FormItem";
import { TextInputComponent } from "component/shared/Input";

function JobDetailInputComponent({ isEdit = false }) {
  return (
    <Card variant="outlined" className={styles.modifyJobDetailCard}>
      <CardContent className={styles.modifyJobDetailCardContent}>
        <FormItem
          name={"jobTitle"}
          clearError={true}
          label="Title"
          required={isEdit}
        >
          <TextInputComponent
            placeholder="Title"
            showText={!isEdit}
            disabled={!isEdit}
          />
        </FormItem>

        <FormItem
          name={"jobDescription"}
          clearError={true}
          label="Description"
          required={isEdit}
        >
          <TextInputComponent
            placeholder="Description"
            rows={7}
            showText={!isEdit}
            disabled={!isEdit}
          />
        </FormItem>

        <FormItem
          name={"jobBenefit"}
          clearError={true}
          label="Benefit"
          required={isEdit}
        >
          <TextInputComponent
            placeholder="Benefit"
            rows={7}
            showText={!isEdit}
            disabled={!isEdit}
          />
        </FormItem>

        <FormItem
          name={"jobRequirement"}
          clearError={true}
          label="Requirement"
          required={isEdit}
        >
          <TextInputComponent
            placeholder="Requirement"
            rows={7}
            showText={!isEdit}
            disabled={!isEdit}
          />
        </FormItem>
      </CardContent>
    </Card>
  );
}

export default JobDetailInputComponent;
