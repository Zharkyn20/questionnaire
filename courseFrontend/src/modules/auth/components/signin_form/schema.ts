import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().required("Required").email("Invalid"),
  password: yup.string().required("Required").min(8),
});
