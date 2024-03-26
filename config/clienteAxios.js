import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` //|| `http://localhost:4000/api`
})

export default clienteAxios;

