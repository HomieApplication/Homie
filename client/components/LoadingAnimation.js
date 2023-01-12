import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Button,
} from "react-native";

const LoadingAnimation = (props) => {
    const {text} = props;
    return (
        <View style={styles.indicatorWrapper}>
            <ActivityIndicator
                size="large"
                color="#114B5F"
            />
            <Text style={styles.indicatorText}>{text}...</Text>
        </View>
    );
}

export default LoadingAnimation

const styles = StyleSheet.create({
    indicatorWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'transparent'
    },
        indicatorText: {
        fontSize: 18,
        marginTop: 12,
    },
})