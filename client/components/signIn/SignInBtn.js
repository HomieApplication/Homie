import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

//This button is used in the majority of screens

export default function SignInBtn(props) {
  const { onPress, title = 'Save', style } = props;
  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});