import React, { Component, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
  ModalFooter,
  Spinner,
} from "reactstrap";
import $ from "jquery";

export default function PasswordResetModal(props: {
  loginToggle: () => void;
  toggle: () => void;
}) {
  const [passwordResetRequestError, setPasswordResetRequestError] =
    useState<string>("");
  const [passwordResetRequestSuccess, setPasswordResetRequestSuccess] =
    useState<string>("");
  const [submitButtonSpinner, setSubmitButtonSpinner] =
    useState<boolean>(false);

  const passwordResetRequest = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    submitButtonSpinnerToggle();
    const userEmail = $("#emailField").val();
    // axios({
    //   method: "POST",
    //   url: "/api/auth/password/reset/",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": cookie,
    //   },
    //   data: {
    //     email: userEmail,
    //   },
    // }).then((response) => {
    //   console.log(response);
    // });
  };
  const submitButtonSpinnerToggle = () => {
    setSubmitButtonSpinner(!submitButtonSpinner);
  };
  const submitButtonRender = () => {
    if (submitButtonSpinner) {
      return (
        <button className="delete-button" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </button>
      );
    } else {
      return (
        <button className="delete-button" type="submit">
          Submit
        </button>
      );
    }
  };
  return (
    <Modal isOpen={true}>
      <ModalBody>
        <ModalHeader
          toggle={props.toggle}
          style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
        >
          Password Reset Form
        </ModalHeader>
        <Form onSubmit={passwordResetRequest}>
          <FormGroup>
            <Label for="login-email">Enter your email to reset:</Label>
            <Input
              style={{ backgroundColor: "#DCD7C9", borderColor: "#3F4E4F" }}
              type="text"
              id="emailField"
              name="emailField"
              placeholder="name@example.com"
              required
            />
          </FormGroup>
          {submitButtonRender()}
          <div
            className="text-center"
            style={{ color: "green", fontSize: "12" }}
          >
            {passwordResetRequestSuccess}
          </div>
          <div className="text-center" style={{ color: "red", fontSize: "12" }}>
            {passwordResetRequestError}
          </div>
        </Form>
      </ModalBody>
      <ModalFooter
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      >
        <div className="signup-suggest">
          Back to
          <button className="createAccoutButton" onClick={props.loginToggle}>
            login.
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
