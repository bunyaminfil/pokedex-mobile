import { StyleSheet } from "react-native";
import { hp, wp } from "../../helpers/screenResize";
import Colors from "../colors";

const baseStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "center",
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.eerieBlack,
        paddingHorizontal: "5%",
        height: wp(14),
        justifyContent: "space-between",
    },
    headerLeft: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    headerRight: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    headerLogo: {
        width: wp(28),
        aspectRatio: 2.8,
    },
    headerTitle: {
        fontSize: wp(4.5),
        fontWeight: "700",
    },
    modalView: {
        width: wp(90),
        height: "auto",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderRadius: 25,
        overflow: "hidden",
        zIndex: 2000,
        maxHeight: hp(90),
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 0,
        padding: 50,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
    },

    flatListContent: {
        alignSelf: "center",
        flex: 0,
    },
    flatListItem: {
        alignSelf: "center",
        paddingTop: wp(1),
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});

export default baseStyles;
