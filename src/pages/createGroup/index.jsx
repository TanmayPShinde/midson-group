import { useState } from "react";
import { toast } from "react-toastify";

import PrimaryButton from "../../components/shared/PrimaryButton";
import { db, getAllCustomers } from "../../app/firebase";
import InputField from "../../components/form/InputField";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CreateGroup = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    no_of_customers: "",
    group_value: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  let allCustomers;
  getAllCustomers().then((data) => {
    allCustomers = data;
  });
  console.log(allCustomers);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newGroup = {
      name: data.name?.trim(),
      id: data.id?.trim(),
      no_of_customers: data.no_of_customers?.trim(),
      group_value: data.group_value?.trim(),
    };
    try {
      const docRef = doc(db, "groups", newGroup.id);
      if ((await getDoc(docRef)).empty) {
        const id = newGroup.id;
        delete newGroup.id;
        const docSnap = await setDoc(doc(db, "groups", id, newGroup));

        console.log("Document written with ID: ", docSnap.id);
        toast.success("New Group created!");
        setData({
          name: "",
          id: "",
          no_of_customers: "",
          group_value: "",
        });
      } else {
        console.log("Group ID already exists");
        toast.error("Group ID already exists!");
        setData({
          ...data,
          id: "",
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
      <h1 className="text-2xl font-semibold ">Create New Group</h1>
      <hr className="h-px mt-2 mb-3 bg-orange-600 border-b-2 dark:bg-gray-800" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-2">
          <div className="mt-2">
            <InputField
              label="Group ID"
              name="id"
              type="text"
              placeholder="JD567"
              required
              value={data.id}
              onChange={handleInputChange}
            />
          </div>
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="bombay_group_5"
            required
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-2">
          <InputField
            label="No of Customers"
            name="no_of_customers"
            type="number"
            placeholder="5"
            required
            value={data.phone}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="mt-2">
          <InputField
            label="Group Value (₹)"
            name="group_value"
            type="number"
            placeholder="5000"
            required
            value={data.referredBy}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
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
            text="Create Group"
            sx="p-2.5"
            disabled={loading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
