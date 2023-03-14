const currentYear = new Date().getFullYear();

export default function Footer(props: {
  isVisible: boolean;
  currentMode: string;
}) {
  if (props.isVisible) {
    return (
      <div
        className={
          props.currentMode === "Tasks" ? "copyright" : "copyright-reminder"
        }
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
        Michael Freno &copy;{" 2022-"}
        {currentYear}
      </div>
    );
  } else {
    return (
      <div
        className={
          props.currentMode === "Tasks"
            ? "copyright user-hidder"
            : "copyright-reminder user-hidder"
        }
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
        Michael Freno &copy;{" 2022-"}
        {currentYear}
      </div>
    );
  }
}
