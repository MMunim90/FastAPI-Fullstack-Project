const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal mt-10 text-neutral-content p-10 border-t-1">
      <aside>
        <img className="h-25 w-25" src="../../public/icon.png" alt="" />
        <p className="text-2xl font-bold">LibraryHub</p>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
