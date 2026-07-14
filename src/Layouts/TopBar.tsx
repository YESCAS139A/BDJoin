import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="h-14 md:h-16 bg-blue-100 flex items-center justify-between px-4 md:px-6 gap-4 shrink-0 shadow-sm">
        <Link to="/home" className="font-bold text-gray-700 text-lg">
            BDJoin
        </Link>
        <nav className="flex gap-4">
            <Link to="/home" className="text-gray-600 hover:text-blue-600 font-medium">
            Inicio
            </Link>
            <Link to="/auth/login" className="text-gray-600 hover:text-blue-600 font-medium">
            Iniciar Sesión
            </Link>
            <Link to="/auth/register" className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 font-medium text-sm">
            Registrarse
            </Link>
        </nav>
        </div>
    );
    };

export default TopBar;