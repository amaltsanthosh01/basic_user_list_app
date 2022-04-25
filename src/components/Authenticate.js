import React from "react";
import { Navigate } from "react-router-dom";

export function requireAuthentication(Component) {
    return class AuthenticatedComponent extends React.Component {
        isAuthenticated() {
            if(localStorage.getItem('token'))
            {
                return true;
            }
            else {
                return false;
            }
        }
        render() {
            return (
                <div>
                    { this.isAuthenticated() === true ? <Component/> : <Navigate to="/" /> }
                </div>
            );
        }
    };
}

export default requireAuthentication;