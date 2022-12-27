FROM python
WORKDIR /code
COPY . .
RUN python -m venv .venv
RUN chmod +x .venv/bin/activate
RUN pip install -r requirements.txt