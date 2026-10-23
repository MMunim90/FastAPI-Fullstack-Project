import { useContext, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Search,
  BookmarkCheck,
  LibraryBig,
  Hash,
  Ban,
} from "lucide-react";

import { baseURL } from "../services/BaseURL";
import { AuthContext } from "../context/AuthContext";

const API_URL = `${baseURL}/reserve/my`;

const MyReserve = () => {
  const { accessToken } = useContext(AuthContext);

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!accessToken) {
        setReservations([]);
        setError("Please log in to view your reservations.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

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
              : "Failed to load your reservations.",
          );
        }

        const data = await response.json();

        setReservations(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [accessToken, refreshKey]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          className: "border-green-400/30 bg-green-400/10 text-green-300",
          icon: CheckCircle2,
        };

      case "cancelled":
        return {
          className: "border-red-400/30 bg-red-400/10 text-red-300",
          icon: Ban,
        };

      case "rejected":
        return {
          className: "border-red-400/30 bg-red-400/10 text-red-300",
          icon: XCircle,
        };

      case "pending":
      default:
        return {
          className: "border-amber-400/30 bg-amber-400/10 text-amber-300",
          icon: Clock,
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const stats = useMemo(
    () => ({
      total: reservations.length,
      pending: reservations.filter(
        (item) => item.status?.toLowerCase() === "pending",
      ).length,
      approved: reservations.filter(
        (item) => item.status?.toLowerCase() === "approved",
      ).length,
      cancelled: reservations.filter(
        (item) => item.status?.toLowerCase() === "cancelled",
      ).length,
      rejected: reservations.filter(
        (item) => item.status?.toLowerCase() === "rejected",
      ).length,
    }),
    [reservations],
  );

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesFilter =
        activeFilter === "all" ||
        reservation.status?.toLowerCase() === activeFilter;

      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        String(reservation.id).includes(search) ||
        String(reservation.book_id).includes(search) ||
        String(reservation.status).toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [reservations, activeFilter, searchTerm]);

  const statCards = [
    {
      title: "Total Reservations",
      value: stats.total,
      icon: LibraryBig,
      color: "text-blue-300",
      iconBg: "bg-blue-400/10",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-300",
      iconBg: "bg-amber-400/10",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      color: "text-green-300",
      iconBg: "bg-green-400/10",
    },
    {
      title: "Canceled",
      value: stats.cancelled,
      icon: Ban,
      color: "text-red-300",
      iconBg: "bg-red-400/10",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-300",
      iconBg: "bg-red-400/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-blue-300">
              <BookmarkCheck size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                LibraryHub Dashboard
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Reservations
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Track your book reservations, review their status, and stay
              updated on your library requests.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRefreshKey((previous) => previous + 1)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-3 text-sm font-semibold text-blue-200 transition hover:border-blue-300/40 hover:bg-blue-400/20 disabled:cursor-not-allowed disabled:opacity-50 sm:self-center"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-blue-300/15 bg-slate-900/40 p-5 shadow-lg shadow-black/10 backdrop-blur-sm transition hover:-translate-y-1 hover:border-blue-300/30"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">{card.title}</p>

                    <p className="mt-3 text-3xl font-bold text-white">
                      {card.value}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${card.iconBg}`}>
                    <Icon size={25} className={card.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Reservations Panel */}
        <div className="overflow-hidden rounded-2xl border border-blue-300/15 bg-slate-900/40 shadow-2xl shadow-black/20 backdrop-blur-sm">
          <div className="border-b border-blue-300/15 p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Reservation History
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  View and filter your reservation records.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search reservation or book ID"
                  className="w-full rounded-xl border border-blue-300/20 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "All", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Canceled", value: "canceled" },
                { label: "Rejected", value: "rejected" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter.value
                      ? "border-blue-400 bg-blue-500/20 text-blue-200"
                      : "border-blue-300/15 bg-slate-950/30 text-slate-400 hover:border-blue-300/30 hover:text-blue-200 cursor-pointer"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex min-h-72 flex-col items-center justify-center gap-4 p-8">
              <span className="loading loading-spinner loading-lg text-blue-300"></span>
              <p className="text-sm text-slate-400">
                Loading your reservations...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-red-400/10 p-4">
                <AlertCircle size={32} className="text-red-300" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Unable to load reservations
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-400">{error}</p>

              <button
                type="button"
                onClick={() => setRefreshKey((previous) => previous + 1)}
                className="mt-5 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && reservations.length === 0 && (
            <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-5 rounded-2xl border border-blue-300/15 bg-blue-400/10 p-5">
                <BookOpen size={42} className="text-blue-300" />
              </div>

              <h3 className="text-xl font-semibold text-white">
                No reservations yet
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                Your reserved books will appear here. Explore the library and
                reserve a book to get started.
              </p>
            </div>
          )}

          {/* No Filter Results */}
          {!loading &&
            !error &&
            reservations.length > 0 &&
            filteredReservations.length === 0 && (
              <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
                <Search size={32} className="mb-4 text-blue-300" />
                <h3 className="text-lg font-semibold text-white">
                  No matching reservations
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search term or status filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  className="mt-4 text-sm font-semibold text-blue-300 hover:text-blue-200"
                >
                  Clear filters
                </button>
              </div>
            )}

          {/* Reservations Table */}
          {!loading && !error && filteredReservations.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="border-b border-blue-300/15 bg-slate-950/30 text-xs uppercase tracking-wider text-slate-400">
                      <th className="px-5 py-4 font-semibold">Reservation</th>
                      <th className="px-5 py-4 font-semibold">Book ID</th>
                      <th className="px-5 py-4 font-semibold">
                        Reservation Date
                      </th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredReservations.map((reservation) => {
                      const statusStyle = getStatusStyle(reservation.status);
                      const StatusIcon = statusStyle.icon;

                      return (
                        <tr
                          key={reservation.id}
                          className="border-b border-blue-300/10 text-slate-300 transition hover:bg-blue-400/[0.04]"
                        >
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10">
                                <Hash size={19} className="text-blue-300" />
                              </div>

                              <div>
                                <p className="font-semibold text-white">
                                  Reservation #{reservation.id}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  LibraryHub request
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2">
                              <BookOpen size={16} className="text-blue-300" />
                              <span className="font-medium text-blue-100">
                                #{reservation.book_id}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex min-w-44 items-center gap-2">
                              <CalendarDays
                                size={16}
                                className="shrink-0 text-blue-300"
                              />
                              <span className="text-sm text-slate-300">
                                {formatDate(reservation.reservation_date)}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <span
                              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${statusStyle.className}`}
                            >
                              <StatusIcon size={14} />
                              {reservation.status || "Unknown"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex flex-col gap-2 border-t border-blue-300/15 px-5 py-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Showing{" "}
                  <span className="font-semibold text-blue-200">
                    {filteredReservations.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-blue-200">
                    {reservations.length}
                  </span>{" "}
                  reservations
                </p>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-blue-300" />
                  <span>Your reservation activity</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Information Note */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-300/15 bg-blue-400/[0.06] p-4">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-blue-300" />
          <p className="text-sm leading-6 text-slate-400">
            Reservations marked as{" "}
            <span className="font-medium text-amber-300">Pending</span> are
            awaiting administrator review. Their status will depend on the
            decision recorded by the library administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyReserve;
