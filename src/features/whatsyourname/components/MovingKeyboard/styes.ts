import {StyleSheet} from 'react-native';

export const LETTER_SIZE = 48;
export const LETTER_MARGIN = 30;

const styles = StyleSheet.create({
  letter: {
    borderWidth: 2,
    borderRadius: 24,
    marginLeft: LETTER_MARGIN,
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    textAlign: 'center',
    lineHeight: 44,
  },
  keyboardStyle: {
    flexDirection: 'row',
    margin: 30,
  },
  keyboardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
