import os

from azure.ai.language.questionanswering import QuestionAnsweringClient
from azure.core.credentials import AzureKeyCredential
from azure.identity import DefaultAzureCredential

from backend.app.backend.config import azure_key, azure_endpoint

credential = DefaultAzureCredential()
client = QuestionAnsweringClient(endpoint=azure_endpoint, credential=AzureKeyCredential(azure_key))


def beatify_text(input):
    output = client.get_answers(
        question="Tell me about biology.",
        project_name="Questionnaire",
        deployment_name="production"
    )
    print("Output answers:", output.answers)
    for candidate in output.answers:
        print("({}) {}".format(candidate.confidence, candidate.answer))
        print("Source: {}".format(candidate.source))
    return output.answers[0].answer
