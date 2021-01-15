import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

const App = () => {
  return (
    <View testID="welcome"
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      <View
        testID="welcome1"
        style={{ paddingHorizontal: 20 }}
      >
        <Text
          style={{
            width: '100%',
            textAlign: 'left',
            alignItems: 'flex-start',
            marginBottom: 5
          }}
        >Text Input</Text>
        <TextInput
          testID="input1"
          style={{
            height: 40,
            borderColor: 'lightgray',
            borderWidth: 1,
            borderRadius: 2
          }}
        />
      </View>
    </View>
  )
}
export default App;