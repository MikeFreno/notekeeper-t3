import React, { Component, useEffect, useState } from "react";
import TaskModal from "@/components/Task-Modal";
import ReminderModal from "@/components/Reminder-Modal";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import LoginModal from "@/components/LoginModal";
import {
  FormGroup,
  Input,
  Label,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { pulse, rotateIn } from "react-animations";
import UserSettings from "@/components/userSettings";
import RegistrationModal from "@/components/registrationModal";
import PasswordResetModal from "@/components/passwordReset";
import Footer from "@/components/Footer";
import { Reminder, Task, User } from "@prisma/client";
import { api } from "@/utils/api";
import { useSession, signOut } from "next-auth/react";
import $ from "jquery";
import Link from "next/link";

type FullUserData = User & {
  tasks: Task[];
  reminders: Reminder[];
};

export default function App() {
  const [currentMode, setCurrentMode] = useState<string>("Tasks");
  const [spanSetting, setSpanSetting] = useState<string>("");
  const [viewCompleted, setViewCompleted] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [registrationModal, setRegistrationModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [taskModal, setTaskModal] = useState<boolean>();
  const [userSettingsModal, setUserSettingsModal] = useState<boolean>(false);
  const [userModals, setUserModals] = useState<boolean>(false);
  const [loginStatusFlash, setLoginStatusFlash] = useState<string>("");
  const [userKey, setUserKey] = useState<string>("");
  const [successReporterText, setSuccessReporterText] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const getCurrentUser = api.user.getCurrentUser.useQuery();
  const [currentUser, setCurrentUser] = useState<
    User & {
      Tasks: Task[];
      Reminders: Reminder[];
    }
  >();
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false);
  const [refreshButtonState, setRefreshButtonState] = useState<boolean>(false);
  const [userTaskOrder, setUserTaskOrder] = useState<Task[] | null>(null);
  const [userReminderOrder, setUserReminderOrder] = useState<Reminder[] | null>(
    null
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (getCurrentUser) {
      setCurrentUser(getCurrentUser.data!);
    }
  }, [getCurrentUser]);

  useEffect(() => {
    setTimeout(() => {
      $("body").removeClass("is-preload");
    }, 100);
    setTimeout(() => {
      $("#userIcon").removeClass("user-hidder");
      $("#footer").removeClass("user-hidder");
      $("#userIcon").addClass("user-fade");
      $("#footer").addClass("user-fade");
      $("#userIcon").addClass("buzz");
    }, 1200);
    setTimeout(() => {
      $("#userIcon").removeClass("user-fade");
      $("#footer").removeClass("user-fade");
      $("#userIcon").removeClass("buzz");
    }, 2500);
  }, []);

  useEffect(() => {
    if (currentUser?.user_reminder_order) {
      const string_array = currentUser?.user_reminder_order.split("");
      const reminder_array = currentUser.Reminders.filter((r) =>
        string_array.includes(r.id)
      ).map((r) => r);
      setUserReminderOrder(reminder_array);
    }
    if (currentUser?.user_task_order) {
      const string_array = currentUser?.user_task_order.split("");
      const task_array = currentUser.Tasks.filter((t) =>
        string_array.includes(t.id)
      ).map((r) => r);
      setUserTaskOrder(task_array);
    }
  }, [currentUser]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
    setPasswordResetModal(false);
    setRegistrationModal(false);
    setLoginStatusFlash("");
  };
  const toggleRegisterModal = () => {
    setRegistrationModal(!registrationModal);
    setLoginModal(false);
  };
  const toggleUserSettingsModal = () => {
    setUserSettingsModal(!userSettingsModal);
    setLoginModal(false);
    setRegistrationModal(false);
  };
  const toggleResetPasswordModal = () => {
    setPasswordResetModal(!passwordResetModal);
    setLoginModal(false);
  };
  const handleTaskDelete = (task: Task) => {
    return "";
  };
  const handleReminderDelete = (reminder: Reminder) => {
    // }).then((res) => {
    //   const updatedArray = userMappedReminders.filter(
    //     (num) => num !== item.id
    //   );
    //   const idArray = updatedArray.map((obj) => obj.id);
    //   setState({ userMappedReminders: updatedArray });
    //   axios({
    //     method: "patch",
    //     url: `/api/users/${userID}/`,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": cookie,
    //     },
    //     user_reminder_order: idArray,
    //   })
    //     .then(() => {
    //       refreshReminderList();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
  };
  // const createTaskItem = () => {};

  // const createReminderItem = () => {};

  const editTaskItem = (task: Task) => {
    setActiveTask(task);
    setModal(true);
  };

  const editReminderItem = (reminder: Reminder) => {
    setActiveReminder(reminder);
    setModal(true);
  };

  const displayCompleted = (status: boolean) => {
    if (status) {
      return setViewCompleted(true);
    }

    return setViewCompleted(false);
  };

  const deleteConfirmShow = (itemId: string) => {
    if (
      document.getElementById("true-delete" + itemId)?.className ===
      "show-true-delete"
    ) {
      $("#true-delete" + itemId).attr("class", "hidden-true-delete");
    } else {
      $("#true-delete" + itemId).attr("class", "show-true-delete");
    }
  };

  const swapSetting = () => {
    if (currentMode === "Tasks") {
      setCurrentMode("Reminders");
      setSpanSetting("reminder");
    } else {
      setCurrentMode("Tasks");
      setSpanSetting("");
    }
  };

  const addButtonRender = () => {
    if (currentMode === "Tasks") {
      if (status === "authenticated") {
        return (
          <Button
            className="btn btn-primary add-button hvr-shadow"
            id="add_button"
            // onClick={createTaskItem}
          >
            Add Task
          </Button>
        );
      } else {
        return (
          <div id="disabledButton" style={{ width: "fit-content" }}>
            <Button
              className="btn btn-primary add-button hvr-shadow"
              id="add_button"
              disabled
            >
              Add Task
            </Button>
            <UncontrolledTooltip placement="right" target="disabledButton">
              Log in to add Tasks!
            </UncontrolledTooltip>
          </div>
        );
      }
    } else {
      if (status == "authenticated") {
        return (
          <Button
            className="btn btn-primary add-button-reminder hvr-shadow"
            id="add_button"
            // onClick={createReminderItem}
          >
            Add Reminder
          </Button>
        );
      } else {
        return (
          <div id="disabledButton" style={{ width: "fit-content" }}>
            <Button
              className="btn btn-primary add-button-reminder hvr-shadow"
              id="add_button"
              disabled
            >
              Add Reminder
            </Button>
            <UncontrolledTooltip placement="right" target="disabledButton">
              Log in to add Reminders!
            </UncontrolledTooltip>
          </div>
        );
      }
    }
  };
  const renderArrowSorter = (n: Task | Reminder) => {
    if (
      currentUser?.paid_user_type !== "not-paid" ||
      currentUser?.user_enabled_ads
    ) {
      const n_index = userTaskOrder?.indexOf(n);
      if (currentMode === "Reminders") {
        if (n_index === 0 || n.completed === false)
          return (
            <ul className="arrows">
              <li className="arrow-item">
                <button
                  className="fa fa-arrow-up arrow-reminder hvr-grow"
                  id="arrow-tag"
                  onClick={() => moveUp(n as Reminder, currentMode)}
                />
              </li>
              <li className="arrow-item">
                <button
                  className="fa fa-arrow-down arrow-reminder hvr-grow"
                  id="arrow-tag"
                  onClick={() => moveDown(n as Reminder, currentMode)}
                />
              </li>
            </ul>
          );
      } else {
        return (
          <ul className="arrows">
            <li className="arrow-item">
              <button
                className="fa fa-arrow-up arrow hvr-grow"
                id="arrow-tag"
                onClick={() => moveUp(n as Task, currentMode)}
              />
            </li>
            <li className="arrow-item">
              <button
                className="fa fa-arrow-down arrow hvr-grow"
                id="arrow-tag"
                onClick={() => moveDown(n as Task, currentMode)}
              />
            </li>
          </ul>
        );
      }
    } else {
      return "";
    }
  };
  const moveUp = (item: Reminder | Task, state: string) => {
    if (userTaskOrder) {
      if (state === "Tasks") {
        const index = userTaskOrder?.indexOf(item);
        // If the item is not the first item, move it up in the array
        if (index && index > 0) {
          const newOrder = [...userTaskOrder];
          newOrder.splice(index, 1);
          newOrder.splice(index - 1, 0, item);
          setUserTaskOrder(newOrder);
          const stringed = newOrder.join("").replace(/\s/g, "");
          // axios({
          //   method: "PATCH",
          //   url: `/api/users/${userID}/`,
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //     "X-CSRFToken": cookie,
          //   },
          //   data: {
          //     user_task_order: idArray,
          //   },
          // });
        }
      } else if (userReminderOrder && state === "Reminders") {
        const index = userReminderOrder.indexOf(item as Reminder);
        // If the item is not the first item, move it up in the array
        if (userReminderOrder && index > 0) {
          const newOrder = [...userReminderOrder];
          newOrder.splice(index, 1);
          newOrder.splice(index - 1, 0, item as Reminder);
          setUserReminderOrder(newOrder);
          const stringed = newOrder.join("").replace(/\s/g, "");
          // axios({
          //   method: "PATCH",
          //   url: `/api/users/${userID}/`,
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //     "X-CSRFToken": cookie,
          //   },
          //   data: {
          //     user_reminder_order: idArray,
          //   },
          // });
        }
      }
    }
  };
  const moveDown = (item: Reminder | Task, state: string) => {
    if (userTaskOrder && state === "Tasks") {
      const index = userTaskOrder?.indexOf(item);
      // If the item is not the first item, move it up in the array
      if (index < userTaskOrder.length - 1) {
        const newOrder = [...userTaskOrder];
        newOrder.splice(index, 1);
        newOrder.splice(index + 1, 0, item);
        setUserTaskOrder(newOrder);
        const stringed = newOrder.join("").replace(/\s/g, "");
        // axios({
        //   method: "PATCH",
        //   url: `/api/users/${userID}/`,
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //     "X-CSRFToken": cookie,
        //   },
        //   data: {
        //     user_task_order: idArray,
        //   },
        // });
      }
    } else if (userReminderOrder && state === "Reminders") {
      const index = userReminderOrder.indexOf(item as Reminder);
      // If the item is not the last item, move it down in the array
      if (index < userReminderOrder.length - 1) {
        // eslint-disable-next-line
        const newOrder = [...userReminderOrder];
        newOrder.splice(index, 1);
        newOrder.splice(index + 1, 0, item as Reminder);
        setUserReminderOrder(newOrder);
        const stringed = newOrder.join("").replace(/\s/g, "");
        // axios({
        //   method: "PATCH",
        //   url: `/api/users/${userID}/`,
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //     "X-CSRFToken": cookie,
        //   },
        //   data: {
        //     user_reminder_order: idArray,
        //   },
        // });
      }
    }
  };
  const renderItems = () => {
    const RotateP = styled.p`
      animation: ${keyframes`${rotateIn}`} 1s;
    `;
    if (currentMode === "Tasks") {
      const newItems = userTaskOrder?.filter(
        (item) => item.completed === viewCompleted
      );
      // Tasks mode
      return newItems?.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {renderArrowSorter(item)}
          <span
            style={{
              color: "#A27B5C",
              maxWidth: "50%",
              display: "min-content",
            }}
            className={`task-title mr-2 ${
              viewCompleted ? "completed-task" : ""
            }`}
            title={item.description}
          >
            {item.title}
          </span>
          <span
            style={{
              textAlign: "right",
              width: "fitContent",
              marginRight: "-1em",
            }}
          >
            <button
              className="edit-button hvr-shadow"
              onClick={() => editTaskItem(item)}
            >
              Edit
            </button>
            <button
              className="delete-button hvr-shadow"
              onClick={() => deleteConfirmShow(`${item.id}`)}
            >
              Delete
            </button>
            <button
              id={`true-delete${item.id}`}
              className="hidden-true-delete"
              onClick={() => handleTaskDelete(item)}
              style={{ height: "1em" }}
            >
              <RotateP>
                <i className="fa fa-minus-square" aria-hidden="true" />
              </RotateP>
            </button>
          </span>
        </li>
      ));
      // Reminder Mode
    } else {
      const newItems = userReminderOrder?.filter(
        (item) => item.completed === viewCompleted
      );
      return newItems?.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ marginRight: "-1em" }}
        >
          {renderArrowSorter(item)}
          <span
            style={{
              color: "#3f4e4f",
              maxWidth: "50%",
              display: "fit-content",
            }}
            className={`mr-2 ${viewCompleted ? "completed-task" : ""}`}
            title={item.description}
          >
            {item.title}
          </span>
          <span style={{ textAlign: "right", width: "fitContent" }}>
            <button
              className="edit-button-reminder hvr-shadow"
              onClick={() => editReminderItem(item)}
            >
              Edit
            </button>
            <button
              className="delete-button-reminder hvr-shadow"
              onClick={() => deleteConfirmShow(`${item.id}`)}
            >
              Delete
            </button>
            <button
              id={`true-delete${item.id}`}
              className="hidden-true-delete"
              onClick={() => handleReminderDelete(item)}
              style={{ height: "1em" }}
            >
              <RotateP>
                <i className="fa fa-minus-square" aria-hidden="true" />
              </RotateP>
            </button>
          </span>
        </li>
      ));
    }
  };

  const modalSetter = () => {
    if (currentMode === "Tasks") {
      return modal && activeTask ? (
        <TaskModal
          activeTask={activeTask}
          toggle={toggle}
          userList={userTaskOrder}
        />
      ) : null;
    } else {
      return modal && activeReminder ? (
        <ReminderModal
          activeReminder={activeReminder}
          toggle={toggle}
          time={activeReminder.time}
          userList={userReminderOrder}
        />
      ) : null;
    }
  };
  const successReporter = (report: string) => {
    if (report === "logout") {
      setSuccessReporterText("Logout Successful!");
    } else if (report === "register") {
      setSuccessReporterText("Registration Successful!");
    } else {
      setSuccessReporterText("Login Successful!");
    }
    setTimeout(() => {
      $("#successReport").addClass("fadeOut");
    }, 3000);
    setTimeout(() => {
      setSuccessReporterText("");
      $("#successReport").removeClass("fadeOut");
    }, 5000);
  };

  const footerRender = () => {
    if (status === "authenticated") {
      return null;
    } else {
      return <Footer isVisible={true} currentMode={currentMode} />;
    }
  };
  const userModalSetter = () => {
    if (status == "authenticated" && userSettingsModal) {
      return (
        <UserSettings
          toggle={toggleUserSettingsModal}
          currentUser={currentUser}
          currentMode={currentMode}
        />
      );
    } else if (loginModal) {
      return (
        <LoginModal
          toggle={toggleLoginModal}
          loginStatusFlash={loginStatusFlash}
          registrationToggle={toggleRegisterModal}
          resetPasswordToggle={toggleResetPasswordModal}
        />
      );
    } else if (registrationModal) {
      return (
        <RegistrationModal
          toggle={toggleRegisterModal}
          logInToggle={toggleLoginModal}
        />
      );
    } else if (passwordResetModal) {
      return (
        <PasswordResetModal
          toggle={toggleResetPasswordModal}
          loginToggle={toggleLoginModal}
        />
      );
    }
  };
  const userIconClick = () => {
    if (status === "authenticated") {
      toggleUserSettingsModal();
    } else {
      toggleLoginModal();
    }
  };

  const PulseDiv = styled.div`
    animation: ${keyframes`${pulse}`} 2s;
  `;

  return (
    <>
      <div
        className={`is-preload min-h-screen transition-colors duration-300 ${
          currentMode === "Tasks" ? "body" : "body-reminder"
        }`}
        id="index"
      >
        <div className="index" id="page">
          <div className="cd-intro-content">
            <button
              className={` ${
                currentMode === "Tasks" ? "user" : "user-reminder"
              } hvr-grow-rotate fa fa-user-circle-o fa-2x absolute right-24 mt-8 md:right-36`}
              id="userIcon"
              onClick={userIconClick}
            />
            <Link href="/" id="back" className="absolute pt-6 pl-6">
              <i
                className={`${
                  currentMode === "Tasks" ? "backIcon" : "backIcon-reminder"
                } fa fa-chevron-circle-left fa-2x  hvr-grow`}
                id="backIcon"
              />
            </Link>
            <main className="container">
              <h1
                className={`${
                  currentMode === "Tasks" ? "" : "reminder"
                } py-4 text-center text-3xl`}
                id="title"
                style={{
                  color: currentMode === "Tasks" ? "#A27B5C" : "#3F4E4F",
                }}
              >
                Keeper
              </h1>
              <div className="row">
                <div
                  className="col-lg-6 col-md-8 col-sm-10 mx-auto"
                  style={{ paddingBottom: "2em" }}
                >
                  <PulseDiv>
                    <div
                      className="text-center"
                      id="successReport"
                      style={{
                        color: currentMode === "Tasks" ? "#A27B5C" : "#3F4E4F",
                      }}
                    >
                      {successReporterText}
                    </div>
                  </PulseDiv>
                  <div
                    className="card"
                    id="card"
                    style={{
                      padding: "2em 1.35em 2.5em 1.35em",
                      borderRadius: "1em",
                    }}
                  >
                    <FormGroup switch>
                      <Input
                        id="mainSwitch"
                        type="switch"
                        role="switch"
                        onClick={swapSetting}
                      />
                      <Label
                        className={
                          currentMode === "Tasks"
                            ? "showing-font"
                            : "showing-font-reminder"
                        }
                        id="showing"
                        check
                      >
                        Showing: {currentMode}
                      </Label>
                    </FormGroup>
                    <div className="mb-2">{addButtonRender()}</div>
                    <div className="nav nav-tabs">
                      <span
                        onClick={() => displayCompleted(true)}
                        className={
                          viewCompleted
                            ? `nav-link active-${spanSetting}`
                            : `nav-link-${spanSetting}`
                        }
                      >
                        Complete
                      </span>
                      <span
                        onClick={() => displayCompleted(false)}
                        className={
                          viewCompleted
                            ? `nav-link-${spanSetting}`
                            : `nav-link active-${spanSetting}`
                        }
                      >
                        Incomplete
                      </span>
                    </div>
                    <ul className="list-group list-group-flush border-top-0">
                      {renderItems()}
                    </ul>
                  </div>
                </div>
              </div>
              {modalSetter()}
              {userModalSetter()}
            </main>
          </div>
        </div>
        {footerRender()}
      </div>
      <div id="bg"></div>
      <div id="root"></div>
    </>
  );
}
