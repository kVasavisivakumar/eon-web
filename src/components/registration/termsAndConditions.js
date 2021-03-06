import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Checkbox, Button} from 'antd';
import './termsAndCondition.css';
import {termsConditions} from '../../constants/termsConditions';

export default function TermsAndConditions (props){
    const { handleAccept, isChecked, handleClose, handleCheckChange } = props;
 
  return(
   <Modal
    visible
    onCancel = {handleClose}
    title = {<div className = 'modal-header'>Terms & Conditions</div>}
    footer = {null}
    width={660}
   >
    <div className = 'terms-conditions'>{termsConditions}</div>
    <div className = 'modal-footer'>
        <Checkbox checked = {isChecked} onChange={handleCheckChange}>I hereby agree with the terms and conditions</Checkbox>
        <Button className = 'accept-button' onClick = {handleAccept}>Accept</Button>
    </div>
   </Modal>
    )
 }

TermsAndConditions.propTypes = {
    handleAccept: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCheckChange: PropTypes.func.isRequired
}