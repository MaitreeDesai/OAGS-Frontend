import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { Login } from "./Login";
import { Register } from "./Register";

const LoginRegister = (props) => {
  const { login, registerClicked, loginClicked, onHide, ...restProps } = props;

  return (
    <Modal
      {...restProps}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="loginModal"
      className="modal fade login"
    >
      <Modal.Body>
        <div className="modal--close--button" onClick={onHide}>
          vika
        </div>
        {login ? (
          <Login    registerClicked={registerClicked} />
        ) : (
          <Register loginClicked={loginClicked} />
        )}
      </Modal.Body>
    </Modal>
  );
};

LoginRegister.propTypes = {
  login: PropTypes.bool,
  registerClicked: PropTypes.func,
  loginClicked: PropTypes.func,
  onHide: PropTypes.func.isRequired
};

export default LoginRegister;