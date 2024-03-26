import authContext from "./authContext";
import { useReducer } from "react";
import authReducer from "./authReducer";
import tokenAuth from "../../config/tokenAuth";
import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";
import clienteAxios from "../../config/clienteAxios";

const AuthState = ({ children }) => {
    //DEFINIR UN STATE INICIAL
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('rns_token'): '',
        autenticado: null,
        usuario: null,
        mensaje: null,
    };

    //DEFINIR EL REDUCER
    const [state, dispatch] = useReducer(authReducer, initialState);

    //REGISTRAR NUEVOS USUARIOS
    const registrarUsuarios = async (datos) => {
        try {
            const { data } = await clienteAxios.post("/usuarios", datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: data.msg,
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg,
            });
        }
        //LIMPIAR LA ALERTA DESPUES DE 3 SEG
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 3000)
    };

    //AUTENTICAR USUARIO 
    const iniciarSesion = async(datos)=>{
       try {
            const {data} = await clienteAxios.post('/auth',datos);
            //console.log(data.token)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: data.token
            })
       } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
       }
        //LIMPIAR LA ALERTA DESPUES DE 3 SEG
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 3000)
    }

    //RETORNAR EL USUARIO EN BASE AL JWT
    const usuarioAutenticado = async()=>{
        const token = localStorage.getItem('rns_token');
        if(token){
            tokenAuth(token)
        }
        try {
            const {data} = await clienteAxios('/auth')
            // console.log(data)
            if(data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: data.usuario
                })
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //CERRAR SESIÓN
    const cerrarSesion = async()=>{
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return (
        <>
            <authContext.Provider
                value={{
                    token: state.token,
                    autenticado: state.autenticado,
                    usuario: state.usuario,
                    mensaje: state.mensaje,
                    registrarUsuarios,
                    iniciarSesion,
                    usuarioAutenticado,
                    cerrarSesion
                }}
            >
                {children}
            </authContext.Provider>
        </>
    );
};

export default AuthState;
