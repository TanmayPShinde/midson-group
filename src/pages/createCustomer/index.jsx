import { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

import PrimaryButton from "../../components/shared/PrimaryButton";
import { db } from "../../app/firebase";
import InputField from "../../components/form/InputField";
import Select from "react-tailwindcss-select";
import useEffectCustomerOptions from "../../hooks/useEffectCustomerOptions";

const CreateCustomer = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    referred_by: "",
  });
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffectCustomerOptions(setOptions);

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
      referred_by: data.referred_by.value
        ? { name: data.referred_by.label, id: data.referred_by.value }
        : data.referred_by,
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
          referred_by: "",
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
    <div className="mt-20 mx-auto p-4 max-w-xl bg-white rounded-md drop-shadow-lg">
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Referred By
          </label>
          <Select
            value={data.referred_by}
            onChange={(value) => {
              setData((prev) => ({ ...prev, referred_by: value ? value : "" }));
            }}
            options={options ? options : []}
            isSearchable
            isClearable
            loading={!options}
            primaryColor="green"
          />
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
