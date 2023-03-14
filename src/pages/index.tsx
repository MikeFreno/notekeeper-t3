import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import StageBanner from "@/components/StageBanner";

export default function Home() {
  // useEffect(() => {
  //   const popoverTriggerList = document.querySelectorAll(
  //     '[data-bs-toggle="popover"]'
  //   );
  //   const popoverList = [...popoverTriggerList].map(
  //     (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  //   );
  // }, []);

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

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <div id="index" className="body is-preload min-h-screen text-[#dcd7c9]">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed w-screen">
          <div className="container-fluid">
            <div className="navbar-brand pointer-events-none select-none">
              <Image
                src="/Keeper logo.png"
                alt="keeper-logo"
                width={30}
                height={30}
              />
              <div className="mt-1 inline-block text-[#a27b5c]">Keeper</div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button
                    className="nav-link mt-1"
                    data-bs-container="body"
                    data-bs-toggle="popover"
                    data-bs-custom-className="custom-popover"
                    data-bs-placement="bottom"
                    data-bs-content="Coming Soon"
                  >
                    Downloads Page
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="delete-button text-white" href={"/app"}>
                    Web App
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="pt-24">
          <StageBanner />
        </div>
        <div className="relative z-[-1]">
          <img
            src="/Keeper no border.png"
            alt="keeper-full"
            className="pointer-events-none absolute z-[-1] w-[9/10] select-none justify-center opacity-[.05]"
          />
        </div>
        <div className="z-[2] pt-[20vh] text-center">
          <h1>
            Manage your tasks,
            <br />
            <div id="title text-[#a27b5c]">beautifully</div>
          </h1>
          <h4>
            Manage tasks and receive reminders <br />
            any way you want.
          </h4>
          <Link
            className="edit-button-reminder hvr-grow-slow bg-transparent pl-[6vw] pr-[6vw] text-xl"
            href={"/app"}
          >
            Get Started
          </Link>
        </div>
        <div className="carousel-container mx-auto mt-[10vh] w-[60vw]">
          <div
            id="carousel"
            className="carousel slide carousel-dark carousel-fade"
            data-bs-ride="false"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carousel"
                data-bs-slide-to="0"
                className="active h-4 w-4 rounded-full"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
                className="h-4 w-4 rounded-full"
              />
              <button
                type="button"
                data-bs-target="#carousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                className="h-4 w-4 rounded-full"
              />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="{% static 'Make Task.png' %}"
                  className="d-block carousel-img mx-auto"
                  alt="making tasks"
                />
                <div className="carousel-caption d-none d-lg-block">
                  <h5>Create Tasks</h5>
                  <p>These are simple check-list items.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/Make Reminder.png'"
                  className="d-block carousel-img mx-auto"
                  alt="making reminders"
                />
                <div className="carousel-caption d-none d-lg-block">
                  <h5>Create Reminders</h5>
                  <p>Reminders will send you notifications, emails, or SMS</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/'Showing Tasks.png'"
                  className="d-block carousel-img mx-auto"
                  alt="showing tasks"
                />
                <div className="carousel-caption d-none d-lg-block">
                  <p>
                    Emails and Reminders laid out by time of creation, or
                    re-ordered as you like
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon text-[#3f4e4f]"
                aria-hidden="true"
              />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div
          className="copyright-index user-hidder absolute bottom-0"
          id="footer"
        >
          <div className="container">
            <div className="row text-center">
              <ul className="icons">
                <li>
                  <a
                    href="https://github.com/MikeFreno/"
                    className="fa fa-github hvr-grow-rotate"
                  >
                    <span className="icon-tag">Github Link</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:mike@notesapp.net"
                    className="fa fa-envelope hvr-grow"
                  >
                    <span className="icon-tag">email Link</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/michael-freno-176001256/"
                    className="fa fa-linkedin hvr-grow-rotate-left"
                  >
                    <span className="icon-tag">linkedin Link</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          Michael Freno &copy;2022-2023
        </div>
      </div>
    </>
  );
}
