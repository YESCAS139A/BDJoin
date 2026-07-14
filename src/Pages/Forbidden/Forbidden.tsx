import { Link } from "react-router-dom";

const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-20">
            <h1 className="text-4xl font-bold text-gray-800">403</h1>
            <p className="text-gray-600">You do not have permission to view this page.</p>
            <Link to="/home" className="text-blue-600 hover:underline font-medium">
                Back to the top
            </Link>
        </div>
    )
}

export default Forbidden