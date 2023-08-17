import { useEffect } from "react";
import { getAllCustomers } from "../app/firebase";

const useEffectCustomerOptions = (setOptions) =>
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const data = await getAllCustomers();

      // Store results in the results array
      const options = data.map((option) => ({
        label: option.name,
        value: option.id,
        email: option.email,
      }));

      // // Update the options state
      setOptions(options);
    }

    // Trigger the fetch
    fetchData();
  }, [setOptions]);

export default useEffectCustomerOptions;
