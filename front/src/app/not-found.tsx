import Link from 'next/link';
import { FaApple } from "react-icons/fa";

export default function NotFound() {
    return (
        <section className="relative flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
            <FaApple className="absolute text-gray-800 opacity-40 text-[20rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-gray-800 dark:text-gray-800">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Lo sentimos, pero no encontramos la página solicitada</p>
                    <p className="mt-4 mb-8 dark:text-gray-600">No te preocupes, puedes encontrar muchas de nuestras características en la Homepage.</p>
                    <Link href="/home" className="px-8 py-3 font-semibold rounded dark:bg-gray-800 dark:text-gray-50">
                        Volver a la Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
}