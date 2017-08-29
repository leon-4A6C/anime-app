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
    FAVORITES_SET_FAILURE
} from "../constants"

export function getFavorites() {
    return (dispatch) => {
        const file = fs.dirs.DocumentDir+"/favoritedAnime.json";
        dispatch(getFavoritesStart())
        PermissionsAndroid.requestMultiple(
            [
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ], {
              title: 'Permission',
              message: 'permission needed to save files',
            }
          ).then((permRes) => {
                if (permRes['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    permRes['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("got permissions")
                    return fs.exists(file);
                } else throw new Error("did not give permissions")
          }).then((exist) => {
              if(exist) {
                  return fs.readFile(file, "utf8");
              } else {
                  dispatch(getFavoritesSuccess([])) // return an empty array
              }
          }).then(data => {
              dispatch(getFavoritesSuccess(JSON.parse(data)))
          }).catch(err => {console.log(err); dispatch(getFavoritesFailure())})
    }
}

export function setFavorites(data) {
    return (dispatch) => {
        const file = fs.dirs.DocumentDir+"/favoritedAnime.json";
        dispatch(setFavoritesStart())
        PermissionsAndroid.requestMultiple(
            [
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ], {
              title: 'Permission',
              message: 'permission needed to save files',
            }
          ).then((permRes) => {
                if (permRes['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    permRes['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("got permissions")
                    return fs.exists(file);
                } else throw new Error("did not give permissions")
          }).then((exist) => {
            if(exist) {
                return fs.writeFile(file, JSON.stringify(data));
            } else {
                return fs.createFile(file, JSON.stringify(data));
            }
          }).then(() => {
                dispatch(setFavoritesSuccess())
          }).catch(err => {console.log(err); dispatch(setFavoritesFailure())})
    }
}

export function addFavorite() {
    return (dispatch) => {

    }
}

export function removeFavorite() {
    return (dispatch) => {

    }
}

export function getFavoritesStart() {
    return {
        type: FAVORITES_GET
    }
}

export function getFavoritesSuccess(data) {
    return {
        type: FAVORITES_GET_SUCCES,
        data,
    }
}

export function getFavoritesFailure() {
    return {
        type: FAVORITES_GET_FAILURE
    }
}

export function setFavoritesStart() {
    return {
      type: FAVORITES_SET
    }
}
  
export function setFavoritesSuccess(data) {
    return {
      type: FAVORITES_SET_SUCCES,
      data,
    }
}
  
export function setFavoritesFailure() {
    return {
      type: FAVORITES_SET_FAILURE
    }
}