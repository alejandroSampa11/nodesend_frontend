import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import authContext from "../context/auth/authContext";
import Alerta from "../components/Alerta";
import { useEffect } from "react";
import {useRouter} from 'next/router'
function Login() {

  const AuthContext = useContext(authContext);
  const {iniciarSesion, mensaje, autenticado} = AuthContext

  //NEXT ROUTER
  const router = useRouter()

  useEffect(()=>{
    if(autenticado){
      router.push('/')
    }
  },[autenticado])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email No Válido")
        .required("El Email Es Obligatorio"),
      password: Yup.string().required("El Password Es Obligatorio"),
    }),
    onSubmit: (valores) => {
      iniciarSesion(valores)
    },
  });
  return (
    <>
      <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          <h2 className="font-sans text-4xl font-bold text-gray-800 text-center my-4">
            Iniciar Sesión
          </h2>
          {mensaje && <Alerta/>}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                onSubmit={formik.handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 shadow appearance-none"
                    type="email"
                    placeholder="Email del Usuario"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 shadow appearance-none"
                    type="password"
                    placeholder="Password del Usuario"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
                <input
                  className="bg-red-500 hover:cursor-pointer text-sm uppercase w-full p-2 rounded text-white font-bold hover:bg-gray-900"
                  value="Iniciar Sesión"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
