import * as Yup from "yup";

const BrandSchema = Yup.object().shape({
  original_name: Yup.string()
    .required("عنوان لاتین برند الزامی است")
    .matches(/^[A-Za-z\s]+$/, "عنوان لاتین فقط باید حروف لاتین باشد"),
  persian_name: Yup.string()
    .required("عنوان فارسی برند الزامی است")
    .matches(/^[\u0600-\u06FF\s]+$/, "عنوان فارسی باید به فارسی باشد"),
  descriptions: Yup.string().optional(),
  logo: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "حجم فایل باید کمتر از 2 مگابایت باشد",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileType",
      "فرمت فایل باید jpg یا png باشد",
      (value) =>
        !value ||
        (value &&
          (value.type === "image/jpeg" ||
           value.type === "image/png"))
    ),
});

export default BrandSchema