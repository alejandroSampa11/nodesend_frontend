import Head from "next/head"
import Header from "./Header"
function Layout({ children }) {
    return (
        <>
            <Head>
                <title>ReactNodeSend</title>
            </Head>
            <div className="bg-gray-200 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-10">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout