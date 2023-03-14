import React, { Component, useRef, useState } from "react";
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
import Footer from "./Footer";
import Timezone from "./timezone";
import { signOut } from "next-auth/react";
import { Reminder, Task, User } from "@prisma/client";

export default function UserSettings(props: {
  currentUser: (User & { Tasks: Task[]; Reminders: Reminder[] }) | undefined;
  toggle: () => void;
  currentMode: string;
}) {
  const [tabDisplaySetting, setTabDisplaySetting] = useState<string>("app");
  const [passwordPassed, setPasswordPassed] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfError, setPasswordConfError] = useState<string>("");
  const [passwordConfPassed, setPasswordConfPassed] = useState<string>("");
  const [passwordBorderColor, setPasswordBorderColor] =
    useState<string>("#3F4E4F");
  const [passwordConfBorderColor, setPasswordConfBorderColor] =
    useState<string>("#3F4E4F");
  const [passwordChangeResponse, setPasswordChangeResponse] =
    useState<string>("");
  const [logoutButtonState, setLogoutButtonState] = useState<boolean>(false);
  const [logoutSpinner, setLogoutSpinner] = useState<boolean>(false);
  const [logoutRequestError, setLogoutRequestError] = useState<string>("");
  const [timezoneSet, setTimezoneSet] = useState<boolean>(false);
  const [timezoneSpinner, setTimezoneSpinner] = useState<boolean>(false);
  const [timezoneRequestError, setTimezoneRequestError] = useState<string>("");
  const [timezoneSuccessError, setTimezoneSuccessError] = useState<string>("");
  const [reminderRequestSuccess, setReminderRequestSuccess] =
    useState<string>("");
  const [reminderRequestError, setReminderRequestError] = useState<string>("");
  const [reminderSettingsSpinner, setReminderSettingsSpinner] =
    useState<boolean>(false);
  const [lifetimeSpinner, setLifetimeSpinner] = useState<boolean>(false);
  const [subscriptionSpinner, setSubscriptionSpinner] =
    useState<boolean>(false);
  const [adsSpinner, setAdsSpinner] = useState<boolean>(false);
  const [changesDetected, setChangesDetected] = useState<boolean>(false);
  const [timezoneSuccessReport, setTimezoneSuccessReport] =
    useState<string>("");
  const [receiveDesktopCheck, setReceiveDesktopCheck] = useState<boolean>();
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  const passwordConfFieldRef = useRef<HTMLInputElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);

  const { currentUser, toggle, currentMode } = props;

  const triggerFooterVisibility = () => {
    $("#footer").removeClass("user-hidder");
    $("#footer").addClass("user-fade");
  };

  // ---------Logout functions--------- //
  const logoutButtonStateRender = () => {
    if (logoutButtonState === false) {
      return (
        //eslint-disable-next-line
        <button className="edit-button" onClick={() => signOut()}>
          Logout
        </button>
      );
    } else {
      return (
        <Button className="edit-button" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </Button>
      );
    }
  };
  // ---------Timezone functions--------- //
  const timezoneChangeRequest = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    timezoneSpinnerSetter();
  };
  const timezoneSpinnerSetter = () => {
    setTimezoneSpinner(!timezoneSpinner);
  };
  const timezoneSetter = () => {
    setTimezoneSet(true);
  };
  const timezoneButtonSetter = () => {
    if (timezoneSpinner) {
      return (
        <button className="edit-button" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </button>
      );
    } else if (timezoneSet) {
      return (
        <button className="delete-button" type="submit">
          Set Change
        </button>
      );
    } else {
      return (
        <div id="disabledButton" style={{ width: "fit-content" }}>
          <Button className="delete-button" disabled>
            Set Change
          </Button>
          <UncontrolledTooltip placement="top" target="disabledButton">
            Select a timezone to submit!
          </UncontrolledTooltip>
        </div>
      );
    }
  };
  // ---------Reminder Settings functions--------- //
  const reminderSettingsChangeRequest = (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    reminderSettingsSpinnerSetter();
    // eslint-disable-next-line
    const userPhoneNumber = $("#phoneNumberField").val();
  };
  const reminderSettingsSpinnerSetter = () => {
    setReminderSettingsSpinner(!reminderSettingsSpinner);
  };

  const noneStateError = () => {
    if (
      currentUser?.receive_SMS === false &&
      currentUser.receive_email === false
    ) {
      return (
        <div className="text-center" style={{ color: "red", fontSize: "12" }}>
          While allowed, if both email and SMS are disabled, reminders serve no
          purpose!
        </div>
      );
    }
  };

  const reminderSettingsButtonRender = () => {
    if (changesDetected) {
      return (
        <button className="delete-button" type="submit">
          Set Changes
        </button>
      );
    } else {
      return (
        <div id="disabledSettingsButton" style={{ width: "fit-content" }}>
          <Button className="delete-button" disabled>
            Set Changes
          </Button>
          <UncontrolledTooltip placement="top" target="disabledSettingsButton">
            No changes detected
          </UncontrolledTooltip>
        </div>
      );
    }
  };
  const renderDesktopNotificationCheck = () => {
    if (!("Notification" in window)) {
      return (
        <div>
          <Input type="checkbox" id="receiveDesktopCheck" disabled />
          <UncontrolledTooltip
            placement="right"
            target="desktopcheckformdesktopcheckform"
          >
            Your browser does not support desktop notifications
          </UncontrolledTooltip>
        </div>
      );
    } else {
      return (
        <Input
          type="checkbox"
          id="receiveDesktopCheck"
          checked={receiveDesktopCheck}
          disabled
        />
      );
    }
  };

  // ---------Password Change functions--------- //
  const passwordChangeRequest = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newUserPassword = $("#passwordField").val();
    const newUserPasswordConf = $("#passwordConfField").val();
  };
  const checkPasswordInput = () => {
    const currentInput = passwordFieldRef.current?.value;
    const passwordConf = passwordConfFieldRef.current?.value;
    if (currentInput!.length < 8) {
      setPasswordPassed("");
      setPasswordError("Password too short");
      setPasswordBorderColor("red");
    } else if (passwordConf!.length >= currentInput!.length) {
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
  };
  const checkPasswordConfInput = () => {
    checkPasswordInput();
    const currentInput = passwordFieldRef.current?.value;
    const passwordToMatch = passwordConfFieldRef.current?.value;
    if (currentInput!.length < passwordToMatch!.length) {
      setPasswordConfPassed("");
      setPasswordConfError("Passwords must match");
      setPasswordConfBorderColor("red");
    } else if (currentInput !== passwordToMatch) {
      setPasswordPassed("");
      setPasswordError("Passwords must match");
      setPasswordBorderColor("red");
      setPasswordConfPassed("");
      setPasswordConfError("Passwords must match");
      setPasswordConfBorderColor("red");
    } else if (currentInput!.length > 8 && currentInput === passwordToMatch) {
      setPasswordError("");
      setPasswordPassed("Looks good!");
      setPasswordBorderColor("green");
      setPasswordConfError("");
      setPasswordConfPassed("Looks good!");
      setPasswordConfBorderColor("green");
    }
  };
  const passwordChangeButtonSetter = () => {
    if (
      passwordPassed === "Looks good!" &&
      passwordConfPassed === "Looks good!"
    ) {
      return (
        <button className="delete-button" type="submit">
          Set Change
        </button>
      );
    } else {
      return (
        <div id="disabledButton" style={{ width: "fit-content" }}>
          <Button className="delete-button" disabled>
            Set Change
          </Button>
          <UncontrolledTooltip placement="top" target="disabledButton">
            Fill out form to submit!
          </UncontrolledTooltip>
        </div>
      );
    }
  };
  const passwordVisibilitySwitch = () => {
    const input = passwordFieldRef.current;
    if (input && input.type === "password") {
      input.setAttribute("type", "text");
      $("#password-reveal").attr("class", "fa fa-eye fa-lg eye-overlay");
    } else {
      input?.setAttribute("type", "password");
      $("#password-reveal").attr("class", "fa fa-eye-slash fa-lg eye-overlay");
    }
  };
  const passwordConfVisibilitySwitch = () => {
    if (passwordConfFieldRef.current?.type === "password") {
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
  // ---------Stripe functions--------- //
  const openStripeSubscription = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    subscriptionSpinnerToggle();
    // axios({
    //   method: "POST",
    //   url: "/api/stripe/make_subscription/",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": cookie,
    //   },
    // }).then((response) => {
    //   window.location.replace(response.data);
    //   subscriptionSpinnerToggle();
    // });
  };
  const openStripeLifetime = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    lifetimeSpinnerToggle();
    // axios({
    //   method: "POST",
    //   url: "/api/stripe/make_lifetime/",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": cookie,
    //   },
    // }).then((response) => {
    //   window.location.replace(response.data);
    //   lifetimeSpinnerToggle();
    // });
  };
  const lifetimeSpinnerToggle = () => {
    setLifetimeSpinner(!lifetimeSpinner);
  };
  const subscriptionSpinnerToggle = () => {
    setSubscriptionSpinner(!subscriptionSpinner);
  };
  const renderLifetimeButton = () => {
    if (lifetimeSpinner) {
      return (
        <button className="delete-button" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </button>
      );
    } else {
      return (
        <button className="delete-button" type="submit">
          $2.99 - lifetime
        </button>
      );
    }
  };
  const renderSubscriptionButton = () => {
    if (subscriptionSpinner) {
      return (
        <button className="delete-button" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </button>
      );
    } else {
      return (
        <button className="delete-button" type="submit">
          $1.49/yr
        </button>
      );
    }
  };
  const renderEnableAdsButton = () => {
    if (adsSpinner) {
      return (
        <button className="delete-button" disabled>
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </button>
      );
    } else if (currentUser?.user_enabled_ads) {
      return (
        <div>
          <button className="edit-button" type="submit">
            Disable Ads
          </button>
          <br />
          This will disable both ads and premium features, there is also a 2
          week grace period following the enabling of ads where they cannot be
          toggled off. Pressing this button prior to that time will cue them to
          be disabled at the window close.
        </div>
      );
    } else {
      return (
        <div>
          <div id="enable-ads-button" style={{ width: "fit-content" }}>
            <Button className="delete-button" disabled>
              Enable ads
            </Button>
            <br />

            <UncontrolledTooltip placement="bottom" target="enable-ads-button">
              This is in development
            </UncontrolledTooltip>
          </div>
          There is a 2 week grace period following the enabling of ads where
          they cannot be toggled off.
        </div>
      );
    }
  };
  const premiumPageRenderer = () => {
    if (currentUser?.paid_user_type !== "not-paid") {
      if (currentUser?.subscription_end_date !== "") {
        return (
          <div>
            <div className="text-center" style={{ color: "#3f4e4f" }}>
              <br />
              Your subscription renewal date is:
              <br />
              {currentUser?.subscription_end_date}
              <br />
              <hr />
            </div>
            You can cancel the renewel of your subscription at anytime by
            clicking the button below, you will not lose any features until
            after the date shown above.
            <hr />
            <div className="text-center">
              <button className="edit-button">End Subscription</button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="text-center" style={{ color: "#3f4e4f" }}>
            <br />
            Thanks for purchasing lifetime premium! You&apos;ll be able to enjoy
            new features as they come indefinitely!
          </div>
        );
      }
    } else {
      return (
        <div>
          <br />
          <div className="text-center">Paid accounts get the ability to:</div>
          <div className="text-center">
            --Some features have yet to be implemented--
          </div>
          <ul>
            <li>
              Have reminders sent as SMS(text messages) in additon to other
              methods
            </li>
            <li>Reorder reminder/tasks lists</li>
            <li>Customize the color scheme of the website/app</li>
            <li>And more to come!</li>
          </ul>
          <div className="text-center">
            Paid account status is platform independant; it carries between
            website and apps. Additonally there is the option to enable ads to
            get these features.
          </div>
          <hr />
          <ul>
            Pricing options are:
            <li>
              <Form onSubmit={openStripeLifetime}>
                {renderLifetimeButton()}
              </Form>
            </li>
            <li>
              <Form onSubmit={openStripeSubscription}>
                {renderSubscriptionButton()}
              </Form>
            </li>
            <li>
              <Form>{renderEnableAdsButton()}</Form>
            </li>
          </ul>
        </div>
      );
    }
  };
  // ---------Tab render functions--------- //
  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => setTabDisplaySetting("app")}
          className={
            tabDisplaySetting === "app"
              ? "nav-link active- " + tabDisplaySetting
              : "nav-link- " + tabDisplaySetting
          }
        >
          App Settings
        </span>
        <span
          onClick={() => setTabDisplaySetting("user")}
          className={
            tabDisplaySetting === "user"
              ? "nav-link active- " + tabDisplaySetting
              : "nav-link- " + tabDisplaySetting
          }
        >
          User Settings
        </span>
        <span
          onClick={() => setTabDisplaySetting("prem")}
          className={
            tabDisplaySetting === "prem"
              ? "nav-link active- " + tabDisplaySetting
              : "nav-link- " + tabDisplaySetting
          }
        >
          Premium Account
        </span>
      </div>
    );
  };
  const renderEachSettingMode = () => {
    if (tabDisplaySetting === "app") {
      return (
        <div>
          <Form onSubmit={timezoneChangeRequest}>
            <FormGroup>
              <br />
              <Label style={{ fontSize: "18px" }}>Change your timezone: </Label>
              <br />
              <Timezone setTimezone={timezoneSetter} />
              {/* <div className="timezone-passed" id="timezone-tip">
                {timezoneConf}
              </div> */}
            </FormGroup>
            {timezoneButtonSetter()}
            <div
              className="text-center"
              style={{ color: "red", fontSize: "12" }}
            >
              {timezoneRequestError}
            </div>
            <div
              className="text-center"
              style={{ color: "green", fontSize: "12" }}
            >
              {timezoneSuccessReport}
            </div>
          </Form>
          <hr />
          <Form onSubmit={reminderSettingsChangeRequest}>
            <Label style={{ fontSize: "18px" }}>
              Change Reminder Settings:
              <br />
            </Label>
            <FormGroup check>
              <input
                type="checkbox"
                id="emailCheck"
                ref={emailFieldRef}
                checked={currentUser?.receive_email}
              />
              <Label check>Receive Emails</Label>
            </FormGroup>
            <div id="smscheckform" style={{ width: "fit-content" }}>
              <FormGroup check>
                <Label check>Receive SMS (text messages)</Label>
              </FormGroup>
            </div>
            <div id="desktopcheckform" style={{ width: "fit-content" }}>
              <FormGroup check>
                {renderDesktopNotificationCheck()}
                <Label check>Receive Desktop notifications</Label>
              </FormGroup>
            </div>
            {noneStateError()}
            {reminderSettingsButtonRender()}
            <div
              className="text-center"
              style={{ color: "green", fontSize: "12" }}
            >
              {reminderRequestSuccess}
            </div>
            <div
              className="text-center"
              style={{ color: "red", fontSize: "12" }}
            >
              {reminderRequestError}
            </div>
          </Form>
        </div>
      );
    } else if (tabDisplaySetting === "user") {
      return (
        <Form onSubmit={passwordChangeRequest}>
          <br />
          <Label style={{ fontSize: "18px" }}>Password Change</Label>
          <FormGroup style={{ borderRightColor: "#DCD7C9" }}>
            <Label>New Password:</Label>
            <input
              type="password"
              id="passwordField"
              name="passwordField"
              ref={passwordFieldRef}
              placeholder="Minimum of 8 characters"
              onKeyUp={checkPasswordInput}
              minLength={8}
              required
              style={{ borderColor: passwordBorderColor }}
            />
            <button
              tabIndex={100}
              id="password-reveal"
              className="fa fa-eye-slash fa-lg eye-overlay"
              type="button"
              onClick={passwordVisibilitySwitch}
            ></button>
          </FormGroup>
          <div className="input-error">{passwordError}</div>
          <div className="input-passed">{passwordPassed}</div>
          <FormGroup style={{ borderRightColor: "#DCD7C9" }}>
            <Label>Repeat New Password:</Label>
            <Input
              type="password"
              id="passwordConfField"
              name="passwordField"
              placeholder="Minimum of 8 characters"
              onKeyUp={checkPasswordConfInput}
              minLength={8}
              required
              style={{ borderColor: passwordConfBorderColor }}
            />
            <button
              tabIndex={101}
              id="password-reveal-confirmation"
              className="fa fa-eye-slash fa-lg eye-overlay"
              type="button"
              onClick={passwordConfVisibilitySwitch}
            />
          </FormGroup>
          <div className="input-error">{passwordConfError}</div>
          <div className="input-passed">{passwordConfPassed}</div>
          {passwordChangeButtonSetter()}
          <div
            className="text-center"
            style={{ color: "green", fontSize: "12" }}
          >
            {passwordChangeResponse}
          </div>
        </Form>
      );
    } else if (tabDisplaySetting === "prem") {
      return <div>{premiumPageRenderer()}</div>;
    }
  };
  // ---------Master return functions--------- //
  return (
    <Modal
      id="settingsModal"
      isOpen={true}
      toggle={props.toggle}
      style={{ margin: "0 auto", paddingTop: "2em" }}
      className="modals"
    >
      <ModalHeader
        toggle={props.toggle}
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      >
        Settings
      </ModalHeader>
      <Form>
        <div
          style={{
            float: "right",
            paddingRight: "1em",
            textAlign: "right",
          }}
        >
          <Label>
            Logged in As:
            <br /> {currentUser?.email}
          </Label>
          <br />
          {logoutButtonStateRender()}
          <div className="text-center" style={{ color: "red", fontSize: "12" }}>
            {logoutRequestError}
          </div>
        </div>
      </Form>
      <ModalBody style={{ backgroundColor: "#DCD7C9" }}>
        {renderTabList()}
        {renderEachSettingMode()}
      </ModalBody>
      <hr />
      <br />
      <br />
      <ModalFooter
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      ></ModalFooter>
      <Footer isVisible={true} currentMode={currentMode} />
    </Modal>
  );
}
