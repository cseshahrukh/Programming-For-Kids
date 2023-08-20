import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div>
        <Navbar />
      </div>
      <div style={{ marginBottom: '250px' }}>
        <h1 style={{margin:"30px",marginTop:"80px"}}>
          To Add:
        </h1>
        <ul>
          <li style={{margin:"30px",marginTop:"20px"}}>
            Fix what will be present at the top pane
          </li>
          <li style={{margin:"30px",marginTop:"20px"}}>
            Finish add courses
          </li>
          <li style={{margin:"30px",marginTop:"20px"}}>
            Fix what will be present at the top pane
          </li>
          <li style={{margin:"30px",marginTop:"20px"}}>
            Fix what will be present at the top pane
          </li>
        </ul>
      </div>

      <div style={{ flex: '1' }}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
