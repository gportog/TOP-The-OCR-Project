const Cloudant = require('@cloudant/cloudant');

const user = process.env.CLOUDANT_USER;
const pw = process.env.CLOUDANT_PW;

function DBClient() {
    this._client = Cloudant({account:user, password:pw});
}

DBClient.prototype.insert = function(doc, db) {
    return new Promise((res, rej) => {
        let database = this._client.db.use(db);
        database.insert(doc, (err, body, header) => {
            if (err) return rej(err);
            if (body.ok) return res(body);
            else return rej(body);
        });
    });
}

module.exports = DBClient;