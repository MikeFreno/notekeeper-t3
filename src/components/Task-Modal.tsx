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
  Spinner,
} from "reactstrap";
import axios from "axios";
import { Task } from "@prisma/client";

export default function TaskModal(props: {
  activeTask: Task;
  userList: Task[] | null;
  toggle: () => void;
}) {
  const [activeTask, setActiveTask] = useState<Task>(props.activeTask);
  const [taskSpinner, setTaskSpinner] = useState(false);
  const [requestError, setRequestError] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const completedInputRef = useRef<HTMLInputElement>(null);

  const taskSubmitRequest = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const item = activeTask;
    spinnerSetter();
    if (item.id) {
      if (item.completed === true) {
      }
    } else {
    }
  };

  const spinnerSetter = () => {
    setTaskSpinner(!taskSpinner);
  };
  const saveButtonSetter = () => {
    if (taskSpinner) {
      return (
        <Button
          className="add-button"
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
          className="add-button"
          type="submit"
          style={{ float: "right", paddingRight: "1em", textAlign: "right" }}
        >
          Save
        </Button>
      );
    }
  };

  const handleTitleChange = () => {
    activeTask.title = titleInputRef.current?.value as string;
  };

  const handleDescriptionChange = () => {
    activeTask.description = descriptionInputRef.current?.value as string;
  };

  const handleCompletionChange = () => {
    activeTask.completed = !activeTask.completed;
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
        Task
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#DCD7C9", paddingBottom: "0em" }}>
        <Form onSubmit={taskSubmitRequest}>
          <FormGroup>
            <Label for="task-title">Title</Label>
            <input
              style={{ backgroundColor: "#DCD7C9", borderColor: "#3F4E4F" }}
              type="text"
              id="task-title"
              name="title"
              ref={titleInputRef}
              value={activeTask.title}
              onChange={handleTitleChange}
              placeholder="Enter Task Title"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="task-description">Description</Label>
            <textarea
              style={{
                backgroundColor: "#DCD7C9",
                borderColor: "#3F4E4F",
                whiteSpace: "pre-wrap",
              }}
              className=""
              id="task-description"
              name="description"
              rows={4}
              required
              ref={descriptionInputRef}
              value={activeTask.description}
              onChange={handleDescriptionChange}
              placeholder="Enter Task Description"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <input
                id="taskcheck"
                type="checkbox"
                name="completed"
                ref={completedInputRef}
                checked={activeTask.completed}
                onChange={handleCompletionChange}
              />
              Completed
            </Label>
          </FormGroup>
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
