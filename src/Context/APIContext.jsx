import { createContext, useState, useEffect, useContext } from "react";
import { base_URL } from "../../utilis/api";
import { SmokeyeContext } from "./SmokEyeContext";
export const APIContext = createContext();

export default function APIContextProvider({ children }) {
  const [report, setReport] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [allReports, setAllReports] = useState([]);
  const [visible, setVisible] = useState(false);
  const [infoData, setInfoData] = useState([]);
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNum, SetStreetNum] = useState("");
  //Add Client to clients Array
  const InsertNewUser = async (user) => {
    try {
      const url = `${base_URL}/users/Register`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status());
      } else {
        setVisible(true);
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

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
        await setCurrentUser(user);
        return await user.role;
      } else {
        let error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      alert("שם משתמש או סיסמא לא תקינים");
    }
  };
  const InsertReport = async (doc, email) => {
    try {
      if (doc.date == null) {
        return;
      }
      let dateString = doc.date;
      let dateParts = dateString.split("/");
      let formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
      const url = `${base_URL}/reports/AddReport`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
          type: doc.type,
          location: doc.location,
          address: doc.address,
          place: doc.place,
          details: doc.details,
          image: doc.image,
          email: email,
        }),
      });
      alert("דיווח נשלח בהצלחה!");
    } catch (err) {
      console.log("err :>> ", err);
    }
    setReport({});
  };

  const ShowMyReports = async (email) => {
    try {
      const url = `${base_URL}/reports/ShowMyReports`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (response.ok) {
        setAllReports(await response.json());
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const GetInfo = async () => {
    try {
      let res = await fetch(`${base_URL}/info`);
      let data = await res.json();
      setInfoData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetInfo();
  }, [infoData]);

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
      } else {
        const data = await response.json();
        return data.secure_url;
      }
    } catch (err) {
      console.log(err);
    }
  };
  //location
  const GetAddress = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?&key=RjOFc93hAGcOpbjZ0SnOV4TIzDTP1mz9`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (
        result.addresses[0].address.municipality == "" ||
        result.addresses[0].address.street == "" ||
        result.addresses[0].address.streetNumber == ""
      ) {
        alert(
          "לא היה ניתן למצוא את המיקום שלך, אנא מלא את פרטי המיקום באופן ידני"
        );
      } else {
        setCity(result.addresses[0].address.municipality);
        setStreet(extractStreetName(result.addresses[0].address.street));
        SetStreetNum(result.addresses[0].address.streetNumber);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const extractStreetName = (inputString) => {
    const firstSpaceIndex = inputString.indexOf(" ");
    if (firstSpaceIndex !== -1) {
      return inputString.substring(firstSpaceIndex + 1);
    }
    return inputString;
  };
  const GetLocationByAddress = async (street, num, city) => {
    try {
      let res = await fetch(`https://api.tomtom.com/search/2/structuredGeocode.json?key=RjOFc93hAGcOpbjZ0SnOV4TIzDTP1mz9&countryCode=IL&limit=10&ofss=0&streetNumber=${num}&streetName=${street}&municipality=${city}`);
      let data = await res.json();
      return {
        lon: data.results[0].position.lon,
        lat: data.results[0].position.lat
      }
    } catch (err) {
      console.log(err)
    }
  }



  const value = {
    InsertReport,
    setReport,
    setCurrentUser,
    ConfirmClient,
    ShowMyReports,
    InsertNewUser,
    setVisible,
    setInfoData,
    ImageUploader,
    setLocation,
    setLatitude,
    setLongitude,
    setCity,
    setStreet,
    SetStreetNum,
    GetAddress,
    GetLocationByAddress,
    city,
    street,
    streetNum,
    latitude,
    longitude,
    infoData,
    visible,
    allReports,
    currentUser,
    report,
  };
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}
