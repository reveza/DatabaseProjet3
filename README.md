# SET UP
1. Make sure you have nodejs installed https://nodejs.org/en/download/
2. Clone the repo into a file directory
### Starting the server
3. Go into the project's directory
4. Run `npm install` to install all dependencies on the server side
5. Run `npm start` to start the server on port 4000.
** If you have a problem with port 4000, go into `./bin/www` at line 15, and change the port manually AND go in `./client/package.json` at line 20 and change the proxy's port value `"proxy": "http://localhost:4000"`.

### Starting the client
6. Open another terminal tab 
7. Access the folder `./client`
8. Run `npm install` to install all the dependencies on the client side.
9. The web browser will open an instance of the client.
10. You are now ready to use the app!

# Clerk
### Rent a vehicle
1. Type in a valid vehicle id, otherwise you'll get an error. Ex: `1`
2. Type in a valid cellphone number, otherwise you'll get an error. Ex: `123-456-7890`
3. Type in a date with the correct format. Ex: `2019-11-29`
4. Type in time with the correct format. Ex: `11:00`
5. Type in a logical value for odometer.
6. Type in whatever for the cardname, cardnumber, as we are not using it further in this assignment.
7. You can type or not a confirmation number. If you do enter a confirmation number, it has to be valid. Ex: `1`
8. Press Rent Vehicle
9. Either a confirmation ticket will appear, or an error prompt will be generated.

### Return a vehicle
1. Type in a valid rentid. Ex: `1`
2. Type in a date with the correct format. Ex: `2019-11-29`
3. Type in time with the correct format. Ex: `11:00`
4. Type in logical values for odometer, fullTank and value.
5. Press Return Vehicle
6. Either a confirmation ticket will appear, or an error prompt will be generated.

# Daily Reports
### Rentals
Press Generate!

### Rentals per branch
Type in a location, ex: `Kerrisdale` and press Generate.

### Returns
Is not working currently

### Returns per branch
Is not working currently

# DB Operations
### List all tables
Click on View All to list all tables

### View one table
Type in the name of the desired table. You can select one from the "List all tables". EX: `vehicle`

### Update one table
1. Type in the name of the desired table (case-sensitive). Ex: `vehicle`
2. Type in the primary key in the following format (without quotes) to identify the row: ` vid = 304 `
3. Type in the column name and the value. If the value is a string, put double-quotes. If the value is a number, no double-quote is needed. Ex: ` vlicence = "EDCBA" `
4. Press Update Field button
5. Go back in View One Table, select "vehicle" table again, and observe the change.

### Add row to table
1. Type in the name of the desired table (case-sensitive). Ex: `branch`
2. Type in the tables' columns with the following syntax. Brackets included. Ex: `(location, city)`
3. Type in the values with the following syntax. Brackets included. Ex: `("Disney", "Orlando")`. If the value is TEXT, add double-quotes. If the value is a REAL or INTEGER, no quotes are needed.
4. Press `Add row` button
5. Validate your result in the `View one table` section to see if the value was added.

### Delete element from table
1. Type in the name of the desired table (case-sensitive). Ex: `branch`
2. Type in the values with the following syntax. Brackets included. Ex: `location="World"`. If the value is TEXT, add double-quotes. If the value is a REAL or INTEGER, no quotes are needed.
3. Press Delete
4. Validate your result in the `View one table` section to see if the value was deleted.

