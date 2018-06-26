import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Touchable, TouchableNativeFeedback, Platform} from 'react-native';
import {THEME} from '../assets/css/color';
const PropTypes = require('prop-types');
const invariant = require('fbjs/lib/invariant');
import ColorPropType from 'react-native/Libraries/StyleSheet/ColorPropType';
export default class CButton extends Component<{
    title: string,
    onPress: () => any,
    color?: ?string,
    accessibilityLabel?: ?string,
    disabled?: ?boolean,
    testID?: ?string,
    hasTVPreferredFocus?: ?boolean,
}> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        color: ColorPropType,
        disabled: PropTypes.bool,
        accessibilityLabel: PropTypes.string, // （无障碍标签），这样可以让使用VoiceOver的人们清楚地知道自己选中了什么。VoiceOver会读出选中元素的无障碍标签。
        /**
         * Used to locate this view in end-to-end tests.
         */
        testID: PropTypes.string,
        /**
         * *(Apple TV only)* TV preferred focus (see documentation for the View component).
         *
         * @platform ios
         */
        hasTVPreferredFocus: PropTypes.bool,
    };

    /**



     <TouchableOpacity accessible={true} accessibilityComponentType='button' disabled={disabled} style={[styles.Button, style]} onPress={onPress}>
     <Text style={styles.ButtonText}>{title}</Text>
     </TouchableOpacity>


     * */
    render() {
        const {accessibilityLabel, color, onPress, title, hasTVPreferredFocus, disabled, testID,} = this.props;
        const buttonStyles = [styles.button];
        const textStyles = [styles.text];
        if (color) {
            if (Platform.OS === 'ios') {
                textStyles.push({color: color});
            } else {
                buttonStyles.push({backgroundColor: color});
            }
        }
        const accessibilityTraits = ['button'];
        if (disabled) {
            buttonStyles.push(styles.buttonDisabled);
            textStyles.push(styles.textDisabled);
            accessibilityTraits.push('disabled');
        }
        invariant(
            typeof title === 'string',
            'The title prop of a Button must be a string',
        );
        const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title;
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <Touchable
                accessibilityComponentType='button'
                accessibilityLabel={accessibilityLabel}
                accessibilityTraits={accessibilityTraits}
                hasTVPreferredFocus={hasTVPreferredFocus}
                testID={testID}
                disabled={disabled}
                onPress={onPress}>
                <View style={buttonStyles}>
                    <Text style={textStyles} disabled={disabled}>{formattedTitle}</Text>
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    button: Platform.select({
        ios: {},
        android: {
            elevation: 4,
            // Material design blue from https://material.google.com/style/color.html#color-color-palette
            backgroundColor: THEME,
            borderRadius: 2,
        },
    }),
    text: Platform.select({
        ios: {
            // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
            color: 'white',
            textAlign: 'center',
            padding: 8,
            fontSize: 18,
        },
        android: {
            color: 'white',
            textAlign: 'center',
            padding: 8,
            fontWeight: '500',
        },
    }),
    buttonDisabled: Platform.select({
        ios: {},
        android: {
            elevation: 0,
            backgroundColor: '#dfdfdf',
        }
    }),
    textDisabled: Platform.select({
        ios: {
            color: '#cdcdcd',
        },
        android: {
            color: '#a1a1a1',
        }
    }),
});