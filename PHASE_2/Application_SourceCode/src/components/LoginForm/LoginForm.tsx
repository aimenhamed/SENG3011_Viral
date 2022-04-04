import React from "react";
import { FlexLayout } from "../common/layouts/screenLayout";



const formContainerLayout = {
    flexDirection: 'column' as 'column',
    backgroundColor: 'black',
    display: 'flex',
    flex: '6',
    color: 'white',
}

const formLayout = {
    backgroundColor: 'black'
}

const buttonStyle = {
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: '5px',
    width: '13vw',
    height: '4vh'
}

const LoginForm = () => {

    return (
        <FlexLayout style={formContainerLayout}>
            <form style={formLayout}>
                <div style={{margin: '5vh'}}>
                    <h1> Login </h1>
                </div>
                <div style={{alignContent: 'right'}}>
                    <div style={{margin: '2vh', marginLeft: 'auto'}}>
                        <label>
                            Username
                            <input type="text" name="username" style={{marginLeft: '2vw'}} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password
                            <input type="password" name="password" style={{marginLeft: '2vw'}} />
                        </label>
                    </div> 
                </div>
                <div style={{margin: '5vh'}}>
                    <input type="submit" value="LOGIN" style={buttonStyle} />
                </div>
                <div>
                    <p> Create a new account </p>
                </div>
            </form>
        </FlexLayout>        
    );
}

export default LoginForm;
