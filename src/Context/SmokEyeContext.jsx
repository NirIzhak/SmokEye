import { createContext, useState, useEffect } from "react";
import Users from "../Data/Users.json";

export const SmokeyeContext = createContext();

export default function SmokeyeContextProvider({ children, navigation }) {
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

 /*New Report */
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNum, SetStreetNum] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [des, setDes] = useState("")
  
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



  // chack if the user is exsist
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


  const extractStreetName = (inputString) => {
      const firstSpaceIndex = inputString.indexOf(' ');
      if (firstSpaceIndex !== -1) {
        return inputString.substring(firstSpaceIndex + 1);
      }
      return inputString;
  };


  // chack who is the current user and his role
  const cheackUser=()=>{
    // const typerole = ConfirmClient(email, password);
    // if(typerole == undefined){
    //     alert("No User")
    // }
    // else{
    //     setCurrentUser(typerole);
    //   if(typerole.role == "User"){
    //       navigation.navigate("userScreens")
    //       alert("user")
    //   }
    //   else if(typerole.role == "Admin"){
    //       //navigation.navigate("adminScreens")
    //       alert("admin")

    //   }
    //   else if(typerole.role == "Regulator"){
    //       alert("regulator")
    //   }
    //   else if(typerole.role == "Reasercher"){
    //       alert("reasercher")
    //   }
    // }
  }


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
  };

  //Check Client in Array
  //const ConfirmClient=()=>{}

  const value = {
    setCity,
    toggleSwitch,
    AddClient,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setPhone,
    setAddress,
    setSmoke,
    ConfirmClient, 
    setCurrentUser,
    cheackUser,
    extractStreetName,
    setStreet,
    SetStreetNum,
    setImageUri,
    setDes,
    smoke,
    email,
    password,
    name,
    confirmPassword,
    phone,
    address,
    clients,
    city, 
    street,
    streetNum,
    imageUri,
    des,
    currentUser,    
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
