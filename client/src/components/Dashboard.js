import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Particles from "react-particles-js";
import Navbar from "./Navbar";
import Overview from "./Overview";
import Scores from "./Scores";
import Attendance from "./Attendance";
import UserInfoCard from "./UserInfoCard";
import axios from "axios";

function Dashboard() {
  const [studentData, setStudentData] = useState({});
  const [didFetchData, setDidFetchData] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/student/getData");
      setStudentData(res.data.userData);
      setDidFetchData(true);
    };

    fetchData();
  }, [didFetchData]);

  const setComponent = activeItem => {
    if (activeItem === "Home") return <Overview studentData={studentData} />;
    // to be implemented
    else if (activeItem === "Scores")
      return <Scores studentData={studentData} />;
    // to be implemented
    else if (activeItem === "Attendance")
      return <Attendance studentData={studentData} />;
    else if (activeItem === "Account")
      return <UserInfoCard studentData={studentData} />;
  };

  const component = setComponent(activeItem);
  const particleParams = {
	fps_limit: 28,
	particles: {
	  number: {
		value: 200,
		density: {
		  enable: false
		}
	  },
	  line_linked: {
		enable: true,
		distance: 30,
		opacity: 0.4
	  },
	  move: {
		speed: 1
	  },
	  opacity: {
		anim: {
		  enable: true,
		  opacity_min: 0.05,
		  speed: 2,
		  sync: false
		},
		value: 0.4
	  }
	},
	polygon: {
	  enable: true,
	  scale: 0.5,
	  type: "inline",
	  move: {
		radius: 10
	  },
	  url: "/deer.svg",
	  inline: {
		arrangement: "equidistant"
	  },
	  draw: {
		enable: true,
		stroke: {
		  color: "rgba(255, 255, 255, .2)"
		}
	  }
	},
	retina_detect: false,
	interactivity: {
	  events: {
		onhover: {
		  enable: true,
		  mode: "bubble"
		}
	  },
	  modes: {
		bubble: {
		  size: 6,
		  distance: 40
		}
	  }
	}
  }

  if (didFetchData === false)
    return (
      <div>
        <Dimmer active>
          <Particles
            params={particleParams} height='100vh'
          />
        </Dimmer>
      </div>
    );
  else
    return (
      <div>
        <Navbar
          name={studentData.fullname}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {component}
      </div>
    );
}

export default Dashboard;
