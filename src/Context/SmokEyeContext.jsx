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
  const [singalUser, setSingalUser] = useState({})
  const [currentUser, setCurrentUser] = useState({});
  const [isActive, setisActive] = useState(true);
  const [visible, setVisible] = useState(false);

  /*New Report */
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNum, SetStreetNum] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [des, setDes] = useState("");
  const [report, setReport] = useState([]);
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  /*All Reports*/
  const [allReports, setAllReports] = useState([]);

  const [currentLocation, setCurrentLocation] = useState([]);

  const GetReports = async () => {
    try {
      let res = await fetch(`${base_URL}/reports`);
      let data = await res.json();
      setAllReports(data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    GetReports();
  },
    [])



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

  const insertReport = async (email, doc) => {
    try {
      if (doc.date == null) return;
      console.log("email :>> ", email);
      const url = `${base_URL}/reports/AddReport`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc)
      }).then(async () => {
        const url = `${base_URL}/reports/email`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email)
        })
      });
    } catch (err) {
      console.log("err :>> ", err);
    }
  };


  //Add Client to clients Array
  const insertNewUser = async (user) => {
    try {
      const url = `${base_URL}/users/Register`;
      console.log('url :>> ', url);
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      if (!res.ok) {
        throw new Error('Request failed with status ' + res.status());
      }
      else { setVisible(true); }
    } catch (err) {
      console.log('err :>> ', err);
    }
    setSingalUser();
  };
  //Cheack if regstration corrent//

  // chack if the user is exsist
  const ConfirmClient = async (e, p) => {
    try {
      console.log('hi :>> ', e, p);
      let url = `${base_URL}/users/Login`;
      console.log('url :>> ', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: e, password: p })
      });

      let user = await response.json();
      if (!user) { alert('Request failed with status ' + res.status()) }
      else { setSingalUser(user); console.log('user2 :>> ', singalUser); }
    } catch (err) {
      console.log('err :>> ', err);
    }
  };

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



  const value = {
    location, setLocation,
    latitude, setLatitude,
    longitude, setLongitude,
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
    setSingalUser,
    insertNewUser,
    setisActive,
    setCurrentLocation,
    setAllReports,
    setVisible,
    visible,
    currentLocation,
    isActive,
    firstName,
    lastName,
    singalUser,
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
    report,
    currentUser,
    allReports,
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
