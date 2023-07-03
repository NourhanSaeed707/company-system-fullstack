import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { NAVBAR, FORM, APPTITLE } from "../../constants/text";

const Navbar = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <Link href="/">
          <p className="text-white font-bold flex-auto cursor-pointer">
            {APPTITLE.TITLE}
          </p>
        </Link>
        <>
          <div className="flex items-center sm:space-x-2 justify-end">
            <Link href="/employees">
              <p className="text-white font-bold cursor-pointer">
                {NAVBAR.EMPLOYEES}
              </p>
            </Link>
            <Link href="/departments">
              <p className="text-white font-bold cursor-pointer">
                {NAVBAR.DEPARTMENTS}
              </p>
            </Link>
            {!currentUser && (
              <>
                <Link href="/login">
                  <p className="text-white font-bold cursor-pointer">
                    {FORM.LOGIN}
                  </p>
                </Link>
                <Link href="/register">
                  <p className="text-white font-bold cursor-pointer">
                    {FORM.REGISTER}
                  </p>
                </Link>
              </>
            )}
            <p className="text-white font-bold cursor-pointer" onClick={logout}>
              {NAVBAR.LOGOUT}
            </p>
          </div>
        </>
      </div>
    </div>
  );
};

export default Navbar;
