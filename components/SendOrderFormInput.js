import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { TextInput, Title, View } from '@shoutem/ui';

export default class SendOrderFormInput extends PureComponent {
  static propTypes = {
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    validation: PropTypes.func,
    value: PropTypes.string,
  }

  render() {
    const { onChangeText, placeholder, title, validation, value } = this.props;

    const validate = validation ? (e) => validation(e.nativeEvent.text) : null;

    return (
      <View styleName="vertical" style={{ backgroundColor: '#FFFFFF' }}>
        <Title styleName="sm-gutter-left sm-gutter-top">{title}</Title>
        <TextInput
          placeholder={placeholder}
          style={{ backgroundColor: '#EFEFEF' }}
          onChangeText={onChangeText}
          onEndEditing={validate}
          value={value}
        />
      </View>
    );
  }
}
