var sqlite3 = require('sqlite3').verbose();
let _db;

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    _db = new sqlite3.Database('./sampledb.db'); // TODO: Change this to make it a file
    _db.serialize(function() {
        _db.exec('PRAGMA foreign_keys = ON;', function(error)  {
            if (error){
                console.error("Pragma statement didn't work.")
            } else {
                console.log("Foreign Key Enforcement is on.")
            }
        });

        _db.run('CREATE TABLE if not exists lorem (info TEXT)');
        var stmt = _db.prepare('INSERT INTO lorem VALUES (?);');
      
        for (var i = 0; i < 10; i++) {
          stmt.run('Ipsum ' + i);
        }
        stmt.finalize();

        _db.run('CREATE TABLE if not exists rentals (' +
            'rid INTEGER PRIMARY KEY, ' +
            'vid REAL, ' +
            'cellphone REAL, ' +
            'fromDate REAL, ' +
            'fromTime REAL, ' +
            'toDate REAL, ' + 
            'toTime REAL, ' + 
            'odometer REAL, ' +
            'cardName TEXT, ' +
            'cardNo REAL, ' +
            'expDate REAL, ' +
            'confNo REAL)');
            // 'FOREIGN_KEY (cellphone) REFERENCES customers (cellphone) ON DELETE CASCADE ON UPDATE NO ACTION, '+
            // 'FOREIGN_KEY (confNo) REFERENCES reservations (confNo)

        _db.run('CREATE TABLE if not exists returns (rid INTEGER PRIMARY KEY NOT NULL, date REAL, time REAL, odometer REAL' +
        ', fulltank REAL, value REAL, FOREIGN KEY(rid) REFERENCES rentals(rid) ON DELETE CASCADE ON UPDATE NO ACTION)');
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