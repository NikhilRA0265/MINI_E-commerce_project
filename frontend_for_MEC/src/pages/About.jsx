import React from "react";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About i Store</h1>

        <p>
          i Store is a mini e-commerce web application project developed as part of
          the BCA 5th Semester React JS subject.
        </p>

        <p>
          This project demonstrates core concepts of React such as components,
          routing, state management, and UI design for a real-world shopping
          website experience.
        </p>

        <h3>Project Developed By:</h3>
        <ul>
          <li>Himanshu Mittal</li>
          <li>S Nikhil Rao</li>
          <li>Nehad Masood</li>
        </ul>

        <p className="college-text">
          We are students of Galgotias University, currently pursuing BCA (Final Year).
        </p>
      </div>
    </div>
  );
}
