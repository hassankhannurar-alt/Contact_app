import { FaSquarePhone } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const AdminUserContacts = () => {
  const [data, setData] = useState([]);
  const id = useSelector((store) => store.user.id);
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8000/contact/getById/${userId}`
      );

      if (response.status === 200) {
        setData(response.data?.contacts.contacts);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex w-full h-max justify-between items-center ">
        <div>
          <Link to="/" className="hover:text-red-600">
            <FaArrowLeft className="mt-1 ml-1" />
          </Link>
        </div>

        <div>
          <h1 className="font-serif p-3 text-2xl">Contacts</h1>
        </div>
        <div className=" flex p-4 gap-5">
          <Link to="/NewContact">
            <IoMdPersonAdd className="mt-1 ml-1" />
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll max-h-[27rem] ">
        {data.map((con, index) => (
          <Link key={index} to={`/UserDetail/${con._id}`}>
            <div className="flex p-4 font-serif items-center justify-between gap-2">
              <div className=" bg-cyan-300 rounded-full h-9 w-9 flex text-center justify-center items-center">
                {con.name[0]}
              </div>
              <div>{con.name}</div>
              <div>
                <FaSquarePhone />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminUserContacts;
