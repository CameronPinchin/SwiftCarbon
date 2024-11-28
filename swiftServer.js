// Cameron Pinchin 
// swiftServer.js, November 25th 2024
//
// Local HTTP server for testing 
// 

const status_OK = 200;
const status_NOT_FOUND = 404;


function MIMEtype(filename) {

    const MIME_TYPES = {
        'css': 'text/css',
        'gif': 'image/gif',
        'htm': 'text/html',
        'html': 'text/html',
        'ico': 'image/x-icon',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'js': 'text/javascript',
        'json': 'application/json',
        'png': 'image/png',
        'txt': 'text/text'
    };

    var extension = "";
    
    if (filename) {
        extension = filename.slice(filename.lastIndexOf('.')+1).toLowerCase();
    }

    return MIME_TYPES[extension] || "application/octet-stream";
};

async function routePost(req){
    const path = new URL(req.url).pathname;
    return null;
}

async function routeGet(req){
    const path = new URL(req.url).pathname;
    return null;
}


async function route(req){
    if(req.method === "POST"){
        return await routePost(req);
    } else if(req.method === "GET"){
        return await routeGet(req);
    } else{
        return null;
    }


}

async function fileData(path){
    var contents, status, contentType;

    try {
        contents = await Deno.readFile("./static" + path);
        status = status_OK;
        contentType = MIMEtype(path);
    } catch(e) {
        contents = "Sorry! Page not found.",
        status = status_NOT_FOUND,
        contentType = "text/plain"
    }

    return { contents, status, contentType };

}

async function handler(req){

    const originalPath = new URL(req.url).pathname;
    var path = originalPath;
    var r  = await route(req);

    if(!r){
        if(path === "/"){
            path = "/index.html";
        }
        r = await fileData(path);
    }

    console.log(`${r.status} ${req.method} ${r.contentType} ${originalPath}`); 

    return new Response(r.contents, 
            {status: r.status,
             headers: {
                "content-type": r.contentType
             }});
}



Deno.serve(
    {
        port: 8000,
        hostname: "0.0.0.0"
    },
    handler);
