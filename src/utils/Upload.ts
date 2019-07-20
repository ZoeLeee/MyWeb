const fs = require("fs");
const rq = require("request-promise-native");
const path = require("path");
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

let files = getFiles(dir, []);
let formData: any = {};

for (let f of files) {
    formData[f.substr(dir.length + 1)] = fs.createReadStream(f);
}

const URL="http://www.dodream.top:3000/upload";

rq.post({ url:URL, formData }, function optionalCallback(err, httpResponse, body) {
    if (err || !body || JSON.parse(body)['code'] !== RequestStatus.Ok)
        return console.error('部署失败!', err,body);
    else {
        console.info(`部署成功!`);
    }
});
