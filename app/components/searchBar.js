import React from "react"
import { Toolbar } from "react-native-material-ui"

export default class SearchBar extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  _searchAnime() {
    // trigger search action
    if(this.props.onSearch) {
        this.props.onSearch(this.state.text);            
    }
  }

  _removeSearch() {
    // go back to the popular screen
    if(this.props.onRemoveSearch) {
        this.props.onRemoveSearch(this.state.text);            
    }
}

  _edited(text) {
    this.setState({
      text
    })
  }

  _leftElementPress() {
      if(this.props.onLeftElementPress) {
        this.props.onLeftElementPress();
      }
  }

  _optionsClick(option) {
      if(this.props.onOptionsClick) {
        this.props.onOptionsClick(option);
      }
  }

  render() {
    return (<Toolbar
        leftElement="settings"
        onLeftElementPress={this._leftElementPress.bind(this)}
        centerElement="anime"
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
          onSubmitEditing: this._searchAnime.bind(this),
          onSearchClosed: this._removeSearch.bind(this),
          onChangeText: this._edited.bind(this),
        }}
        onRightElementPress={this._optionsClick.bind(this)}
        rightElement={{
          menu: { labels: this.props.options || [] },
        }}/>)
  }

}