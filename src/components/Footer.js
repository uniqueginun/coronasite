import React from "react";

export default function Footer() {
  return (
    <div className="row">
      <div className="col-md-12">
        <h3 className="text-center">تواصل مع المطور</h3>
        <hr />
        <div className="well text-center center-block">
          <p className="txt-railway">- uniqueginun@gmail.com -</p>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/othman.mohammed.98434"
          >
            <i
              id="social-fb"
              className="fa fa-facebook-square fa-3x social"
            ></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/oson70"
          >
            <i id="social-tw" className="fa fa-twitter-square fa-3x social"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/uniqueginun/"
          >
            <i id="social-gp" className="fa fa-github-square fa-3x social"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:uniqueginun@gmail.com"
          >
            <i
              id="social-em"
              className="fa fa-envelope-square fa-3x social"
            ></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/uniqueginun"
          >
            <i
              id="social-fb"
              className="fa fa-linkedin-square fa-3x social"
            ></i>
          </a>
        </div>
        <hr />
      </div>
    </div>
  );
}
