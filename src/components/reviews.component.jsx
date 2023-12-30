import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Review = () => {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    reviewMessage: "",
    image: "",
    stars: "",
  });

  const [fileInput, setFileInput] = useState(null);

  const handleMessageKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleMessageChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + 10 + "px";
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setFileInput(file);
      setReviewData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setReviewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddData = () => {
    const formData = new FormData();

    formData.append("name", reviewData.name);
    formData.append("email", reviewData.email);
    formData.append("reviewMessage", reviewData.reviewMessage);
    formData.append("stars", reviewData.stars);
    if (fileInput) {
      formData.append("image", fileInput);
    }

    axios
      .post("http://localhost:9000/api/course-edu/course-review", formData)
      .then((response) => {
        toast.success(response.data.message);
        setReviewData({
          name: "",
          email: "",
          reviewMessage: "",
          image: "",
          stars: "",
        });
        setFileInput(null);
        const fileInputImage = document.getElementById("image");
        fileInputImage.value = null;
      })
      .catch((error) => {
        toast.error("Try again!");
      });
  };

  useEffect(() => {
    document.getElementById("name").value = reviewData.name;
    document.getElementById("email").value = reviewData.email;
    document.getElementById("reviewMessage").value = reviewData.reviewMessage;
    document.getElementById("stars").value = reviewData.stars;
  }, [reviewData]);

  return (
    <div className="h-full w-full p-10 font-gelasio font-semibold">
      <Toaster />
      <h1 className="text-2xl">Review</h1>

      <div className="mt-10 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="name">
            Name
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="email">
            Email
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-10 max-sm:mt-4">
        <div className="w-full">
          <label className="text-dark-grey" htmlFor="reviewMessage">
            Review Message
          </label>
          <textarea
            className="w-full h-40 mt-2 outline-none resize-none leading-tight placeholder:opacity-50 rounded-md bg-grey pl-5 p-5"
            onChange={(e) => {
              handleInputChange(e);
              handleMessageChange(e);
            }}
            onKeyDown={handleMessageKeyDown}
            id="reviewMessage"
            name="reviewMessage"
            placeholder="Message"
          ></textarea>
        </div>
      </div>

      <div className="mt-10 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="image">
            Image
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="file"
            id="image"
            name="image"
            placeholder="Upload"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="stars">
            Stars
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="stars"
            name="stars"
            placeholder="Stars"
            onChange={handleInputChange}
          />
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

export default Review;
