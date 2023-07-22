import { createContext, useState, useEffect } from "react";
import Users from "../Data/Users.json";
import { base_URL } from "../../utilis/api";

export const SmokeyeContext = createContext();

export default function SmokeyeContextProvider({ children, navigation }) {
  /*Login Values*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*Register Values*/
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [smoke, setSmoke] = useState(false);
  const [clients, setClients] = useState([]);
  const [isActive, setisActive] = useState(true);

  /*New Report */
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNum, SetStreetNum] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [des, setDes] = useState("");
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  /*All Reports*/
  /*const [allReports, setAllReports] = useState([]);*/

  const [currentLocation, setCurrentLocation] = useState([]);
  const [infoData, setInfoData] = useState([]);

  /*  const GetReports = async () => {
      try {
        let res = await fetch(`${base_URL}/reports`);
        let data = await res.json();
        setAllReports(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      GetReports();
    }, [allReports]);*/

  // try to get users
  const dataFetch = async () => {
    try {
      setClients(Users);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };
  const LoadUsers = () => {
    dataFetch();
  };
  //to do



  // upload image and get image url
  const ImageUploader = async (uri) => {
    try {
      const response = await fetch(`${base_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: uri }),
      });
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      else {
        const data = await response.json();
        return data.secure_url;
      }
    } catch (err) {
      console.log(err);
    };
  }



  const GetInfo = async () => {
    try {
      let res = await fetch(`${base_URL}/info`);
      let data = await res.json();
      setInfoData(data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    GetInfo();
  }, [infoData])


  //Cheack if regstration corrent//



  const extractStreetName = (inputString) => {
    const firstSpaceIndex = inputString.indexOf(" ");
    if (firstSpaceIndex !== -1) {
      return inputString.substring(firstSpaceIndex + 1);
    }
    return inputString;
  };

  useEffect(() => {
    LoadUsers();
  }, []);

  //change the state of smokeking status
  const toggleSwitch = () => setSmoke((previousState) => !previousState);

  const value = {
    location,
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    setLocation,
    setCity,
    toggleSwitch,
    setEmail,
    setPassword,
    setFirstName,
    setlastName,
    setConfirmPassword,
    setInfoData,
    setPhone,
    setAddress,
    setSmoke,
    extractStreetName,
    setStreet,
    SetStreetNum,
    setImageUri,
    setDes,
    setisActive,
    setCurrentLocation,
    ImageUploader,
    infoData,
    currentLocation,
    isActive,
    firstName,
    lastName,
    smoke,
    email,
    password,
    confirmPassword,
    phone,
    address,
    clients,
    city,
    street,
    streetNum,
    imageUri,
    des,
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
