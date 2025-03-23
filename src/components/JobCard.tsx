import { RiUserAddLine } from "react-icons/ri";
import { RiBuildingLine } from "react-icons/ri";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import TimeAgo from "../utils/TimeAgo";

const content = `
  A user-friendly interface lets you browse stunning photos and videos.
  Filter destinations based on interests and travel style, and create personalized recommendations.
`;

const items = content
  .split(".")
  .map((item) => item.trim())
  .filter((item) => item.length > 0);
const JobCard = ({
  key,
  companyLogo,
  datePosted,
  jobTitle,
  experience,
  jobType,
  maxSalary,
}: {
  key: number;
  companyLogo: string;
  datePosted: string;
  jobTitle: string;
  experience: string;
  jobType: string;
  maxSalary: string;
  description: string;
}) => {
  return (
    <div className="p-5 lg:px-7 bg-white flex flex-col gap-4 rounded-xl" key={key}>
      <div className="flex justify-between">
        <div
          className=" w-16 h-16 rounded-lg"
          style={{ boxShadow: "inset 0 0 15px rgba(29, 29, 29, 0.13)" }}
        >
          <img
            src={companyLogo}
            alt={`${jobTitle} logo`}
            className="h-16 w-16 p-0.5 rounded-full"
          />
        </div>
        <p className="bg-blue-300 text-neutral-700 h-fit p-1.5 px-2 rounded-lg text-xs font-semibold">
          <TimeAgo timestamp={datePosted} />{" "}
        </p>
      </div>
      <p className="font-bold text-xl text-neutral-800">{jobTitle}</p>
      <div className="flex items-center text-xl justify-between" style={{fontFamily: "Helvetica"}}>
        <div className="text-neutral-500 gap-1 flex items-center">
          <RiUserAddLine className="text-lg" />
          <p className="text-sm ">{experience} </p>
        </div>
        <div className="text-neutral-500 gap-1 flex items-center">
          <RiBuildingLine className="text-lg" />
          <p className="text-sm">{jobType} </p>
        </div>
        <div className="text-neutral-500 gap-1 flex items-center">
          <HiOutlineSquare3Stack3D className="text-lg" />
          <p className="text-sm">
            {Math.round(((Number(maxSalary) * 12) / 100) * 100) / 100}LPA
          </p>
        </div>
      </div>
      <ul className="list-disc pl-3 space-y-1 text-neutral-700  text-sm">
        {items.map((item, index) => (
          <li key={index}> {item}</li>
        ))}
      </ul>
      <button className="text-white bg-sky-500 py-2 rounded-lg text-xs">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
