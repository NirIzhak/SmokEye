import {
  createContext,
  useState,
  useEffect
} from 'react';

export const SmokeyeContext = createContext()

export default function SmokeyeContextProvider({
  children
}) {

  /*Login Values*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*Register Values*/
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [smoke, setSmoke] = useState(false);
  const [clients, setClients] = useState([]);


  //change the state of smokeking status
  const toggleSwitch = () => setSmoke(previousState => !previousState);

  //Add Client to clients Array
  const AddClient = () => {
    let User;
    if (ConfirmRegistration) {
      User = {
        name,
        email,
        phone,
        address,
        smoke
      }
    }
    setClients(User);
  }

  //Check Client in Array
  const ConfirmClient = (e,p) => {

    let isExsist = clients.find((item)=> item.email == e);
    if(isExsist)
    {
    return isExsist.password == p;
    }
    else{return false;}
  }
  //Cheack if regstration corrent
  const ConfirmRegistration = () => {
    if (email != null || email != undefined &
      password != null || password != undefined &
      password === confirmPassword &
      name != null || name != undefined) {
      return true;
    }
  }

  useEffect(() => {

  })
  const value = {
    ConfirmClient,
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
  return ( <
    SmokeyeContext.Provider value={value}> 
    {children} 
    </SmokeyeContext.Provider>

  )
}