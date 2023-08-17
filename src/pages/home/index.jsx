import { useEffect, useState } from "react";
import { getAllCustomers, getAllGroups } from "../../app/firebase";

const Home = () => {
  const [allCustomers, setAllCustomers] = useState(null);
  const [allGroups, setAllGroups] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const allCustomers = await getAllCustomers();
      const allGroups = await getAllGroups();

      // Update the states
      setAllCustomers(allCustomers);
      setAllGroups(allGroups);
    }

    // Trigger the fetch
    fetchData();
  }, []);

  return (
    <div className="flex mt-20 mx-14 " style={{ height: "85vh" }}>
      <div className="p-3 flex-grow me-3 bg-white rounded-md drop-shadow-lg">
        <h1 className="text-xl font-semibold ">Groups</h1>
        <hr className="h-px my-2 bg-gray-600 border-b-2 "></hr>
        <div className="overflow-y-auto" style={{ height: "90%" }}>
          {allGroups ? (
            allGroups.map((group) => (
              <div key={group.id}>
                <div className="p-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{group.name}</span>
                    <span className="text-slate-700">{group.id}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-slate-700">
                      members: {group.no_of_customers}
                    </span>
                    <span className="text-sm font-medium">
                      ₹ {group.group_value}
                    </span>
                  </div>
                </div>
                <hr className="h-px my-2 bg-gray-200 border-b-0 "></hr>
              </div>
            ))
          ) : (
            <div className="text-center mt-2 text-sm">Loading...</div>
          )}
        </div>
      </div>
      <div className=" p-3 flex-grow ms-3 bg-white rounded-md drop-shadow-lg">
        <h1 className="text-xl font-semibold ">Customers</h1>
        <hr className="h-px my-2 bg-gray-600 border-b-2 "></hr>
        <div className="overflow-y-auto" style={{ height: "90%" }}>
          {allCustomers ? (
            allCustomers.map((customer) => (
              <div key={customer.id}>
                <div className="p-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-slate-700">{customer.email}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-slate-700">
                      referral: {customer.referred_by}
                    </span>
                    <span className="text-slate-700 text-sm">
                      +91 {customer.phone}
                    </span>
                  </div>
                </div>
                <hr className="h-px my-2 bg-gray-200 border-b-0 "></hr>
              </div>
            ))
          ) : (
            <div className="text-center mt-2 text-sm">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
