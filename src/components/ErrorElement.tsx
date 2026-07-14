import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"


const RouteErrorBoundary = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-20">
            <h1 className="text-4xl font-bold text-gray-800">{error.status}</h1>
            <p className="text-gray-600">{error.statusText || "Ocurrió un error."}</p>
            <Link to="/home" className="text-blue-600 hover:underline font-medium">
            Back to the top
            </Link>
        </div>
        );
    }

console.error(error);
    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-20">
        <h1 className="text-4xl font-bold text-gray-800">Something went wrong</h1>
        <p className="text-gray-600">Try refreshing the page.</p>
        <Link to="/home" className="text-blue-600 hover:underline font-medium">
            Back to the top
        </Link>
        </div>
    );
};

export default RouteErrorBoundary
