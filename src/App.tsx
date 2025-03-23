import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { PiUserSoundLight } from "react-icons/pi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { RangeSlider } from "./lib/RangeSlider";
import Amazon from "./assets/amazon_logo.jpg";
import JobCard from "./components/JobCard";
import { axiosInstance } from "./lib/axios";

interface Job {
  jobTitle: string;
  jobDescription: string;
  maxSalary: string;
  createdAt: string;
}

// Job locations and types
const locations = ["Bangalore", "Hyderabad", "Mumbai", "Pune", "Chennai", "Others"];
const jobTypes = ["Internship", "Full-time", "Part-time", "Contract"];

// Fetch jobs from API
const getJobs = async (keyword = "", location: string, jobType: string, salaryRange: { min: number; max: number }) => {
  try {
    let link = `/jobs?keyword=${keyword}&maxSalary[gte]=${salaryRange.min}&maxSalary[lte]=${salaryRange.max}`;
    if (location) link += `&location=${location}`;
    if (jobType) link += `&jobType=${jobType}`;

    console.log("Fetching jobs from:", axiosInstance.defaults.baseURL + link);

    const { data } = await axiosInstance.get(link);
    console.log("API Full Response:", JSON.stringify(data, null, 2));

    return data.job || []; 
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

const App = () => {
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 150 });
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    getJobs(keyword, location, jobType, salaryRange)
      .then((job) => {
        console.log("Jobs received:", job);
        setJobs(job || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [keyword, location, jobType, salaryRange, reload]);

  return (
    <div className="bg-violet-50 w-full min-h-screen pt-2">
      <Navbar setReload={setReload} />

      {/* Search Filters */}
      <div className="flex bg-white min-h-20 items-center max-sm:flex-col shadow-sm shadow-violet lg:px-16 px-5">
        {/* Search Input */}
        <div className="flex lg:pr-10 relative w-full items-center border-r-2 border-neutral-100">
          <CiSearch className="absolute top-4.5 left-5 text-lg text-neutral-400" />
          <input
            type="text"
            className="pl-9 lg:pl-14 border-none block w-full px-3 py-4 focus:outline-none sm:text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by Job Title, Role"
          />
        </div>

        {/* Location Filter */}
        <div className="w-full relative border-r-2 border-neutral-100">
          <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700" size={20} />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full text-neutral-500 px-10 py-4 sm:text-sm appearance-none"
          >
            <option value="">Preferred Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <HiOutlineChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
        </div>

        {/* Job Type Filter */}
        <div className="w-full relative border-r-2 border-neutral-100">
          <PiUserSoundLight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700" size={20} />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="mt-1 block w-full text-neutral-500 px-10 py-4 sm:text-sm appearance-none"
          >
            <option value="">Job Type</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <HiOutlineChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
        </div>

        {/* Salary Range Slider */}
        <div className="w-full h-14 lg:pl-8 lg:pr-4 flex flex-col gap-3 pt-2">
          <div className="flex justify-between items-center font-semibold">
            <span className="text-sm text-neutral-600">Salary Per Month</span>
            <span className="text-sm text-gray-600">₹{salaryRange.min}k - ₹{salaryRange.max}k</span>
          </div>
          <RangeSlider min={0} max={150} onChange={(values) => setSalaryRange(values)} />
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-6 sm:px-20 max-sm:px-2">
        {loading ? (
          <div className="font-bold">Loading...</div>
        ) : jobs.length > 0 ? (
          jobs.map((job, ind) => (
            <JobCard
              key={ind}
              companyLogo={Amazon}
              datePosted={job.createdAt}
              jobTitle={job.jobTitle}
              experience="1-3 yr Exp"
              jobType="Onsite"
              maxSalary={job.maxSalary}
              description={job.jobDescription}
            />
          ))
        ) : (
          <div className="font-bold text-center col-span-4">No Jobs Found</div>
        )}
      </div>
    </div>
  );
};

export default App;
