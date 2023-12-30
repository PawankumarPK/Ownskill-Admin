import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const CourseOverview = () => {
  const handleDescriptionKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const [courseData, setCourseData] = useState({
    courseName: "",
    amount: "",
    courseDescription: "",
    duration: "",
    lessons: "",
    maxStudent: "",
    videos: "",
    skillLevel: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + 10 + "px";
  };

  const [keyArr, setKeyArr] = useState([]);

  const handleAddKeyPoint = () => {
    const keyPointsInput = document.getElementById("keyPoints");
    const keyPointsValue = keyPointsInput.value;
    setKeyArr((prevKeyArr) => [...prevKeyArr, keyPointsValue]);
    keyPointsInput.value = "";
  };

  const handleDeleteKeyPoint = (index) => {
    const updatedKeyArr = keyArr.filter((_, i) => i !== index);
    setKeyArr(updatedKeyArr);
  };

  const handleSaveAndContinue = () => {
    const postData = {
      ...courseData,
      keyPoints: keyArr,
    };

    setLoading(true);

    axios
      .post("http://localhost:9000/api/course-edu/course-overview", postData)
      .then((response) => {
        setLoading(false);
        toast.success(response.data.message);
        setCourseData({
          courseName: "",
          amount: "",
          courseDescription: "",
          duration: "",
          lessons: "",
          maxStudent: "",
          videos: "",
          skillLevel: "",
          language: "",
        });

        setKeyArr([]);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Try again!");
      });
  };

  return (
    <div className="h-full w-full p-10 font-gelasio font-semibold">
      <Toaster />
      <h1 className="text-2xl">Course Overview</h1>
      <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="courseName">
            Course Name
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="courseName"
            name="courseName"
            placeholder="Course Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="amount">
            Amount
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-6 max-sm:mt-4">
        <div className="w-full">
          <label className="text-dark-grey" htmlFor="courseDescription">
            Course Description
          </label>
          <textarea
            className="w-full h-40 mt-2 outline-none resize-none leading-tight placeholder:opacity-50 rounded-md bg-grey pl-5 p-5"
            onChange={(e) => {
              handleInputChange(e);
              handleDescriptionChange(e);
            }}
            onKeyDown={handleDescriptionKeyDown}
            id="courseDescription"
            name="courseDescription"
            placeholder="Description"
          ></textarea>
        </div>
      </div>
      <div className="mt-6 max-sm:mt-4 flex justify-between max-lg:grid max-lg:grid-cols-3 max-lg:mt-6 max-sm:grid-cols-1 gap-5">
        <div className="w-[15%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="duration">
            Duration
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="number"
            id="duration"
            name="duration"
            placeholder="Duration"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[15%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="lessons">
            Lessons
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="number"
            id="lessons"
            name="lessons"
            placeholder="Lessons"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[15%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="maxStudent">
            Max Student
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="number"
            id="maxStudent"
            name="maxStudent"
            placeholder="Max Student"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[15%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="videos">
            Videos
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="number"
            id="videos"
            name="videos"
            placeholder="Videos"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[15%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="skillLevel">
            Skill Level
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="number"
            id="skillLevel"
            name="skillLevel"
            placeholder="Skill Level"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[15%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="language">
            Language
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="language"
            name="language"
            placeholder="Language"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-6 max-sm:mt-4 flex relative">
        <div className="w-[35%] max-sm:w-[50%]">
          <label className="text-dark-grey" htmlFor="keyPoints">
            Key Points
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="keyPoints"
            name="keyPoints"
            placeholder="Key Points"
          />
        </div>
        <button
          onClick={handleAddKeyPoint}
          className="whitespace-nowrap bg-black text-white rounded-sm px-6 w-[15%] max-sm:w-[42%] h-10 capitalize hover:bg-opacity-80 absolute left-[38%] max-sm:left-[58%] bottom-0"
        >
          Add
        </button>
      </div>
      <div
        className={"mt-4 input-box " + (keyArr.length === 0 ? "hidden" : "")}
      >
        <ul className="flex">
          {keyArr.map((keyPoint, index) => (
            <li
              className="mr-2 capitalize input-box w-auto bg-dark-grey px-3"
              key={index}
            >
              {keyPoint}
              <button
                className="ml-2 bg-red px-1"
                onClick={() => handleDeleteKeyPoint(index)}
              >
                D
              </button>
            </li>
          ))}
        </ul>
      </div>
      {loading ? (
        <button className="whitespace-nowrap bg-black text-white mt-16 max-sm:mb-10 rounded-sm px-6 w-[35%] h-14 capitalize hover:bg-opacity-80 text-2xl max-lg:w-[60%] max-sm:w-full">
          Wait....
        </button>
      ) : (
        <button
          onClick={handleSaveAndContinue}
          className="whitespace-nowrap bg-black text-white mt-16 max-sm:mb-10 rounded-sm px-6 w-[35%] h-14 capitalize hover:bg-opacity-80 text-2xl max-lg:w-[60%] max-sm:w-full"
        >
          Save Detail & Continue
        </button>
      )}
    </div>
  );
};

export default CourseOverview;
