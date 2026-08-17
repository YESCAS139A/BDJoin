import { Link } from "react-router-dom";
import { useSettings } from "./hooks/useSettings";
import { useChangePassword } from "./hooks/useChangePassword";
import { useDeleteAccount } from "./hooks/useDeleteAccount";

export function Settings() {
  const { profile, isLoading, error, formattedCreatedDate } = useSettings();

  const {
    isModalOpen,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    formError,
    isSubmitting,
    isSuccess,
    handleOpenModal,
    handleCloseModal,
    handleChangePassword,
  } = useChangePassword();

  const {
    isDeleteModalOpen,
    deleteUsername,
    setDeleteUsername,
    deletePassword,
    setDeletePassword,
    deleteFormError,
    isDeletingSubmitting,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  } = useDeleteAccount(profile?.userName);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-gray-400 bg-white rounded-xl border border-gray-200">
        Loading account settings...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-8 text-center text-sm text-red-500 bg-white rounded-xl border border-gray-200">
        {error || "Error loading the information."}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-xs text-gray-500">Account Summary</p>
      </div>

      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-2">
          Account information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="block text-xs text-gray-400 font-medium">
              Username
            </span>
            <span className="text-sm font-semibold text-gray-800">
              @{profile.userName}
            </span>
          </div>

          <div>
            <span className="block text-xs text-gray-400 font-medium">
              Email
            </span>
            <span className="text-sm font-semibold text-gray-800 truncate block">
              {profile.email}
            </span>
          </div>

          <div>
            <span className="block text-xs text-gray-400 font-medium">
              Account created on
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {formattedCreatedDate}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/p/${profile.userName}`}
            className="flex-1 px-4 py-2.5 text-xs font-semibold text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
          >
            View My Profile
          </Link>

          <button
            type="button"
            onClick={handleOpenModal}
            className="flex-1 px-4 py-2.5 text-xs font-semibold text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Change password
          </button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl border border-red-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-800">
              Delete Account
            </p>
            <p className="text-[11px] text-gray-500">
              Start the process to permanently delete your account.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenDeleteModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition whitespace-nowrap cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* MODAL DE CAMBIO DE CONTRASEÑA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">
                Change Password
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-4 space-y-4">
              {isSuccess && (
                <div className="p-3 text-xs bg-green-50 border border-green-200 text-green-700 rounded-lg font-medium">
                  ✓ Password updated successfully!
                </div>
              )}

              {formError && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-lg font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  placeholder="Min. 8 characters, letters & numbers"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  placeholder="Repeat new password"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE ELIMINACIÓN DE CUENTA */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl border border-red-200 w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-red-100 bg-red-50/50">
              <h3 className="text-base font-bold text-red-700">
                Delete Account
              </h3>
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDeleteAccount} className="p-4 space-y-4">
              <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
                <p className="font-bold mb-1">⚠️ Warning: Destructive Action</p>
                <p>
                  This action is permanent. All your profile data, preferences,
                  and sessions will be deleted immediately.
                </p>
              </div>

              {deleteFormError && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-lg font-medium">
                  {deleteFormError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm Username (@{profile.userName})
                </label>
                <input
                  type="text"
                  value={deleteUsername}
                  onChange={(e) => setDeleteUsername(e.target.value)}
                  disabled={isDeletingSubmitting}
                  placeholder={`Type ${profile.userName} to confirm`}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  disabled={isDeletingSubmitting}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseDeleteModal}
                  disabled={isDeletingSubmitting}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeletingSubmitting}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50 cursor-pointer"
                >
                  {isDeletingSubmitting
                    ? "Deleting..."
                    : "Permanently Delete Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
