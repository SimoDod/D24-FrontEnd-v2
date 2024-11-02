import { useTranslation } from "react-i18next";
import { AuthMode } from "../../../types/Authentication";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store/store";
import { loginThunk } from "../../../store/thunks/auth/loginThunk";
import { registerThunk } from "../../../store/thunks/auth/registerThunk";
import { LoginData, RegisterData } from "../../../types/User";
import swapArrayElements from "../../../utils/array/swapArrayElements";
import { useState } from "react";

const loginInitialValues = {
  email: "",
  password: "",
};
const signUpInitialValues = {
  confirmPassword: "",
  username: "",
};

const useAuthenticationPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [authMode, setAuthMode] = useState(AuthMode.LOGIN);
  const isLoginMode = authMode === AuthMode.LOGIN;
  const isRegisterMode = authMode === AuthMode.SIGN_UP;
  const toggleAuthMode = () =>
    setAuthMode((prev) =>
      prev === AuthMode.LOGIN ? AuthMode.SIGN_UP : AuthMode.LOGIN
    );

  const handleAuthentication = (authData: LoginData | RegisterData) => {
    if (isLoginMode) {
      dispatch(loginThunk(authData));
    }

    if (isRegisterMode) {
      dispatch(registerThunk(authData as RegisterData));
    }
  };

  const loginInputs = {
    email: Yup.string()
      .email(t("errorValidation.invalidEmail"))
      .required(t("errorValidation.required")),
    password: Yup.string()
      .min(6, t("errorValidation.passwordAtleastSixCharacters"))
      .required(t("errorValidation.required")),
  };
  const signUpInputs = {
    username: Yup.string()
      .min(2, t("errorValidation.usernameAtleastTwoCharacters"))
      .required(t("errorValidation.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("errorValidation.passwordShouldMatch"))
      .required(t("errorValidation.required")),
  };
  const currentValues = isLoginMode
    ? loginInputs
    : { ...loginInputs, ...signUpInputs };
  const validationSchema = Yup.object().shape(currentValues);
  const initialValues = isLoginMode
    ? loginInitialValues
    : { ...loginInitialValues, ...signUpInitialValues };

  const authModeKeys = isRegisterMode
    ? swapArrayElements(Object.keys(currentValues), 3, 2)
    : Object.keys(currentValues);

  return {
    validationSchema,
    initialValues,
    authModeKeys,
    authMode,
    toggleAuthMode,
    handleAuthentication,
  };
};

export default useAuthenticationPage;
