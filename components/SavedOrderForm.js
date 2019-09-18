import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Title, TouchableOpacity, View } from '@shoutem/ui';

import { getSavedOrderInfo } from '../redux';

class SavedOrderForm extends PureComponent {
  static propTypes = {
    onEdit: PropTypes.func,
  }

  render() {
    const { onEdit, savedOrderInfo } = this.props;

    const buttonStyling = {
      backgroundColor: '#EFEFEF',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#080706',
      paddingVertical: 8,
      paddingHorizontal: 12,
    };

    return (
      <View styleName="vertical md-gutter-left" style={{ backgroundColor: '#FFFFFF' }}>
        <Title styleName="md-gutter-bottom">
          {savedOrderInfo.customerName}
        </Title>
        <Title styleName="sm-gutter-top md-gutter-bottom">
          {savedOrderInfo.customerAddress}
        </Title>
        <Title styleName="sm-gutter-top md-gutter-bottom">
          {savedOrderInfo.customerCity}
        </Title>
        <Title styleName="sm-gutter-top md-gutter-bottom">
          {savedOrderInfo.customerPostalCode}
        </Title>
        <Title styleName="sm-gutter-top md-gutter-bottom">
          {savedOrderInfo.customerProvince}
        </Title>
        <Title styleName="sm-gutter-top md-gutter-bottom">
          {savedOrderInfo.customerCountry}
        </Title>
        <Title styleName="sm-gutter-top md-gutter-bottom">
          {savedOrderInfo.customerEmail}
        </Title>
        <View styleName="horizontal h-center stretch">
          <TouchableOpacity onPress={onEdit}>
            <Title style={buttonStyling}>
              Promijeni podatke
            </Title>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    savedOrderInfo: getSavedOrderInfo(state)
  }
}

export default connect(mapStateToProps)(SavedOrderForm);
