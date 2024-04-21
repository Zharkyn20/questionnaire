import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required("Required"),
  file: yup.string().required("Required"),
});
