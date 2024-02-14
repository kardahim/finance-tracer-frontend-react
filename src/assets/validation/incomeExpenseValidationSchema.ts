import * as Yup from "yup";

export const incomeExpenseValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  amount: Yup.number()
    .typeError("Enter a number")
    .required("Amount is required")
    .positive("Must be positive"),
  date: Yup.date().typeError("Enter a date").required("Date is required"),
  sourceId: Yup.number()
    .required("Source is required")
    .integer("Wrong ID")
    .positive("Wrong ID - isnt positive"),
});
