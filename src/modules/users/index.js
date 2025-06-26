// src/modules/users/index.js

// Pages
//export { default as AdminUsersPage } from "./admin/pages/AdminUsersPage";
export { default as LoginPage } from "./public/pages/LoginPage";
export { default as RegisterPage } from "./public/pages/RegisterPage";
export { default as ChangePasswordPage } from "./public/pages/ChangePasswordPage";
export { default as ForgotPasswordPage } from "./public/pages/ForgotPasswordPage";
export { default as ResetPasswordPage } from "./public/pages/ResetPasswordPage";
export { default as VerifyEmailPage } from "./public/pages/VerifyEmailPage";
export { default as LogoutPage } from "./public/pages/LogoutPage";
export { default as AccountPage } from "./public/pages/AccountPage";

/*
// Admin Components
export { default as UserActions } from "./admin/components/UserActions";
export { default as UserEditModal } from "./admin/components/UserEditModal";
export { default as UserTable } from "./admin/components/UserTable";
export { default as UserTableFilters } from "./admin/components/UserTableFilters";
export { default as UserTableRow } from "./admin/components/UserTableRow";
*/
// Public Components

// Public Components - Reset Password
export { default as ResetPasswordForm } from "./public/components/reset/ResetPasswordForm";
export { default as ResetPasswordSuccessStep } from "./public/components/reset/ResetPasswordSuccessStep";

// Public Components - Forgot Password
export { default as ForgotPasswordForm } from "./public/components/forgot/ForgotPasswordForm";
export { default as ForgotPasswordSuccessStep } from "./public/components/forgot/ForgotPasswordSuccessStep";

// Public Components - Change Password
export { default as ChangePasswordForm } from "./public/components/change/ChangePasswordForm";
export { default as ChangePasswordSuccessStep } from "./public/components/change/ChangePasswordSuccessStep";

// Public Components - Login
export { default as LoginForm } from "./public/components/login/LoginForm";
export { default as LoginSuccessStep } from "./public/components/login/LoginSuccessStep";
export { default as OtpStep } from "./public/components/login/OtpStep";
export { default as LoginStepperNav } from "./public/components/login/LoginStepperNav";
export { default as LoginFormStep } from "./public/components/login/LoginFormStep";

// Public Components - Stepper
export { default as LoginStepper } from "./public/components/stepper/LoginStepper";
export { default as RegisterStepper } from "./public/components/stepper/RegisterStepper";
export { default as ForgotPasswordStepper } from "./public/components/stepper/ForgotPasswordStepper";
export { default as ResetPasswordStepper } from "./public/components/stepper/ResetPasswordStepper";
export { default as ChangePasswordStepper } from "./public/components/stepper/ChangePasswordStepper";

// Public Components - Register
export { default as RegisterForm } from "./public/components/register/RegisterForm";
export { default as RegisterFormStep } from "./public/components/register/RegisterFormStep";
export { default as EmailVerifyStep } from "./public/components/register/EmailVerifyStep";
export { default as OtpVerifyStep } from "./public/components/register/OtpVerifyStep";
export { default as RegisterSuccessStep } from "./public/components/register/RegisterSuccessStep";
export { default as RegisterStepperNav } from "./public/components/register/RegisterStepperNav";
export { default as PwStrengthBar } from "./public/components/register/PwStrengthBar";
export { default as RegisterInfoTooltip } from "./public/components/register/RegisterInfoTooltip";

// Public Components - Account
export { default as AddressForm } from "./public/components/account/AddressForm";
export { default as DeleteAccountSection } from "./public/components/account/DeleteAccountSection";
export { default as NotificationSettingsForm } from "./public/components/account/NotificationSettingsForm";
export { default as ProfileForm } from "./public/components/account/ProfileForm";
export { default as ProfileImageUploader } from "./public/components/account/ProfileImageUploader";
export { default as SocialLinksForm } from "./public/components/account/SocialLinksForm";


// Redux Slice
export { default as userStatusReducer } from "./slice/userStatusSlice";
export { default as userCrudReducer } from "./slice/userCrudSlice";
export { default as authReducer } from "./slice/authSlice";
export { default as addressReducer } from "./slice/addressSlice";
export { default as accountReducer } from "./slice/accountSlice";

// Types (if any)
// If you still have JS types/constants, you can export those here. 
// Otherwise, remove the below lines if not used:
// export * from "./types/user";
// export * from "./types/authFlow";
// export * from "./types/auth";

// i18n loading should be handled per-page or in your main i18n config
