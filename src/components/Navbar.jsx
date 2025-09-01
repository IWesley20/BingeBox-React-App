import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      alert("Successfully logged out!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
        <Link to="/">
          <h1 className="text-blue-500 text-4xl font-bold cursor-pointer">
            BINGEBOX
          </h1>
        </Link>

        {user?.email ? (
          <div>
            <Link to="/account">
              <button
                onClick={() => logOut}
                className="cursor-pointer text-white pr-4"
              >
                Account
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-blue-500 px-6 py-2 rounded cursor-pointer text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="text-white pr-4 hover:text-blue-500">
                Sign In
              </button>
            </Link>
            <Link to="signup">
              <button className="bg-blue-500 px-2 md:px-6 py-2 rounded cursor-pointer text-white">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
