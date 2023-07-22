import { createContext, useState } from "react";
import { base_URL } from "../../utilis/api";
export const APIContext = createContext();

export default function APIContextProvider({ children }) {
    const [report, setReport] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [allReports, setAllReports] = useState([]);
    const [visible, setVisible] = useState(false);

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
            const url = `${base_URL}/reports/AddReport`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: doc.date,
                    type: doc.type,
                    location: doc.location,
                    address: doc.address,
                    place: doc.place,
                    details: doc.details,
                    image: doc.image,
                    email: email
                }),
            });
            if (response.ok) {
                alert("דיווח נשלח בהצלחה!");
            }
        } catch (err) {
            console.log("err :>> ", err);
        }
        setReport({})
    };

    const ShowMyReports = async (email) => {
        try {
            console.log('ShowMyReports :>> ', email);
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

    const value = {
        InsertReport,
        setReport,
        setCurrentUser,
        ConfirmClient,
        ShowMyReports,
        InsertNewUser,
        setVisible,
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


