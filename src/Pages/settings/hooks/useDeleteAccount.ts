import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import authApi from "../../../api/auth";
import { token } from "../../../lib/token";

export function useDeleteAccount(currentUsername?: string) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmUsername, setConfirmUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setConfirmUsername("");
    setConfirmPassword("");
    setFormError(null);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    resetForm();
  }

  async function handleDeleteAccount(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!confirmUsername.trim() || !confirmPassword) {
      setFormError(
        "Please enter your username and password to confirm deletion.",
      );
      return;
    }

    if (
      currentUsername &&
      confirmUsername.trim().toLowerCase() !== currentUsername.toLowerCase()
    ) {
      setFormError(
        "The entered username does not match your current username.",
      );
      return;
    }

    const confirmDelete = window.confirm(
      "Are you absolutely sure you want to delete your account? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      setIsSubmitting(true);

      await authApi.deleteAccount();

      token.clear();
      handleCloseModal();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Delete account error:", err);

      let apiErrorMessage = "Failed to delete account. Please try again later.";

      if (err instanceof AxiosError) {
        const responseData = err.response?.data;
        if (responseData?.detail) {
          apiErrorMessage = responseData.detail;
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
    isDeleteModalOpen: isModalOpen,
    deleteUsername: confirmUsername,
    setDeleteUsername: setConfirmUsername,
    deletePassword: confirmPassword,
    setDeletePassword: setConfirmPassword,
    deleteFormError: formError,
    isDeletingSubmitting: isSubmitting,
    handleOpenDeleteModal: handleOpenModal,
    handleCloseDeleteModal: handleCloseModal,
    handleDeleteAccount,
  };
}
