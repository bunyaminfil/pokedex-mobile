import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface TitleProps {
    children: React.ReactNode;
}

function Title({ children }: TitleProps) {
    return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        // fontWeight: 'bold',
        color: "white",
        textAlign: "center",
        borderWidth: 2,
        borderColor: "white",
        padding: 12,
        maxWidth: "80%",
        width: 300,
    } as TextStyle,
});
