const BookCard = ({ book, onViewDetails }) => {
  const {
    title,
    author,
    description,
    category,
    price,
    total_copies,
    available_copies,
    cover_image,
  } = book;

  const firstLetter = title?.trim().charAt(0).toUpperCase() || "B";

  return (
    <div
      className="group card bg-base-100 border-2 
                    shadow-md hover:shadow-xl hover:-translate-y-1
                    transition-all duration-300 overflow-hidden rounded-lg"
    >
      {/* Book Cover */}
      <figure
        className="relative h-64 bg-gradient-to-br
                         from-slate-900 via-blue-950 to-indigo-900
                         flex flex-col items-center justify-center p-5"
      >
        {cover_image ? (
          <img
            src={cover_image}
            alt={title}
            className="w-full h-full object-contain
                       group-hover:scale-105 transition-transform"
          />
        ) : (
          <div
            className="w-40 h-48 rounded-lg border border-white/20
                          bg-white/10 backdrop-blur-sm shadow-2xl
                          flex flex-col items-center justify-center
                          text-white relative overflow-hidden"
          >
            <span
              className="absolute top-3 text-xs tracking-[0.3em]
                             text-blue-200"
            >
              BOOKSHELF
            </span>

            <span className="text-7xl font-black tracking-tight">
              {firstLetter}
            </span>

            <div className="w-12 h-0.5 bg-blue-300 my-3" />

            <span
              className="text-xs font-semibold tracking-widest
                             text-center px-3 line-clamp-2"
            >
              {title}
            </span>

            <span
              className="text-[10px] text-blue-200 mt-2
                             text-center px-2"
            >
              {author}
            </span>
          </div>
        )}

        {/* Category */}
        <span
          className="absolute top-3 left-3 badge badge-neutral
                         bg-black/40 text-white border-white/20"
        >
          {category}
        </span>

        {/* Availability */}
        <span
          className={`absolute top-3 right-3 badge ${
            available_copies > 0 ? "badge-success" : "badge-error"
          }`}
        >
          {available_copies > 0 ? "Available" : "Out of stock"}
        </span>
      </figure>

      {/* Book Details */}
      <div className="card-body gap-3">
        <div>
          <h2 className="card-title text-xl line-clamp-1">{title}</h2>
          <p className="text-sm text-base-content/60 mt-1">by {author}</p>
        </div>

        <p className="text-sm text-base-content/75 line-clamp-2">
          {description}
        </p>

        {/* Price and Copies */}
        <div
          className="flex items-end justify-between border-t
                        border-base-300 pt-3"
        >
          <div>
            <p className="text-xs text-base-content/60">Book Price</p>
            <p className="text-2xl font-bold text-primary">
              ৳{Number(price).toLocaleString("en-BD")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-base-content/60">Available Copies</p>
            <p className="font-semibold">
              {available_copies} / {total_copies}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="card-actions mt-2">
          <button
            onClick={() => onViewDetails?.(book)}
            className="btn btn-primary w-full group/btn"
          >
            View Details
            <span
              className="transition-transform
                             group-hover/btn:translate-x-1"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
