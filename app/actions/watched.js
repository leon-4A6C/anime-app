import RNFetchBlob from 'react-native-fetch-blob'
const { fs } = RNFetchBlob;

import {
    PermissionsAndroid,
} from "react-native"

import {
    WATCHED_GET,
    WATCHED_GET_SUCCES,
    WATCHED_GET_FAILURE,
    WATCHED_SET,
    WATCHED_SET_SUCCES,
    WATCHED_SET_FAILURE,
    WATCHED_CHECK,
    WATCHED_CHECK_SUCCES,
    WATCHED_CHECK_FAILURE,
    WATCHED_ADD,
    WATCHED_ADD_SUCCES,
    WATCHED_ADD_FAILURE,
    WATCHED_REMOVE,
    WATCHED_REMOVE_SUCCES,
    WATCHED_REMOVE_FAILURE,
    start,
    failure,
    succes
} from "../constants"

const file = fs.dirs.DocumentDir+"/watchedAnime.json"; // Watched is store in an object(hash table with mal ids)

function checkPermission() {
    return PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ], {
          title: 'Permission',
          message: 'permission needed to save files',
        }
      ).then(permRes => {
          return new Promise((resolve, reject) => {
            if (permRes['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                permRes['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
                resolve()
            } else {
                reject(new Error("did not give permissions"))
            }
          })
      })
}

export function getWatched() {
    return (dispatch) => {
        dispatch(start(WATCHED_GET))

        checkPermission()
            .then(() => fs.exists(file))
            .then((exist) => {
                if(exist) {
                    return fs.readFile(file, "utf8");
                } else {
                    return fs.createFile(file, "{}")
                        .then(() => fs.readFile(file, "utf8"));
                }
            }).then(data => dispatch(succes(WATCHED_GET_SUCCES, JSON.parse(data))))
            .catch(err => {console.log(err); dispatch(failure(WATCHED_GET_FAILURE, err))})
    }
}

export function setWatched(data) {
    return (dispatch) => {
        dispatch(start(WATCHED_SET))
        
        checkPermission()
            .then(() => fs.exists(file))
            .then((exist) => {
                if(exist) {
                    return fs.writeFile(file, JSON.stringify(data));
                } else {
                    return fs.createFile(file, JSON.stringify(data));
                }
            }).then(() => {dispatch(succes(WATCHED_SET_SUCCES)); dispatch(getWatched());})
            .catch(err => {console.log(err); dispatch(failure(WATCHED_SET_FAILURE, err))})
    }
}

// checks if the item is Watched
export function checkWatch(id) {
    return (dispatch) => {
        dispatch(start(WATCHED_CHECK))
        checkPermission()
            .then(() => fs.exists(file))
            .then(exist => {
                if(exist) {
                    return fs.readFile(file, "utf8")
                } else {
                    return fs.createFile(file, "{}")
                        .then(() => fs.readFile(file, "utf8"));
                }
            }).then(data => {
                data = JSON.parse(data);
                if(data[id]) {
                    dispatch(succes(WATCHED_CHECK_SUCCES, data[id].watched))
                } else {
                    dispatch(succes(WATCHED_CHECK_SUCCES, {}))
                }
            })
            .catch(e => {console.log(e); dispatch(failure(WATCHED_CHECK_FAILURE, e))})
    }
}

export function addWatch(item, ep) {
    return (dispatch) => {
        dispatch(start(WATCHED_ADD))
        checkPermission()
            .then(() => fs.exists(file))
            .then(exist => {
                if(exist) {
                    return fs.readFile(file, "utf8")
                } else {
                    return fs.createFile(file, "{}")
                        .then(() => fs.readFile(file, "utf8"))
                }
            }).then(data => {
                data = JSON.parse(data);
                if(!data[item.id]) {
                    data[item.id] = item;
                }
                if(!data[item.id].watched) {
                    data[item.id].watched = {};
                }
                data[item.id].watched[ep] = {
                    time: new Date(),
                };

                data[item.id].lastWatch = new Date();
                
                return fs.writeFile(file, JSON.stringify(data))
            })
            .then(() => {dispatch(succes(WATCHED_ADD_SUCCES)); dispatch(getWatched()); dispatch(checkWatch(item.id))})
            .catch(e => {console.log(e); dispatch(failure(WATCHED_ADD_FAILURE, e))})
    }
}

export function removeWatch(id, ep) {
    return (dispatch) => {
        dispatch(start(WATCHED_REMOVE))
        checkPermission()
            .then(() => fs.exists(file))
            .then(exist => {
                if(exist) {
                    return fs.readFile(file, "utf8")
                } else {
                    return fs.createFile(file, "{}")
                        .then(() => fs.readFile(file, "utf8"))
                }
            }).then(data => {
                data = JSON.parse(data);
                if(data[id] && data[id].watched) {
                    if(data[id].watched[ep]) {
                        delete data[id].watched[ep];                
                    }
                    if(Object.keys(data[id].watched).length === 0) {
                        delete data[id];
                    }
                }
                return fs.writeFile(file, JSON.stringify(data))
            })
            .then(() => {dispatch(succes(WATCHED_REMOVE_SUCCES)); dispatch(getWatched()); dispatch(checkWatch(id))})
            .catch(e => {console.log(e); dispatch(failure(WATCHED_REMOVE_FAILURE, e))})
    }
}