import type { MyProfile, UpdateMyProfile } from "../api/profile/types";
import { useAccountForm } from "../hooks/useAccountForm";
import Input from "./Input";
import Label from "./Label";
import TextArea from "./TextArea";
import Avatar from "./Avatar";

type AccountProfileProps = {
  initialData: MyProfile;
  onSubmit: (data: UpdateMyProfile) => Promise<MyProfile>;
  onCancel?: () => void;
  isSaving?: boolean;
};

function Account({
  initialData,
  onSubmit,
  onCancel,
  isSaving = false,
}: AccountProfileProps) {
  const {
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
  } = useAccountForm({
    initialData,
    onSubmit,
    onCancel,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="px-4 py-3 border-b border-gray-200">
        <h1 className="text-center font-bold text-gray-700 text-lg">
          Edit Profile
        </h1>
      </div>

      {errors.server && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {errors.server}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Avatar
          src={profileImageUrl || undefined}
          size="lg"
          className="w-24 h-24 rounded-full object-cover bg-gray-100"
        />
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-base font-semibold text-gray-800">
            {initialData.userName}
          </span>
          <span className="text-sm text-gray-500">
            {savedDisplayName || "Sin nombre"}
          </span>
          <span className="text-sm text-gray-500">{initialData.email}</span>
        </div>
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-sm text-gray-500">
            Birthday: {initialData.birthday || "-"}
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label
            className="text-sm font-semibold text-gray-700"
            name="Avatar Url"
          />
          {profileImageUrl && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="text-xs text-red-600 hover:underline font-medium"
            >
              Remove avatar
            </button>
          )}
        </div>
        <Input
          type="text"
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
          placeholder="https://..."
          className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            className="text-sm font-semibold text-gray-700"
            name="First name *"
          />
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            className={`w-full mt-1 rounded-lg border px-3 py-2 text-sm ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label
            className="text-sm font-semibold text-gray-700"
            name="Last name"
          />
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            className="text-sm font-semibold text-gray-700"
            name="Your birthday"
          />
          <Input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-gray-700" name="City" />
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="No se puede mostrar el valor guardado"
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <Label
          className="text-sm font-semibold text-gray-700"
          name="Biography"
        />
        <TextArea
          placeholder="Write something here..."
          value={biography}
          onChange={(e) => {
            setBiography(e.target.value);
            if (errors.biography)
              setErrors((prev) => ({ ...prev, biography: "" }));
          }}
        />
        {errors.biography && (
          <p className="text-red-500 text-xs mt-1">{errors.biography}</p>
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-200 flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSaving}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 transition-colors"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

export default Account;
