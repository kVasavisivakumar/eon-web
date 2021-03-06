
import { Button, } from 'antd';
import React, { Component } from "react";
import PropTypes from "prop-types";
import {NAME_REQUIRED, INVALID_BANK, BANK_REQUIRED, EXPIRY_REQUIRED, NAME_NO_SPECIAL, ONLY_WHITESPACE} from '../../constants/messages';
import { Form, Input } from "antd";
import "./subscription.css";
import moment from "moment";
import BackButton from "../commonComponents/backButton";
import { NAME_VALIDATION, CARD_VALIDATION, WHITESPACE_VALIDATION } from '../../constants/constants';

/**
 * component to take input payment details such as :
 * Full name
 * card number
 * card expiry
 */
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expiryError: false,
        }
    }

    onFinish = (data) => {
        const expiry = moment(data.expirydate, "MM/YY");
        const current = moment();
        if(expiry>current) {
            this.setState({
                expiryError: false
            })
            this.props.onBankSubmit(data.card_number, data.expirydate);  
        }
        else 
            this.setState({
                expiryError: true,
            })
    }

    handleClose = () => {
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div className="detail-card">
                <BackButton handleOnClick={this.props.handleBackClick} text={"Payments"}/>
                <div className="subscription-container-payment" style={{justifyContent: 'center'}}>
                    <div className="subscription-payment">
                        <h3>Bank details</h3>
                        <Form
                            className="form-main-payment"
                            name="bankDetails"
                            onFinish={this.onFinish}
                            layout="vertical"
                        >
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: NAME_REQUIRED },{pattern: NAME_VALIDATION,message: NAME_NO_SPECIAL},
                                    { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },]}
                            >
                                <Input
                                    placeholder="Full Name"
                                />
                            </Form.Item>
                            <Form.Item
                                name="card_number"
                                rules={[{
                                    required: true,
                                    message: BANK_REQUIRED
                                },
                                {
                                    pattern: CARD_VALIDATION,
                                    message: INVALID_BANK
                                }]}
                            >
                                <Input
                                    placeholder="Card Number"
                                />
                            </Form.Item>
                            <Form.Item name="expirydate"
                                rules={[{
                                    required: true,
                                    message: EXPIRY_REQUIRED
                                },{
                                    pattern:/^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                    message: "Expected, input format MM/YY",
                                }]}
                            >
                                <Input
                                    placeholder="Expiry Date (MM/YY)"
                                    style={{width:"40%"}}
                                />
                            </Form.Item>
                            {
                                this.state.expiryError && 
                                <div className="expiry-error">
                                    *The entered card has expired, Please enter valid card details!
                                </div>
                            }
                            <Form.Item>
                                <Button style={{width: '100%'}} htmlType="submit" type="primary">Pay</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
 }


 Payment.propTypes = {
    noOfSeats:PropTypes.number,
    discountPercentage:PropTypes.number,
    perHeadAmount:PropTypes.number,
    onBankSubmit: PropTypes.func,
    handleBackClick: PropTypes.func,
    history: PropTypes.object
}

export default Payment;