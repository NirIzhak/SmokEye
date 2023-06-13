import { createContext, useState, useEffect } from "react";
import Users from "../Data/Users.json";
import { base_URL } from "../../utilis/api";

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
  const [des, setDes] = useState("");
  const [report,setReport] = useState([]);
  /*All Reports*/
  const [allReports, setAllReports] = useState([]);
  useEffect(() => {
    setAllReports([
      {
        id: 654321,
        description: "עישון במקום לא חוקי",
        media:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80",
        location: [32.0853, 34.7818],
        address: "רוטשילד 17, תל אביב",
        date: "05/01/2023 09:45",
      },
      {
        id: 89685468,
        description: "חנות שמוכרת סיגריות לקטינים",
        media:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80",
        location: [32.0853, 34.7818],
        address: "הירדן 98, רמת גן",
        date: "07/01/2023 19:46",
      },
    ]);
  }, []);

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
  const ConfirmClient = (e, p) => {
    let isExsist = clients.find(
      (item) => item.email == e && item.password == p
    );
    if (isExsist) return isExsist;
    else return undefined;
  };
   const insertReport= async (email,doc)=>{
    try{
      const url =  `${base_URL}/api/reports/AddReport`;
       const response = await fetch(url,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(doc)
       })
    }catch(err){
      console.log('err :>> ', err);
    }
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
    const firstSpaceIndex = inputString.indexOf(" ");
    if (firstSpaceIndex !== -1) {
      return inputString.substring(firstSpaceIndex + 1);
    }
    return inputString;
  };

  // chack who is the current user and his role
  const cheackUser = () => {
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
  };

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
    insertReport,
    setReport,
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
    report,
    currentUser,
    allReports, setAllReports
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
