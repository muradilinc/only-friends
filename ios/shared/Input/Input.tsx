import {TextInput, TextInputProps, StyleSheet, Pressable, View} from "react-native";
import {Colors, Radius} from "../tokens";
import {useState} from "react";
import OpenEyeIcon from "../../assets/icons/open-eye";
import ClosedEyeIcon from "../../assets/icons/closed-eye";

export function Input({isPassword, ...props}: TextInputProps & { isPassword?: boolean }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    return (
        <View>
            <TextInput
                style={styles.input}
                secureTextEntry={isPassword && !isPasswordVisible}
                {...props}
                placeholderTextColor={Colors.gray}
            />
            {isPassword &&
                <Pressable onPress={() => setIsPasswordVisible(state => !state)}
                           style={styles.icon}>{isPasswordVisible ? <ClosedEyeIcon/> : <OpenEyeIcon/>}</Pressable>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 58,
        backgroundColor: Colors.violetDark,
        paddingHorizontal: 24,
        borderRadius: Radius.r10,
        fontSize: 16,
        color: Colors.gray
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingHorizontal: 20,
        paddingVertical: 18,
    }
})