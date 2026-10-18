import {
  BookOpen,
  Target,
  Eye,
  Heart,
  Users,
  Lightbulb,
  ArrowRight,
  Library,
} from "lucide-react";
import { Link } from "react-router";

const values = [
  {
    icon: BookOpen,
    title: "Knowledge for Everyone",
    description:
      "We believe books should be easy to discover and knowledge should be accessible to every curious mind.",
  },
  {
    icon: Users,
    title: "Reader First",
    description:
      "We focus on creating a simple, welcoming experience that helps readers find the resources they need.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "We encourage curiosity, personal growth, and lifelong learning through books and digital technology.",
  },
];

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-base-100">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1722182877533-7378b60bf1e8?q=80&w=1107&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-950/40 to-gray-900"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 text-sm text-blue-200 mb-7">
              <BookOpen size={17} className="text-blue-300" />
              Discover the story behind LibraryHub
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Where every book opens a{" "}
              <span className="text-blue-300">new possibility.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-slate-300">
              LibraryHub is a modern library management platform built to make
              discovering books, accessing knowledge, and managing library
              resources simpler and more convenient.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                to="/allBooks"
                className="btn bg-blue-300 hover:bg-blue-200 text-slate-950 border-0"
              >
                Explore Books
                <ArrowRight size={18} />
              </Link>

              <a
                href="#our-mission"
                className="btn btn-outline border-white/25 text-white hover:bg-white/10 hover:border-white/40"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-widest text-sm">
              About LibraryHub
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
              A smarter way to connect with books and knowledge.
            </h2>

            <p className="mt-6 text-base-content/70 leading-8">
              Finding the right book should be simple. LibraryHub brings book
              discovery and library resource management together in one
              organized digital platform.
            </p>

            <p className="mt-4 text-base-content/70 leading-8">
              Whether you are a student searching for academic materials, a
              developer exploring software engineering, or a reader discovering
              a new interest, our goal is to help you find the resources that
              support your journey.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />

            <div
              className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 p-8 md:p-12 text-white border border-blue-300/20 shadow-xl"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1761834520785-ca17a0275f6d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                <Library size={34} className="text-blue-300" />
              </div>

              <h3 className="text-2xl font-bold mt-7">
                More than a book catalog
              </h3>

              <p className="mt-4 text-slate-300 leading-7">
                A digital space designed to organize library collections,
                simplify book discovery, and bring readers closer to the
                knowledge they seek.
              </p>

              <div className="h-px bg-white/15 my-7" />

              <p className="text-blue-200 font-medium">
                Discover. Learn. Grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section
        id="our-mission"
        className="bg-base-200/60 border-y border-base-300"
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-widest text-sm">
              Our Purpose
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Driven by knowledge
            </h2>
            <p className="mt-4 text-base-content/70 leading-7">
              Everything we build is guided by our commitment to accessible
              knowledge and a better library experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <article className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body p-7 md:p-9">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Target
                    size={25}
                    className="text-blue-500 dark:text-blue-300"
                  />
                </div>
                <h3 className="text-xl font-bold mt-3">Our Mission</h3>
                <p className="text-base-content/70 leading-7">
                  To simplify library management and make discovering,
                  organizing, and accessing books a smooth and enjoyable
                  experience for readers and administrators.
                </p>
              </div>
            </article>

            <article className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body p-7 md:p-9">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Eye size={25} className="text-blue-500 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-bold mt-3">Our Vision</h3>
                <p className="text-base-content/70 leading-7">
                  To create a more connected and accessible learning environment
                  where technology helps people discover books, explore ideas,
                  and grow through knowledge.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-widest text-sm">
            What We Believe
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            The values behind every page
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="card-body p-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 flex items-center justify-center">
                    <Icon size={24} className="text-blue-300" />
                  </div>

                  <h3 className="text-xl font-bold mt-3">{value.title}</h3>

                  <p className="text-base-content/70 leading-7">
                    {value.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div
          className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white p-8 md:p-14 text-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1761834520785-ca17a0275f6d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
          }}
        >
          <Heart size={30} className="text-blue-300 mx-auto" />

          <h2 className="text-3xl md:text-4xl font-bold mt-5">
            Your next great read starts here.
          </h2>

          <p className="text-slate-300 max-w-xl mx-auto mt-4 leading-7">
            Explore our collection and discover books that inspire new ideas,
            new skills, and new possibilities.
          </p>

          <Link
            to="/books"
            className="btn mt-7 bg-blue-300 hover:bg-blue-200 text-slate-950 border-0"
          >
            Browse Our Collection
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
