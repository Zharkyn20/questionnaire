FROM python:3.9
# stdder stddin
ENV PYTHONUNBUFFERED=1
# python dont create .pyc
ENV PYTHONDONTWRITEBYTECODE=1
# Dockerfile
ENV OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES

WORKDIR /questionnaire

RUN pip install --upgrade pip
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY . /questionnaire/
