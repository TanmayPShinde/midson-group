import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/shared/PrimaryButton";
import { db } from "../../app/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const CreateCustomer = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    referredBy: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newCustomer = {
      name: data.name.trim(),
      email: data.email.trim(),
      referredBy: data.referredBy,
    };
    try {
      const q = query(
        collection(db, "customers"),
        where("email", "==", newCustomer.email)
      );
      if ((await getDocs(q)).empty) {
        const docRef = await addDoc(collection(db, "customers"), newCustomer);
        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log("Email already exists");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 p-3 max-w-lg mx-auto bg-white rounded-md drop-shadow-lg">
      <h1 className="text-2xl font-semibold ">Add New Customer</h1>
      <hr className="h-px mt-2 mb-3 bg-orange-600 border-b-2 dark:bg-gray-800" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={data.name}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email ID
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            value={data.email}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="referredBy"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Referred By
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            name="referredBy"
            id="referredBy"
            placeholder="Referral ID"
            value={data.referredBy}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mt-3 text-center">
          <PrimaryButton
            text="Sign Up"
            sx="p-2.5"
            disabled={loading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
