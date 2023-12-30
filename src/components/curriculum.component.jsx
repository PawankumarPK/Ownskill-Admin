import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Curriculum = () => {
  const handleDescriptionKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const [curriculumData, setCurriculumData] = useState({
    title: "",
    description: "",
    topics: [],
  });

  const [topicData, setTopicData] = useState({
    topicTitle: "",
    topicTime: "",
    icons: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurriculumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTopicChange = (e) => {
    const { name, value } = e.target;
    setTopicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + 10 + "px";
  };

  const handleAddTopic = () => {
    setCurriculumData((prevData) => ({
      ...prevData,
      topics: [...prevData.topics, { ...topicData }],
    }));

    setTopicData({
      topicTitle: "",
      topicTime: "",
      icons: "",
    });
  };

  const handleDeleteTopic = (index) => {
    const updatedTopics = curriculumData.topics.filter((_, i) => i !== index);
    setCurriculumData((prevData) => ({
      ...prevData,
      topics: updatedTopics,
    }));
  };

  const handleSaveAndContinue = () => {
    setLoading(true);

    axios
      .post("http://localhost:9000/api/course-edu/course-curriculum", curriculumData)
      .then((response) => {
        setLoading(false);
        toast.success(response.data.message);

        setCurriculumData({
          title: "",
          description: "",
          topics: [],
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Try again!");
      });
  };

  useEffect(() => {
    document.getElementById("title").value = curriculumData.title;
    document.getElementById("description").value = curriculumData.description;
  }, [curriculumData]);

  return (
    <div className="h-full w-full p-10 font-gelasio font-semibold">
      <Toaster />
      <h1 className="text-2xl">Curriculum</h1>

      <div className="mt-10 max-sm:mt-4">
        <div className="w-full">
          <label className="text-dark-grey" htmlFor="title">
            Title
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-10 max-sm:mt-4">
        <div className="w-full">
          <label className="text-dark-grey" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full h-40 mt-2 outline-none resize-none leading-tight placeholder:opacity-50 rounded-md bg-grey pl-5 p-5"
            onChange={(e) => {
              handleInputChange(e);
              handleDescriptionChange(e);
            }}
            onKeyDown={handleDescriptionKeyDown}
            id="description"
            name="description"
            placeholder="Description"
          ></textarea>
        </div>
      </div>

      <div className="mt-10 max-sm:mt-4 flex justify-between max-lg:grid max-lg:grid-cols-3 max-lg:mt-6 max-sm:grid-cols-1 gap-5">
        <div className="w-[30%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="topicTitle">
            Topic Title
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="topicTitle"
            name="topicTitle"
            placeholder="Topic Title"
            value={topicData.topicTitle}
            onChange={handleTopicChange}
          />
        </div>
        <div className="w-[20%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="topicTime">
            Topic Time
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="topicTime"
            name="topicTime"
            placeholder="Topic Time"
            value={topicData.topicTime}
            onChange={handleTopicChange}
          />
        </div>
        <div className="w-[20%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-full">
          <label className="text-dark-grey" htmlFor="icons">
            Icons
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="icons"
            name="icons"
            placeholder="Icons"
            value={topicData.icons}
            onChange={handleTopicChange}
          />
        </div>
        <div className="w-[20%] max-lg:w-[100%] max-lg:mt-4 max-sm:w-[60%] max-sm:m-auto max-sm:mt-8 relative">
          <button
            onClick={handleAddTopic}
            className="whitespace-nowrap bg-black text-white rounded-sm px-6 w-[50%] max-lg:w-full max-sm:w-[100%] h-10 capitalize hover:bg-opacity-80 absolute left-0 bottom-0"
          >
            Add
          </button>
        </div>
      </div>

      <div
        className={
          "mt-4 input-box " +
          (curriculumData.topics.length === 0 ? "hidden" : "")
        }
      >
        <ul className="flex flex-wrap">
          {curriculumData.topics.map((topic, index) => (
            <li
              className="mr-2 capitalize input-box w-auto bg-dark-grey px-3 py-1 flex items-center"
              key={index}
            >
              {topic.topicTitle} ({topic.topicTime}) - {topic.icons}
              <button
                className="ml-2 bg-red px-1"
                onClick={() => handleDeleteTopic(index)}
              >
                D...
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

export default Curriculum;
