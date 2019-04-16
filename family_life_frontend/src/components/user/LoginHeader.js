import React from 'react'
import '../css/Login.css'
import moment from 'moment';

const LoginHeader = (props) => {
    return (
        <div className ='loginHeaderContainer'> 
            <h1 className ='loginHeader'>FamilyLife | {props.name}</h1>
            <p className="header--time"><span>{moment().format('LT')} </span>  {moment().format('MMM Do YY')}
            </p>
            
         </div>
    )
}


export default LoginHeader;