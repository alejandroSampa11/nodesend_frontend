import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import { useContext, useEffect } from "react";
import Link from "next/link";
import Dropzone from "../components/Dropzone";
import appContext from "../context/app/appContext";
import Alerta from "../components/Alerta";

export default function Home() {
  //EXTRAER EL USUARIO AUTENTICADO DEL STORAGE
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext;
  useEffect(() => {
    const token = localStorage.getItem('rns_token')
    if(token){
      usuarioAutenticado();
    }
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-3xl mt-10">
              <span className="font-bold text-red-700 text-4xl uppercase">Tu URL es: </span>
              {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`}
            </p>
            <button
              className="mt-10 bg-red-500 hover:cursor-pointer text-sm uppercase w-full p-2 rounded text-white font-bold hover:bg-gray-900"
              value="Iniciar Sesión"
              type="button"
              onClick={()=> navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`)}
            >
              Copiar Enlace
            </button>
          </>
        ) : (
          <>
            {mensaje_archivo && <Alerta />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="text-center md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Compartir Archivos de Forma Sencilla y Privada
                </h2>
                <p className="text-lg leading-loose mb-5">
                  <span className="text-red-500 font-bold">NodeSend</span> te
                  permite compartir archivos con cifrado de extremo a extremo y
                  un archivo que es eliminado después de ser descargado. Así que
                  puedes mantener lo que compartes en privado y asegurarte de
                  que tus cosas no permanezcan en línea siempre
                </p>
                <div className="text-center p-2 rounded-md bg-red-500 text-white font-bold text-lg hover:bg-black">
                  <Link className=" font-bold text-lg" href="/crearcuenta">
                    Crea una Cuenta para Mayores Beneficios
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
