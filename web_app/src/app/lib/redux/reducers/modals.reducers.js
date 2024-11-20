import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenUserForm: false,
  isOpenLoginForm: false,
  isAdApprovalNotice: false
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
    // Fermer le formulaire de connexion
    closeLoginForm: (state) => {
      state.isOpenLoginForm = false;
    },
    openAdApprovalNotice: (state) => {
      state.isAdApprovalNotice = true;
    },
    closeAdApprovalNotice: (state) => {
      state.isAdApprovalNotice = false;
    }
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
} = modalSlice.actions;

// Export du réducteur
export const modalReducer = modalSlice.reducer;
