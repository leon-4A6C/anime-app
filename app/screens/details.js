import React from "react"
import {
  View,
  Text
} from "react-native"
import { connect } from "react-redux"

import { details } from "../actions"

class Details extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "details",
  })

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.getDetails(params.id);
  }
  

  render() {
    return (
      <View>
        <Text>{this.props.details.details.title}</Text>
        <Text>{this.props.details.details.synopsis}</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    details: state.details
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getDetails: (id) => dispatch(details.fetchDetails(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
