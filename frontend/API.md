## Classes

<dl>
<dt><a href="#APIManager">APIManager</a></dt>
<dd></dd>
<dt><a href="#AuthAPI">AuthAPI</a></dt>
<dd></dd>
<dt><a href="#CommonAPI">CommonAPI</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#client">client</a></dt>
<dd><p>Axios client for authentication-related API requests.</p>
</dd>
<dt><a href="#getFusekiDatasets">getFusekiDatasets</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get Fuseki datasets.</p>
</dd>
<dt><a href="#getDatabaseTypes">getDatabaseTypes</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get database types for a specific database.</p>
</dd>
<dt><a href="#addDatabaseFile">addDatabaseFile</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to add a database file.</p>
</dd>
<dt><a href="#deleteDatabase">deleteDatabase</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to delete a database.</p>
</dd>
<dt><a href="#getTypePredicates">getTypePredicates</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get type predicates for a specific database and selected type.</p>
</dd>
<dt><a href="#generateQuery">generateQuery</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to generate a query.</p>
</dd>
<dt><a href="#getAllDatabase">getAllDatabase</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get all databases.</p>
</dd>
<dt><a href="#getAllMappings">getAllMappings</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get all mappings.</p>
</dd>
<dt><a href="#getAllExports">getAllExports</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get all exports.</p>
</dd>
<dt><a href="#checkDuplicateMappingName">checkDuplicateMappingName</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to check for duplicate mapping names.</p>
</dd>
<dt><a href="#getExportExcel">getExportExcel</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get an export in Excel format.</p>
</dd>
<dt><a href="#postImportExcel">postImportExcel</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to post an Excel import.</p>
</dd>
<dt><a href="#getPredicates">getPredicates</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to get predicates.</p>
</dd>
<dt><a href="#createCustomMapping">createCustomMapping</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to create a custom mapping.</p>
</dd>
<dt><a href="#isCustomMapping">isCustomMapping</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function to check if a mapping is custom.</p>
</dd>
<dt><a href="#customExport">customExport</a> ⇒ <code>Promise</code></dt>
<dd><p>Utility function for custom export.</p>
</dd>
<dt><a href="#getJWTToken">getJWTToken</a> ⇒ <code>string</code></dt>
<dd><p>Get the JWT token from Local Storage.</p>
</dd>
<dt><a href="#getJWTRefreshToken">getJWTRefreshToken</a> ⇒ <code>string</code></dt>
<dd><p>Get the JWT refresh token from Local Storage.</p>
</dd>
<dt><a href="#cleanJWTToken">cleanJWTToken</a></dt>
<dd><p>Clean up JWT tokens in Local Storage.</p>
</dd>
<dt><a href="#setLocalStorage">setLocalStorage</a></dt>
<dd><p>Set a key-value pair in Local Storage.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#App">App()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Main component representing the entire application.</p>
</dd>
<dt><a href="#Activate">Activate()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for activating a user account.</p>
</dd>
<dt><a href="#Copyright">Copyright(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for displaying copyright information.</p>
</dd>
<dt><a href="#Login">Login()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for the login page.</p>
</dd>
<dt><a href="#ResetPassword">ResetPassword()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>ResetPassword component handles the process of resetting a user&#39;s password.</p>
</dd>
<dt><a href="#ResetPasswordConfirm">ResetPasswordConfirm()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>ResetPasswordConfirm component handles the process of confirming a user&#39;s password reset.</p>
</dd>
<dt><a href="#Copyright">Copyright(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Copyright component that displays copyright information.</p>
</dd>
<dt><a href="#SignUp">SignUp()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>SignUp component handles the user registration process.</p>
</dd>
<dt><a href="#FileUpload">FileUpload()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for uploading a file to create a new database.</p>
</dd>
<dt><a href="#CustomMapping">CustomMapping()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for creating a custom mapping.</p>
</dd>
<dt><a href="#DataExport">DataExport()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Component for exporting data to a CSV file.</p>
</dd>
<dt><a href="#DataImport">DataImport()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Component for importing data from a CSV file.</p>
</dd>
<dt><a href="#FinishedItem">FinishedItem(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Component displaying finished items in a list.</p>
</dd>
<dt><a href="#MyTable">MyTable(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for a dynamic table with predicate and text input fields.</p>
</dd>
<dt><a href="#BigPictureHome">BigPictureHome()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for displaying a big picture on the home page.</p>
</dd>
<dt><a href="#MappingList">MappingList()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for displaying a list of mappings based on selected databases.</p>
</dd>
<dt><a href="#NavBar">NavBar()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for the navigation bar.</p>
</dd>
<dt><a href="#Overview">Overview()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>React component for displaying an overview of databases.</p>
</dd>
<dt><a href="#UserHome">UserHome()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Component representing the user&#39;s home page.</p>
</dd>
<dt><a href="#MainContextProvider">MainContextProvider(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Context provider for managing the main state of the application.</p>
</dd>
<dt><a href="#get">get(endpoint)</a> ⇒ <code>Promise</code></dt>
<dd><p>Make a GET request to the specified API endpoint.</p>
</dd>
<dt><a href="#post">post(endpoint, data)</a> ⇒ <code>Promise</code></dt>
<dd><p>Make a POST request to the specified API endpoint with the provided data.</p>
</dd>
<dt><a href="#postGetFile">postGetFile(endpoint, data)</a> ⇒ <code>Promise</code></dt>
<dd><p>Make a POST request to the specified API endpoint and expect a file in response.</p>
</dd>
<dt><a href="#put">put(endpoint, data)</a> ⇒ <code>Promise</code></dt>
<dd><p>Make a PUT request to the specified API endpoint with the provided data.</p>
</dd>
<dt><a href="#patch">patch(endpoint, data)</a> ⇒ <code>Promise</code></dt>
<dd><p>Make a PATCH request to the specified API endpoint with the provided data.</p>
</dd>
<dt><a href="#delete">delete(endpoint)</a> ⇒ <code>Promise</code></dt>
<dd><p>Make a DELETE request to the specified API endpoint.</p>
</dd>
<dt><a href="#post">post(endpoint, data)</a> ⇒ <code>Promise</code></dt>
<dd><p>Make a POST request to the specified API endpoint with the provided data.</p>
</dd>
</dl>

<a name="APIManager"></a>

## APIManager
**Kind**: global class  
<a name="new_APIManager_new"></a>

### new APIManager()
Utility class for making API requests using Axios.

<a name="AuthAPI"></a>

## AuthAPI
**Kind**: global class  
<a name="new_AuthAPI_new"></a>

### new AuthAPI()
Utility class for making authentication-related API requests.

<a name="CommonAPI"></a>

## CommonAPI
**Kind**: global class  
<a name="new_CommonAPI_new"></a>

### new CommonAPI()
Utility class for making common API requests.

<a name="client"></a>

## client
Axios client for authentication-related API requests.

**Kind**: global constant  
<a name="getFusekiDatasets"></a>

## getFusekiDatasets ⇒ <code>Promise</code>
Utility function to get Fuseki datasets.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  
<a name="getDatabaseTypes"></a>

## getDatabaseTypes ⇒ <code>Promise</code>
Utility function to get database types for a specific database.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| dbName | <code>string</code> | The name of the database. |

<a name="addDatabaseFile"></a>

## addDatabaseFile ⇒ <code>Promise</code>
Utility function to add a database file.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for adding a database file. |

<a name="deleteDatabase"></a>

## deleteDatabase ⇒ <code>Promise</code>
Utility function to delete a database.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for deleting a database. |

<a name="getTypePredicates"></a>

## getTypePredicates ⇒ <code>Promise</code>
Utility function to get type predicates for a specific database and selected type.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| dbName | <code>string</code> | The name of the database. |
| selectedType | <code>string</code> | The selected type. |

<a name="generateQuery"></a>

## generateQuery ⇒ <code>Promise</code>
Utility function to generate a query.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for generating a query. |

<a name="getAllDatabase"></a>

## getAllDatabase ⇒ <code>Promise</code>
Utility function to get all databases.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  
<a name="getAllMappings"></a>

## getAllMappings ⇒ <code>Promise</code>
Utility function to get all mappings.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for getting all mappings. |

<a name="getAllExports"></a>

## getAllExports ⇒ <code>Promise</code>
Utility function to get all exports.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for getting all exports. |

<a name="checkDuplicateMappingName"></a>

## checkDuplicateMappingName ⇒ <code>Promise</code>
Utility function to check for duplicate mapping names.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for checking duplicate mapping names. |

<a name="getExportExcel"></a>

## getExportExcel ⇒ <code>Promise</code>
Utility function to get an export in Excel format.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to a blob representing the file.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for getting an export in Excel format. |

<a name="postImportExcel"></a>

## postImportExcel ⇒ <code>Promise</code>
Utility function to post an Excel import.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for posting an Excel import. |

<a name="getPredicates"></a>

## getPredicates ⇒ <code>Promise</code>
Utility function to get predicates.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for getting predicates. |

<a name="createCustomMapping"></a>

## createCustomMapping ⇒ <code>Promise</code>
Utility function to create a custom mapping.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for creating a custom mapping. |

<a name="isCustomMapping"></a>

## isCustomMapping ⇒ <code>Promise</code>
Utility function to check if a mapping is custom.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for checking if a mapping is custom. |

<a name="customExport"></a>

## customExport ⇒ <code>Promise</code>
Utility function for custom export.

**Kind**: global constant  
**Returns**: <code>Promise</code> - A Promise that resolves to a blob representing the file.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for custom export. |

<a name="getJWTToken"></a>

## getJWTToken ⇒ <code>string</code>
Get the JWT token from Local Storage.

**Kind**: global constant  
**Returns**: <code>string</code> - The JWT token.  
<a name="getJWTRefreshToken"></a>

## getJWTRefreshToken ⇒ <code>string</code>
Get the JWT refresh token from Local Storage.

**Kind**: global constant  
**Returns**: <code>string</code> - The JWT refresh token.  
<a name="cleanJWTToken"></a>

## cleanJWTToken
Clean up JWT tokens in Local Storage.

**Kind**: global constant  
<a name="setLocalStorage"></a>

## setLocalStorage
Set a key-value pair in Local Storage.

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key for the Local Storage entry. |
| value | <code>any</code> | The value to be stored. |

<a name="App"></a>

## App() ⇒ <code>JSX.Element</code>
Main component representing the entire application.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The rendered React component.  
<a name="Activate"></a>

## Activate() ⇒ <code>JSX.Element</code>
React component for activating a user account.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Activate component.  
**Component**:   
<a name="Activate..verifyAccount"></a>

### Activate~verifyAccount()
Sends a request to the server to verify the user account.Updates the state based on the verification result.

**Kind**: inner method of [<code>Activate</code>](#Activate)  
<a name="Copyright"></a>

## Copyright(props) ⇒ <code>JSX.Element</code>
React component for displaying copyright information.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Copyright component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | React props for the Copyright component. |

<a name="Copyright..getHomePageURL"></a>

### Copyright~getHomePageURL() ⇒ <code>string</code>
Generates the current URL and the home page URL based on the current URL.

**Kind**: inner method of [<code>Copyright</code>](#Copyright)  
**Returns**: <code>string</code> - Home page URL.  
<a name="Login"></a>

## Login() ⇒ <code>JSX.Element</code>
React component for the login page.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Login component.  
**Component**:   
<a name="Login..handleSubmit"></a>

### Login~handleSubmit(e)
Handles the form submission, sends a request to the server for user authentication.Updates the state and redirects to the home page on successful login.Displays an alert on login failure.

**Kind**: inner method of [<code>Login</code>](#Login)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.SyntheticEvent</code> | The form submission event. |

<a name="ResetPassword"></a>

## ResetPassword() ⇒ <code>JSX.Element</code>
ResetPassword component handles the process of resetting a user's password.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The JSX element representing the ResetPassword component.  
<a name="ResetPassword..handleResetPassword"></a>

### ResetPassword~handleResetPassword()
Handles the reset password action.Validates the email, triggers the resetPassword API call, and updates the state accordingly.

**Kind**: inner method of [<code>ResetPassword</code>](#ResetPassword)  
<a name="ResetPasswordConfirm"></a>

## ResetPasswordConfirm() ⇒ <code>JSX.Element</code>
ResetPasswordConfirm component handles the process of confirming a user's password reset.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The JSX element representing the ResetPasswordConfirm component.  

* [ResetPasswordConfirm()](#ResetPasswordConfirm) ⇒ <code>JSX.Element</code>
    * [~handlePasswordChange(e)](#ResetPasswordConfirm..handlePasswordChange)
    * [~handleConfirmPasswordChange(e)](#ResetPasswordConfirm..handleConfirmPasswordChange)
    * [~handleResetPasswordConfirm()](#ResetPasswordConfirm..handleResetPasswordConfirm)

<a name="ResetPasswordConfirm..handlePasswordChange"></a>

### ResetPasswordConfirm~handlePasswordChange(e)
Handles the password input change and checks if the passwords match.

**Kind**: inner method of [<code>ResetPasswordConfirm</code>](#ResetPasswordConfirm)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.ChangeEvent.&lt;HTMLInputElement&gt;</code> | The input change event. |

<a name="ResetPasswordConfirm..handleConfirmPasswordChange"></a>

### ResetPasswordConfirm~handleConfirmPasswordChange(e)
Handles the confirm password input change and checks if the passwords match.

**Kind**: inner method of [<code>ResetPasswordConfirm</code>](#ResetPasswordConfirm)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.ChangeEvent.&lt;HTMLInputElement&gt;</code> | The input change event. |

<a name="ResetPasswordConfirm..handleResetPasswordConfirm"></a>

### ResetPasswordConfirm~handleResetPasswordConfirm()
Handles the reset password confirm action.Validates the password and confirm password, triggers the resetPasswordConfirm API call,and updates the state accordingly.

**Kind**: inner method of [<code>ResetPasswordConfirm</code>](#ResetPasswordConfirm)  
<a name="Copyright"></a>

## Copyright(props) ⇒ <code>JSX.Element</code>
Copyright component that displays copyright information.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The JSX element representing the Copyright component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. |

<a name="Copyright..getHomePageURL"></a>

### Copyright~getHomePageURL() ⇒ <code>string</code>
Generates the current URL and the home page URL based on the current URL.

**Kind**: inner method of [<code>Copyright</code>](#Copyright)  
**Returns**: <code>string</code> - Home page URL.  
<a name="SignUp"></a>

## SignUp() ⇒ <code>JSX.Element</code>
SignUp component handles the user registration process.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The JSX element representing the SignUp component.  

* [SignUp()](#SignUp) ⇒ <code>JSX.Element</code>
    * [~handlePasswordChange(e)](#SignUp..handlePasswordChange)
    * [~handleConfirmPasswordChange(e)](#SignUp..handleConfirmPasswordChange)
    * [~handleSubmit(e)](#SignUp..handleSubmit)

<a name="SignUp..handlePasswordChange"></a>

### SignUp~handlePasswordChange(e)
Handles the password input change and checks if the passwords match.

**Kind**: inner method of [<code>SignUp</code>](#SignUp)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.ChangeEvent.&lt;HTMLInputElement&gt;</code> | The input change event. |

<a name="SignUp..handleConfirmPasswordChange"></a>

### SignUp~handleConfirmPasswordChange(e)
Handles the confirm password input change and checks if the passwords match.

**Kind**: inner method of [<code>SignUp</code>](#SignUp)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.ChangeEvent.&lt;HTMLInputElement&gt;</code> | The input change event. |

<a name="SignUp..handleSubmit"></a>

### SignUp~handleSubmit(e)
Handles the form submission for user registration.Validates input fields, checks for password match, and triggers the signup API call.Displays appropriate alerts based on the response or error.

**Kind**: inner method of [<code>SignUp</code>](#SignUp)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.FormEvent.&lt;HTMLFormElement&gt;</code> | The form submission event. |

<a name="FileUpload"></a>

## FileUpload() ⇒ <code>JSX.Element</code>
React component for uploading a file to create a new database.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - JSX.Element  
**Component**:   

* [FileUpload()](#FileUpload) ⇒ <code>JSX.Element</code>
    * [~onDrop](#FileUpload..onDrop) ⇒ <code>void</code>
    * [~sendFileContent(fileContent)](#FileUpload..sendFileContent) ⇒ <code>void</code>
    * [~handleSubmit()](#FileUpload..handleSubmit) ⇒ <code>void</code>

<a name="FileUpload..onDrop"></a>

### FileUpload~onDrop ⇒ <code>void</code>
Callback function for handling the file drop event.

**Kind**: inner constant of [<code>FileUpload</code>](#FileUpload)  

| Param | Type | Description |
| --- | --- | --- |
| acceptedFiles | <code>Array.&lt;File&gt;</code> | The accepted files dropped into the drop zone. |

<a name="FileUpload..sendFileContent"></a>

### FileUpload~sendFileContent(fileContent) ⇒ <code>void</code>
Function to send file content to the server for database creation.

**Kind**: inner method of [<code>FileUpload</code>](#FileUpload)  

| Param | Type | Description |
| --- | --- | --- |
| fileContent | <code>string</code> | The content of the uploaded file. |

<a name="FileUpload..handleSubmit"></a>

### FileUpload~handleSubmit() ⇒ <code>void</code>
Function to handle form submission.

**Kind**: inner method of [<code>FileUpload</code>](#FileUpload)  
<a name="CustomMapping"></a>

## CustomMapping() ⇒ <code>JSX.Element</code>
React component for creating a custom mapping.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - JSX.Element  
**Component**:   

* [CustomMapping()](#CustomMapping) ⇒ <code>JSX.Element</code>
    * [~handleMappingNameChange(event)](#CustomMapping..handleMappingNameChange)
    * [~handleDatabaseChange(event)](#CustomMapping..handleDatabaseChange)
    * [~handleSparqlCodeChange(event)](#CustomMapping..handleSparqlCodeChange)
    * [~handleSubmit()](#CustomMapping..handleSubmit)

<a name="CustomMapping..handleMappingNameChange"></a>

### CustomMapping~handleMappingNameChange(event)
Event handler for handling changes in the mapping name input.

**Kind**: inner method of [<code>CustomMapping</code>](#CustomMapping)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>React.ChangeEvent.&lt;HTMLInputElement&gt;</code> | The change event object. |

<a name="CustomMapping..handleDatabaseChange"></a>

### CustomMapping~handleDatabaseChange(event)
Event handler for handling changes in the database selection.

**Kind**: inner method of [<code>CustomMapping</code>](#CustomMapping)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>React.ChangeEvent.&lt;{value: unknown}&gt;</code> | The change event object. |

<a name="CustomMapping..handleSparqlCodeChange"></a>

### CustomMapping~handleSparqlCodeChange(event)
Event handler for handling changes in the SparQL code input.

**Kind**: inner method of [<code>CustomMapping</code>](#CustomMapping)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>React.ChangeEvent.&lt;HTMLTextAreaElement&gt;</code> | The change event object. |

<a name="CustomMapping..handleSubmit"></a>

### CustomMapping~handleSubmit()
Event handler for handling form submission.

**Kind**: inner method of [<code>CustomMapping</code>](#CustomMapping)  
<a name="DataExport"></a>

## DataExport() ⇒ <code>JSX.Element</code>
Component for exporting data to a CSV file.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The JSX element representing the DataExport component.  

* [DataExport()](#DataExport) ⇒ <code>JSX.Element</code>
    * [~handleDatabaseChange(event)](#DataExport..handleDatabaseChange)
    * [~handleMappingChange(event)](#DataExport..handleMappingChange)
    * [~handleFilterChange(data)](#DataExport..handleFilterChange)
    * [~handleExport()](#DataExport..handleExport)

<a name="DataExport..handleDatabaseChange"></a>

### DataExport~handleDatabaseChange(event)
Handles the change event for selecting a database.

**Kind**: inner method of [<code>DataExport</code>](#DataExport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event object. |

<a name="DataExport..handleMappingChange"></a>

### DataExport~handleMappingChange(event)
Handles the change event for selecting a mapping.

**Kind**: inner method of [<code>DataExport</code>](#DataExport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event object. |

<a name="DataExport..handleFilterChange"></a>

### DataExport~handleFilterChange(data)
Handles the change event for updating filters.

**Kind**: inner method of [<code>DataExport</code>](#DataExport)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>array</code> | The updated filter data. |

<a name="DataExport..handleExport"></a>

### DataExport~handleExport()
Handles the export button click event.

**Kind**: inner method of [<code>DataExport</code>](#DataExport)  
<a name="DataImport"></a>

## DataImport() ⇒ <code>JSX.Element</code>
Component for importing data from a CSV file.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The JSX element representing the DataImport component.  

* [DataImport()](#DataImport) ⇒ <code>JSX.Element</code>
    * [~onDrop](#DataImport..onDrop)
    * [~handleDatabaseChange(event)](#DataImport..handleDatabaseChange)
    * [~handleMappingChange(event)](#DataImport..handleMappingChange)
    * [~handleExportChange(event)](#DataImport..handleExportChange)
    * [~handleUpload()](#DataImport..handleUpload)

<a name="DataImport..onDrop"></a>

### DataImport~onDrop
Handles the file drop event.

**Kind**: inner constant of [<code>DataImport</code>](#DataImport)  

| Param | Type | Description |
| --- | --- | --- |
| acceptedFiles | <code>Array.&lt;File&gt;</code> | The array of accepted files. |

<a name="DataImport..handleDatabaseChange"></a>

### DataImport~handleDatabaseChange(event)
Handles the change event for selecting a database.

**Kind**: inner method of [<code>DataImport</code>](#DataImport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event object. |

<a name="DataImport..handleMappingChange"></a>

### DataImport~handleMappingChange(event)
Handles the change event for selecting a mapping.

**Kind**: inner method of [<code>DataImport</code>](#DataImport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event object. |

<a name="DataImport..handleExportChange"></a>

### DataImport~handleExportChange(event)
Handles the change event for selecting an export value.

**Kind**: inner method of [<code>DataImport</code>](#DataImport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event object. |

<a name="DataImport..handleUpload"></a>

### DataImport~handleUpload()
Handles the upload button click event.

**Kind**: inner method of [<code>DataImport</code>](#DataImport)  
<a name="FinishedItem"></a>

## FinishedItem(props) ⇒ <code>JSX.Element</code>
Component displaying finished items in a list.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The JSX element representing the FinishedItem component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. |

<a name="MyTable"></a>

## MyTable(props) ⇒ <code>JSX.Element</code>
React component for a dynamic table with predicate and text input fields.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - MyTable component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component props. |
| props.allPredicates | <code>Array.&lt;string&gt;</code> | An array of available predicates for selection. |
| props.onDataUpdate | <code>function</code> | A callback function to handle data updates. |


* [MyTable(props)](#MyTable) ⇒ <code>JSX.Element</code>
    * [~handlePredicateChange(index, value)](#MyTable..handlePredicateChange)
    * [~handleTextChange(index, value)](#MyTable..handleTextChange)
    * [~handleAddRow()](#MyTable..handleAddRow)
    * [~handleDeleteRow(index)](#MyTable..handleDeleteRow)

<a name="MyTable..handlePredicateChange"></a>

### MyTable~handlePredicateChange(index, value)
Handles changes in the selected predicate for a specific row.

**Kind**: inner method of [<code>MyTable</code>](#MyTable)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the row in the data array. |
| value | <code>string</code> | The selected predicate value. |

<a name="MyTable..handleTextChange"></a>

### MyTable~handleTextChange(index, value)
Handles changes in the text input for a specific row.

**Kind**: inner method of [<code>MyTable</code>](#MyTable)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the row in the data array. |
| value | <code>string</code> | The text input value. |

<a name="MyTable..handleAddRow"></a>

### MyTable~handleAddRow()
Adds a new row to the table.

**Kind**: inner method of [<code>MyTable</code>](#MyTable)  
<a name="MyTable..handleDeleteRow"></a>

### MyTable~handleDeleteRow(index)
Deletes a row from the table.

**Kind**: inner method of [<code>MyTable</code>](#MyTable)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the row to be deleted. |

<a name="BigPictureHome"></a>

## BigPictureHome() ⇒ <code>JSX.Element</code>
React component for displaying a big picture on the home page.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - BigPictureHome component.  
**Component**:   
<a name="MappingList"></a>

## MappingList() ⇒ <code>JSX.Element</code>
React component for displaying a list of mappings based on selected databases.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - MappingList component.  
**Component**:   
<a name="MappingList..handleDatabaseChange"></a>

### MappingList~handleDatabaseChange(event)
Handles the change of the selected database.

**Kind**: inner method of [<code>MappingList</code>](#MappingList)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | The event object from the database select change. |

<a name="NavBar"></a>

## NavBar() ⇒ <code>JSX.Element</code>
React component for the navigation bar.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - NavBar component.  
**Component**:   
<a name="NavBar..handleLogout"></a>

### NavBar~handleLogout()
Handles the logout action.Cleans JWT tokens from local storage, updates login state, and navigates to the home page.

**Kind**: inner method of [<code>NavBar</code>](#NavBar)  
<a name="Overview"></a>

## Overview() ⇒ <code>JSX.Element</code>
React component for displaying an overview of databases.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Overview component.  
**Component**:   

* [Overview()](#Overview) ⇒ <code>JSX.Element</code>
    * [~handleDelete(databaseName)](#Overview..handleDelete)
    * [~handleExport(databaseName)](#Overview..handleExport)

<a name="Overview..handleDelete"></a>

### Overview~handleDelete(databaseName)
Handles the delete action for a database.

**Kind**: inner method of [<code>Overview</code>](#Overview)  

| Param | Type | Description |
| --- | --- | --- |
| databaseName | <code>string</code> | The name of the database to delete. |

<a name="Overview..handleExport"></a>

### Overview~handleExport(databaseName)
Handles the export action for a database.

**Kind**: inner method of [<code>Overview</code>](#Overview)  

| Param | Type | Description |
| --- | --- | --- |
| databaseName | <code>string</code> | The name of the database to export. |

<a name="UserHome"></a>

## UserHome() ⇒ <code>JSX.Element</code>
Component representing the user's home page.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The rendered React component.  
<a name="MainContextProvider"></a>

## MainContextProvider(props) ⇒ <code>JSX.Element</code>
Context provider for managing the main state of the application.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The rendered React component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | React component props. |
| props.children | <code>React.ReactNode</code> | Child components to be wrapped by the context provider. |

<a name="get"></a>

## get(endpoint) ⇒ <code>Promise</code>
Make a GET request to the specified API endpoint.

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The API endpoint. |

<a name="post"></a>

## post(endpoint, data) ⇒ <code>Promise</code>
Make a POST request to the specified API endpoint with the provided data.

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The API endpoint. |
| data | <code>Object</code> | The data to be sent in the request body. |

<a name="postGetFile"></a>

## postGetFile(endpoint, data) ⇒ <code>Promise</code>
Make a POST request to the specified API endpoint and expect a file in response.

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves to a blob representing the file.  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The API endpoint. |
| data | <code>Object</code> | The data to be sent in the request body. |

<a name="put"></a>

## put(endpoint, data) ⇒ <code>Promise</code>
Make a PUT request to the specified API endpoint with the provided data.

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The API endpoint. |
| data | <code>Object</code> | The data to be sent in the request body. |

<a name="patch"></a>

## patch(endpoint, data) ⇒ <code>Promise</code>
Make a PATCH request to the specified API endpoint with the provided data.

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The API endpoint. |
| data | <code>Object</code> | The data to be sent in the request body. |

<a name="delete"></a>

## delete(endpoint) ⇒ <code>Promise</code>
Make a DELETE request to the specified API endpoint.

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The API endpoint. |

<a name="post"></a>

## post(endpoint, data) ⇒ <code>Promise</code>
Make a POST request to the specified API endpoint with the provided data.

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves to the response data.  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The API endpoint. |
| data | <code>Object</code> | The data to be sent in the request body. |

