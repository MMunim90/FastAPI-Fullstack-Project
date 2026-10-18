import { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Have a question? Send us an email.",
    value: "support@libraryhub.com",
    href: "mailto:support@libraryhub.com",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Your local digital library platform.",
    value: "Available Online",
    href: null,
  },
  {
    icon: Clock,
    title: "Support Hours",
    description: "We aim to help you as soon as possible.",
    value: "Monday – Friday",
    href: null,
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your backend API here to send the message.
    console.log("Contact form data:", formData);

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-base-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white">
        <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 text-sm text-blue-200 mb-7">
              <MessageSquare size={17} className="text-blue-300" />
              We're here to help
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Let's start a <span className="text-blue-300">conversation.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-slate-300">
              Have a question about a book, need help using LibraryHub, or want
              to share a suggestion? We'd love to hear from you. Send us a
              message and let us know how we can help.
            </p>

            <div className="flex flex-wrap gap-3 mt-8 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Mail size={17} className="text-blue-300" />
                General inquiries
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-2">
                <BookOpen size={17} className="text-blue-300" />
                Book-related support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details + Form */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left Information */}
          <div className="lg:col-span-2">
            <p className="text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-widest text-sm">
              Get in Touch
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
              We'd love to hear from you.
            </h2>

            <p className="mt-5 text-base-content/70 leading-8">
              Our goal is to make your LibraryHub experience simple and
              enjoyable. Reach out with questions, feedback, or suggestions to
              help us improve.
            </p>

            <div className="mt-9 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 p-5 rounded-2xl border border-base-300 bg-base-100 hover:shadow-md transition-shadow"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 flex items-center justify-center">
                      <Icon size={23} className="text-blue-300" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-base">{item.title}</h3>

                      <p className="text-sm text-base-content/60 mt-1">
                        {item.description}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-blue-600 dark:text-blue-300 hover:underline mt-2 inline-block break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium mt-2">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white">
              <div className="flex items-center gap-3">
                <BookOpen size={25} className="text-blue-300" />
                <h3 className="font-bold text-lg">The LibraryHub Promise</h3>
              </div>

              <p className="text-sm leading-7 text-slate-300 mt-3">
                Every question is an opportunity to make your library experience
                better. Thank you for being part of our learning community.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="card bg-base-100 border border-base-300 shadow-lg rounded-3xl">
              <div className="card-body p-6 md:p-9">
                <h2 className="text-2xl font-bold">Send us a message</h2>

                <p className="text-sm text-base-content/60 mt-1 mb-4">
                  Fill out the form below and tell us how we can help.
                </p>

                {submitted && (
                  <div role="status" className="alert alert-success mb-4">
                    <MessageSquare size={20} />
                    <span>
                      Form submitted successfully! Connect the backend to
                      deliver your message to our team.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Full Name</legend>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="input input-bordered w-full"
                        autoComplete="name"
                        required
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Email Address</legend>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="input input-bordered w-full"
                        autoComplete="email"
                        required
                      />
                    </fieldset>
                  </div>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Subject</legend>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is your message about?"
                      className="input input-bordered w-full"
                      required
                    />
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Your Message</legend>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="textarea textarea-bordered w-full min-h-40 resize-y"
                      rows={6}
                      required
                    />
                  </fieldset>

                  <button
                    type="submit"
                    className="btn w-full bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 hover:from-slate-800 hover:via-blue-900 hover:to-indigo-800 text-white border-0"
                  >
                    Send Message
                    <Send size={17} className="text-blue-300" />
                  </button>

                  <p className="text-xs text-center text-base-content/50 leading-5">
                    Your information should be handled securely and used only to
                    respond to your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto rounded-3xl border border-base-300 bg-base-200/60 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">
              Looking for your next favorite book?
            </h2>
            <p className="text-base-content/70 mt-2">
              Explore our collection and discover something new.
            </p>
          </div>

          <Link
            to="/books"
            className="btn bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white border-0"
          >
            Explore Books
            <ArrowRight size={18} className="text-blue-300" />
          </Link>
        </div>
      </section>
    </main>
  );
}


export default ContactUs;