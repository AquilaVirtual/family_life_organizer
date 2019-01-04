import React from 'react'
import './Login.css'
import moment from 'moment';

const LoginHeader = () => {
    return (
        <div className ='loginHeaderContainer'> 
            <h1 className ='loginHeader'>FamilyLife | Login</h1>
            <p className="header--time"><span>{moment().format('LT')} </span>  {moment().format('MMM Do YY')}
            </p>
            
         </div>
    )
}


export default LoginHeader;