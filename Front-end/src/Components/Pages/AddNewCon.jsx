import axios from "axios";
import { useState } from "react";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewContact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const userId = useSelector((store) => store.user.id);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !number) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/contact/create/${userId}`,
        {
          name: name,
          number: number,
        }
      );

      if (response.status === 201) {
        toast.success("Contact saved successfully!");
        setName("");
        setNumber("");
        navigate("/contacts");
      } else {
        toast.error("Failed to save contact. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="font-serif flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center w-full ">
        <div className=" flex gap-7 mt-4 items-center mr-4">
          <Link to="/Contacts" className="hover:text-red-600">
            <FaArrowLeft className="mt-1 ml-1" />
          </Link>
          <h1 className=" font-semibold text-[20px]">Save New Contact</h1>
        </div>

        <div className="border-4 border-gray-400 h-20 w-20 mt-5 rounded-full flex justify-center items-center">
          <FaUser className="text-3xl text-gray-600" />
        </div>
      </div>

      <div className="w-full max-w-md ">
        <form>
          <div className="p-5">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
            />
          </div>

          <div className="p-5">
            <label
              htmlFor="number"
              className="block text-gray-700 font-medium mb-1"
            >
              Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your number"
            />
          </div>

          <div className="p-3 flex justify-center">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewContact;
