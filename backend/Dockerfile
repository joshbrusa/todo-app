FROM python
WORKDIR /code
COPY requirements.txt .
RUN python -m venv .venv
RUN chmod +x .venv/bin/activate
RUN pip install -r requirements.txt
COPY . .