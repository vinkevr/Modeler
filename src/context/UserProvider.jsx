import { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({id:"", nombre:"", email:"", verificado: false});
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
}
export default UserProvider;