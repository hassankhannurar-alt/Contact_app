import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Update = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const numberId = params.numberId;
  const userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    const getNumberData = async () => {
      const response = await axios.get(
        `http://localhost:8000/contact/getSpecificNumber/${userId}/${numberId}`
      );

      setName(response.data.contact.name);
      setNumber(response.data.contact.number);
    };
    getNumberData();
  }, []);
  const handleUpdate = async () => {
    const response = await axios.put(
      `http://localhost:8000/contact/update/${userId}/${numberId}`,
      {
        name,
        number,
      }
    );
    if (response.status === 200) {
    }
    navigate("/contacts");
    toast.success("Contact Updated successfull!");
  };
  return (
    <div className="w-full h-full flex rounded-2xl items-center justify-center bg-gradient-to-br bg-white  px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Update
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              number
            </label>
            <input
              type="number"
              name="number"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
