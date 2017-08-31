import React from "react"
import {
    View,
} from "react-native"

import { SearchBar } from "../components"

export default class Watched extends React.Component {

    options = [
        {
            label: "all",
            option: {}
        }
    ]

    searched() {

    }

    removeSearch() {

    }

    sortingList() {

    }

    optionsClick() {

    }

    componentDidMount() {     
        setTimeout(() => {
            this.props.navigation.setParams({
                onSearched: this.searched.bind(this),
                onRemoveSearch: this.removeSearch.bind(this),
                options: this.options.map(x => x.label),
                onOptionsClick: this.optionsClick.bind(this),
            });
        }, 100); // them fix for bug in react-navigatoin
    }

    render() {
        return (
            <View></View>
        )
    }
}