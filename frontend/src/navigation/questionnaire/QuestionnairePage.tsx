import QuestionnaireContent from "@/modules/questionnaire/components/QuestionnaireContent";

const QuestionnairePage = () => {
  return (
    <div className="w-100 min-h-[100vh] bg-gray-100 flex justify-center px-4 items-center bg-gradient-to-br from-[#833ab4a2] via-[#ff6d6dc0] to-yellow-300">
      <div className="p-6 md:p-12 rounded-xl min-w-full md:min-w-[70%] bg-white bg-opacity-60 shadow-lg">
        <QuestionnaireContent />
      </div>
    </div>
  );
};

export default QuestionnairePage;
