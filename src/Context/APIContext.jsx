import { createContext, useState } from "react";
import { base_URL } from "../../utilis/api";
export const APIContext = createContext();

export default function APIContextProvider({ children }) {
    const [report, setReport] = useState({});
    const InsertReport = async (doc, email) => {
        console.log('hi InsertReport :>> ', doc, email);
        try {
            console.log('InsertReport :>> ', doc.date);
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
                    reporter: doc.reporter == "Anonymous" ? "Anonymous": doc.reporter,
                    email: email
                }),
            });
            
                alert("דיווח נשלח בהצלחה!");
            } catch (err) {
                console.log("err :>> ", err);
                alert("קיימת בעיה בשליחת הדיווח");
        }
    };

    const value = {
        InsertReport,
        report,
        setReport
    }
    return (
        <APIContext.Provider value={value}>
            {children}
        </APIContext.Provider>
    )
}


