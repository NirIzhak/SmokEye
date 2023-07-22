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

  const [currentLocation, setCurrentLocation] = useState([]);

  const data = [
    { label: "מסעדה", value: "מסעדה" },
    { label: "קניון", value: "קניון" },
    { label: "קולנוע", value: "אולם קולנוע" },
    { label: "פארק שעשועים", value: "פארק" },
    { label: "תאטרון", value: "תאטרון" },
    { label: "אולם הופעות", value: "אולם הופעות" },
  ];
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
    data
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
