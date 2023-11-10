# CS130-Group-Project - Excel Interface
Microsoft Excel is the number one application used by engineers around the world. It is often used as a lightweight relational database, where each sheet represents a table with its rows and columns. However, unlike a real relational database, it is not possible to query Excel with SQL. Storing the data in a real relational database would alleviate this problem. 

Moreover, if the data represented in Excel sheets is heavily interrelated, it makes more sense to store them in a knowledge base (like Fuseki) and query them with SPARQL (similar to SQL but for knowledge bases). While this can be a nice way to query, engineers still prefer to update the data through Excel.

This project shall develop a web application that allows engineers to define one or more mapping from a knowledge base to an Excel sheet. Using each mapping, a user can generate and download (from the knowledge base) an Excel sheet based on that mapping. Such a sheet can be used by the engineer to add/delete/edit the data. The modified sheet can then be uploaded back to the knowledge base to update it.

This web application will give the user a UI to assist in specifying mappings and storing the mappings in a database. It will also give the UI to import./export the Excel sheet based on a mapping. The app can be implemented with any technology stack, but the knowledge base needs to be Fuseki.
![image](https://github.com/MubaiHua/CS130-Group-Project/assets/76729945/6a83af7e-03a4-4ede-8978-3f445fb42d29)

To run the application locally, please refer to the README.md file in both the backend and frontend folder