import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineMissedVideoCall } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UserDetail = () => {
  const userId = useSelector((store) => store.user.id);
  const params = useParams();
  const numberId = params.id;
  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8000/contact/getSpecificNumber/${userId}/${numberId}`
      );

      if (response.status === 200) {
        setData(response.data.contact);
      }
    })();
  }, []);
  const handledelete = async () => {
    const removeCon = await axios.delete(
      `http://localhost:8000/contact/delete/${userId}/${numberId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (removeCon.status === 200) {
    }
    navigate("/contacts");
    toast.success("Contact deleted successfull!");
  };

  return (
    <div>
      <div className="flex justify-between mt-3 text-[15px] p-2">
        <div>
          <Link to="/Contacts" className="hover:text-red-600">
            <FaArrowLeft className="mt-1 ml-1" />
          </Link>
        </div>
        <div className="flex gap-4">
          <FaRegStar className="mt-1 ml-1" />
          <Link to={`/Update/${numberId}`}>
            {" "}
            <CiEdit className="mt-1 ml-1" />
          </Link>
          <MdDelete className="mt-1 ml-1" onClick={handledelete} />
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="border-4 border-gray-400 h-20 w-20 mt-5 rounded-full flex justify-center items-center">
          <FaUser className="text-3xl text-gray-600" />
        </div>
      </div>
      <div className="flex justify-center font-serif p-3">
        <p className="text-2xl">{data.name}</p>
      </div>
      <div className="flex justify-center gap-10 text-white">
        <div className=" bg-green-500 rounded-full h-8 w-8 flex text-center justify-center items-center">
          <IoCall />
        </div>
        <div className=" bg-green-500 rounded-full h-8 w-8 flex text-center justify-center items-center">
          <Link target="_blank" to={`https://wa.me/92${data.number}`}>
            <LuMessageCircleMore />
          </Link>
        </div>
        <div className=" bg-green-500 rounded-full h-8 w-8 flex text-center justify-center items-center">
          <MdOutlineMissedVideoCall />
        </div>
      </div>
      <div className="flex gap-3 p-3 items-center mt-3">
        <IoCall />
        <p>{data.number}</p>
      </div>
      <hr />
    </div>
  );
};

export default UserDetail;
