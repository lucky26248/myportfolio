import React from "react";
import Slider from "react-slick";
import { Album } from "./Resource";
import Gemini from "../Gemini";

const Dashboard = () => {
  const settings = {
    dots: window.innerWidth < 768 ? false : true, //handling the dots
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of items visible
    slidesToScroll: 1, // Number of items to scroll at a time
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  console.log(Album);

  return (
    <div style={{ margin: "20px" }}>
      <div className="text-4xl font-bold neon-glow mb-3 text-center">
        <Gemini
          message="Favorite Spots: Traveled and Dreamt"
          fontSize={window.innerWidth > 768 ? 24 : 16}
        />
      </div>

      <Slider {...settings}>
        {Album.map((place, index) => (
          <div style={{ margin: "10px" }}>
            <div key={index} style={{ padding: "10px" }}>
              <div
                style={{
                  height: "200px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                  backgroundImage: `url(${place.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  style={{
                    bottom: "0",
                    width: "100%",
                    height: "70%",
                    overflow: "hidden",
                  }}
                ></div>
                <div
                  className="bg-gray-700"
                  style={{
                    padding: "5px",
                    paddingLeft: "10px",
                    height: "30%",
                  }}
                >
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                    }}
                  >
                    {place.title}
                  </div>
                  <p className="text-gray-400" style={{ fontSize: "12px" }}>
                    {place.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Dashboard;
