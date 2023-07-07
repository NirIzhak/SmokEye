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
  const [currentUser, setCurrentUser] = useState({});
  const [isActive, setisActive] = useState(true);
  const [visible, setVisible] = useState(false);

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
  const [allReports, setAllReports] = useState([]);

  const [currentLocation, setCurrentLocation] = useState([]);
  const [infoData, setInfoData] = useState([]);

  const GetReports = async () => {
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
  }, [allReports]);

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



  const GetInfo = async()=>{
    try{
      let res = await fetch(`${base_URL}/info`);
      let data = await res.json();
      setInfoData(data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    GetInfo();
  },[infoData])


  //Add Client to clients Array
  const insertNewUser = async (user) => {
    try {
      const url = `${base_URL}/users/Register`;
      console.log("url :>> ", url);
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        throw new Error("Request failed with status " + res.status());
      } else {
        setVisible(true);
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
    //setCurrentUser();
  };
  //Cheack if regstration corrent//

  // chack if the user is exsist
  const ConfirmClient = async (e, p) => {
    try {
      let url = `${base_URL}/users/Login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: e, password: p }),
      });
      if (response.ok) {
        let user = await response.json();
        return user;
      } else {
        let error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      alert("שם משתמש או סיסמא לא תקינים");
    }
  };

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
    ConfirmClient,
    setCurrentUser,
    extractStreetName,
    setStreet,
    SetStreetNum,
    setImageUri,
    setDes,
    insertNewUser,
    setisActive,
    setCurrentLocation,
    setAllReports,
    setVisible,
    ImageUploader,
    infoData,
    visible,
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
    currentUser,
    allReports,
  };
  return (
    <SmokeyeContext.Provider value={value}>{children}</SmokeyeContext.Provider>
  );
}
