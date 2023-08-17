import { useState } from "react";
import { toast } from "react-toastify";

import PrimaryButton from "../../components/shared/PrimaryButton";
import { db } from "../../app/firebase";
import InputField from "../../components/form/InputField";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Select from "react-tailwindcss-select";
import useEffectCustomerOptions from "../../hooks/useEffectCustomerOptions";

const CreateGroup = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    no_of_customers: "",
    group_value: "",
    memberships: [],
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(null);
  // const [selectValue, setSelectValue] = useState([]);

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

    const newGroup = {
      name: data.name?.trim(),
      id: data.id?.trim(),
      no_of_customers: data.no_of_customers?.trim(),
      group_value: data.group_value?.trim(),
      memberships: data.memberships.map((mem) => ({ customer_id: mem.value })),
    };
    try {
      const docRef = doc(db, "groups", newGroup.id);
      if ((await getDoc(docRef)).exists()) {
        console.log("Group ID already exists");
        toast.error("Group ID already exists!");
        setData({
          ...data,
          id: "",
        });
      } else {
        const id = newGroup.id;
        delete newGroup.id;
        await setDoc(doc(db, "groups", id), newGroup);

        toast.success("New Group created!");
        setData({
          name: "",
          id: "",
          no_of_customers: "",
          group_value: "",
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
            value={data.no_of_customers}
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
            value={data.group_value}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Add Memberships <span className="text-red-500">*</span>
          </label>
          <Select
            value={data.memberships}
            onChange={(value) => {
              if (value?.length <= data.no_of_customers || !value)
                setData((prev) => ({
                  ...prev,
                  memberships: value ? value : [],
                }));
              else {
                toast.error(
                  data.no_of_customers === ""
                    ? "Please add No of customers first!"
                    : `You have already added ${data.no_of_customers} customer/s`
                );
              }
              // setSelectValue(
              //   value?.map((selectedOption) => ({
              //     label: selectedOption.label,
              //   }))
              // );
            }}
            options={options ? options : []}
            isSearchable
            isClearable
            loading={!options}
            primaryColor="green"
            isMultiple={true}
          />
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
