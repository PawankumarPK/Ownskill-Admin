import { useState } from "react";
import welcomeImage from "../imgs/welcome.png";
import CourseOverview from "./courseOverview.component";
import Curriculum from "./curriculum.component";
import Review from "./reviews.component";
import Instructor from "./instructor.component";
import TeamMember from "./teamMember.component";

const SidePanel = () => {
  const topicArr = [
    "Course Overview",
    "Curriculum",
    "Reviews",
    "Instructor",
    "Add Team Member",
  ];

  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicClick = (index) => {
    setSelectedTopic(index);
    setTranslateCSS(false);
  };

  const renderSelectedComponent = () => {
    switch (selectedTopic) {
      case 0:
        return <CourseOverview />;
      case 1:
        return <Curriculum />;
      case 2:
        return <Review />;
      case 3:
        return <Instructor />;
      case 4:
        return <TeamMember />;
      default:
        return (
          <img className="w-1/2 h-1/2 object-contain" src={welcomeImage} />
        );
    }
  };

  const [translateCSS, setTranslateCSS] = useState(false);

  return (
    <>
      <button
        className="absolute right-4 top-5 btn-dark md:hidden"
        onClick={() => setTranslateCSS(!translateCSS)}
      >
        Menu
      </button>
      <div className="flex w-screen h-screen py-2">
        <div
          className={
            "border-solid border-dark-grey border-4 w-[20%] h-full max-md:absolute max-md:bg-white max-md:w-[50%] mx-2 max-lg:w-[25%] max-md:duration-700 max-md:h-full z-50 " +
            (translateCSS
              ? "max-md:translate-x-0"
              : "max-md:translate-x-[-100vw]")
          }
        >
          {topicArr.map((topicData, topicIndex) => {
            return (
              <div
                key={topicIndex}
                className={`w-full h-[7%] border-b-4 border-dark-grey flex items-center justify-center text-xl font-gelasio cursor-pointer font-bold ${
                  selectedTopic === topicIndex
                    ? "bg-black text-white hover:bg-black"
                    : "bg-grey hover:bg-dark-grey"
                }`}
                onClick={() => handleTopicClick(topicIndex)}
              >
                {topicData}
              </div>
            );
          })}
        </div>
        <div className="w-[80%] h-full flex items-center justify-center max-lg:w-[75%] max-md:w-screen mx-2">
          {renderSelectedComponent()}
        </div>
      </div>
    </>
  );
};

export default SidePanel;
