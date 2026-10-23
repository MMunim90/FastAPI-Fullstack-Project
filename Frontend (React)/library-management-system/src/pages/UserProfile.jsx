import { useCallback, useContext, useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  AtSign,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  Save,
  X,
  Eye,
  EyeOff,
  LoaderCircle,
  CheckCircle2,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { baseURL } from "../services/BaseURL";

const API_URL = `${baseURL}/user_profile`;
const UPDATE_USER_URL = `${baseURL}/update_user`;
const UPDATE_PASSWORD_URL = `${baseURL}/update_password`;

const initialProfile = {
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  phone_number: "",
  role: "",
  is_active: false,
  id: null,
};

const swalTheme = {
  background: "#0f172a",
  color: "#e2e8f0",
  confirmButtonColor: "#60a5fa",
  customClass: {
    popup: "libraryhub-swal",
    title: "libraryhub-swal-title",
    confirmButton: "libraryhub-swal-button",
  },
};

const UserProfile = () => {
  const { authUser, accessToken } = useContext(AuthContext);

  const [profile, setProfile] = useState(initialProfile);
  const [formData, setFormData] = useState(initialProfile);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Your session has expired. Please log in again."
            : "Failed to load your profile.",
        );
      }

      const data = await response.json();

      // Never store or display the password hash in the profile UI.
      const safeProfile = {
        ...initialProfile,
        ...data,
        hash_password: undefined,
      };

      delete safeProfile.hash_password;

      setProfile(safeProfile);
      setFormData({
        email: safeProfile.email || "",
        username: safeProfile.username || "",
        firstname: safeProfile.firstname || "",
        lastname: safeProfile.lastname || "",
        phone_number: safeProfile.phone_number || "",
      });
    } catch (error) {
      Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#f87171",
        title: "Unable to Load Profile",
        text: error.message || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      ...swalTheme,
      icon: "question",
      iconColor: "#60a5fa",
      title: "Save Profile Changes?",
      text: "Do you want to update your profile information?",
      showCancelButton: true,
      confirmButtonText: "Yes, Save Changes",
      cancelButtonText: "Keep Editing",
      cancelButtonColor: "#475569",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setSavingProfile(true);

    try {
      const payload = {
        email: formData.email.trim(),
        username: formData.username.trim(),
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        phone_number: formData.phone_number.trim(),
      };

      const response = await fetch(UPDATE_USER_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Failed to update your profile.",
        );
      }

      setProfile((prev) => ({
        ...prev,
        ...payload,
        ...(data && typeof data === "object" ? data : {}),
        hash_password: undefined,
      }));

      setEditing(false);

      await Swal.fire({
        ...swalTheme,
        icon: "success",
        iconColor: "#60a5fa",
        title: "Profile Updated!",
        text: "Your profile information has been saved successfully.",
      });

      await fetchProfile();
    } catch (error) {
      Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#f87171",
        title: "Update Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.new_password.length < 8) {
      Swal.fire({
        ...swalTheme,
        icon: "warning",
        iconColor: "#fbbf24",
        title: "Password Too Short",
        text: "Your new password must contain at least 8 characters.",
      });
      return;
    }

    const result = await Swal.fire({
      ...swalTheme,
      icon: "warning",
      iconColor: "#fbbf24",
      title: "Change Password?",
      text: "You will use your new password the next time you log in.",
      showCancelButton: true,
      confirmButtonText: "Yes, Change Password",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#475569",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setSavingPassword(true);

    try {
      const response = await fetch(UPDATE_PASSWORD_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Failed to change your password.",
        );
      }

      setPasswordData({
        current_password: "",
        new_password: "",
      });

      await Swal.fire({
        ...swalTheme,
        icon: "success",
        iconColor: "#60a5fa",
        title: "Password Changed!",
        text: "Your password has been updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#f87171",
        title: "Password Update Failed",
        text: error.message || "Please check your current password.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const fullName =
    `${profile.firstname} ${profile.lastname}`.trim() || "LibraryHub User";

  const initials =
    `${profile.firstname?.[0] || ""}${profile.lastname?.[0] || ""}`.toUpperCase() ||
    profile.username?.[0]?.toUpperCase() ||
    "U";

  const inputClass =
    "mt-2 w-full rounded-xl border border-blue-300/15 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClass = "text-sm font-medium text-slate-300";

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="animate-spin text-blue-300" size={42} />
          <p className="text-sm text-blue-200">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-blue-300/15 bg-slate-900/70 p-8 text-center shadow-xl">
          <LockKeyhole className="mx-auto mb-4 text-blue-300" size={42} />
          <h2 className="text-xl font-bold text-white">Login Required</h2>
          <p className="mt-2 text-sm text-slate-400">
            Please log in to view and manage your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-blue-300">
            <UserRound size={17} />
            <span>Account Management</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Manage your personal information and keep your LibraryHub account
            secure.
          </p>
        </div>

        {/* Profile banner */}
        <section className="relative mb-6 overflow-hidden rounded-3xl border border-blue-300/15 bg-slate-900/65 shadow-2xl shadow-slate-950/20">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-transparent" />

          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-blue-300/30 bg-gradient-to-br from-blue-400/25 to-indigo-500/20 text-3xl font-bold text-blue-200 shadow-lg shadow-blue-950/30">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
                  {fullName}
                </h2>

                {profile.is_active && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    <CheckCircle2 size={14} />
                    Active
                  </span>
                )}
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <AtSign size={16} className="shrink-0 text-blue-300" />@
                {profile.username || "username"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg border border-blue-300/15 bg-blue-400/10 px-3 py-2 text-xs font-medium capitalize text-blue-200">
                  <ShieldCheck size={15} className="text-blue-300" />
                  {profile.role || "Member"}
                </span>

                {profile.id != null && (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-indigo-300/15 bg-indigo-400/10 px-3 py-2 text-xs text-indigo-200">
                    <BadgeCheck size={15} className="text-blue-300" />
                    Member ID: {profile.id}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: profile.email || "",
                  username: profile.username || "",
                  firstname: profile.firstname || "",
                  lastname: profile.lastname || "",
                  phone_number: profile.phone_number || "",
                });
                setEditing((prev) => !prev);
              }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-300/20 bg-blue-400/10 px-4 py-3 text-sm font-semibold text-blue-200 transition hover:border-blue-300/40 hover:bg-blue-400/20"
            >
              {editing ? <X size={17} /> : <Pencil size={17} />}
              {editing ? "Stop Editing" : "Edit Profile"}
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          {/* Profile information */}
          <section className="rounded-2xl border border-blue-300/15 bg-slate-900/65 p-5 shadow-xl shadow-slate-950/10 sm:p-7 lg:col-span-3">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10">
                <UserRound size={21} className="text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Personal Information
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Your basic account details
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="firstname">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Enter first name"
                    required
                    disabled={!editing || savingProfile}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="lastname">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Enter last name"
                    required
                    disabled={!editing || savingProfile}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="username">
                    Username
                  </label>
                  <div className="relative">
                    <AtSign
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
                    />
                    <input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter username"
                      required
                      disabled={!editing || savingProfile}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter email"
                      required
                      disabled={!editing || savingProfile}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="phone_number">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
                    />
                    <input
                      id="phone_number"
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter phone number"
                      disabled={!editing || savingProfile}
                    />
                  </div>
                </div>
              </div>

              {editing && (
                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-blue-300/10 pt-5">
                  <button
                    type="button"
                    disabled={savingProfile}
                    onClick={() => {
                      setFormData({
                        email: profile.email || "",
                        username: profile.username || "",
                        firstname: profile.firstname || "",
                        lastname: profile.lastname || "",
                        phone_number: profile.phone_number || "",
                      });
                      setEditing(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-600/60 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
                  >
                    <X size={16} />
                    Discard
                  </button>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingProfile ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <Save size={17} />
                    )}
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>

            {!editing && (
              <div className="mt-6 border-t border-blue-300/10 pt-5">
                <p className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-blue-300"
                  />
                  Your personal information is associated with your LibraryHub
                  account.
                </p>
              </div>
            )}
          </section>

          {/* Account summary and password form */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-blue-300/15 bg-slate-900/65 p-5 shadow-xl shadow-slate-950/10 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10">
                  <CalendarCheck size={20} className="text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Account Overview</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Your account at a glance
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-blue-300/10 pb-4">
                  <span className="text-sm text-slate-400">Account ID</span>
                  <span className="text-sm font-semibold text-blue-200">
                    {profile.id ?? "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-blue-300/10 pb-4">
                  <span className="text-sm text-slate-400">Role</span>
                  <span className="rounded-lg bg-blue-400/10 px-3 py-1.5 text-xs font-semibold capitalize text-blue-200">
                    {profile.role || "Member"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      profile.is_active ? "text-emerald-300" : "text-red-300"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        profile.is_active ? "bg-emerald-400" : "bg-red-400"
                      }`}
                    />
                    {profile.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-blue-300/15 bg-slate-900/65 p-5 shadow-xl shadow-slate-950/10 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10">
                  <LockKeyhole size={20} className="text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Change Password</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Keep your account secure
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label htmlFor="current_password" className={labelClass}>
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="current_password"
                      type={showCurrentPassword ? "text" : "password"}
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      className={`${inputClass} pr-12`}
                      placeholder="Enter current password"
                      autoComplete="current-password"
                      required
                      disabled={savingPassword}
                    />
                    <button
                      type="button"
                      aria-label={
                        showCurrentPassword
                          ? "Hide current password"
                          : "Show current password"
                      }
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-blue-300 transition hover:text-blue-200"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="new_password" className={labelClass}>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new_password"
                      type={showNewPassword ? "text" : "password"}
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      className={`${inputClass} pr-12`}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      disabled={savingPassword}
                    />
                    <button
                      type="button"
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-blue-300 transition hover:text-blue-200"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Use at least 8 characters.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    savingPassword ||
                    !passwordData.current_password ||
                    !passwordData.new_password
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-300/20 bg-blue-400/10 px-4 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingPassword ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <LockKeyhole size={17} />
                  )}
                  {savingPassword ? "Updating Password..." : "Update Password"}
                </button>
              </form>
            </section>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          LibraryHub · Your account, your library.
        </p>
      </div>
    </main>
  );
};

export default UserProfile;
