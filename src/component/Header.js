import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import {handleLogoutRedux} from '../redux/actions/userAction';
import { useEffect } from 'react';

const Header = (props) => {
    // const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.account);
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(handleLogoutRedux());
    }

    useEffect(() => {
        if( user && user.auth === false && window.location.pathname !== '/login') {
            navigate("/");
            toast.success("logout successfully!")
        }
    }, [user]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logoApp}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        <span> Hoangg Hiepp West NA </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/') && 
                        <>
                            <Nav className="me-auto" >
                                <NavLink to="/" className="nav-link" >Home</NavLink>
                                <NavLink to="/users" className="nav-link" >Manage Users</NavLink>
                            </Nav>
                            <Nav>
                                {user && user.email && <span className="nav-link">Welcome <b>{user.email}</b> </span>}
                                <NavDropdown title="Setting">
                                    {user && user.auth === true 
                                        ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item> 
                                        : <NavLink to="/login" className="dropdown-item">Login</NavLink>
                                    }
                                    
                                </NavDropdown>
                            </Nav>
                        </>
                    }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;