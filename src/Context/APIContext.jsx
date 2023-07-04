import { createContext, useState } from "react";
import { base_URL } from "../../utilis/api";
export const APIContext = createContext();

export default function APIContextProvider({ children }) {
    const InsertReport = async (doc, email) => {
        console.log('hi InsertReport :>> ', doc, email);
        try {
            if (doc.date == null) return;
            const url = `${base_URL}/reports/AddReport`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ report: doc, email: email }),
            });
            if (response.ok) { }
            else { }
        } catch (err) {
            console.log("err :>> ", err);
        }
    };

    const value = {
        InsertReport
    }
    return (
        <APIContext.Provider value={value}>
            {children}
        </APIContext.Provider>
    )
}

