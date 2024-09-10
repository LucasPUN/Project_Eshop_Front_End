import TopNavBar from "../../component/TopNavBar.tsx";
import {Badge, Button, Container, Form} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import * as React from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {GoogleLoginButton} from "react-social-login-buttons";
import {LoginUserContext} from "../../../App.tsx";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoginFail,setIsLoginFail] = useState<boolean>(false)

    const loginUser = useContext(LoginUserContext);

    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (loginResult) {
            alert("login Succuse");
            navigate(-1);
        } else {
            setIsLoginFail(true);
        }

    }

    useEffect(() => {
        if (loginUser) {
            navigate("/")
        }
    }, [loginUser])

    return (
        <>
            <TopNavBar/>
            <Container>
                <div className="border border-dark rounded p-5 m-5">
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={handleEmailChange}
                                value={email}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={handlePasswordChange}
                                value={password}/>
                        </Form.Group>
                        {
                            isLoginFail&&
                            <h4><Badge style={{width:"100%",marginBottom:"10px",height:"40px",padding:"10px"}} bg="danger">Login failed</Badge></h4>
                        }
                        <Button variant="primary" type="submit" style={{width: "100%", backgroundColor: "black"}}>
                            Submit
                        </Button>
                    </Form>
                    <hr/>
                    <GoogleLoginButton onClick={() => {
                        FirebaseAuthService.handleSignInWithGoogle()
                    }}/>
                </div>
            </Container>
            );
        </>
    )
}