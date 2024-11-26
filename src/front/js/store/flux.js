
const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            message: null,
            demo: [{
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            token: null,
            user: [],
            participante: [],
            isAdmin: false, // crear logica
            monitores: [],
            tipo_evento: [],
            evento: [],
        },
        actions: {

            register: async (nombre, apellido, email, password, rut, numero_telefono, genero) => {
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        password: password,
                        numero_telefono: numero_telefono,
                        rut: rut,
                        genero: genero


                    })
                };
                try {
                    const resp = await fetch(`${BACKEND_URL}/api/register-participante`, requestOptions)
                    if (resp.status != 200) {
                        alert("An error has occurred while creating the user");
                        return false;
                    }
                    const data = await resp.json();
                    console.log(data);

                    return true;
                } catch (error) {
                    console.error("There has been an error creating a user")
                }
            },

            login: async (email, password) => {

                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                };
                try {
                    const resp = await fetch(`https://3000-jphafelin-ingsoftwareof-je87mcfudu9.ws-us116.gitpod.io/api/login`, requestOptions)

                    if (resp.status != 200) {
                        console.log("An error has occurred");
                        return false;
                    }
                    const data = await resp.json();
                    const userId = {
                        id: data.id
                    }
                    console.log(data)
                    localStorage.setItem("userId", JSON.stringify(userId))
                    localStorage.setItem("token", data.access_token);
                    setStore({
                        token: data.access_token
                    })

                    return true;
                } catch (error) {
                    console.error("There has been an error login in")
                }
            },
            synctoken: () => {
                const token = localStorage.getItem("token");
                console.log("App just loaded, synching the local storage");
                if (token && token != "" && token != undefined) setStore({
                    token: token
                });
            },
            logout: () => {
                const token = localStorage.removeItem("token");
                setStore({
                    token: null
                });
            },


            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({
                        message: data.message
                    })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({
                    demo: demo
                });
            },
            

            getSocios: async () => {
                const store = getStore();
                const host = process.env.BACKEND_URL;
                const url = host + "/api/socio";
                const requestOptions = {
                    method: "GET",
                    ContentType: "application/json",
                }
                const response = await fetch(url, requestOptions);
                console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    console.log(" Data User: ", data.results);
                    setStore({
                        socios: data.results,
                    });
                }
            },
            
            
            
            
        }
    };
};

export default getState;