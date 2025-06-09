import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUserLoading} from "../../features/auth/authSlice";
import {login} from "../../features/auth/authThunk";
import {Input} from "../../shared/Input/Input";
import {Colors, Gaps} from "../../shared/tokens";
import {Button} from "../../shared/Buntton/Button";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';


export default function LoginScreen() {
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const width = Dimensions.get('window').width;
    const loading = useAppSelector(selectUserLoading);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const changeFields = (fieldName: string) =>
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const {text} = event.nativeEvent;
            setState(prevState => ({
                ...prevState,
                [fieldName]: text,
            }));
        };

    const sendForm = async () => {
        console.log('clicked', state);
        await dispatch(login(state)).unwrap();
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.brand}>
                    <Image
                        style={styles.logo}
                        resizeMode='contain'
                        source={require('../../assets/onlyF.png')}
                    />
                    <Text style={styles.logoText}>OnlyFriend</Text>
                </View>
                <View style={styles.form}>
                    <Input placeholder="Email" value={state.email} onChange={changeFields('email')}/>
                    <Input isPassword placeholder="Password" value={state.password}
                           onChange={changeFields('password')}/>
                    <Button disabled={loading} onPress={sendForm} text="Sign in"/>
                </View>
                <Text>Reset Password</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 55,
        backgroundColor: Colors.black,
    },
    brand: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    logo: {
        width: 80,
        height: 70
    },
    logoText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 28
    },
    content: {
        alignItems: 'center',
        gap: Gaps.g50
    },
    form: {
        alignSelf: 'stretch',
        gap: Gaps.g16
    },
});
