
## Requirements
- Python 3.12

## Python set up
- Go to [python official site](https://www.python.org/downloads/) and download version 3.12.
- To be able to run the app you might need to create a virtual environment and install all requirements as below.

> [!NOTE] 
> Below commands are for Linux/Macos. (If you want to learn more, you can visit [this page](https://docs.python.org/3/tutorial/venv.html))

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python3.12 -m pip install -r requirements.txt
```

## Run the App

> [!IMPORTANT]
> Make sure you are within the main folder, otherwise, fastapi will not find the main.py

To run the app, you can use below command. If you want to expand on the cli documentation, you can visit [fastapi-cli](https://fastapi.tiangolo.com/fastapi-cli/)
```bash
fastapi dev main.py
```

## Testing 
For any testing that will be made in the backed we can use test folder for that. We are going to be using `pytest` as default. 
You can find the official documentation on [pytest official docs](https://docs.pytest.org/en/stable/getting-started.html#get-started)

