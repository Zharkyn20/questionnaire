import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().required("Required").email("Invalid"),
  company_name: yup.string().required("Required"),
  password: yup.string().required("Required").min(8),
});
