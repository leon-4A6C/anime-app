import RNFetchBlob from 'react-native-fetch-blob'
const { fs } = RNFetchBlob;

import {
    PermissionsAndroid,
} from "react-native"

import {
    FAVORITES_GET,
    FAVORITES_GET_SUCCES,
    FAVORITES_GET_FAILURE,
    FAVORITES_SET,
    FAVORITES_SET_SUCCES,
    FAVORITES_SET_FAILURE,
    FAVORITES_CHECK,
    FAVORITES_CHECK_SUCCES,
    FAVORITES_CHECK_FAILURE,
    FAVORITES_ADD,
    FAVORITES_ADD_SUCCES,
    FAVORITES_ADD_FAILURE,
    FAVORITES_REMOVE,
    FAVORITES_REMOVE_SUCCES,
    FAVORITES_REMOVE_FAILURE,
    start,
    failure,
    succes
} from "../constants"

const file = fs.dirs.DocumentDir+"/favoritedAnime.json"; // favorites is store in an object(hash table with mal ids)

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

export function getFavorites() {
    return (dispatch) => {
        dispatch(start(FAVORITES_GET))

        checkPermission()
            .then(() => fs.exists(file))
            .then((exist) => {
                if(exist) {
                    return fs.readFile(file, "utf8");
                } else {
                    return fs.createFile(file, "{}")
                        .then(() => fs.readFile(file, "utf8"));
                }
            }).then(data => dispatch(succes(FAVORITES_GET_SUCCES, JSON.parse(data))))
            .catch(err => {console.log(err); dispatch(failure(FAVORITES_GET_FAILURE, err))})
    }
}

export function setFavorites(data) {
    return (dispatch) => {
        dispatch(start(FAVORITES_SET))
        
        checkPermission()
            .then(() => fs.exists(file))
            .then((exist) => {
                if(exist) {
                    return fs.writeFile(file, JSON.stringify(data));
                } else {
                    return fs.createFile(file, JSON.stringify(data));
                }
            }).then(() => {dispatch(succes(FAVORITES_SET_SUCCES)); dispatch(getFavorites())})
            .catch(err => {console.log(err); dispatch(failure(FAVORITES_SET_FAILURE, err))})
    }
}

// checks if the item is favorited
export function checkFavorite(id) {
    return (dispatch) => {
        dispatch(start(FAVORITES_CHECK))
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
                    dispatch(succes(FAVORITES_CHECK_SUCCES, true))
                } else {
                    dispatch(succes(FAVORITES_CHECK_SUCCES, false))
                }
            })
            .catch(e => {console.log(e); dispatch(failure(FAVORITES_CHECK_FAILURE, e))})
    }
}

export function addFavorite(item) {
    return (dispatch) => {
        dispatch(start(FAVORITES_ADD))
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
                data[item.id] = item;
                return fs.writeFile(file, JSON.stringify(data))
            })
            .then(() => {dispatch(succes(FAVORITES_ADD_SUCCES)); dispatch(getFavorites())})
            .catch(e => {console.log(e); dispatch(failure(FAVORITES_ADD_FAILURE, e))})
    }
}

export function removeFavorite(id) {
    return (dispatch) => {
        dispatch(start(FAVORITES_REMOVE))
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
                delete data[id];
                return fs.writeFile(file, JSON.stringify(data))
            })
            .then(() => {dispatch(succes(FAVORITES_REMOVE_SUCCES)); dispatch(getFavorites())})
            .catch(e => {console.log(e); dispatch(failure(FAVORITES_REMOVE_FAILURE, e))})
    }
}