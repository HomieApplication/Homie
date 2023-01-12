import { Dimensions, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import COLORS from '../assets'

const Tab = (props) => {
    const {title, onPress} = props
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Tab

const styles = StyleSheet.create({
    container:{
        width: '95%',
        flex: 0.4,
        borderRadius: 10,
        borderColor:COLORS.primary1,
        borderWidth: 0.5,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    text:{
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: COLORS.textCard,
    }
})