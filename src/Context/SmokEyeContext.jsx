import { createContext, useState, useEffect } from "react";
import Users from "../Data/Users.json";

export const SmokeyeContext = createContext();

export default function SmokeyeContextProvider({ children }) {
  /*Login Values*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*Register Values*/
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [smoke, setSmoke] = useState(false);
  const [clients, setClients] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const dataFetch = async () => {
    try {
      setClients(Users);
      console.log(clients);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };
  const LoadUsers = () => {
    dataFetch();
  };



  const ConfirmClient = (e,p) => {
    let isExsist = clients.find((item)=> item.email == e && item.password == p);
    if(isExsist) return isExsist;
    else return undefined;
  }


  // //Cheack if regstration corrent
  // const ConfirmRegistration = () => {
  //   if (email != null || email != undefined &
  //     password != null || password != undefined &
  //     password === confirmPassword &
  //     name != null || name != undefined) {
  //     return true;
  //   }
  // }




  useEffect(() => {
    LoadUsers();
  }, []);

  //change the state of smokeking status
  const toggleSwitch = () => setSmoke((previousState) => !previousState);

  //Add Client to clients Array
  const AddClient = () => {
    let user = {
      name,
      email,
      phone,
      address,
      smoke,
    };
    setClients([...clients, user]);
    console.log(clients);
  };

  //Check Client in Array
  //const ConfirmClient=()=>{}

  const value = {
    toggleSwitch,
    AddClient,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setPhone,
    setAddress,
    setSmoke,
    smoke,
    email,
    password,
    name,
    confirmPassword,
    phone,
    address,
    clients,
    ConfirmClient, 
    setCurrentUser,
    currentUser
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
