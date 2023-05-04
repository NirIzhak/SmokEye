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
  const [smoke,setSmoke] = useState(false);
  const [clients,setClients] = useState([]);

  const dataFetch = async () => {
    try {
      const data = await fetch('/src/Data/Users.json');
      const res = await data.json();
      setClients(res);
    }catch(err){
      console.log('err :>> ', err);
    }    
}
const LoadUsers=()=>{
  dataFetch();
}

useEffect(()=>{
  LoadUsers()
},[])

  //change the state of smokeking status
  const toggleSwitch = () => setSmoke(previousState => !previousState);
  
  //Add Client to clients Array
  const AddClient=()=>{
      let user = {
      name,
      email,
      phone,
      address,
      smoke
    }
    setClients(user);
  }

  //Check Client in Array
  //const ConfirmClient=()=>{}


  const value = {
    toggleSwitch,
    AddClient,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setPhone,
    setAddress,
    setSmoke,
    smoke,
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