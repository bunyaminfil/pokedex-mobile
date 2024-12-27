import React from "react";
import { Text } from "./Text";
import { TextInput, TextProps } from "react-native";
import Colors from "@/constants/colors";
import Fonts from "@/constants/fonts";
import { FontTypes, ColorTypes } from "@/constants";
import { hp, wp } from "../../helpers/screenResize";

interface ICustomInputProps extends TextProps {
    type?: FontTypes;
    backgroundColor?: ColorTypes;
    borderRadius?: ColorTypes;
    size?: number;
    align?: "center" | "left" | "right";
    placeholder?: string;
    onChangeText: (text: string) => void;
    value: string;
    label: string;
    secureTextEntry?: boolean;
}

export const Input = (props: ICustomInputProps) => {
    return (
        <>
            <Text color="lime" size={wp(4)}>
                {props.label}
            </Text>
            <TextInput
                {...props}
                style={[
                    {
                        textAlign: props.align || "left",
                        backgroundColor: props.backgroundColor ? Colors[props.backgroundColor] : Colors.mainText,
                        fontSize: props.size,
                        marginTop: wp(3),
                        marginBottom: wp(3),
                    },
                    props.style,
                    { fontFamily: props.type ? Fonts[props.type] : Fonts.Regular },
                ]}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </>
    );
};
