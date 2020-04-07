#!/usr/bin/env node
const { execSync } = require('child_process');

if(process.argv.length < 3){
    console.log("By default we are fetching latest version for you. \nIf you want a specific version please input it as an argument.\nFor example: solc-version-manager v0.4.26+commit.4563c3fc")
}

const version = process.argv[2] || "latest";
const url = `https://ethereum.github.io/solc-bin/bin/soljson-${version}.js`;
const path = `/tmp/${version}.js`;

if(!existsLocally(version)) return fetchRemote(version)

function fetchRemote(version) {
    try {
        console.log("Fetching")
        execSync(`curl -o /tmp/${version}.js https://ethereum.github.io/solc-bin/bin/soljson-${version}.js`);
        console.log(`Version ${version} has been downloaded from ${url} and it's located in ${path}`);
        return path;
    } catch(error) {
        console.log(`Failed to fetch version: ${version} from url ${url}. Please check that you inputed correct version and that version exists!`)
    }
}

function existsLocally(version) {
    try {
        let localVersion = require(`/tmp/${version}.js`)
        console.log(`Version ${version} exists locally on path ${path}`);
        if (localVersion) return true;    
    } catch (error) {
        return false;
    }
}
