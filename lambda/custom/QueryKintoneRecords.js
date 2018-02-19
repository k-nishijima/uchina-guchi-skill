const QueryKintoneRecords = (function () {

  let SubDomain;
  let AppId;
  let ApiToken;

  function QueryKintoneRecords(subDomain, appId, apiToken) {
    SubDomain = subDomain;
    AppId = appId;
    ApiToken = apiToken;
  }

  const request = require("request");

  const queryPromised = (query, fields) => {
    return new Promise((resolve, reject) => {

      let requestBody = {
        app: AppId,
        query: query,
        totalCount: true
      };

      if (fields) {
        requestBody["fields"] = fields;
      }

      const request_options = {
        "Content-Type": "application/json; charset=UTF-8",
        uri: `https://${SubDomain}.cybozu.com/k/v1/records.json`,
        method: "GET",
        body: requestBody,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-Cybozu-API-Token": ApiToken,
          "Content-Type": "application/json"
        },
        json: true
      };

      request(request_options, function (error, response, body) {
        if (body && body.records) {
          resolve(body.records);
          return;
        }
        reject(null);
      });

    });
  };


  const fetchRecords = (opt_query, max_id, limit, opt_records, fields) => {

    let allRecords = opt_records || [];
    const query = (opt_query ? `${opt_query} and ` : "") + `$id > ${max_id} order by $id asc limit ${limit}`;

    return queryPromised(query, fields)
      .then((records) => {
        allRecords = allRecords.concat(records);
        if (records.length === limit) {
          let last_max_id = max_id;
          records.forEach((item) => {
            const id = Number(item["$id"]["value"]);
            if (id && id > last_max_id) {
              last_max_id = id;
            }
          });
          return fetchRecords(opt_query, last_max_id, limit, allRecords, fields);
        }
        return allRecords;
      });

  };

  QueryKintoneRecords.prototype.queryRecords = function (query, fields) {
    return fetchRecords(query, 0, 500, [], fields);
  };

  return QueryKintoneRecords;
}());
exports.QueryKintoneRecords = QueryKintoneRecords;
