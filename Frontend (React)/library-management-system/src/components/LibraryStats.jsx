import { BookOpen, UsersRound, LogOut } from "lucide-react";

const stats = [
  {
    title: "5,432",
    label: "Total Books",
    Icon: BookOpen,
  },
  {
    title: "1,250",
    label: "Registered Members",
    Icon: UsersRound,
  },
  {
    title: "3,482",
    label: "Books Issued",
    Icon: LogOut,
  },
];

export default function LibraryStats() {
  return (
    <div className="grid grid-cols-1 gap-5 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 p-6 sm:grid-cols-3 my-12 mx-10">
      {stats.map(({ title, label, Icon }, index) => (
        <div
          key={label}
          className={`flex items-center justify-center gap-5 py-3 ${
            index !== 0 ? "sm:border-l sm:border-blue-400/20" : ""
          }`}
        >
          <Icon
            size={36}
            strokeWidth={2.2}
            className="shrink-0 text-blue-400"
          />

          <div>
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm text-blue-200">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
