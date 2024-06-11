import * as yup from "yup";

export const userValidaator = yup.object().shape({
  fullname: yup
    .string("fullname must be string")
    .trim()
    .required("fullname is required")
    .test("len", "fullname must be more than 3 characters", (val) => val.length > 3),
  username: yup
    .string("username must be string")
    .trim()
    .required("username is required")
    .test("len", "username must be more than 3 characters", (val) => val.length > 3),
  roleId: yup.number().positive().required("role is required"),
});

export const passwordValidaator = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required("password is required")
    .test("len", "password must be more than 3 characters", (val) => val.length > 3),
});

// add validator for the other forms