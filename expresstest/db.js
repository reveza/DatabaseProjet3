var sqlite3 = require('sqlite3').verbose();
let _db;

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    _db = new sqlite3.Database(':memory:'); // TODO: Change this to make it a file
    _db.serialize(function() {

        _db.run('CREATE TABLE lorem (info TEXT)');

        var stmt = _db.prepare(
            'INSERT INTO lorem VALUES (?)');

        for (var i = 0; i < 10; i++) {
          stmt.run('Ipsum ' + i);
        }

        stmt.finalize();

        _db.run('CREATE TABLE branch ('+
        'location TEXT,city TEXT,PRIMARY KEY(location, city))');

        _db.run('INSERT INTO branch (location, city) '
        + 'VALUES '
        + '("Kerrisdale", "Vancouver"),'
        + '("Kitsilano", "Vancouver"),'
        + '("Downtown", "Vancouver"),'
        + '("Metrotown", "Burnaby"),'
        + '("SFU", "Burnaby"), '
        + '("Central Park", "Burnaby")');
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
