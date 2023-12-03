import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useIpAddress = () => {
  const [ipAddress, setIpAddress] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axiosPublic.get(
          "https://api.ipify.org/?format=json"
        );
        setIpAddress(response?.data);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, [axiosPublic]); // Ensure the effect runs only when axiosPublic changes

  return [ipAddress];
};

export default useIpAddress;
