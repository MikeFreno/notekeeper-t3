import { LegacyRef, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";

export default function AccountModal(props: {
  loginStatusFlash: string;
  registrationToggle: () => void;
  resetPasswordToggle: () => void;
  toggle: () => void;
}) {
  const [spinnerState, setSpinnerState] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string>("");
  const passwordField = useRef<any>(null);
  const emailField = useRef<any>(null);

  const passwordVisibilitySwitch = () => {
    // eslint-disable-next-line
    const passwordInput = passwordField.current;
    if (passwordInput) {
      // eslint-disable-next-line
      if (passwordInput.type === "password") {
        // eslint-disable-next-line
        passwordInput.setAttribute("type", "text");
        // eslint-disable-next-line
        passwordInput.setAttribute("class", "fa fa-eye fa-lg eye-overlay");
      } else {
        // eslint-disable-next-line
        passwordInput.setAttribute("type", "password");
        // eslint-disable-next-line
        passwordInput.setAttribute(
          "class",
          "fa fa-eye-slash fa-lg eye-overlay"
        );
      }
    }
  };
  const loginFlashSetter = () => {
    if (props.loginStatusFlash === "Login to continue") {
      return (
        <div>
          <div
            className="text-center"
            style={{
              fontSize: "24px",
              textDecoration: "underline",
              color: "#3F4E4F",
            }}
          >
            {props.loginStatusFlash}
          </div>
          <div
            className="text-center"
            style={{ fontSize: "14px", color: "#3F4E4F" }}
          >
            Otherwise take a look!
            <br /> However, you won&apos;t be able to save Tasks/Reminders
          </div>
        </div>
      );
    }
  };
  const loginRequest = (event: { preventDefault: () => void }) => {
    spinnerToggle();
    event.preventDefault();
  };
  const requestErrorSetter = () => {
    return (
      <div className="text-center" style={{ color: "red", fontSize: "12" }}>
        {requestError}
      </div>
    );
  };
  const loginButtonState = () => {
    if (spinnerState === false) {
      return (
        <Button className="add-button" type="submit">
          Login
        </Button>
      );
    } else {
      return (
        <Button className="add-button" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </Button>
      );
    }
  };
  const spinnerToggle = () => {
    setSpinnerState(!spinnerState);
  };
  return (
    //login Modal
    <Modal
      id="loginModal"
      isOpen={true}
      toggle={props.toggle}
      style={{
        paddingTop: "3em",
        paddingBottom: "0em",
        margin: "0 auto",
      }}
      className="modals"
    >
      <ModalHeader
        toggle={props.toggle}
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      >
        User Login
      </ModalHeader>
      {loginFlashSetter()}
      <ModalBody style={{ backgroundColor: "#DCD7C9" }}>
        <Form onSubmit={loginRequest}>
          <FormGroup>
            <Label for="login-email">Email</Label>
            <Input
              ref={emailField}
              style={{ backgroundColor: "#DCD7C9", borderColor: "#3F4E4F" }}
              type="text"
              name="emailField"
              placeholder="name@example.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="login-password">Password</Label>
            <Input
              ref={passwordField}
              type="password"
              id="passwordField"
              name="passwordField"
              placeholder="Enter Your Password"
              required
            />
            <button
              className="fa fa-eye-slash fa-lg eye-overlay"
              id="password-reveal"
              type="button"
              onClick={passwordVisibilitySwitch}
            />
          </FormGroup>
          {loginButtonState()}
          {requestErrorSetter()}
        </Form>
        <div className="password-reset-suggest">
          Forgot your password?
          <button
            className="createAccoutButton"
            onClick={props.resetPasswordToggle}
          >
            Reset it
          </button>
        </div>
        <div className="signup-suggest">
          Don&apos;t have an account?{" "}
          <button
            className="createAccoutButton"
            onClick={props.registrationToggle}
          >
            Create One.
          </button>
        </div>
      </ModalBody>
      <ModalFooter
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      ></ModalFooter>
    </Modal>
  );
}
