import { useMutation } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { createLink } from "../api/createLink";
import Loader from "@/components/shared/Loader";

const contents = [
  {
    title: "Welcome to machine learning",
    data: "Welcome to Machine learning. What is machine learning? You probably use it many times a day without even knowing it. Anytime you want to find out something like how do I make a sushi roll? You can do a web search on Google, Bing or Baidu to find out. And that works so well because their machine learning software has figured out how to rank web pages. Or when you upload pictures to Instagram or Snapchat and think to yourself, I want to tag my friends so they can see their pictures. Well these apps can recognize your friends in your pictures and label them as well. That's also machine learning. Or if you've just finished watching a Star Wars movie on the video streaming service and you think what other similar movies can I watch? Well the streaming service will likely use machine learning to recommend something that you might like. Each time you use voice to text on your phone to write a text message. >> Hey Andrew, how's it going? >> Or tell your phone. Hey Siri play a song by Rihanna, or ask your other phone okay Google show me Indian restaurants near me. Play video starting at :1:11 and follow transcript 1:11 That's also machine learning. Each time you receive an email titled, Congratulations! You've won a million dollars. Well maybe you're rich, congratulations. Or more likely your email service will probably flag it as spam. That too is an application of machine learning. Beyond consumer applications that you might use, AI is also rapidly making its way into big companies and into industrial applications. For example, I'm deeply concerned about climate change, and I'm glad to see that machine learning is already hoping to optimize wind turbine power generation. Or in healthcare, is starting to make its way into hospitals to help doctors make accurate diagnosis. Or recently at Landing AI have been doing a lot of work, putting computer vision into factories to help inspect if something coming off the assembly line has any defects. That's machine learning, it's the science of getting computers to learn without being explicitly programmed. In this course, you learn about machine learning and get to implement machine learning and code yourself. Millions of others have taken the earlier version of this course, which is of course, that led to the founding of Coursera. And many learners ended up building exciting machine learning systems or even pursuing very successful careers in AI. I'm excited that you're on this journey with me. Welcome and let's get started.",
  },
  {
    title: "Applications of machine learning",
    data: "In this class, you'll learn about the state of the art and also practice implementing machine learning algorithms yourself. You'll learn about the most important machine learning algorithms, some of which are exactly what's being used in large AI or large tech companies today and you get a sense of what is the state of the art in AI. Beyond learning the algorithms though, in this class, you'll also learn all the important practical tips and tricks for making them perform well. You get to implement them and see how they work for yourself. Why is machine learning so widely used today? Machine Learning had grown up as a sub-field of AI or artificial intelligence. We wanted to build intelligent machines. It turns out that there are a few basic things that we could program a machine to do, such as how to find the shortest path from a to b, like in your GPS. But for the most part, we just did not know how to write an explicit program to do many of the more interesting things, such as perform web search, recognize human speech, diagnose diseases from X-rays or build a self-driving car. The only way we knew how to do these things was to have a machine learn to do it by itself. For me, when I founded and was leading the Google Brain Team, I worked on problems like speech recognition, computer vision for Google Maps, Street View images and advertising, or leading AI Baidu, I worked on everything from AI for augmented reality to combating payment fraud to leading a self-driving car team. Most recently, at landing.AI, AI Fund and Stanford University, I'm beginning to work on AI applications in the factory, large-scale agriculture, health care, e-commerce, and other problems. Today, there are hundreds of thousands, perhaps millions of people working on machine learning applications who could tell you similar stories about their work with machine learning. When you've learned these skills, I hope that you too will find the great fun to dabble in exciting different applications and maybe even different industries. In fact, I find it hard to think of any industry that machine learning is unlikely to touch in a significant way now or in the near future. Looking even further into the future, many people, including me, are excited about the AI dream of someday building machines as intelligent as you or me. This is sometimes called Artificial General Intelligence or AGI. I think AGI has been overhyped and we're still a long way away from that goal. I don't know. It'll take 50 years or 500 years or longer to get there. But mostly AI researchers believe that the best way to get closer toward that goal is by using learning algorithms. Maybe ones that take some inspiration from how the human brain works. You also hear a little more about this Quest for AGI later in this course. According to a study by McKinsey, AI and machine learning is estimated to create an additional 13 trillion US dollars of value annually by the year 2030. Even though machine learning is already creating tremendous amounts of value in the software industry, I think there could be even vastly greater value that has yet to be created outside the software industry in sectors such as retail, travel, transportation, automotive, materials manufacturing, and so on. Because of the massive untapped opportunities across so many different sectors, today there is a vast unfulfilled demand for this skill set. That's why this is such a great time to be learning about machine learning. If you find machine learning applications exciting, I hope you stick with me through this class. I can almost guarantee that you'll find mastering these skills worthwhile. In the next video, we'll look at a more formal definition of what is machine learning. And we'll begin to talk about the main types of machine learning problems and algorithms. You pick up some of the main machine learning terminology and start to get a sense of what are the different algorithms and when each one might be appropriate. So let's go on to the next video.",
  },
  {
    title: "Welcome to machine learning",
    data: "What is machine learning? In this video, you'll learn the definition of what it is and also get a sense of when you might want to apply it. Let's take a look together. Here's a definition of what is machine learning that is attributed to Arthur Samuel. He defined machine learning as the field of study that gives computers the ability to learn without being explicitly programmed. Samuel's claim to fame was that back in the 1950s, he wrote a checkers playing program. The amazing thing about this program was that Arthur Samuel himself wasn't a very good checkers player. What he did was he had programmed the computer to play maybe tens of thousands of games against itself. By watching what social support positions tend to lead to wins and what positions tend to lead to losses the checkers plane program learned over time what are good or bad suport positions by trying to get a good and avoid bad positions, this program learned to get better and better at playing checkers because the computer had the patience to play tens of thousands of games against itself. It was able to get so much checkers playing experience that eventually it became a better checkers player than also, Samuel himself. Now throughout these videos, besides me trying to talk about stuff, I occasionally ask you a question to help make sure you understand the content. Here's one about what happens if the computer had played far fewer games. Please take a look and pick whichever you think is the better answer. Play video starting at :1:37 and follow transcript 1:37 Thanks for looking at the quiz. If you had selected this answer would have made it worse then you got the right. In general, the more opportunities you give a learning algorithm to learn, the better it will perform. If you didn't select the correct answer the first time, that's totally okay too. The point of these questions isn't to see if you can get them all correctly on the first try. These questions are here just to help you practice the concepts you are learning. Arthur Samuel's definition was a rather informal one but in the next two videos, we'll dive deeper together into what are the major types of machine learning algorithms? In this course, you learn about many different learning algorithms. The two main types of machine learning are supervised learning and unsupervised learning. We'll define what these terms mean more in the next couple of videos. Of these two, supervised learning is the type of machine learning that is used most in many real-world applications and has seen the most rapid advancements and innovation. In this specialization, which has three courses in total, the first and second courses will focus on supervised learning, and the third will focus on unsupervised learning, recommender systems, and reinforcement learning. By far, the most used types of learning algorithms today are supervised learning, unsupervised learning, and recommender systems. The other thing we're going to spend a lot of time on in this specialization is practical advice for applying learning algorithms. This is something I feel pretty strongly about. Teaching about learning algorithms is like giving someone a set of tools and equally important, so even more important to making sure you have great tools is making sure you know how to apply them because like is it is somewhere where it gives you a state-of-the-art hammer or a state-of-the-art hand drill and say good luck. Now you have all the tools you need to build a three-story house. It doesn't really work like that and so too, in machine learning, making sure you have the tools is really important and so is making sure that you know how to apply the tools of machine learning effectively. That's what you get in this class, the tools as well as the skills to apply them effectively. I regularly visit with friends and teams in some of the top tech companies, and even today I see experienced machine learning teams apply machine learning algorithms to some problems, and sometimes they've been going at it for six months without much success. When I look at what they're doing, I sometimes feel like I could have told them six months ago that the current approach won't work and there's a different way of using these tools that will give them a much better chance of success. In this class, one of the relatively unique things you learn is you learn a lot about the best practices for how to actually develop a practical, valuable machine learning system. This way, you're less likely to end up in one of those teams that end up losing six months going in the wrong direction. In this class, you gain a sense of how the most skilled machine learning engineers build systems. I hope you finish this class as one of those very rare people in today's world that know how to design and build serious machine learning systems. That's machine learning. In the next video, let's look more deeply at what is supervised learning and also what is unsupervised learning. In addition, you'll learn when you might want to use each of them, supervised and unsupervised learning. I'll see you in the next video.",
  },
];

const DetailedPage = () => {
  const { mutateAsync, isPending } = useMutation({ mutationFn: createLink, mutationKey: ["createLink"] });
  const { id } = useParams();

  const content = id && contents[Number(id)];

  const handleTestClick = async () => {
    const response = await mutateAsync(Number(id));

    const url = response.data.url;

    if (url) window.open(url, "_blank");
  };

  if (!content) return <Navigate to="/" />;

  return (
    <div className="container py-40 mx-auto">
      <p className="text-3xl text-slate-800">{content.title}</p>
      <p className="mt-8">{content.data}</p>
      <button onClick={handleTestClick} className=" py-4 px-8 bg-zinc-800 text-2xl mt-10 text-white">
        {isPending ? <Loader /> : "Test yourself"}
      </button>
    </div>
  );
};

export default DetailedPage;
