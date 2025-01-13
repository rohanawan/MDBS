import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").required("Password is Required"),
});

export default SignupSchema;
