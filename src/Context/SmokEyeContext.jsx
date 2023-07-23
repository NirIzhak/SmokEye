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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [smoke, setSmoke] = useState(false);
  const [clients, setClients] = useState([]);
  const [isActive, setisActive] = useState(true);

  /*New Report */
  /*  const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [streetNum, SetStreetNum] = useState("");*/
  const [imageUri, setImageUri] = useState(null);
  const [des, setDes] = useState("");
  const [report, setReport] = useState({});

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

  const createReport = (d, t, add, p, de, i) => {
    setReport({
      date: d,
      type: t,
      address: add,
      place: p,
      details: de,
      image: i
    })
  }

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


  useEffect(() => {
    LoadUsers();
  }, []);

  //change the state of smokeking status
  const toggleSwitch = () => setSmoke((previousState) => !previousState);

  const value = {
    toggleSwitch,
    setEmail,
    setPassword,
    setFirstName,
    setlastName,
    setPhone,
    setAddress,
    setSmoke,
    setImageUri,
    setDes,
    setisActive,
    setCurrentLocation,
    createReport,
    setReport,
    report,
    currentLocation,
    isActive,
    firstName,
    lastName,
    smoke,
    email,
    password,
    phone,
    address,
    clients,
    imageUri,
    des,
    data
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
