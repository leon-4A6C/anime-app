import React from "react"
import {
  ScrollView,
  Text,
  StyleSheet,
} from "react-native"
import { connect } from "react-redux"

import { details } from "../actions"
import uiTheme from "../uiTheme"

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
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{this.props.details.details.title}</Text>
        <ScrollView horizontal={true}>
          {/* add images(posters) here */}
        </ScrollView>
        <Text style={styles.synopsis}>{this.props.details.details.synopsis}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    fontSize: uiTheme.text.fontSize+4,
    fontWeight: "bold",
    marginBottom: 10,
  },
  synopsis: {
    fontSize: uiTheme.text.fontSize,
    marginBottom: 20
  },
});

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
