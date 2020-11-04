import React from 'react'

export const CheckBox = props => {
    return (
        <li className="permissonItem">
            <p className="permlabel" >{props.value}</p> <input className="inputButton" key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} />
        </li>
    )
}

export default CheckBox