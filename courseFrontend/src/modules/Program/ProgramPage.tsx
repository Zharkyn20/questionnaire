const topics = [
  {
    title: "Objects",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequuntur odio adipisci iste laborum, nam at, tempora optio earum esse illum dignissimos eaque corporis debitis quod! Corporis necessitatibus voluptas quidem!",
    img: "https://readymadeui.com/cardImg.webp",
  },
  {
    title: "Recursion and stack",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequuntur odio adipisci iste laborum, nam at, tempora optio earum esse illum dignissimos eaque corporis debitis quod! Corporis necessitatibus voluptas quidem!",
    img: "https://readymadeui.com/cardImg.webp",
  },
  {
    title: "DOM tree",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequuntur odio adipisci iste laborum, nam at, tempora optio earum esse illum dignissimos eaque corporis debitis quod! Corporis necessitatibus voluptas quidem!",
    to: "",
    img: "https://readymadeui.com/cardImg.webp",
  },
];

type TopicCardProps = {
  title: string;
  description: string;
  img: string;
};

const TopicCard = ({ title, description, img }: TopicCardProps) => {
  return (
    <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
      <img src={img} className="w-full" />
      <div className="px-4 py-6">
        <h3 className="text-[#333] text-xl font-bold">{title}</h3>
        <p className="mt-4 text-sm text-gray-500">{description}</p>
        <button
          type="button"
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
          <p className=" text-md text-zinc-600">Last updated on April 20, 2024</p>
        </div>
        <h2>How it's done now. From the basics to advanced topics with simple, but detailed explanations.</h2>
        <div className="grid grid-cols-3 gap-6 my-8">
          {topics.map((topic) => (
            <TopicCard {...topic} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProgramPage;
