import styles from "./styles.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import Button from "component/shared/Button/Button";
import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import FormItem from "component/shared/Form/FormItem/FormItem";
import {
  TextInputComponent,
  SearchComponent,
  SelectComponent,
} from "component/shared/Input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

function FilterBarComponent({ cityArray, typeArray, timeArray }) {
  const formMethods = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const searchValue = searchParams.get("q") ? searchParams.get("q") : "";
    const locationValue = searchParams.get("loc")
      ? searchParams
          .get("loc")
          .split(",")
          .map((val) => cityArray.find((item) => item.value === parseInt(val)))
          .filter((item) => item !== undefined)
      : [];

    const timeValue = searchParams.get("from") ? searchParams.get("from") : "";
    const typeValue = searchParams.get("type") ? searchParams.get("type") : "";
    formMethods.setValue("titleFilter", searchValue);
    formMethods.setValue("locationFilter", locationValue);
    formMethods.setValue("timeFilter", parseInt(timeValue));
    formMethods.setValue("typeFilter", parseInt(typeValue));
  }, []);

  const handleSubmit = (data) => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    data.titleFilter && data.titleFilter !== ""
      ? updatedSearchParams.set("q", data.titleFilter.trim())
      : updatedSearchParams.delete("q");

    data.locationFilter?.length > 0
      ? updatedSearchParams.set(
          "loc",
          data.locationFilter.map((i) => i.value).join(",")
        )
      : updatedSearchParams.delete("loc");

    data.timeFilter && data.timeFilter !== ""
      ? updatedSearchParams.set("from", data.timeFilter)
      : updatedSearchParams.delete("from");

    data.typeFilter && data.typeFilter !== ""
      ? updatedSearchParams.set("type", data.typeFilter)
      : updatedSearchParams.delete("type");

    if (updatedSearchParams.toString() !== searchParams.toString()) {
      updatedSearchParams.delete("id");
      updatedSearchParams.delete("p");
      queryClient.removeQueries({ queryKey: ["public", "jobs"] });
    }

    setSearchParams(updatedSearchParams.toString());
  };

  return (
    <FormContainer formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.filterbarContainer}>
        <div className={styles.filterbarMainFilter}>
          <FormItem name="titleFilter" clearError={true}>
            <TextInputComponent
              placeholder="Chức danh, tên công ty"
              startAdornment="Từ khóa"
              hideError={true}
              helperReserve={false}
            />
          </FormItem>
        </div>

        <div className={styles.filterbarMainFilter}>
          <FormItem name="locationFilter" clearError={true}>
            <SearchComponent
              placeholder="Tỉnh, thành phố"
              startAdornment="Địa điểm"
              options={cityArray || []}
              multiple={true}
              helperReserve={false}
            />
          </FormItem>
        </div>

        <div className={styles.filterbarSubFilter}>
          <FormItem name="timeFilter" clearError={true}>
            <SelectComponent
              label="Ngày đăng"
              options={timeArray}
              defaultOption="-- Ngày đăng --"
              helperReserve={false}
            />
          </FormItem>
        </div>

        <div className={styles.filterbarSubFilter}>
          <FormItem name="typeFilter" clearError={true}>
            <SelectComponent
              label="Hình thức"
              options={typeArray || []}
              defaultOption="-- Hình thức --"
              helperReserve={false}
            />
          </FormItem>
        </div>

        <Button isSubmit={true}>Tìm kiếm</Button>
      </div>
    </FormContainer>
  );
}

export default FilterBarComponent;
