import FormItem from "component/shared/Form/FormItem/FormItem";
import styles from "./styles.module.scss";
import { SearchComponent, TextInputComponent } from "component/shared/Input";
import Button from "component/shared/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { districtService } from "services/api/publicAPI";
import { useFormContext } from "react-hook-form";

function CompanyGeneralComponent({ handleBack, cityArray, scaleArray }) {
  const { setValue } = useFormContext();
  const districtMutation = useMutation({
    mutationFn: districtService,
    onMutate: () => setValue("companyDistrict", ""),
  });
  return (
    <>
      <FormItem
        name="companyNameReg"
        clearError={true}
        label="Company Name"
        required={true}
        key="companyNameKey"
      >
        <TextInputComponent placeholder="Company Name" />
      </FormItem>
      <FormItem
        name="companyWebsiteReg"
        clearError={true}
        label="Website"
        required={true}
        key="companyWebsite"
      >
        <TextInputComponent placeholder="Website" />
      </FormItem>
      <FormItem
        name="companyScaleReg"
        clearError={true}
        label="Scale"
        required={true}
      >
        <SearchComponent placeholder="Quy mô" options={scaleArray || []} />
      </FormItem>
      <div className={styles.companyCreateLocation}>
        <FormItem
          name="companyCity"
          clearError={true}
          label="City"
          onChange={(city) => {
            districtMutation.mutate({ cityId: city?.value });
          }}
          required={true}
        >
          <SearchComponent
            placeholder="City"
            options={
              cityArray?.map((city) => {
                return { label: city.name, value: city.id };
              }) || []
            }
            key={"citySearchSelect"}
          />
        </FormItem>
        <FormItem
          name="companyDistrict"
          clearError={true}
          label="District"
          required={true}
        >
          <SearchComponent
            placeholder="District"
            options={
              districtMutation?.data?.map((district) => {
                return { label: district.name, value: district.id };
              }) || []
            }
            key={"districtSearchSelect"}
          />
        </FormItem>
      </div>

      <FormItem
        name="companyAddressReg"
        clearError={true}
        label="Address"
        key="companyAddress"
        required={true}
      >
        <TextInputComponent placeholder="Address" />
      </FormItem>
      <div className={styles.companyCreateActionContainer}>
        <Button type="actionOutline" onClickFnc={handleBack}>
          Quay lại
        </Button>
        <Button type="actionFill" isSubmit={true}>
          Đăng ký
        </Button>
      </div>
    </>
  );
}

export default CompanyGeneralComponent;
