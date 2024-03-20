import { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`https://bookmangement-gkgs.onrender.com/books/${id}`)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    navigate("/");
  };

  
  const handleCancel = () => {
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <p className="text-xl mb-4">Are you sure you want to delete?</p>

          <div>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded m-5"
            >
              Delete
            </button>
            <button
              onClick={handleCancel}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded m-5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
