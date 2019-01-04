import React from 'react';
import {Button } from 'semantic-ui-react';
import moment from 'moment';
import './Header.css'


const Header = (props) => {
        return(
        <div className="header--headingContainer">
            <p className="header--time"><span>{moment().format('LT')} </span>  {moment().format('MMM Do YY')}
            </p>
             <h1 id="header--heading">FamilyLife | {props.name}</h1>
             <div>
             <Button  size='huge' basic content="Switch User" />
             <Button  size='huge' basic content="Sign Out" />
             </div>
             
        </div>
    ) 
}

export default Header;