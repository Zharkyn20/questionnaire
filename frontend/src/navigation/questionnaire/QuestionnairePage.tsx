import QuestionnaireContent from "@/modules/questionnaire/components/QuestionnaireContent";

const QuestionnairePage = () => {
  return (
    <div className="w-100 min-h-[100vh] bg-zinc-900 flex justify-center px-4 items-center">
      <div className="p-6 md:p-12 rounded-xl min-w-full md:min-w-[70%] bg-white bg-opacity-70 shadow-lg">
        <QuestionnaireContent />
      </div>
    </div>
  );
};

export default QuestionnairePage;
