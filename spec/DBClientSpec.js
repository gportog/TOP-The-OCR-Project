const Cloudant = require('@cloudant/cloudant');

const jasmine = require('jasmine');
const DBClient = require('../api/lib/DBClient');
const JSONValidator = require('../api/lib/JSONValidator');

let jasmineTimeout = 10000;

describe('DBClient tests setup', () => {
    beforeAll(() => {
        const user = process.env.CLOUDANT_USER;
        const pw = process.env.CLOUDANT_PW;
        this._client = Cloudant({ account: user, password: pw });
    });

    beforeEach((done) => {
        const menuEntry = {
            "_id": "test",
            "restaurant": {
                "name": "test",
                "address": "test",
                "city": "test"
            },
            "file": "test",
            "ocr": []
        }
        this._client.db.create('menus-test', (err) => {
            if (err) return done(err);
            const database = this._client.db.use('menus-test');
            database.insert(menuEntry, (err, data) => {
                if (err) return done(err);
                return done();
            });
        });
    }, jasmineTimeout);

    afterEach((done) => {
        this._client.db.destroy('menus-test', (err, data) => {
            if (err) return done(err);
            return done();
        });
    }, jasmineTimeout);

    describe('DBClient constructor', () => {
        it('should throws an error when db param is different than undefined/string', () => {
            expect(function () { new DBClient(1); })
                .toThrowError('Wrong type for parameter db. Received number, expected string');
        });

        it('should have a null value for _db when db param is empty', () => {
            let dbInstance = new DBClient();
            expect(dbInstance._db).toBeNull();
        });

        it('should have a string value for _db when db param is string', () => {
            let isString = true;
            let dbInstance = new DBClient('menus-test');
            if (typeof dbInstance._db !== 'string') isString = false;
            expect(isString).toBe(true);
        });

    });

    describe('DBClient.get', () => {
        it('should throws a NO_DB_ERROR when not initiating the constructor db param and trying to get the database without using the options.db param', () => {
            let dbInstance = new DBClient();
            expect(function () { dbInstance.get(); })
                .toThrowError('This client has no default databaset set, and one was not provided.');
        });

        it('should return an array of valid menus schema when initiating the db menus on the constructor', async () => {
            let menusType;
            let dbInstance = new DBClient('menus-test');
            let jsonValidator = new JSONValidator();
            let menus = await dbInstance.get({ schemaName: 'menus' });
            let checkMenus = await jsonValidator.sanitizeList(menus, 'menus');
            if (typeof checkMenus === 'object') menusType = 'object'
            expect(menusType).toEqual('object');
        }, jasmineTimeout);

        it('should return an array of valid menus schema when not initiating the constructor db param and trying to get the database using the options.db === menus param', async () => {
            let menusType;
            let dbInstance = new DBClient();
            let jsonValidator = new JSONValidator();
            let menus = await dbInstance.get({ db: 'menus-test', schemaName: 'menus' });
            let checkMenus = await jsonValidator.sanitizeList(menus, 'menus');
            if (typeof checkMenus === 'object') menusType = 'object'
            expect(menusType).toEqual('object');
        }, jasmineTimeout);

        it('should throws an error when getting an non existing db', async () => {
            let errMessage;
            let dbInstance = new DBClient('non-existing-db');
            try {
                await dbInstance.get()
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toEqual('Database does not exist.');
        }, jasmineTimeout);

    });
    describe('DBClient.getById', () => {
        it('should throws a TYPE_MISMATCH_ERROR error when id param is different than string', async () => {
            let errMessage;
            let dbInstance = new DBClient('menus-test');
            try {
                await dbInstance.getById(1);
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toBe('Wrong type for parameter id. Received number, expected string');
        });

        it('should have a valid menus schema object when passed a valid id and a valid db', async () => {
            let menuType;
            let dbInstance = new DBClient('menus-test');
            let jsonValidator = new JSONValidator();
            let _id = 'test';
            let menu = await dbInstance.getById(_id, { schemaName: 'menus' });
            let checkMenu = await jsonValidator.sanitize(menu, 'menus');
            if (typeof checkMenu === 'object') menuType = 'object'
            expect(menuType).toEqual('object');
        }, jasmineTimeout);

        it('should throws an error when a non existing ID is passed', async () => {
            let errMessage;
            let dbInstance = new DBClient('menus-test');
            let _id = 'non-existing-id';
            try {
                await dbInstance.getById(_id);
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toBe('missing');
        }, jasmineTimeout);
    });

    describe('DBClient.insert', () => {
        it('should throws an INVALID_SCHEMA_FIELDS_ERROR error when the object passed does not match with menus schema', async () => {
            let errMessage;
            let dbInstance = new DBClient('menus-test');
            let menuEntry = {
                "restaurant": {
                    "name": "test",
                    "address": "test",
                    "city": "test"
                },
                "ocr": []
            }
            try {
                await dbInstance.insert(menuEntry, { schemaName: 'menus' });
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toMatch('menus schema must be like that');
        }, jasmineTimeout);

        it('should have a valid menus schema object when passed an object that matches with menus schema and a valid db', async () => {
            let menuType;
            let dbInstance = new DBClient('menus-test');
            let jsonValidator = new JSONValidator();
            let menuEntry = {
                "restaurant": {
                    "name": "test",
                    "address": "test",
                    "city": "test"
                },
                "file": "test",
                "ocr": []
            }
            let menu = await dbInstance.insert(menuEntry, { schemaName: 'menus' });
            let checkMenu = await jsonValidator.sanitize(menu, 'menus');
            if (typeof checkMenu === 'object') menuType = 'object'
            expect(menuType).toEqual('object');
        }, jasmineTimeout);
    });

    describe('DBClient.update', () => {
        it('should throws an INVALID_SCHEMA_FIELDS_ERROR error when the object passed does not match with menus schema', async () => {
            let errMessage;
            let dbInstance = new DBClient('menus-test');
            let menuEntry = {
                "restaurant": {
                    "name": "test",
                    "address": "test",
                    "city": "test"
                },
                "ocr": []
            }
            try {
                await dbInstance.update(menuEntry, { schemaName: 'menus' });
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toMatch('menus schema must be like that');
        }, jasmineTimeout);

        it('should update the object when passed an object that matches with menus schema and a valid db', async () => {
            let menuType;
            let dbInstance = new DBClient('menus-test');
            let _id = 'test';
            let menu = await dbInstance.getById(_id, { schemaName: 'menus' });
            let jsonValidator = new JSONValidator();
            let menuEntry = {
                "_id": menu._id,
                "_rev": menu._rev,
                "restaurant": {
                    "name": "test2",
                    "address": "test",
                    "city": "test"
                },
                "file": "test",
                "ocr": []
            }
            let updateMenu = await dbInstance.update(menuEntry, { schemaName: 'menus' });
            let checkMenu = await jsonValidator.sanitize(updateMenu, 'menus');
            if (typeof checkMenu === 'object') menuType = 'object'
            expect(menuType).toEqual('object');
        }, jasmineTimeout);
    });

    describe('DBClient.delete', () => {
        it('should throws a TYPE_MISMATCH_ERROR error when id param is different than string', async () => {
            let errMessage;
            let dbInstance = new DBClient('menus-test');
            let _id = 1;
            let _rev = 'test';
            try {
                await dbInstance.delete(_id, _rev);
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toBe('Wrong type for parameter id. Received number, expected string');
        }, jasmineTimeout);

        it('should throws a TYPE_MISMATCH_ERROR error when rev param is different than string', async () => {
            let errMessage;
            let dbInstance = new DBClient('menus-test');
            let _id = 'test';
            let _rev = 1;
            try {
                await dbInstance.delete(_id, _rev);
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toBe('Wrong type for parameter rev. Received number, expected string');
        }, jasmineTimeout);

        it('should delete the document when its valid id and rev is passed to the menus database', async () => {
            let error = false;
            let dbInstance = new DBClient('menus-test');
            let _id = 'test';
            let menu = await dbInstance.getById(_id, { schemaName: 'menus' });
            try {
                await dbInstance.delete(menu._id, menu._rev);
            } catch (err) {
                error = true;
            }
            expect(error).toBe(false);
        }, jasmineTimeout);

        it('should throws an error when passing a non existing id', async () => {
            let errMessage;
            let dbInstance = new DBClient('menus-test');
            let _id = 'non-existing-id';
            let _rev = 'rev';
            try {
                await dbInstance.delete(_id, _rev);
            } catch (err) {
                errMessage = err.message;
            }
            expect(errMessage).toBe('missing');
        }, jasmineTimeout);
    });
});
