import React from "react"
import {
  View,
} from "react-native"
import { connect } from "react-redux"

class Details extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "details",
  })

  render() {
    return (
      <View>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}
function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
