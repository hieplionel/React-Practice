import Alert from 'react-bootstrap/Alert';
import {useSelector} from 'react-redux';

const PrivateRoute = (props) => {
    // console.log(">>> check props:", props);
    const user = useSelector(state => state.user.account);
    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className="mt-4">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        You don't have permission to access this route.
                    </p>
                </Alert>
            </>
        )
    }

    return (
        <>
            {props.children}
        </>
    )

}

export default PrivateRoute;