import { useRef, useState } from "react";
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
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
import Timezone from "./timezone";

export default function registrationModal(props: {
  logInToggle: () => void;
  toggle: () => void;
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const [emailPassed, setEmailPassed] = useState<string>("");
  const [passwordPassed, setPasswordPassed] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfError, setPasswordConfError] = useState<string>("");
  const [passwordConfPassed, setPasswordConfPassed] = useState<string>("");
  const [emailBorderColor, setEmailBorderColor] = useState<string>("#3F4E4F");
  const [passwordBorderColor, setPasswordBorderColor] =
    useState<string>("#3F4E4F");
  const [passwordConfBorderColor, setPasswordConfBorderColor] =
    useState<string>("#3F4E4F");
  const [passwordConfHolder, setPasswordConfHolder] = useState<string>("");
  const [timezoneSet, setTimezoneSet] = useState(false);
  const [timezoneConf, setTimezoneConf] = useState<string>(
    "This is used for reminder scheduling."
  );
  const [requestError, setRequestError] = useState<string>("");
  const [registerSpinner, setRegisterSpinner] = useState(false);
  const passwordField = useRef<HTMLInputElement>(null);
  const passwordConfField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);

  const getCookie = (name: string) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]?.toString().replace(/^([\s]*)|([\s]*)$/g, "");
        if (cookie?.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };
  const registrationRequest = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    spinnerSetter();
    const userEmail = emailField.current?.value.toLowerCase();
    const userPassword = passwordField.current?.value;
    const timezone_Shift = $("#timezone-select").val();


  };
  const registrationButtonSetter = () => {
    if (registerSpinner) {
      return (
        <Button className="add-button-reminder" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </Button>
      );
    } else if (
      emailPassed === "Looks good!" &&
      passwordPassed === "Looks good!" &&
      passwordConfPassed === "Looks good!" &&
      timezoneSet
    ) {
      return (
        <Button className="add-button-reminder" type="submit">
          Sign Up!
        </Button>
      );
    } else {
      return (
        <div id="disabledButton" style={{ width: "fit-content" }}>
          <Button className="add-button-reminder" disabled>
            Sign Up!
          </Button>
          <UncontrolledTooltip placement="top" target="disabledButton">
            Fill out form to enable!
          </UncontrolledTooltip>
        </div>
      );
    }
  };
  const spinnerSetter = () => {
    setRegisterSpinner(!registerSpinner);
  };
  const passwordConfSetter = () => {
    if (passwordConfHolder === "") {
      return (
        <Input
          type="password"
          id="passwordConfField"
          name="passwordConfField"
          placeholder="Re-enter password"
          onKeyUp={checkPasswordConfInput}
          minLength={8}
          required
          style={{ borderColor: passwordConfBorderColor }}
        />
      );
    } else {
      return (
        <Input
          type="password"
          id="passwordConfField"
          name="passwordConfField"
          placeholder="Re-enter password"
          value={passwordConfHolder}
          onKeyUp={checkPasswordConfInput}
          minLength={8}
          required
          style={{ borderColor: passwordConfBorderColor }}
        />
      );
    }
  };
  const passwordVisibilitySwitch = () => {
    if (passwordField.current?.type === "password") {
      $("#passwordField").attr("type", "text");
      $("#password-reveal").attr("class", "fa fa-eye fa-lg eye-overlay");
    } else {
      $("#passwordField").attr("type", "password");
      $("#password-reveal").attr("class", "fa fa-eye-slash fa-lg eye-overlay");
    }
  };
  const passwordConfVisibilitySwitch = () => {
    if (passwordField.current?.type === "password") {
      $("#passwordConfField").attr("type", "text");
      $("#password-reveal-confirmation").attr(
        "class",
        "fa fa-eye fa-lg eye-overlay"
      );
    } else {
      $("#passwordConfField").attr("type", "password");
      $("#password-reveal-confirmation").attr(
        "class",
        "fa fa-eye-slash fa-lg eye-overlay"
      );
    }
  };
  const timezoneSetter = () => {
    setTimezoneSet(!timezoneSet);
  };
  const checkEmailInput = () => {
    var currentInput = emailField.current?.value;
    var re = /\S+@\S+\.\S+/;
    if (currentInput) {
      if (currentInput.length <= 3) {
        setEmailPassed("");
        setEmailError("Email too short");
        setEmailBorderColor("red");
      } else if (!re.test(currentInput)) {
        setEmailPassed("");
        setEmailError("Please enter a valid email");
        setEmailBorderColor("red");
      } else {
        setEmailError("");
        setEmailPassed("Looks good!");
        setEmailBorderColor("green");
      }
    }
  };
  const checkPasswordInput = () => {
    checkEmailInput();
    var currentInput = passwordField.current?.value;
    var passwordConf = passwordConfField.current?.value;
    if (currentInput) {
      if (currentInput.length < 8) {
        setPasswordPassed("");
        setPasswordError("Password too short");
        setPasswordBorderColor("red");
      } else if (passwordConf!.length >= currentInput.length) {
        if (currentInput !== passwordConf) {
          setPasswordConfError("Passwords must match");
          setPasswordConfPassed("");
          setPasswordConfBorderColor("red");
          setPasswordError("Passwords must match");
          setPasswordPassed("");
          setPasswordBorderColor("red");
        } else {
          setPasswordConfError("");
          setPasswordError("");
          setPasswordPassed("Looks good!");
          setPasswordConfPassed("Looks good!");
          setPasswordBorderColor("green");
          setPasswordConfBorderColor("green");
        }
      } else {
        setPasswordError("");
        setPasswordPassed("Looks good!");
        setPasswordBorderColor("green");
      }
    }
  };
  const checkPasswordConfInput = () => {
    checkPasswordInput();
    var currentInput = passwordConfField.current?.value;
    var passwordToMatch = passwordField.current?.value;
    if (currentInput && passwordToMatch) {
      if (currentInput.length < passwordToMatch.length) {
        ({ passwordConfPassed: "" });
        ({ passwordConfError: "Passwords must match" });
        ({ passwordConfBorderColor: "red" });
      } else if (currentInput !== passwordToMatch) {
        ({ passwordPassed: "" });
        ({ passwordError: "Passwords must match" });
        ({ passwordBorderColor: "red" });
        ({ passwordConfPassed: "" });
        ({ passwordConfError: "Passwords must match" });
        ({ passwordConfBorderColor: "red" });
      } else if (currentInput.length > 8 && currentInput === passwordToMatch) {
        ({ passwordError: "" });
        ({ passwordPassed: "Looks good!" });
        ({ passwordBorderColor: "green" });
        ({ passwordConfError: "" });
        ({ passwordConfPassed: "Looks good!" });
        ({ passwordConfBorderColor: "green" });
      }
    }
  };
  const requestErrorSetter = () => {
    return (
      <div className="text-center" style={{ color: "red", fontSize: "12" }}>
        {requestError}
      </div>
    );
  };
  return (
    <Modal
      id="registerModal"
      className="quick-buzz modals"
      isOpen={true}
      toggle={props.toggle}
      style={{ paddingBottom: "0em", margin: "0 auto", paddingTop: "2em" }}
    >
      <ModalHeader
        toggle={props.toggle}
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      >
        User Registration
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#DCD7C9" }}>
        <Form onSubmit={registrationRequest}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              style={{
                backgroundColor: "#DCD7C9",
                borderColor: emailBorderColor,
              }}
              type="email"
              id="emailField"
              name="emailField"
              placeholder="name@example.com"
              onKeyUp={checkEmailInput}
              required
            />
            <div className="input-error">{emailError}</div>
            <div className="input-passed">{emailPassed}</div>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              id="passwordField"
              name="passwordField"
              placeholder="Minimum of 8 characters"
              onKeyUp={checkPasswordInput}
              minLength={8}
              required
              style={{ borderColor: passwordBorderColor }}
            />
            <button
              tabIndex={100}
              className="fa fa-eye-slash fa-lg eye-overlay"
              id="password-reveal"
              type="button"
              onClick={passwordVisibilitySwitch}
            />
          </FormGroup>
          <div className="input-error">{passwordError}</div>
          <div className="input-passed">{passwordPassed}</div>
          <FormGroup>
            <Label>Password Confirm</Label>
            {passwordConfSetter()}
            <button
              tabIndex={101}
              className="fa fa-eye-slash fa-lg eye-overlay"
              id="password-reveal-confirmation"
              type="button"
              onClick={passwordConfVisibilitySwitch}
            ></button>
          </FormGroup>
          <div className="input-error">{passwordConfError}</div>
          <div className="input-passed">{passwordConfPassed}</div>
          <FormGroup>
            <Label>Pick your timezone: </Label>
            <br />
            <Timezone setTimezone={timezoneSetter} />
            <div className="timezone-passed" id="timezone-tip">
              {timezoneConf}
            </div>
          </FormGroup>
          {registrationButtonSetter()}
          {requestErrorSetter()}
        </Form>
        <div className="signup-suggest">
          Already have an account?{" "}
          <button className="createAccoutButton" onClick={props.logInToggle}>
            Sign In.
          </button>
        </div>
      </ModalBody>
      <ModalFooter
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      ></ModalFooter>
    </Modal>
  );
}
