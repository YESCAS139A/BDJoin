import { useState, type FormEvent } from "react";
import type { MyProfile, UpdateMyProfile } from "../api/profile/types";

type UseAccountFormProps = {
  initialData: MyProfile;
  onSubmit: (data: UpdateMyProfile) => Promise<void>;
  onCancel?: () => void;
};

export function useAccountForm({
  initialData,
  onSubmit,
  onCancel,
}: UseAccountFormProps) {
  const [name, setName] = useState(initialData.name ?? "");
  const [lastName, setLastName] = useState(initialData.lastName ?? "");
  const [profileImageUrl, setProfileImageUrl] = useState(
    initialData.profileImageUrl ?? "",
  );
  const [biography, setBiography] = useState(initialData.biography ?? "");
  const [birthday, setBirthday] = useState(initialData.birthday ?? "");
  const [city, setCity] = useState(initialData.city ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const savedDisplayName =
    `${initialData.name ?? ""} ${initialData.lastName ?? ""}`.trim();

  function handleCancel() {
    setName(initialData.name ?? "");
    setLastName(initialData.lastName ?? "");
    setProfileImageUrl(initialData.profileImageUrl ?? "");
    setBiography(initialData.biography ?? "");
    setBirthday(initialData.birthday ?? "");
    setCity(initialData.city ?? "");
    setErrors({});
    if (onCancel) onCancel();
  }

  function handleRemoveAvatar() {
    setProfileImageUrl("");
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (biography.length > 200) {
      newErrors.biography = "La biografía no puede superar los 200 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit({
        name,
        lastName,
        profileImageUrl: profileImageUrl || undefined,
        biography,
        birthday,
        city,
      });
    } catch {
      setErrors((prev) => ({
        ...prev,
        server: "Ocurrió un error al guardar los cambios.",
      }));
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
