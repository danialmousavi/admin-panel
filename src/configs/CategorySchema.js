import * as Yup from 'yup';

const categorySchema = Yup.object().shape({
  title: Yup.string()
    .required("عنوان دسته بندی الزامی است")
    .matches(/^[\u0600-\u06FF\s]+$/, "عنوان باید به زبان فارسی باشد"),
  description: Yup.string().optional(),
  parent_id: Yup.string().optional(),
  is_active: Yup.boolean().optional(),
  show_in_menu: Yup.boolean().optional(),
  image: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "حجم فایل باید کمتر از 2 مگابایت باشد",
      (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      }
    )
    .test(
      "fileType",
      "فرمت فایل باید jpg یا png باشد",
      (value) => {
        if (!value) return true;
        return (
          value.type === "image/jpeg" ||
          value.type === "image/png"
        );
      }
    ),
});

export default categorySchema;
