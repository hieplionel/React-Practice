import {
    Routes,
    Route,
} from "react-router-dom";
import TableUsers from '../component/TableUsers';
import Home from '../component/Home';
import Login from '../component/Login';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />

                {/* <PrivateRoute path="users">
                    <TableUsers/>
                </PrivateRoute> */}

                <Route
                    path="/users"
                    element= {
                        <PrivateRoute>
                            <TableUsers/>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </>
    )
}

export default AppRoutes;