
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
4. 5. Validate your result in the `View one table` section to see if the value was deleted.

