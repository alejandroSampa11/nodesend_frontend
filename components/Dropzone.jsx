import React, { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import clienteAxios from "../config/clienteAxios";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Formulario from "./Formulario";

function Dropzone() {

  //CONTEXT DE LA AUTENTICACION
  const AuthContext = useContext(authContext)
  const {autenticado, usuario} = AuthContext;
  //CONTEXT DE LA APP
  const AppContext = useContext(appContext)
  const { mostrarAlerta, subirArchivo, cargando, crearEnlace } = AppContext;

  const onDropAccepted = useCallback(async (acceptedFiles) => {

    // CREAR UN FORM-DATA
    const formData = new FormData();
    formData.append("archivo", acceptedFiles[0]);
    subirArchivo(formData, acceptedFiles[0].path);
  }, []);

  const onDropRejected = () => {
    mostrarAlerta('No se pudo subir, el Limite es 1 MB, obten una cuenta para subir archivos más grandes')
  }

  //EXTRAER CONTENIDO DE DROPZONE
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const archivos = acceptedFiles.map((archivo) => (
    <li
      key={archivo.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 2)).toFixed()} MB
      </p>
    </li>
  ));


  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4 rounded-lg">
      {acceptedFiles.length > 0 ? (
        <div className=" text-center mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{archivos}</ul>

          {autenticado ? <Formulario/> : ""}

          {cargando ? 
          (<p className="my-10 text-center text-gray-600">Subiendo Archivo...</p>) : (
            <button
              type="submit"
              className="uppercase bg-blue-700 w-3/4 py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              onClick={() => crearEnlace()}
            >
              Crear Enlace
            </button>
          )}

        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el Archivo
            </p>
          ) : (
            <>
              <div className="text-center">
                <p className="text-2xl text-center text-gray-600">
                  Selecciona un archivo y arrastralo aquí
                </p>
                <button
                  className="bg-blue-700 w-3/4 py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                  type="button"
                >
                  Seleccionar Archivos
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropzone;
