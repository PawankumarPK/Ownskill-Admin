// const TeamMember = () => {
//   const handleAboutKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       e.preventDefault();
//     }
//   };

//   const handleAboutChange = (e) => {
//     let input = e.target;
//     input.style.height = "auto";
//     input.style.height = input.scrollHeight + 10 + "px";
//   };

//   return (
//     <div className="h-full w-full p-10 font-gelasio font-semibold">
//       <h1 className="text-2xl">Add Team Member</h1>

//       <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="memberName">
//             Member Name
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="text"
//             id="memberName"
//             name="memberName"
//             placeholder="Member Name"
//           />
//         </div>
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="memberEmail">
//             Member Email
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="text"
//             id="memberEmail"
//             name="memberEmail"
//             placeholder="Member Email"
//           />
//         </div>
//       </div>

//       <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="title">
//             Title
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="text"
//             id="title"
//             name="title"
//             placeholder="Project Manager"
//           />
//         </div>
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="profilePicture">
//             Profile Picture
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="file"
//             id="profilePicture"
//             name="profilePicture"
//             placeholder="Upload"
//           />
//         </div>
//       </div>

//       <div className="mt-6 max-sm:mt-4">
//         <div className="w-full">
//           <label className="text-dark-grey" htmlFor="aboutMember">
//             About Member
//           </label>
//           <textarea
//             className="w-full h-40 mt-2 outline-none resize-none leading-tight placeholder:opacity-50 rounded-md bg-grey pl-5 p-5"
//             onChange={handleAboutChange}
//             onKeyDown={handleAboutKeyDown}
//             id="aboutMember"
//             name="aboutMember"
//             placeholder="About"
//           ></textarea>
//         </div>
//       </div>

//       <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="linkedInLink">
//             LinkedIn Link
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="text"
//             id="linkedInLink"
//             name="linkedInLink"
//             placeholder="https://linkedIn.com"
//           />
//         </div>
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="instagramLink">
//             Instagram Link
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="text"
//             id="instagramLink"
//             name="instagramLink"
//             placeholder="https://instagram.com"
//           />
//         </div>
//       </div>

//       <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="youtubeLink">
//             Youtube Link
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="text"
//             id="youtubeLink"
//             name="youtubeLink"
//             placeholder="https://youtube.com"
//           />
//         </div>
//         <div className="w-[45%] max-sm:w-full">
//           <label className="text-dark-grey" htmlFor="xLink">
//             X Link
//           </label>
//           <input
//             className="input-box mt-2 placeholder:opacity-40"
//             type="text"
//             id="xLink"
//             name="xLink"
//             placeholder="https://x.com"
//           />
//         </div>
//       </div>

//       <button className="whitespace-nowrap bg-black text-white mt-16 max-sm:mb-10 rounded-sm px-6 w-[35%] h-14 capitalize hover:bg-opacity-80 text-2xl max-lg:w-[60%] max-sm:w-full">
//         Add Data
//       </button>
//     </div>
//   );
// };

// export default TeamMember;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const TeamMember = () => {
  const [memberData, setMemberData] = useState({
    memberName: "",
    memberEmail: "",
    title: "",
    profilePicture: "",
    aboutMember: "",
    linkedInLink: "",
    instagramLink: "",
    youtubeLink: "",
    xLink: "",
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
      setMemberData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setMemberData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddData = () => {
    const formData = new FormData();

    formData.append("memberName", memberData.memberName);
    formData.append("memberEmail", memberData.memberEmail);
    formData.append("title", memberData.title);
    formData.append("aboutMember", memberData.aboutMember);
    formData.append("linkedInLink", memberData.linkedInLink);
    formData.append("instagramLink", memberData.instagramLink);
    formData.append("youtubeLink", memberData.youtubeLink);
    formData.append("xLink", memberData.xLink);

    if (fileInput) {
      formData.append("profilePicture", fileInput);
    }

    axios
      .post("http://localhost:9000/api/course-edu/course-team-member", formData)
      .then((response) => {
        toast.success(response.data.message);
        setMemberData({
          memberName: "",
          memberEmail: "",
          title: "",
          profilePicture: "",
          aboutMember: "",
          linkedInLink: "",
          instagramLink: "",
          youtubeLink: "",
          xLink: "",
        });
        setFileInput(null);
        const fileInputProfilePicture =
          document.getElementById("profilePicture");
        fileInputProfilePicture.value = null;
      })
      .catch((error) => {
        toast.error("Try again!");
      });
  };

  useEffect(() => {
    document.getElementById("memberName").value = memberData.memberName;
    document.getElementById("memberEmail").value = memberData.memberEmail;
    document.getElementById("title").value = memberData.title;
    document.getElementById("aboutMember").value = memberData.aboutMember;
    document.getElementById("linkedInLink").value = memberData.linkedInLink;
    document.getElementById("instagramLink").value = memberData.instagramLink;
    document.getElementById("youtubeLink").value = memberData.youtubeLink;
    document.getElementById("xLink").value = memberData.xLink;
  }, [memberData]);

  return (
    <div className="h-full w-full p-10 font-gelasio font-semibold">
      <Toaster />
      <h1 className="text-2xl">Add Team Member</h1>

      <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="memberName">
            Member Name
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="memberName"
            name="memberName"
            placeholder="Member Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="memberEmail">
            Member Email
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="memberEmail"
            name="memberEmail"
            placeholder="Member Email"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
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

      <div className="mt-6 max-sm:mt-4">
        <div className="w-full">
          <label className="text-dark-grey" htmlFor="aboutMember">
            About Member
          </label>
          <textarea
            className="w-full h-40 mt-2 outline-none resize-none leading-tight placeholder:opacity-50 rounded-md bg-grey pl-5 p-5"
            onChange={(e) => {
              handleInputChange(e);
              handleAboutChange(e);
            }}
            onKeyDown={handleAboutKeyDown}
            id="aboutMember"
            name="aboutMember"
            placeholder="About"
          ></textarea>
        </div>
      </div>

      <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="linkedInLink">
            LinkedIn Link
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="linkedInLink"
            name="linkedInLink"
            placeholder="https://linkedIn.com"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="instagramLink">
            Instagram Link
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="instagramLink"
            name="instagramLink"
            placeholder="https://instagram.com"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-6 max-sm:mt-4 flex justify-between max-sm:flex-col gap-5">
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="youtubeLink">
            Youtube Link
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="youtubeLink"
            name="youtubeLink"
            placeholder="https://youtube.com"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[45%] max-sm:w-full">
          <label className="text-dark-grey" htmlFor="xLink">
            X Link
          </label>
          <input
            className="input-box mt-2 placeholder:opacity-40"
            type="text"
            id="xLink"
            name="xLink"
            placeholder="https://x.com"
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

export default TeamMember;
