import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenUserForm: false,
  isOpenLoginForm: false,
  isAdApprovalNotice: false,
  isOpenSigninForm: false,
  isOpenRequestResetPassword: false,
  isOpenResetPassword: false,
  isOpenMobileFilterAds: false,
  isOpenVerifiedEmail: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Ouvrir le formulaire utilisateur
    openUserForm: (state) => {
      state.isOpenUserForm = true;
    },
    // Fermer le formulaire utilisateur
    closeUserForm: (state) => {
      state.isOpenUserForm = false;
    },
    // Ouvrir le formulaire de connexion
    openLoginForm: (state) => {
      state.isOpenLoginForm = true;
    },
    closeLoginForm: (state) => {
      state.isOpenLoginForm = false;
    },
    openAdApprovalNotice: (state) => {
      state.isAdApprovalNotice = true;
    },
    closeAdApprovalNotice: (state) => {
      state.isAdApprovalNotice = false;
    },
    openSigninForm: (state) => {
      state.isOpenSigninForm = true;
    },
    closeSigninForm: (state) => {
      state.isOpenSigninForm = false;
    },
    openRequestResetPassword: (state) => {
      state.isOpenRequestResetPassword = true;
    },
    closeRequestResetPassword: (state) => {
      state.isOpenRequestResetPassword = false;
    },
    openResetPassword: (state) => {
      state.isOpenResetPassword = true;
    },
    closeResetPassword: (state) => {
      state.isOpenResetPassword = false;
    },
    openMobileFilterAds: (state) => {
      state.isOpenMobileFilterAds = true;
    },
    closeMobileFilterAds: (state) => {
      state.isOpenMobileFilterAds = false;
    },
    openVerifiedEmail: (state) => {
      state.isOpenVerifiedEmail = true;
    },
    closeVerifiedEmail: (state) => {
      state.isOpenVerifiedEmail = false;
    },
  },
});

// Export des actions générées par createSlice
export const {
  openUserForm,
  closeUserForm,
  openLoginForm,
  closeLoginForm,
  openAdApprovalNotice,
  closeAdApprovalNotice,
  openSigninForm,
  closeSigninForm,
  openRequestResetPassword,
  closeRequestResetPassword,
  openResetPassword,
  closeResetPassword,
  openMobileFilterAds,
  closeMobileFilterAds,
  openVerifiedEmail,
  closeVerifiedEmail,
} = modalSlice.actions;

// Export du réducteur
export const modalReducer = modalSlice.reducer;
