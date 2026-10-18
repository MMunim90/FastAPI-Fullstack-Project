import { useEffect, useState } from "react";
import { baseURL } from "../services/BaseURL";
import BookCard from "./BookCard";

const FeatureBooks = () => {
  const [featureBooks, setFeatureBooks] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/books/all`)
      .then((res) => res.json())
      .then((data) => setFeatureBooks(data));
  }, []);

  return (
    <div className="flex flex-col xl:flex-row mt-10 p-6 md:p-10 gap-10">
      <div className=" lg:w-[900px] xl:w-[1500px]">
        <p className="font-bold text-xl">
          LibraryHub – Your Smart Library Management System
        </p>
        <br />
        <p>
          LibraryHub is a modern, user-friendly library management platform
          designed to simplify the way libraries organize, manage, and share
          their book collections. It provides a centralized digital space where
          users can explore a wide range of books, discover new learning
          resources, check book availability, and access detailed information
          about their favorite titles. From programming and software engineering
          to literature, science, and general knowledge, LibraryHub makes
          finding the right book easier and more convenient.
        </p>
        <br />
        <p>
          The platform aims to improve the overall library experience by
          reducing manual work, organizing book information efficiently, and
          making library resources more accessible. With features for managing
          books, tracking available copies, viewing book details, and
          maintaining an organized digital catalog, LibraryHub helps both
          readers and library administrators save time and work more
          effectively.
        </p>
        <br />
        <p>
          Whether you are a student searching for academic resources, a
          developer looking to improve your programming skills, or a passionate
          reader exploring new ideas, LibraryHub provides a simple and organized
          way to discover knowledge. Its goal is to make library management
          smarter, book discovery easier, and learning more accessible through
          technology.
        </p>
        <br />
        <p>
          LibraryHub — Discover Books, Explore Knowledge, and Learn Without
          Limits.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto gap-4">
        {featureBooks.slice(0, 2).map((book, index) => {
          return (
            <div key={index} className="">
              <BookCard book={book} />
            </div>
          );
        })}
        <div className="card border-2">
          <div className="card-body justify-center m-auto">
            <button className="btn btn-primary">View all</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBooks;
