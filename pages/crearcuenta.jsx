import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useContext, useEffect } from "react";
import authContext from "../context/auth/authContext";
import React from "react";
import Alerta from "../components/Alerta";

function CrearCuenta() {

    //ACCEDER AL STATE
    const AuthContext = useContext(authContext)
    const {registrarUsuarios, mensaje} = AuthContext

    //FORMULARIO Y VALIDACION CON FORMIK Y YUP
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es Obligatorio'),
            email: Yup.string().email('El Email No Es Válido').required('El Email Es Obligatorio'),
            password: Yup.string().required('El Password es Obligatorio').min(6, 'El Password debe contener al menos 6 caracteres')
            // nombre: Yup.string().required('El Nombre es Obligatorio'),
            // nombre: Yup.string().required('El Nombre es Obligatorio')
        }),
        onSubmit: (valores) => {
            registrarUsuarios(valores)
        }
    })
    
    return (
        <>
            <Layout>
                <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                    <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
                        Crear Cuenta
                    </h2>
                    {mensaje && <Alerta/>}
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={formik.handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="nombre"
                                        className="block text-black text-sm font-bold mb-2"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 shadow appearance-none"
                                        placeholder="Nombre de Usuario"
                                        value={formik.values.nombre}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.nombre && formik.errors.nombre ? (
                                        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{formik.errors.nombre}</p>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-black text-sm font-bold mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 shadow appearance-none"
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
                                        htmlFor="password"
                                        className="block text-black text-sm font-bold mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 shadow appearance-none"
                                        placeholder="Password de Usuario"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{formik.errors.password}</p>
                                        </div>
                                    ) : null}
                                </div>
                                <input type="submit" className="bg-red-500 rounded hover:bg-gray-900 w-full uppercase text-sm text-white p-2 font-bold hover:cursor-pointer" value='Crear Cuenta' />
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default CrearCuenta;
