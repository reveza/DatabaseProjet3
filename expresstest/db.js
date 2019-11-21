var sqlite3 = require('sqlite3').verbose();
let _db;

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    _db = new sqlite3.Database('./sampledb.db');
    _db.serialize(function() {
        _db.exec('PRAGMA foreign_keys = ON;', function(error)  {
            if (error){
                console.error("Pragma statement didn't work.");
            } else {
                console.log("Foreign Key Enforcement is on.");
            }
        });

        _db.run('CREATE TABLE if not exists rentals (' +
            'rid INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'vid REAL NOT NULL, ' +
            'cellphone REAL NOT NULL, ' +
            'fromDate REAL NOT NULL, ' +
            'fromTime REAL NOT NULL, ' +
            'toDate REAL NOT NULL, ' +
            'toTime REAL NOT NULL, ' +
            'odometer REAL NOT NULL, ' +
            'cardName TEXT NOT NULL, ' +
            'cardNo REAL NOT NULL, ' +
            'expDate REAL NOT NULL, ' +
            'confNo REAL, ' +
            'FOREIGN KEY (vid) REFERENCES vehicle (vid) ON DELETE NO ACTION ON UPDATE CASCADE,' +
            'FOREIGN KEY (cellphone) REFERENCES customer (cellphone) ON DELETE NO ACTION ON UPDATE CASCADE, '+
            'FOREIGN KEY (confNo) REFERENCES reservation (confNo) ON DELETE NO ACTION ON UPDATE NO ACTION);');

        _db.run('CREATE TABLE if not exists returns (rid INTEGER PRIMARY KEY, '+
        'date REAL NOT NULL, time REAL NOT NULL, odometer REAL NOT NULL' +
        ', fulltank REAL NOT NULL, value REAL NOT NULL, ' +
        'FOREIGN KEY(rid) REFERENCES rentals(rid) ON DELETE NO ACTION ON UPDATE CASCADE)');

        _db.run('CREATE TABLE if not exists branch ('+
        'location TEXT,city TEXT,PRIMARY KEY(location, city))');

        _db.run('CREATE TABLE if not exists vehicletype ('+
        'vtname TEXT PRIMARY KEY, features TEXT, wrate REAL, drate REAL, '
        + 'hrate REAL, wirate REAL, dirate REAL, hirate REAL, krate REAL)');

        _db.run('CREATE TABLE if not exists vehicle ('+
        'vid INTEGER, vlicense TEXT, make TEXT, model TEXT, year INTEGER, color TEXT, odometer REAL, status TEXT, ' +
        'vtname TEXT, location TEXT, city TEXT, PRIMARY KEY(vid), FOREIGN KEY(location, city) REFERENCES branch(location, city) ' +
        'ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY(vtname) REFERENCES vehicletype(vtname) ON DELETE CASCADE ON UPDATE NO ACTION)');

        _db.run('CREATE TABLE if not exists customer (cellphone TEXT PRIMARY KEY, '
        + 'name TEXT, address TEXT, dlicense TEXT)');

        _db.run('CREATE TABLE if not exists reservation ('
        + 'confNo INTEGER PRIMARY KEY AUTOINCREMENT, '
        + 'vtname TEXT, '
        + 'cellphone TEXT, '
        + 'fromDate TEXT, '
        + 'fromTime TEXT, '
        + 'toDate TEXT, '
        + 'toTime TEXT, '
        + 'FOREIGN KEY(vtname) REFERENCES vehicletype(vtname)'
        + 'ON DELETE SET NULL ON UPDATE CASCADE, '
        + 'FOREIGN KEY(cellphone) REFERENCES customer(cellphone)'
        + 'ON DELETE SET NULL ON UPDATE CASCADE)'
      );

        _db.run('INSERT OR IGNORE INTO branch (location, city) '
        + 'VALUES '
        + '("Kerrisdale", "Vancouver"),'
        + '("Kitsilano", "Vancouver"),'
        + '("Downtown", "Vancouver"),'
        + '("Metrotown", "Burnaby"),'
        + '("SFU", "Burnaby"), '
        + '("Central Park", "Burnaby")');

        _db.run('INSERT OR IGNORE INTO vehicletype (vtname, features, wrate, drate, hrate, wirate, dirate, hirate, krate) '
        + 'VALUES '
        + '("Economy", "GPS", 150, 40, 8, 12, 4, 1, 1), '
        + '("Compact", "GPS", 150.00, 40.00, 8.00, 12.00, 4.00, 1.00, 0.50),' +
        '("Mid-size", "GPS", 200.00, 50.00, 10.00, 15.00, 5.00, 1.00, 0.50),' +
        '("Standard", "GPS", 200.00, 50.00, 10.00, 15.00, 5.00, 1.00, 0.50),' +
        '("Full-size", "GPS", 250.00, 60.00, 20.00, 15.00, 5.00, 1.00, 0.50),' +
        '("SUV", "GPS & Bluetooth", 400.00, 80.00, 20.00, 30.00, 10.00, 3.00, 1.00),' +
        '("Truck", "GPS & Radio", 375.00, 80.00, 20.00, 30.00, 10.00, 3.00, 1.00)');

        _db.run('INSERT OR IGNORE INTO vehicle (vid, vlicense, make, model, year, color, ' +
        'odometer, status, vtname, location, city) VALUES ' +
        '(1, "HELLO", "BMW", "X5", 2019, "White", 10, "for_sale", "Standard", "Kerrisdale", "Vancouver"), ' +
        '(11, "AB123C", "BMW", "X6", 2019, "Black", 10, "for_rent", "Standard", "Kerrisdale", "Vancouver"), ' +
        '(304, "CS304", "Mercedes", "ML", 2019, "Black", 10, "for_rent", "SUV", "Kitsilano", "Vancouver"), ' +
        '(12345, "B75J2L", "Mercedes", "GLE", 2019, "Black", 15, "for_rent", "SUV", "Downtown", "Vancouver"), ' +
        '(12342, "PK923D", "Range Rover", "Velar", 2018, "White", 10, "for_rent", "SUV", "Downtown", "Vancouver"), ' +
        '(99, "VS25T3", "Mazda", "3", 2018, "Black", 20, "for_rent", "Compact", "Metrotown", "Burnaby"), ' +
        '(25, "1L023C", "BMW", "X6", 2019, "Black", 10, "for_sale", "Standard", "Metrotown", "Burnaby"), ' +
        '(23, "291023", "Nissan", "Versa Note", 2010, "Red", 90, "for_rent", "Economy", "Metrotown", "Burnaby"), ' +
        '(9, "L02343", "Nissan", "Versa Note", 2010, "Silver", 100, "for_rent", "Economy", "Metrotown", "Burnaby"), ' +
        '(15, "98ASKW", "Chevrolet", "Malibu", 2015, "White", 50, "for_sale", "Mid-size", "Kerrisdale", "Vancouver"), ' +
        '(20, "02N23", "BMW", "X6", 2019, "Black", 100, "for_rent", "Standard", "SFU", "Burnaby"), ' +
        '(21, "9OUHWM", "Chevrolet", "Malibu", 2015, "White", 100, "for_sale", "Mid-size", "Kerrisdale", "Vancouver"), ' +
        '(2020, "IU692C", "Kia", "Optima", 2008, "Black", 120, "for_rent", "Mid-size", "SFU", "Burnaby"), ' +
        '(88, "I23LO8", "Kia", "Optima", 2008, "Black", 110, "for_rent", "Mid-size", "Central Park", "Burnaby"), ' +
        '(77, "91B9JS", "Toyota", "Camry", 2009, "White", 100, "for_rent", "Full-size", "Kerrisdale", "Vancouver"), ' +
        '(1010, "LIASN2", "BMW", "X6", 2019, "Black", 120, "for_rent", "Standard", "Kerrisdale", "Vancouver"), ' +
        '(998, "MIA10S", "Toyota", "Camry", 2010, "Red", 100, "for_rent", "Full-size", "Central Park", "Burnaby"), ' +
        '(200, "398BCS", "Nissan", "Titan", 2001, "White", 120, "for_rent", "Truck", "Kerrisdale", "Vancouver"), ' +
        '(1200, "917H23", "Nissan", "Titan", 2001, "Red", 120, "for_rent", "Truck", "Metrotown", "Burnaby")');



      });
}

function getDb() {
    if (!_db) {
        console.warn("Db has not been initialized. Please called init first.");
        return null;
    }

    return _db;
}

module.exports = {
    getDb,
    initDb
};
