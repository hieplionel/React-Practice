import {useEffect, useState} from 'react';
import '../style/Login.scss';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {handleLoginRedux} from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

    const navigate = useNavigate();
    const dispatch =  useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);


    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if (token) {
    //         navigate("/");
    //     }
    // }, [])

    const handleLogin = async () => {
        // alert("me");
        if(!email || !password) {
            toast.error("Email/Pasword is required!");
            return;
        }

        dispatch(handleLoginRedux(email, password));

        // let res = await loginApi(email.trim(), password);
        // // console.log("check login: ", res);
        // if(res && res.token) {
        //     loginContext(email, res.token);
        //     navigate("/");
        //     toast.success("Login successful!");
        // } else {
        //     if(res && res.status === 400) {
        //         toast.error (res.data.error);
        //     }
        // }


    }

    const handleGoBack = () => {
        navigate("/");
    }

    const handlePressEnter = (event) => {
        if ( event && event.key === "Enter" ) {
            handleLogin();
        }
        // console.log(" event:", event)
    }

    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/");
        }
    },[account])

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="text">Email or username ( eve.holt@reqres.in )</div>
            <input 
                type='text' 
                placeholder='Email or username...'
                value={email}
                onChange={(event) => setEmail(event.target.value) }
            />
            <div className="input-pass"> 
                <input 
                    type={ isShowPassword === true ? "text" : "password"} 
                    placeholder='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                />
                <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    // setIsShowPassword(!isShowPassword) dùng dấu chấm than để xét giá trị ngược lại với giá trị hiện tại
                    // ví dụ: isShowPassword đang bằng false thì dùng dấu chấm than nó sẽ bằng true
                ></i>
            </div>
            <button 
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            > 
                {isLoading && <i className="fas fa-circle-notch fa-spin"></i>}
                &nbsp;Login
            </button>
            {/* className={email && password ? "active" : ""} ý nghĩa của câu điều kiện này:
                Nếu như có email và password thì nó sẽ thêm class "active" vào
                còn nếu không có 1 trong 2 cũng như cả 2 thì class là trống */}
            <div className="back" onClick={() => handleGoBack()}>
                <i className="fa-solid fa-angle-left"></i>
                &nbsp;Go back
            </div>
        </div>
    )
}

export default Login;