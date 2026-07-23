import { useState, type FormEvent } from "react";

import type { MyProfile, UpdateMyProfile } from "../api/profile/types";
import Input from "./Input";
import Label from "./Label";
import TextArea from "./TextArea";
import Avatar from "./Avatar";

type AccountProfileProps = {
  initialData: MyProfile;
  onSubmit: (data: UpdateMyProfile) => Promise<void>;
  isSaving?: boolean;
};

function Account({
  initialData,
  onSubmit,
  isSaving = false,
}: AccountProfileProps) {
  const [name, setName] = useState(initialData.name ?? "");
  const [lastName, setLastName] = useState(initialData.lastName ?? "");
  const [profileImageUrl, setProfileImageUrl] = useState(
    initialData.profileImageUrl ?? "",
  );
  const [biography, setBiography] = useState(initialData.biography ?? "");
  const [birthday, setBirthday] = useState(initialData.birthday ?? "");
  const [city, setCity] = useState(initialData.city ?? "");

  const savedDisplayName =
    `${initialData.name ?? ""} ${initialData.lastName ?? ""}`.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSubmit({
      name,
      lastName,
      profileImageUrl: profileImageUrl || undefined,
      biography,
      birthday,
      city,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="px-4 py-3 border-b border-gray-200">
        <h1 className="text-center font-bold text-gray-700 text-lg">Profile</h1>
      </div>

      <div className="flex items-center gap-4">
        <Avatar
          src={initialData.profileImageUrl}
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
            birthday: {initialData.birthday}
          </span>
          <span className="text-sm text-gray-500">
            city: {initialData.city}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          Friends: {initialData.friendsCount}
        </span>
      </div>

      <div>
        <Label
          className="text-sm font-semibold text-gray-700"
          name="Avatar Url"
        />
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
            name="First name"
          />
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
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
            type="text"
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
            className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <Label className="text-sm font-semibold text-gray-700" name="Biography" />
      <TextArea
        placeholder="Write something here..."
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
      />

      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Account;
