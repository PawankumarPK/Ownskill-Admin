import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Instructor = () => {
  const [instructorData, setInstructorData] = useState({
    instructorName: "",
    instructorEmail: "",
    title: "",
    profilePicture: "",
    aboutInstructor: "",
  });

  const [fileInput, setFileInput] = useState(null);

  const handleAboutKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleAboutChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + 10 + "px";
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setFileInput(file);
      setInstructorData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setInstructorData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddData = () => {
    const formData = new FormData();

    formData.append("instructorName", instructorData.instructorName);
    formData.append("instructorEmail", instructorData.instructorEmail);
    formData.append("title", instructorData.title);
    formData.append("aboutInstructor", instructorData.aboutInstructor);
    if (fileInput) {
      formData.append("profilePicture", fileInput);
    }

    axios
      .post("http://localhost:9000/api/course-edu/course-instructor", formData)
      .then((response) => {
        toast.success(response.data.message);
        setInstructorData({
          instructorName: "",
          instructorEmail: "",
          title: "",
          profilePicture: "",
          aboutInstructor: "",
        });
        setFileInput(null);
        const fileInputProfilePicture = document.getElementById("profilePicture");
        fileInputProfilePicture.value = null;
      })
      .catch((error) => {
        toast.error("Try again!");
      });
  };

  useEffect(() => {
    document.getElementById("instructorName").value = instructorData.instructorName;
    document.getElementById("instructorEmail").value = instructorData.instructorEmail;
    document.getElementById("title").value = instructorData.title;
    document.getElementById("aboutInstructor").value = instructorData.aboutInstructor;
  }, [instructorData]);

  return (
    <div className="h-full w-full p-10 font-gelasio font-semibold">
      <Toaster />
      <h1 className="text-2xl">Instructor</h1>

      <div className="mt-10 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="instructorName">
            Instructor Name
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="instructorName"
            name="instructorName"
            placeholder="Instructor Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="instructorEmail">
            Instructor Email
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="instructorEmail"
            name="instructorEmail"
            placeholder="Instructor Email"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-10 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="title">
            Title
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="title"
            name="title"
            placeholder="Project Manager"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="profilePicture">
            Profile Picture
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="file"
            id="profilePicture"
            name="profilePicture"
            placeholder="Upload"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-10 max-sm:mt-4">
        <div className="w-full">
          <label className="text-dark-grey" htmlFor="aboutInstructor">
            About Instructor
          </label>
          <textarea
            className="w-full h-40 mt-2 outline-none resize-none leading-tight placeholder:opacity-50 rounded-md bg-grey pl-5 p-5"
            onChange={(e) => {
              handleInputChange(e);
              handleAboutChange(e);
            }}
            onKeyDown={handleAboutKeyDown}
            id="aboutInstructor"
            name="aboutInstructor"
            placeholder="About"
          ></textarea>
        </div>
      </div>

      <button
        onClick={handleAddData}
        className="whitespace-nowrap bg-black text-white mt-16 max-sm:mb-10 rounded-sm px-6 w-[35%] h-14 capitalize hover:bg-opacity-80 text-2xl max-lg:w-[60%] max-sm:w-full"
      >
        Add Data
      </button>
    </div>
  );
};

export default Instructor;
