import * as Yup from 'yup';

const ProductsvalidationSchema = Yup.object({
  category_ids: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  price: Yup.number()
    .required("لطفا این قسمت را پر کنید")
    .typeError("فقط عدد وارد کنید"),
  weight: Yup.number()
    .nullable()
    .typeError("فقط عدد وارد کنید"),
  brand_id: Yup.string().nullable(),
  color_ids: Yup.string()
    .nullable()
    .matches(/^[0-9\s-]*$/, "فقط از اعداد و خط تیره استفاده شود"),
  guarantee_ids: Yup.string()
    .nullable()
    .matches(/^[0-9\s-]*$/, "فقط از اعداد و خط تیره استفاده شود"),
  descriptions: Yup.string()
    .nullable(),
    // .matches(
    //   /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]*$/,
    //   "فقط از حروف و اعداد استفاده شود"
    // ),
  short_descriptions: Yup.string()
    .nullable()
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]*$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  cart_descriptions: Yup.string()
    .nullable()
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]*$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  image: Yup.mixed()
  .nullable(),
  // .test(
  //   "fileSize",
  //   "حجم فایل نمیتواند بیشتر از 500 کیلوبایت باشد",
  //   value => {
  //     if (!value) return true; // اگر فایلی انتخاب نشده بود، مشکلی نیست
  //     return value.size <= 500 * 1024;
  //   }
  // ),
  alt_image: Yup.string()
    .nullable()
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]*$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  keywords: Yup.string()
    .nullable()
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]*$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  stock: Yup.number()
    .nullable()
    .typeError("فقط عدد وارد کنید"),
  discount: Yup.number()
    .nullable()
    .typeError("فقط عدد وارد کنید"),
});

export default ProductsvalidationSchema;
