# EXCEL INTERFACE FOR FUSEKI BACKEND
### Requirements
1. Python 3.8 or later
2. Docker 
3. Docker-Compose

## Development Setup
### 1) Setup Python Virtual Environment

   - Go to your project directory (the outer directory where the "backend" and "client" folders reside).
   - Run the following command to create a local virtual environment:

     ```shell
     python3 -m venv ./venv
     ```

   - In order to activate your local Python virtual environment:

     - If you are using a *nix system, run:

       ```shell
       source venv/bin/activate
       ```

     - If you are using a Windows system, run:

       ```shell
       venv\Scripts\activate
       ```

   - To install the needed Python libraries, run:

     ```shell
     pip install -r backend/requirements.txt
     ```
        Now your file structure should be like:  
        ----> PROJ_DIR  
        &emsp;|--> backend  
        &emsp;|--> client   
        &emsp;|--> venv  


   - For the following steps and any future development, activate the python virtual environment before you proceed
### 2) Configure project

For better debugging and usability, **Professional** distribution of PyCharm is recommended. It provides very nice features for Django development.
1. Import an existing project by selecting your project directory as ```$PROJ_DIR```. As interpreter choose `$PROJ_DIR/venv/bin/python3` for *uni or `$PROJ_DIR/venv/Scripts/python.exe` on Windows, if not auto-detected.
2. After the project is created go to `Preferences > Languages & Frameworks > Django`. Enable Django support. Point Django root project to `backend/` folder, settings - to `backend/backend/settings.py`, and manage script - to `backend/manage.py`.
3. In the top right conner, select the `Edit Configurations` in the run/debug configuration list on the main toolbar. Click on the `+` button and select `Django Server` to create a new configuration. Make sure the interpreter settings and other settings are correct.
4. In the `Environment` section, click on the button next to `Environment Variables`, click on the `+` button to create a new environment variable. Name is `CODE_ENV` and value is `dev`.
5. Click on the Run button to start the server.

If you are using VSCode, you can start the server by the following command:

- Windows:
    ```shell
    $Env:CODE_ENV="dev"
    python backend\manage.py runserver localhost:8000
    ```
- Linux/MacOS
    ```shell
    CODE_ENV=dev
    python backend\manage.py runserver localhost:8000
    ```
### 3) Set up Postgres Database
- The database (PostgreSQL, MongoDB) is handled using docker containers. In order to start only database run:     
    ```shell
    docker-compose -f docker-compose.yml up -d psqldb
    ```
- For PSQL database name, username and password are provided in `.env` or `dev.env`.

- To turn database off run: 
    ```shell
    docker-compose -f docker-compose.yml down
    ```

### 4) Migrate the database and collect static files
1. Set up the environment variable in your shell for dev
   - Windows:
       ```shell
       $Env:CODE_ENV="dev"
       ```
   - Linux/MacOS
       ```shell
       CODE_ENV=dev
       ```
2. To reflect changes to the models create migrations:
    ```shell
    python backend/manage.py makemigrations
    ```
3. You can apply those migrations by running:
    ```shell
    python backend/manage.py migrate
    ```