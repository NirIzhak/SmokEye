import { createContext, useState, useEffect } from "react";
import { base_URL } from "../../utilis/api";
export const APIContext = createContext();

export default function APIContextProvider({ children }) {
    const [report, setReport] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [allReports, setAllReports] = useState([]);
    const [visible, setVisible] = useState(false);
    const [infoData, setInfoData] = useState([]);

    //Add Client to clients Array
    const InsertNewUser = async (user) => {
        try {
            console.log('insert :>> ');
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
                setCurrentUser(user);
            } else {
                let error = await response.text();
                throw new Error(error);
            }
        } catch (err) {
            alert("שם משתמש או סיסמא לא תקינים");
        }
    };
    const InsertReport = async (doc, email) => {
        console.log('hi InsertReport :>> ', doc, email);
        try {
            if (doc.date == null) { return; }
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
                    email: email
                }),
            });
            alert("דיווח נשלח בהצלחה!");
        } catch (err) {
            console.log("err :>> ", err);
        }
        setReport({})
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
            console.log(err)
        }
    }
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

    useEffect(() => {
        GetInfo();
    }, [infoData])
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
        infoData,
        visible,
        allReports,
        currentUser,
        report,

    }
    return (
        <APIContext.Provider value={value}>
            {children}
        </APIContext.Provider>
    )
}


