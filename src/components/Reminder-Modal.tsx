import React, { Component, useRef, useState } from "react";
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
  InputGroup,
  InputGroupText,
  Spinner,
} from "reactstrap";
import Datetime from "react-datetime";
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { Reminder } from "@prisma/client";

export default function CustomModal(props: {
  activeReminder: Reminder;
  toggle: () => void;
  userList: Reminder[] | null;
  time: Date;
}) {
  const [reminderSpinner, setReminderSpinner] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [dateErrorReport, setDateErrorReport] = useState("");
  const datetimeModuleRef = useRef<any>(null);
  const [activeReminder, setActiveReminder] = useState(props.activeReminder);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const disablePastDate = (current: any) => {
    const yesterday = moment().subtract(1, "day");
    //eslint-disable-next-line
    return current.isAfter(yesterday) as boolean;
  };

  const inputPlaceholderSetter = () => {
    return {
      id: "datetimeModule",
      placeholder: "12/31/2022 12:00 AM",
    };
  };
  const reminderSubmitRequest = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const item = props.activeReminder;
    spinnerSetter();
    // const datetime = datetimeModuleRef.current?.value.split(" ");
    // item.time = datetime[0];
    // item.time = datetime[1] + " " + datetime[2];
    if (item.id) {
    } else if ($("#datetimeModule").val() !== "") {
    } else {
      setReminderSpinner(false);
      setDateErrorReport("is needed for Reminders.");
    }
  };
  const spinnerSetter = () => {
    setReminderSpinner(!reminderSpinner);
  };
  const saveButtonSetter = () => {
    if (reminderSpinner) {
      return (
        <Button
          className="add-button-reminder"
          disabled
          style={{ float: "right", paddingRight: "1em", textAlign: "right" }}
        >
          Loading
          <Spinner size="sm">Loading...</Spinner>
        </Button>
      );
    } else {
      return (
        <Button
          tabIndex={4}
          className="add-button-reminder"
          type="submit"
          style={{ float: "right", paddingRight: "1em", textAlign: "right" }}
        >
          Save
        </Button>
      );
    }
  };
  return (
    <Modal
      isOpen={true}
      toggle={props.toggle}
      style={{ paddingBottom: "0em", margin: "0 auto", paddingTop: "3em" }}
      className="modals"
    >
      <ModalHeader
        toggle={props.toggle}
        style={{ backgroundColor: "#DCD7C9", borderColor: "#DCD7C9" }}
      >
        Reminder
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#DCD7C9", paddingBottom: "0em" }}>
        <Form onSubmit={reminderSubmitRequest}>
          <FormGroup>
            <Label for="reminder-title">Title</Label>
            <input
              tabIndex={1}
              style={{ backgroundColor: "#DCD7C9", borderColor: "#3F4E4F" }}
              type="text"
              id="reminder-title"
              name="title"
              required
              value={activeReminder.title}
              onChange={(e) => (activeReminder.title = e.target.value)}
              placeholder="Enter Reminder Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="reminder-description">Description</Label>
            <textarea
              tabIndex={2}
              style={{ backgroundColor: "#DCD7C9", borderColor: "#3F4E4F" }}
              id="reminder-description"
              name="description"
              rows={4}
              required
              value={activeReminder.description}
              onChange={(e) => (activeReminder.description = e.target.value)}
              placeholder="Enter Reminder Description"
            />
          </FormGroup>
          <Label for="reminder-Time-Select">Select Reminder Time</Label>
          <InputGroup>
            <InputGroupText>
              <span className="fa fa-calendar"></span>
            </InputGroupText>
            <Datetime ref={datetimeModuleRef} isValidDate={disablePastDate} />
            <div style={{ color: "red" }}>{dateErrorReport}</div>
          </InputGroup>
          {saveButtonSetter()}
        </Form>
      </ModalBody>
      <ModalFooter
        style={{
          backgroundColor: "#DCD7C9",
          borderColor: "#DCD7C9",
          paddingBottom: "0em",
        }}
      >
        <div style={{ color: "red" }}>{requestError}</div>
      </ModalFooter>
    </Modal>
  );
}
