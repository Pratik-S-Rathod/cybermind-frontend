import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FaAnglesRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

const locations = [
  "Bengalore",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Chennai",
  "Others",
];
const jobTypes = ["Internship", "Full-time", "Partime", "Contract"];
const CreateJob = ({
  open,
  setOpen,
  setReload,
}: {
  open: boolean;
  setOpen: any;
  setReload: any;
}) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleJobAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/jobs", {
        jobTitle,
        companyName,
        location,
        jobType,
        minSalary,
        maxSalary,
        applicationDeadline,
        jobDescription: description,
      });
      setReload((prev: boolean) => !prev);

      toast.success("Job Posted Successfully");
      setOpen(false);
      console.log(data);
    } catch (error) {
      toast.error("All fields are required");
      console.log("All fields are required");
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-neutral-500/50 flex justify-center items-center z-40">
          <div className="bg-white flex-col rounded-md px-8 h-full sm:h-[75%] max-md:mx-3 lg:w-[50%] md:w-[70%] absolute z-50 top-10 left-0 right-0 bottom-0 m-auto flex flex-col gap-8 pt-3 shadow-sm shadow-neutral-200">
            <p className="text-center font-bold text-lg">Create Job Opening</p>
            <p
              className="absolute top-3 right-8 text-lg cursor-pointer"
              onClick={() => setOpen(false)}
            >
              x
            </p>
            <form action="" className="flex flex-col" onSubmit={handleJobAdd}>
              <div className="flex max-sm:flex-col w-full gap-3">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="jobTitle"
                    className="block text-left text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Enter Job Title"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="companyName"
                    className="block text-left text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Amazon, Microsoft, Swiggy"
                  />
                </div>
              </div>

              <div className="flex max-sm:flex-col w-full gap-3">
                <div className="mb-4 w-full relative">
                  <label
                    htmlFor="location"
                    className="block text-left text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <select
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm appearance-none"
                    >
                      <option value="" disabled>
                        Choose Preferred Location
                      </option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc} className="">
                          {loc}
                        </option>
                      ))}
                    </select>
                    <HiOutlineChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-700 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
                <div className="mb-4 w-full relative">
                  <label
                    htmlFor="location"
                    className="block text-left text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>
                  <div className="relative">
                    <select
                      id="jobType"
                      name="jobType"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm appearance-none"
                    >
                      <option value="" disabled>
                        Job Type
                      </option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type} className="">
                          {type}
                        </option>
                      ))}
                    </select>
                    <HiOutlineChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-700 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full max-sm:flex-col gap-3">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="salaryRange"
                    className="block text-left text-sm font-medium text-gray-700"
                  >
                    Salary Range (in k/month)
                  </label>
                  <div className="flex relative w-full gap-3">
                    <input
                      type="text"
                      id="salaryRange"
                      name="minSalary"
                      className="mt-1 pl-7 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      placeholder="₹0k"
                    />
                    <RiArrowUpDownFill className="absolute top-4 text-neutral-400 mx-2 m-1" />
                    <input
                      type="text"
                      id="salaryRange"
                      name="maxSalary"
                      className="mt-1 pl-9 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      placeholder="₹120k"
                    />
                    <RiArrowUpDownFill className="absolute top-4 max-sm:right-26 right-32 text-neutral-400 mx-2 m-1" />
                  </div>
                </div>
                <div className="mb-4 w-full relative">
                  <label
                    htmlFor="applicationDeadline"
                    className="block text-left text-sm font-medium text-gray-700"
                  >
                    Application Deadline
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="applicationDeadline"
                      name="applicationDeadline"
                      className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                      value={applicationDeadline}
                      onChange={(e) => setApplicationDeadline(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full max-sm:flex-col gap-3">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="jobDescription"
                    className="block text-left text-sm font-medium text-gray-700"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ height: "80px", maxBlockSize: "100px" }}
                    placeholder="Please share a description to let the candidate know more about the job role."
                  />
                </div>
              </div>

              <div className="flex justify-between mb-5">
                <button className="flex items-center border-2 border-black p-2 justify-center md:w-[20%]  rounded-lg">
                  <p className="">Save Draft</p>
                  <RiArrowDownDoubleFill />
                </button>

                <button className="flex gap-1 bg-sky-500 cursor-pointer text-white items-center p-2 justify-center md:w-[20%] max-sm:px-4  rounded-lg">
                  <p className="">Publish</p>
                  <FaAnglesRight size={10} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateJob;
