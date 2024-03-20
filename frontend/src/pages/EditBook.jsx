import { useEffect, useState } from "react";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookmangement-gkgs.onrender.com/books/${id}`)
      .then((response) => {
        setAuthor(response.data.data.author);
        setPublishYear(response.data.data.publishYear);
        setTitle(response.data.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  }, [id]);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    axios
      .put(`https://bookmangement-gkgs.onrender.com/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured, while creating");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : " "}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-500">Title</label>
          <input
            type="text"
            value={title}
            placeholder="Title of the book"
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-500">Author</label>
          <input
            type="text"
            value={author}
            placeholder="Author of the book"
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-slate-500">Publish year</label>
          <input
            type="text"
            value={publishYear}
            placeholder="Year of the book"
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 rounded-md"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
