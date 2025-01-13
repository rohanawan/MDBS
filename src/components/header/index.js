import Link from "next/link";
import { TbLogout } from "react-icons/tb";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import showToast from "../showtoast";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <Link href="/movie-detail">
          <button className="flex items-center gap-3 text-white">
            <h2 className="text-4xl font-semibold leading-[56px] text-center">
              My movies
            </h2>
            <AiOutlinePlusCircle className="" size={26} />
          </button>
        </Link>
      </div>
      <button
        className="flex items-center gap-2 text-white"
        onClick={() => {
          router.push("/");
          showToast("success", "Logout successful");
        }}
      >
        <span className="text-base font-bold leading-6 text-center">
          logout
        </span>
        <TbLogout size={26} />
      </button>
    </header>
  );
};

export default Header;
