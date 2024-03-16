import { createContext, useState, useEffect } from "react";
import Users from "../Data/Users.json";

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
  const [imageUri, setImageUri] = useState(null);
  const [des, setDes] = useState("");
  const [report, setReport] = useState({});

  const [currentLocation, setCurrentLocation] = useState([]);

  const [TfirstName, setTFirstName] = useState("");
  const [TlastName, setTlastName] = useState("");
  const [Temail, setTemail] = useState("");
  const [Tphone, setTPhone] = useState("");
  const [Taddress, setTAddress] = useState("");
  const [TStreet, setTStreet] = useState(false);
  const [TStreetNum, setTStreetNum] = useState([]);
  const [TCity, setTCity] = useState(true);

  // list of places 
  const data = [
    { label: "מסעדה", value: "מסעדה" },
    { label: "קניון", value: "קניון" },
    { label: "קולנוע", value: "קולנוע" },
    { label: "פארק", value: "פארק" },
    { label: "תאטרון", value: "תאטרון" },
    { label: "אולם", value: "אולם" },
  ];

  //creating report object
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
    Temail,
    setTemail,
    Tphone,
    setTPhone,
    Taddress,
    setTAddress,
    TStreet,
    setTStreet,
    TStreetNum,
    setTStreetNum,
    TCity,
    setTCity,
    TfirstName,
    setTFirstName,
    TlastName,
    setTlastName,
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
