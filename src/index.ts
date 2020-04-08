import { execSync } from 'child_process';

const version = process.argv[2] || "latest";
const url = `https://ethereum.github.io/solc-bin/bin/soljson-${version}.js`;
const path = `/tmp/${version}.js`;

export function getSolcVersion(version: string): any {
    console.info("By default we are fetching latest version for you. \nIf you want a specific version please input it as an argument.\nFor example: v0.4.26+commit.4563c3fc")
    if(!existsLocally(version)) return fetchRemote(version)
}

export function fetchRemote(version: string): any {
    try {
        console.info("Fetching")
        execSync(`curl -o /tmp/${version}.js https://ethereum.github.io/solc-bin/bin/soljson-${version}.js`);
        console.info(`Version ${version} has been downloaded from ${url} and it's located in ${path}`);
        return path;
    } catch(error) {
        console.info(`Failed to fetch version: ${version} from url ${url}. Please check that you inputed correct version and that version exists!`)
    }
}

export function existsLocally(version: string): any {
    try {
        let localVersion = require(`/tmp/${version}.js`)
        console.info(`Version ${version} exists locally on path ${path}`);
        if (localVersion) return true;    
    } catch (error) {
        return false;
    }
}
