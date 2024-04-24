import {useState ,createContext } from 'react';


export const UserNameContext = createContext();

// export function UsernameProvider(props)
// {
//     const [user, setUser] = useState("mohamed");

//     setUser(props.username);
//     return(
//         <UserNameContext.Provider value={user}>
//             {props.children}
//         </UserNameContext.Provider>
//     )
// }
