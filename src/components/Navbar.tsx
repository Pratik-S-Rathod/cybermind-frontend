import { useState } from "react";
import companyLogo from "../assets/cybermind_works_logo.jpeg";
import CreateJob from "./CreateJob";

const headers = [
  "Home",
  "Find Jobs",
  "Find Talents",
  "About us",
  "Testimonials",
];
const Navbar = ({ setReload }: { setReload: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:w-[60%] flex max-sm:justify-between items-center justify-evenly mb-2 mx-auto text-center bg-white p-2 rounded-full shadow-lg shadow-purple-200">
      <img src={companyLogo} alt="" className="h-10 w-10 p-0.5" />
      {headers.map((header) => (
        <a
          href="#"
          key={header}
          className="px-2.5 py-1.5 max-sm:hidden hover:bg-gradient-to-b hover:from-fuchsia-600 hover:to-violet-800 hover:text-white rounded-full"
        >
          {header}
        </a>
      ))}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 hover:px-3.5 py-1.5 text-white rounded-full hover:cursor-pointer 
             bg-gradient-to-b from-fuchsia-600 to-violet-800"
      >
        Create Jobs
      </button>

      {open && (
        <CreateJob open={open} setOpen={setOpen} setReload={setReload} />
      )}
    </div>
  );
};

export default Navbar;
