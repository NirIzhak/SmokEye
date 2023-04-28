import { View, Text } from 'react-native'
import {createContext, useState,useEffect} from 'react';

export const SmokeyeContext = createContext()

export default function SmokeyeContextProvider({children}) {

  /*Login Values*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*Register Values*/
  const [name, setName] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [clients,setClients] = useState([]);

  //Add Client to clients Array
  const AddClient=()=>{
      let user = {
      name,
      email,
      phone,
      address
    }
    setClients(user);
  }

  //Check Client in Array
  const ConfirmClient=()=>{}

  useEffect(()=>{
    
  })
  const value = {
    AddClient,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setPhone,
    setAddress,
    setClients,
    email,
    password,
    name,
    confirmPassword,
    phone,
    address,
    clients
  }
  return (
    <SmokeyeContext.Provider value={value}>
    {children}
    </SmokeyeContext.Provider>
    
  )
}