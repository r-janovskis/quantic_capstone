import { useState } from "react";

import Header from "../Header/Header";

import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>
        <h1>Quantic Capstone Project Home Page</h1>
      </main>
    </>
  );
}

export default Home;
