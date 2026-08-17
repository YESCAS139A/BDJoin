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
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentDisplayName, setCurrentDisplayName] = useState(
    `${initialData.name ?? ""} ${initialData.lastName ?? ""}`.trim(),
  );

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
        birthday: birthday || undefined,
        city: city || undefined,
      });

      const newFirstName = updatedProfile.name ?? name;
      const newLastName = updatedProfile.lastName ?? lastName;
      const computedDisplayName = `${newFirstName} ${newLastName}`.trim();

      setCurrentDisplayName(computedDisplayName);

      setUser((prev) =>
        prev
          ? {
              ...prev,
              displayName: computedDisplayName || prev.userName,
              avatar: updatedProfile.profileImageUrl ?? profileImageUrl,
            }
          : prev,
      );
    } catch (err) {
      console.error("Error updating the profile:", err);
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
    savedDisplayName: currentDisplayName,
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
