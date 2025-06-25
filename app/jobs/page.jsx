import Botton from "../components/Botton";
import Link from "next/link";

export default function InternImageGrid() {
  const images = [
    "/images/jobs/img-wi-new-Earning-Learnings.png",
    "images/jobs/img-wi-new-Job-Apply-now.png",
    "images/jobs/img-wi-new-Mentor.png",
    "images/jobs/img-wi-new-Summer-of-25.png",
    "/images/jobs/img-wi-new-Get-real-projects.png",
    "images/jobs/img-wi-new-Job-roles.png",
    "images/jobs/img-wi-new-Discover-a-new-city.png",
    "images/jobs/img-wi-new-Up-skill.png",
  ];

  return (
    <div className="bg-[#fefdf8]">
      <div className=" py-20 mt-5 w-[80vw] mx-auto animate-fadeIn">
        <h1 className="text-4xl font-bold mb-2">Wanted: Interns</h1>
        <p className="text-lg mb-8">
          7 reasons to intern @wysiwygcommunications
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="w-full  rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={src}
                alt={`Intern image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center pb-20">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdNNmwUYBn_QHimAKyRk4bf4qkmgZYCCW0mB_f5a7avLZQlfg/viewform"
        >
          <Botton value={"Apply Now"} size="xl" color="black" />
        </Link>
      </div>
    </div>
  );
}
