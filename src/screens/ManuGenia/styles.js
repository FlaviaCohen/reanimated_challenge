import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  question: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 25,
    backgroundColor: 'white',
    margin: 5,
  },
  filledSquare: {
    backgroundColor: 'pink',
    borderColor: 'turquoise',
    borderWidth: 2,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  buttonLeft: {
    marginRight: 10,
  },
  buttonRight: {
    marginLeft: 10,
  },
});

export default styles;
