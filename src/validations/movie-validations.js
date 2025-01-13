import * as Yup from "yup";

const MovieSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  publishingYear: Yup.number()
    .required("Publishing year is required")
    .min(1900, "Year must be later than 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

export default MovieSchema;
