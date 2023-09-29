import { Card, CardContent } from "@mui/material";
import styles from "./styles.module.scss";
import FormItem from "component/shared/Form/FormItem/FormItem";
import {
  SearchComponent,
  // SelectComponent,
  TextInputComponent,
} from "component/shared/Input";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import Carousel from "component/shared/Carousel/Carousel";
import PictureCard from "component/shared/PictureCard/PictureCard";
import { useDistrictMutation } from "services/apiQueries/mutations/publicMutations";

function CompanyDetailCard({ companyScale, companyCity, showText }) {
  const { getValues, setValue } = useFormContext();
  const [imageIntro, setImageIntro] = useState([]);

  const districtMutation = useDistrictMutation();

  useEffect(() => {
    showText &&
      districtMutation.mutate({ cityId: getValues("companyCity").value });
    showText &&
      setImageIntro(
        getValues("companyIntroImages").map((img) => {
          return { file: null, link: img.imageLink };
        })
      );
  }, [showText]);

  const handleImageIntro = (imgList) => {
    setValue("companyIntro", [...imgList, ...imageIntro]);
    const newImport = [...imgList].map((file) => {
      return { file: file, link: null };
    });
    setImageIntro([...newImport, ...imageIntro]);
  };

  const handleDeleteImage = (imgId) => {
    setValue(
      "companyIntro",
      imageIntro
        .filter((img, index) => {
          return index !== imgId && img.file;
        })
        .map((img) => img.file)
    );
    setValue(
      "companyIntroImages",
      imageIntro
        .filter((img, index) => {
          return index !== imgId && img.file === null;
        })
        .map((img) => {
          return { imageLink: img.link };
        })
    );
    setImageIntro(imageIntro.filter((img, index) => index !== imgId));
  };
  return (
    <>
      <Card variant="outlined" className={styles.compEditCard}>
        <CardContent className={styles.compEditCardContent}>
          <div className={styles.compEditGeneralInfo}>
            <FormItem
              name={"companyRepresenter"}
              clearError={true}
              label="Representer"
              required={!showText}
            >
              <TextInputComponent
                placeholder="Representer"
                showText={showText}
                disabled={showText}
              />
            </FormItem>

            <div className={styles.compEditGeneralInfoEx}>
              <FormItem
                name={"companyWebsite"}
                clearError={true}
                label="Website"
                required={!showText}
              >
                <TextInputComponent
                  placeholder="Website"
                  showText={showText}
                  disabled={showText}
                />
              </FormItem>

              <FormItem
                name={"companyScale"}
                clearError={true}
                label="Company Size"
                required={!showText}
              >
                {/* <SelectComponent options={companyScale} disabled={showText} /> */}
                <SearchComponent
                  placeholder="Scale"
                  options={companyScale}
                  disabled={showText}
                  showText={showText}
                />
              </FormItem>
            </div>
          </div>

          <div className={styles.compEditGeneralInfo}>
            <FormItem
              name={"companyAddress"}
              clearError={true}
              label="Address"
              required={!showText}
            >
              <TextInputComponent
                placeholder="Address"
                showText={showText}
                disabled={showText}
              />
            </FormItem>

            <div className={styles.compEditGeneralInfoEx}>
              <FormItem
                name={"companyCity"}
                clearError={true}
                label="City"
                required={!showText}
                onChange={(city) => {
                  setValue("companyDistrict", "");
                  districtMutation.mutate({ cityId: city?.value });
                }}
              >
                <SearchComponent
                  placeholder="City"
                  options={companyCity}
                  disabled={showText}
                  showText={showText}
                />
              </FormItem>

              {showText ? (
                <div className={styles.compEditFormItem}>
                  <p className={styles.compEditFormItemLabel}>District</p>
                  <TextInputComponent
                    value={getValues("companyDistrict").label}
                    disabled={showText}
                    showText={showText}
                  />
                </div>
              ) : (
                <FormItem
                  name={"companyDistrict"}
                  clearError={true}
                  label="District"
                  required={!showText}
                >
                  <SearchComponent
                    placeholder="District"
                    options={
                      districtMutation?.data?.map((district) => {
                        return { label: district.name, value: district.id };
                      }) || []
                    }
                    disabled={showText}
                    showText={showText}
                  />
                </FormItem>
              )}
            </div>
          </div>

          <FormItem
            name={"companyDescription"}
            clearError={true}
            label="Description"
            required={!showText}
          >
            <TextInputComponent
              placeholder="Description"
              rows={7}
              showText={showText}
              disabled={showText}
            />
          </FormItem>

          <p
            className={`${styles.compEditFormItemLabel} ${styles.compEditFormItemImage}`}
          >
            Company Images
          </p>
          {!showText && (
            <div className={styles.compEditUploadCard}>
              <PictureCard useAdd={true} handleAdd={handleImageIntro} />
            </div>
          )}
          <Carousel
            imageArray={imageIntro.map((image, index) => (
              <PictureCard
                imageSrc={
                  image.file ? URL.createObjectURL(image.file) : image.link
                }
                imageAlt={`compIntroImg - ${index}`}
                key={`compIntroImg - ${index}`}
                useDelete={showText ? false : true}
                handleDelete={handleDeleteImage}
                imageId={index}
              />
            ))}
            size={5}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default CompanyDetailCard;
