import { useState } from "react";
import { AxiosError } from "axios";
import authApi from "../../../api/auth";

export function useChangePassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function resetForm() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setFormError(null);
    setIsSuccess(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    resetForm();
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("The new password and confirmation do not match.");
      return;
    }

    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      setFormError(
        "Password must be at least 8 characters long and include both letters and numbers.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await authApi.changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
        invalidateOtherSessions: true,
      });

      setIsSuccess(true);

      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (err) {
      console.error("Change password error:", err);

      let apiErrorMessage =
        "Failed to update password. Please check your current password.";

      if (err instanceof AxiosError) {
        const responseData = err.response?.data;
        console.log("Backend error payload:", responseData);

        if (responseData?.errors && typeof responseData.errors === "object") {
          const errorKeys = Object.keys(responseData.errors);
          if (errorKeys.length > 0) {
            const firstErrorList = responseData.errors[errorKeys[0]];
            if (Array.isArray(firstErrorList) && firstErrorList.length > 0) {
              apiErrorMessage = firstErrorList[0];
            }
          }
        } else if (responseData?.detail) {
          apiErrorMessage = responseData.detail;
        } else if (responseData?.message) {
          apiErrorMessage = responseData.message;
        } else if (responseData?.title) {
          apiErrorMessage = responseData.title;
        }
      }

      setFormError(apiErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    isModalOpen,
    currentPassword,
    newPassword,
    confirmPassword,
    formError,
    isSubmitting,
    isSuccess,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleOpenModal,
    handleCloseModal,
    handleChangePassword,
  };
}
