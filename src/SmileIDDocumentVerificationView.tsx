import React, { Component } from 'react';
import {
  HostComponent,
  UIManager,
  findNodeHandle,
  Platform,
} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { DocumentVerificationRequest } from './index';

const SmileIDDocumentVerificationComponent =
  codegenNativeComponent<DocumentVerificationRequest>(
    'SmileIDDocumentVerificationView'
  ) as HostComponent<DocumentVerificationRequest>;

export default class SmileIDDocumentVerificationView extends Component<DocumentVerificationRequest> {
  private viewRef = React.createRef<any>(); //

  componentDidMount() {
    const parameters = {
      ...this.props,
    };

    // Obtain the command identifier
    const commandId = UIManager.getViewManagerConfig(
      'SmileIDDocumentVerificationView'
    ).Commands.setParams;

    // Ensure the commandId is defined and is a number
    if (typeof commandId !== 'undefined') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.viewRef.current),
        Platform.OS === 'android' ? commandId.toString() : commandId,
        [parameters]
      );
    } else {
      throw new Error(
        'Command "setParams" is not defined for MyNativeComponent'
      );
    }
  }

  render() {
    return (
      <SmileIDDocumentVerificationComponent
        ref={this.viewRef}
        {...this.props}
      />
    );
  }
}
