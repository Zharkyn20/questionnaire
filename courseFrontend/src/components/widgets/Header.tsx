import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import Logo from "@/assets/Logo.png";

const navItems = [
  {
    name: "Program",
    anchor: "/",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });
  const openState = isOpen ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <header className="top-0 w-full z-20 bg-zinc-800">
      <nav className="flex justify-between items-center  w-100 mx-auto border-gray-200 px-6 lg:px-32 py-4 text-lg ">
        <Link  to="/" className="flex gap-2 fontLogo items-center text-white text-xl hover:cursor-pointer">
          <div><img className="w-8 h-8" src={Logo} alt="logo"/></div>
          CourseFactory
        </Link>
        <div className=" hidden md:flex justify-between items-center gap-12 hover:cursor-pointer mr-20">
          {navItems.map((item) => (
            <Link className="text-white hover:text-orange-200" to={item.anchor} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
        <button className=" bg-white rounded-full p-2" onClick={() => navigate("/")}>
          <svg
            enableBackground="new 0 0 32 32"
            height="32px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 32 32"
            width="32px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <polyline
                fill="none"
                points="   649,137.999 675,137.999 675,155.999 661,155.999  "
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <polyline
                fill="none"
                points="   653,155.999 649,155.999 649,141.999  "
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <polyline
                fill="none"
                points="   661,156 653,162 653,156  "
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </g>
            <path d="M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z  " />
          </svg>
        </button>
        <div
          className={`${isOpen ? "hidden" : ""} md:hidden w-8 h-6 flex flex-col justify-between cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-full h-1 bg-slate-50 rounded-xl" />
          <span className="w-full h-1 bg-slate-50 rounded-xl" />
          <span className="w-full h-1 bg-slate-50 rounded-xl" />
        </div>
        <div className={`${!isOpen ? "hidden" : ""} md:hidden w-8 h-6 flex flex-col justify-between cursor-pointer relative pt-[10px]`}>
          <span className="w-full h-1 bg-slate-50 rounded-xl rotate-45 absolute" />
          <span className="w-full h-1 bg-slate-50 rounded-xl rotate-[-45deg] absolute" />
        </div>
        <div className={"fixed inset-0 right-20 transition-all duration-500 bg-slate-500 bg-opacity-95 " + openState} ref={ref}>
          <div className="flex justify-between flex-col pt-20 text-2xl items-center gap-12 hover:cursor-pointer">
            {navItems.map((item) => (
              <a onClick={() => setIsOpen(false)} className="text-white hover:text-orange-200" href={`#${item.anchor}`} key={item.name}>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
