import { useState, type FormEvent } from "react";
import type { MyProfile, UpdateMyProfile } from "../api/profile/types";
import useAuthUser from "./useAuthUser";

type UseAccountFormProps = {
  initialData: MyProfile;
  onSubmit: (data: UpdateMyProfile) => Promise<MyProfile>;
  onCancel?: () => void;
};

export function useAccountForm({
  initialData,
  onSubmit,
  onCancel,
}: UseAccountFormProps) {
  const { setUser } = useAuthUser();

  const [name, setName] = useState(initialData.name ?? "");
  const [lastName, setLastName] = useState(initialData.lastName ?? "");
  const [profileImageUrl, setProfileImageUrl] = useState(
    initialData.profileImageUrl ?? "",
  );
  const [biography, setBiography] = useState(initialData.biography ?? "");
  const [birthday, setBirthday] = useState(initialData.birthday ?? "");
  const [city, setCity] = useState(""); // sin valor inicial: el backend no lo devuelve
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const savedDisplayName =
    `${initialData.name ?? ""} ${initialData.lastName ?? ""}`.trim();

  function handleCancel() {
    setName(initialData.name ?? "");
    setLastName(initialData.lastName ?? "");
    setProfileImageUrl(initialData.profileImageUrl ?? "");
    setBiography(initialData.biography ?? "");
    setBirthday(initialData.birthday ?? "");
    setCity("");
    setErrors({});
    if (onCancel) onCancel();
  }

  function handleRemoveAvatar() {
    setProfileImageUrl("");
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "A name is required.";
    }

    if (biography.length > 200) {
      newErrors.biography = "The biography cannot exceed 200 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const updatedProfile = await onSubmit({
        name,
        lastName,
        profileImageUrl: profileImageUrl || undefined,
        biography: biography || undefined,
        birthday: birthday || undefined, // YYYY-MM-DD, del <input type="date">
        city: city || undefined,
      });

      setUser((prev) =>
        prev
          ? {
              ...prev,
              avatar: updatedProfile.profileImageUrl,
            }
          : prev,
      );
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      setErrors((prev) => ({
        ...prev,
        server: "An error occurred while saving the changes.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    name,
    lastName,
    profileImageUrl,
    biography,
    birthday,
    city,
    errors,
    isSubmitting,
    savedDisplayName,
    setName,
    setLastName,
    setProfileImageUrl,
    setBiography,
    setBirthday,
    setCity,
    setErrors,
    handleSubmit,
    handleCancel,
    handleRemoveAvatar,
  };
}
