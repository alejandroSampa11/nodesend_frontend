import Layout from "../../components/Layout";
import clienteAxios from "../../config/clienteAxios";
import { useState } from "react";
import appContext from "../../context/app/appContext";
import { useContext } from "react";
import Alerta from "../../components/Alerta";

export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const { data } = await clienteAxios(`/enlaces/${enlace}`);
  // console.log(data)
  return {
    props: {
      enlace: data,
    },
  };
}

export async function getServerSidePaths() {
  const { data } = await clienteAxios("/enlaces");
  // console.log(data)
  return {
    paths: data.enlaces.map((enlace) => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}


function Enlace ({ enlace }){
  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState('')

   //CONTEXT DE LA AUTENTICACIÓN
   const AppContext = useContext(appContext)
   const { mostrarAlerta, mensaje_archivo } = AppContext;
  // console.log(enlace)

  //FUNCIONES
  const verificarPassword = async (e) => {
    e.preventDefault()
    const info = {
      password
    }
    try {
      const { data } = await clienteAxios.post(`/enlaces/${enlace.enlace}`, info)
      // console.log(data)
      setTienePassword(data.password)
    } catch (error) {
      // console.log(error.response.data.msg)
      mostrarAlerta(error.response.data.msg)
    }
  }
  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center">
            Este enlace esta protegido por un password, colocalo a continuación
          </p>
          {mensaje_archivo && <Alerta/>}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={e => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 shadow appearance-none"
                    placeholder="Password del Archivo"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <input type="submit" className="bg-red-500 rounded hover:bg-gray-900 w-full uppercase text-sm text-white p-2 font-bold hover:cursor-pointer" value='Validar Password' />

              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu Archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/archivos/${enlace.archivo}`}
              className="bg-red-500 text-center py-3 px-10 rounded-md uppercase text-white font-bold hover:bg-black"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Enlace;