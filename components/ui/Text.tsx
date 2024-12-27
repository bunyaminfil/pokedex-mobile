import React from "react";
import { Text as RNText, TextProps } from "react-native";
import Colors from "@/constants/colors";
import Fonts from "@/constants/fonts";
import { FontTypes, ColorTypes } from "@/constants";

interface IText extends TextProps {
    type?: FontTypes;
    color?: ColorTypes;
    size?: number;
    children: React.ReactElement | string | any;
    align?: "center" | "left" | "right";
}

export const Text = (props: IText) => {
    return (
        <RNText
            {...props}
            style={[
                {
                    textAlign: props.align || "left",
                    color: props.color ? Colors[props.color] : Colors.mainText,
                    fontSize: props.size,
                },
                props.style,
                { fontFamily: props.type ? Fonts[props.type] : Fonts.Regular },
            ]}
        >
            {props.children}
        </RNText>
    );
};
