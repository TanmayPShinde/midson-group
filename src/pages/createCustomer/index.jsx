import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

import PrimaryButton from "../../components/shared/PrimaryButton";
import { db } from "../../app/firebase";
import InputField from "../../components/form/InputField";

const CreateCustomer = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    referredBy: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);

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
      name: data.name?.trim(),
      email: data.email?.trim(),
      phone: data.phone?.trim(),
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
        toast.success("New Customer created!");
        setData({
          name: "",
          email: "",
          phone: "",
          referredBy: "",
        });
      } else {
        console.log("Email already exists");
        toast.error("Email already exists!");
        setData({
          ...data,
          email: "",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 p-3 max-w-xl mx-auto bg-white rounded-md drop-shadow-lg">
      <h1 className="text-2xl font-semibold ">Create New Customer</h1>
      <hr className="h-px mt-2 mb-3 bg-orange-600 border-b-2 dark:bg-gray-800" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-2">
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-2">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            required
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-2">
          <InputField
            label="Phone Number (+91)"
            name="phone"
            type="tel"
            placeholder="99999-99999"
            required
            value={data.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-2">
          <InputField
            label="Referred By"
            name="referredBy"
            type="text"
            placeholder="Referral ID"
            required
            value={data.referredBy}
            onChange={handleInputChange}
          />
        </div>

        <div
          x-data="select"
          class="mt-2 relative"
          onFocus={() => {
            setShowDropdown(true);
          }}
          onBlur={() => {
            setShowDropdown(false);
          }}
        >
          <label
            htmlFor="referredBy"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Referred By (in development)
          </label>
          <input
            class="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300"
            readOnly="readonly"
          ></input>
          <ul
            class="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300"
            x-show="open"
            style={{ display: showDropdown ? "block" : "none" }}
          >
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200">
              User 1
            </li>
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200">
              User 2
            </li>
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200">
              User 3
            </li>
          </ul>
        </div>

        <div className="mt-3 text-center">
          <PrimaryButton
            text="Create Customer"
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
