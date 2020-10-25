import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                sessionStorage.getItem("token") ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};
export default ProtectedRoute;