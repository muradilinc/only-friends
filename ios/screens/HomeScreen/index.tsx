import {NativeSyntheticEvent, Pressable, Text, TextInputChangeEventData, View, StyleSheet} from "react-native";
import {Input} from "../../shared/Input/Input";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {searchFriend} from "../../features/auth/authThunk";
import {selectFriends} from "../../features/auth/authSlice";
import {Button} from "../../shared/Buntton/Button";

export default function HomeScreen() {
    const [search, setSearch] = useState<string>('');
    const friends = useAppSelector(selectFriends);
    const dispatch = useAppDispatch();

    const changeFields = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const {text} = event.nativeEvent;
        setSearch(text);
    };

    const searchClick = async () => {
        await dispatch(searchFriend(search)).unwrap();
    }
    return (
        <View>
            <View style={styles.searchBlock}>
                <Input value={search} onChange={changeFields}/>
                <Button text="Search" onPress={searchClick}/>
            </View>
            {
                friends ?
                    <View>
                        {
                            friends.map(friend => <Text>{friend.email}</Text>)
                        }
                    </View>
                    :
                    null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    searchBlock: {
        marginTop: 100,
        flexDirection: 'row'
    },
})