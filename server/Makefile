# Python interpreter
PYTHON := python3

# Virtual environment
VENV := .venv
VENV_BIN := $(VENV)/bin

# Project files
SRC := main.py

# Dependencies
REQUIREMENTS := requirements.txt

.PHONY: all venv install run clean lint test

all: venv install

venv:
	$(PYTHON) -m venv $(VENV)
	sh -c 'source .venv/bin/activate'

install: venv
	$(VENV_BIN)/pip install -r $(REQUIREMENTS)

run: venv
	$(VENV_BIN)/uvicorn main:app --reload

clean:
	rm -rf $(VENV)
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete

freeze: venv
	$(VENV_BIN)/pip freeze > $(REQUIREMENTS)
