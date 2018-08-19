import React, { Component } from 'react';
import { Header, Card, CardSection, Input, Button } from './common';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { startNodeNameChanged, endNodeNameChanged, graphChanged } from '../actions';
class IndexForm extends Component {
  onStartNodeNameChange(text){
    this.props.startNodeNameChanged(text)
  }
  onEndNodeNameChange(text){
    this.props.endNodeNameChanged(text)
  }

  onButtonPress() {
    const { startNodeName, endNodeName } = this.props;
    this.props.graphChanged({ startNodeName, endNodeName });
  }

  renderButton() {
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        GO
      </Button>
    );
  }

  render () {
    return (
      <Card>
        <Header headerText="New Zealand Post Test" />
        <CardSection>
          <Input
            label="Enter the node"
            placeholder="A to J"
            onChangeText={this.onStartNodeNameChange.bind(this)}
            value={this.props.startNodeName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Enter the node"
            placeholder="A to J"
            onChangeText={this.onEndNodeNameChange.bind(this)}
            value={this.props.endNodeName}

          />
        </CardSection>
        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Text>Distance: {this.props.graphNode.distance}</Text>
        </CardSection>

        <CardSection>
          <Text>Start Node: {this.props.startNodeName}</Text>
        </CardSection>

        <CardSection>
          <Text>End Node: {this.props.endNodeName}</Text>
        </CardSection>

        <CardSection>
          <Text>Path: {this.props.graphNode.path}</Text>
        </CardSection>


      </Card>
    );
  }
}

mapStateToProps = ({ graph }) => {
  console.log(graph);
  const { startNodeName, endNodeName, graphNode } = graph;
  return { startNodeName, endNodeName, graphNode }
};

export default connect (mapStateToProps, { startNodeNameChanged, endNodeNameChanged, graphChanged }) (IndexForm);
