import fs = require("fs");
import rq = require("request-promise-native");
import path = require("path");
import { DefaultConfig } from "./Default";
import { RequestStatus } from "./Request";


export function getFiles(dir: string, files_: string[]) {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files) {
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory())
            getFiles(name, files_);
        else
            files_.push(name);
    }
    return files_;
}

let dir = path.resolve(__dirname, "../../dist");

let files = getFiles(dir, []).filter(f => path.extname(f) !== ".map");
let formData: any = {};

for (let f of files) {
    formData[f.substr(dir.length + 1)] = fs.createReadStream(f);
}
let url = DefaultConfig.url+`upload`;
// let url = `http://127.0.0.1:3000/upload`;
rq.post({ url, formData }, function optionalCallback(err, httpResponse, body) {
    if (err || !body || JSON.parse(body)['code'] !== RequestStatus.Ok)
        return console.error('部署失败!', err,body);
    else {
        console.info(`部署成功!`);
    }
});
