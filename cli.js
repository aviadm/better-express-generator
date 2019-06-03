#!/usr/local/bin/node

const vorpal = require('vorpal')()//.show();
const fs = require('fs');

vorpal
    .command('generate-express', "this is command line tool to easily generate an express server")
    .option('--get')
    .option('--post')
    .option('--put')
    .option('--delete')
    .option('--cors', 'use this option to add cross origin headers')
    .option('--port <port>' , 'indicates which port to use, valid ports 8000-9999 , default is 8000')
    .action(function (args, callback) {
        let file = createAppJS(args)
        // console.log(file)
        this.log(file);
        callback();
    });

vorpal.parse(process.argv);


function createAppJS(opts) {

    let fileContent = fs.readFileSync(`${__dirname}/templates/express.temp`, 'utf8')
    // return fileContent;
    console.log(`opts ${JSON.stringify(opts)}`)

    if (opts.options.cors) {
        let methodFileContent = fs.readFileSync(`${__dirname}/templates/cors.temp`, 'utf8')
        fileContent = fileContent.replace('@@CORS@@', methodFileContent);
    } else {
        fileContent = fileContent.replace('@@CORS@@', '');
    }

    if (opts.options.get) {
        let methodFileContent = fs.readFileSync(`${__dirname}/templates/get.temp`, 'utf8')
        methodFileContent = methodFileContent.replace('@@method@@', 'get')
        fileContent = fileContent.replace('@@GET@@', methodFileContent);

    } else {
        fileContent = fileContent.replace('@@GET@@', '');
    }

    if (opts.options.post) {
        let methodFileContent = fs.readFileSync(`${__dirname}/templates/get.temp`, 'utf8')
        methodFileContent = methodFileContent.replace('@@method@@', 'post')
        fileContent = fileContent.replace('@@POST@@', methodFileContent);
    } else {
        fileContent = fileContent.replace('@@POST@@', '');
    }

    if (opts.options.delete) {
        let methodFileContent = fs.readFileSync(`${__dirname}/templates/get.temp`, 'utf8')
        methodFileContent = methodFileContent.replace('@@method@@', 'delete')
        fileContent = fileContent.replace('@@DELETE@@', methodFileContent);
    } else {
        fileContent = fileContent.replace('@@DELETE@@', '');
    }
    if (opts.options.put) {
        let methodFileContent = fs.readFileSync(`${__dirname}/templates/get.temp`, 'utf8')
        methodFileContent = methodFileContent.replace('@@method@@', 'put')
        fileContent = fileContent.replace('@@PUT@@', methodFileContent);
    } else {
        fileContent = fileContent.replace('@@PUT@@', '');
    }

    if (opts.options.port) {
        if (opts.options.port >= 8000 && opts.options.port <= 9999) {
            fileContent = fileContent.replace('@@POST@@', opts.options.port);
        } else {
            throw new Error('invalid port number');
        }
    } else {
        fileContent = fileContent.replace('@@PORT@@', '8000');
    }

    return fileContent;

}