import React, { createContext, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client' // to connect to npm auth client 
import { createActor } from 'declarations/login_apps_backend';// need to add to import the actor
const AuthContext = createContext();

const defaultOptions = {
    createOptions: {
        idleOptions: {
            disableIdle: true,
        }
    },

    loginOptions: {
        identityProvider: "",
    }
} // end const defult options

export const useAuthClient = (options = defaultOptions) => {

    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [callFunction, setCallFunction] = useState(null);

    //slash the process
    useEffect(() => {

        //if authentication was run this code will run fisrt <<<<
        AuthClient.create(options.createOptions).then(async (client) => {
            updateClient(client);
        });
    }, []
    ); // the [] for value list zero
    // >>>>
    //end use effect

    async function updateClient(client) {
        //this part is for judgement for the user authentication true or false <<<
        const isAuthenticated = await client.isAuthenticated();
        setIsAuth(isAuthenticated);
        // >>>

        const identity = client.getIdentity();
        setIdentity(identity);

        const principal = identity.getPrincipal();
        setPrincipal(principal);

        setAuthUser(client);

        // process call the function from backends <<<
        const actor = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });

        setCallFunction(actor)
        //>>>
    }//end Update Client

    const login = () => {
        //this function for login
        //when run this function autentication became true
        authUser.login({
            ...options.loginOptions,
            onSucesss: () => {
                updateClient(authUser);
            },
        });
    }//end login 

    async function logout() {
        //when run this function autentication became false
        await authUser?.logout();
        await updateClient(authUser);
    }//end log out


    return {
        //we need to return all the value after run the fucntion 
        isAuth, login, logout, authUser, identity, principal, callFunction
    }//end return

}//end export const 

export const AuthProvider = ({ children }) => {

    const auth = useAuthClient();

    return <AuthContext.Provider value={auth} > {children} </AuthContext.Provider>;
};//end auth provider

export const useAuth = () => useContext(AuthContext);