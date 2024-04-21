import { useNavigate } from "react-router-dom";

const topics = [
  {
    title: "Machine Learning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequuntur odio adipisci iste laborum, nam at, tempora optio earum esse illum dignissimos eaque corporis debitis quod! Corporis necessitatibus voluptas quidem!",
    to: "1",
    img: "https://readymadeui.com/cardImg.webp",
  },
  {
    title: "Applications of machine learning",
    to: "2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequuntur odio adipisci iste laborum, nam at, tempora optio earum esse illum dignissimos eaque corporis debitis quod! Corporis necessitatibus voluptas quidem!",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUScWEx39bdbZd4DSZbpFtgOS7D4YOqOtsknxqKQDxNg&s",
  },
  {
    title: "What is machine learning?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequuntur odio adipisci iste laborum, nam at, tempora optio earum esse illum dignissimos eaque corporis debitis quod! Corporis necessitatibus voluptas quidem!",
    to: "3",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ZvEZrYntTdzh1CKaJuNXA6506L4HQnbTo0ReqXGtKg&s",
  },
];

type TopicCardProps = {
  title: string;
  description: string;
  img: string;
  to: string;
};

const TopicCard = ({ title, description, img, to }: TopicCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
      <img src={img} className="w-full h-[230px]" />
      <div className="px-4 py-6">
        <h3 className="text-[#333] text-xl font-bold">{title}</h3>
        <p className="mt-4 text-sm text-gray-500">{description}</p>
        <button
          type="button"
          onClick={() => navigate(`detailed/${to}`)}
          className="px-6 py-2.5 mt-6 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        >
          View
        </button>
      </div>
    </div>
  );
};

const ProgramPage = () => {
  return (
    <main className=" flex-1">
      <div className=" container m-auto mt-4">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl">The Modern JavaScript Tutorial</h1>
          <p className=" text-md text-zinc-600">
            Last updated on April 20, 2024
          </p>
        </div>
        <h2>
          How it's done now. From the basics to advanced topics with simple, but
          detailed explanations.
        </h2>
        <div className="grid grid-cols-3 gap-6 my-8">
          {topics.map((topic, index) => (
            <TopicCard key={index} {...topic} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProgramPage;
