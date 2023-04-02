let activeDatabases = [];
const indexedDB = window.indexedDB;

export class IndexedDBService {
    static async openDBConnection(dbName) {
        if (!activeDatabases.find((_db) => _db.name === dbName)) {
            return new Promise((resolve) => {
                const _nextConnection = indexedDB.open(dbName);
                let _db = {};

                _nextConnection.onsuccess = (e) => {
                    _db.name = dbName;
                    _db.db = e.target.result;

                    activeDatabases.push(_db);

                    resolve(_db);
                };

                _nextConnection.onupgradeneeded = (e) => {
                    _db.stores = [];
                    _db.stores.push(
                        IndexedDBService.addDBStore(
                            e.target.result,
                            "userWallets",
                            "tableKey",
                            [
                                "addressOrName",
                                "startMonitoringDate",
                                "startMonitoringBalance",
                                "protocol",
                                "tableKey",
                            ]
                        )
                    );
                };
            });
        }
    }

    static addDBStore(db, storeName, storeKeyName, fields) {
        const _store = db.createObjectStore(storeName, {
            ...(storeKeyName && { keyPath: storeKeyName }),
        });

        fields.forEach((field) =>
            _store.createIndex(field, field, { unique: false })
        );

        return _store;
    }

    static async getStoredValue(dbName, storeName) {
        const db = activeDatabases.find((_db) => _db.name === dbName);

        if (!!db) {
            return new Promise((resolve) => {
                const _store = db.db
                    .transaction(storeName)
                    .objectStore(storeName);

                _store.getAll().onsuccess = (e) => {
                    resolve(e.target.result);
                };
            });
        }
    }

    static saveStoredValue(dbName, storeName, val) {
        const db = activeDatabases.find((_db) => _db.name === dbName);

        if (!!db) {
            db.db
                .transaction(storeName, "readwrite")
                .objectStore(storeName)
                .add(val);
        }
    }

    static removeStoredValue(dbName, storeName, valKey) {
        const db = activeDatabases.find((_db) => _db.name === dbName);

        if (!!db) {
            db.db
                .transaction(storeName, "readwrite")
                .objectStore(storeName)
                .delete(valKey);
        }
    }

    static removeDBConnection() {
        //
    }
}
