import { useNavigate } from "react-router-dom"; // if using React Router
import NotFoundImage from "../assets/images/404.png";

const NotFoundPage = () => {
  const navigate = useNavigate(); // Optional if you're using React Router

  return (
    <div className="min-h-screen bg-black text-white items-center justify-center p-8">
      <div className="h-[93vh] w-full border border-orange-500 rounded-3xl flex flex-col justify-between items-center text-center space-y-6 py-8">
        <div className="flex flex-col ">
          <img src={NotFoundImage} />
          <h2 className="text-[50px] my-4 font-bold">PAGE NOT FOUND</h2>
          <p className="text-sm">Looks like you’ve hit a dead end.</p>
          <p className="text-sm">
            The page you're looking for doesn’t exist, moved, or got lost in
            cyberspace.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition"
        >
          RETURN TO HOMEPAGE
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
