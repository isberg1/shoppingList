import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  disabled: {
    opacity: 0.3,
  },
  input: {
    marginTop: 20,
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    paddingVertical: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  border: {
    marginVertical: 3,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    marginHorizontal: 50,
  },
  scrollView: {
    margin: 20,
    height: 200,
  },
  body: {
    paddingTop: 20,
    backgroundColor: '#aaa',
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
    backgroundColor: 'green',
  },
  buttonDelete: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    height: 60,
    backgroundColor: '#C25B01',
  },
  buttonContainer: {
    fontSize: 50,
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 5,
    marginHorizontal: 50,
  },
  root: {
    backgroundColor: '#5b6069',
    height: '100%',
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
});
