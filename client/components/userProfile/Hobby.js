import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from '../assets.js'

const Hobby = (props) => {
    const {name} = props;

    return(
        <View style={styles.container}>
            <MaterialCommunityIcons name="arrow-right" color={COLORS.star} size={30} />
            <Text style={styles.text}>{name}</Text>
        </View>
    )

}
export default Hobby;


const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        color: COLORS.background,
    }
})