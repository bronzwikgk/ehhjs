const boundary = '-------314159265358979323846';
const delimiter = "\r\n--" + boundary + "\r\n";
const close_delim = "\r\n--" + boundary + "--";
class HttpService {
    static urlBuilder(url, params) {
        var service = url + "?" + HttpService.buildEncodedUri(params);
        return service;
    }
    static requestBuilder(method, headers, body) {
        var request = {
            method: method,
            cache: 'no-cache',
            headers: headers,
        }
        request['body'] = body;
        return request;
    }
    static async FileUpload(file) {
        return new Promise((resolve, reject) => {
            var contentType = file.type || 'application/octet-stream';
            var metadata = {
                'title': file.name,
                'name': file.name,
                'mimeType': contentType,
            }
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = () => {
                var base64Data = btoa(reader.result);
                var multipartRequestBody =
                    delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) +
                    delimiter + 'Content-Type: ' + contentType + '\r\n' +
                    'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;

                resolve(multipartRequestBody);
            };
            reader.onerror = error => reject(error);
        });
    }
    static async fetchRequest(url, request) {
        var res;
        // console.log("URL :-" + url);
        // console.log("Request method :" + request['method'] + "headers:" + request['headers']['Authorization'] + "body: " + request['body']);
        await fetch(url, request)
            .then(response => {
                var result = response.text();
                var result2;
                try {
                    result2 = JSON.parse(result);
                } catch (err) {
                    result2 = result;
                }
                return result2;
            })
            .then(data => {
                if (!data.error) {
                    res = data;
                } else {
                    console.log(data.errors);
                }
            });

        return res;
    }
    static buildEncodedUri(request) {
        const response = [];
        for (let d in request) {
            response.push(encodeURIComponent(d) + '=' + encodeURIComponent(request[d]));
        }
        return response.join('&');
    }
    static unbuildEndodedUri(request) {
        var urifragment = request.split("&"), data = {}, i, parts;

        for (i = 0; i < urifragment.length; i++) {
            parts = urifragment[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        console.log(data);
        return data;
    }
}