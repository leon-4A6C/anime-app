import { version, checkUpdateUri } from "../../package.json";
import {
    UPDATE,
    UPDATE_FAILURE,
    UPDATE_SUCCES,
    start,
    succes,
    failure,
} from "../constants";

import RNFetchBlob from "react-native-fetch-blob";
const android = RNFetchBlob.android

export function update() {
    return (dispatch) => {
        dispatch(start(UPDATE));
        fetch(checkUpdateUri)
            .then(data => data.json())
            .then(json => {
                const latest = json[0];
                if(latest.tag_name != version) {
                    // update
                    dispatch(succes(UPDATE_SUCCES, true))
                    const asset = latest.assets.find(x => x.content_type === "application/vnd.android.package-archive");
                    return RNFetchBlob.config({
                            addAndroidDownloads : {
                                useDownloadManager : true,
                                title : asset.name,
                                description : 'the new update',
                                mime : asset.content_type,
                                mediaScannable : true,
                                notification : true,
                                path: RNFetchBlob.fs.dirs.DownloadDir+"/"+asset.name,
                            }
                        })
                        .fetch('GET', asset.browser_download_url)
                        .then((res) => {
                            android.actionViewIntent(res.path(), asset.content_type)
                        })
                } else {
                    dispatch(succes(UPDATE_SUCCES, false))
                }
            })
            .catch(e => {console.log(e); dispatch(failure(UPDATE_FAILURE, e))});
    }
}