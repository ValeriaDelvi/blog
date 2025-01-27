import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { EvilIcons } from "@expo/vector-icons";


const ShowScreen = ({ navigation }) => {
    // console.log(navigation.getParam('id'));
    const { state } = useContext(Context);

    const blogPost = state.find(
        blogPost => blogPost.id === navigation.getParam('id'))
    return (
        <View>
            <Text>show screen page</Text>
            <Text>id:{blogPost.id}</Text>
            <Text>title:{blogPost.title}</Text>
            <Text>content:{blogPost.content}</Text>

        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity
                onPress={() => navigation.navigate(
                    'Edit',
                    {id: navigation.getParam('id')}
                )}>
                <EvilIcons name="pencil" size={35} />
            </TouchableOpacity>
        ),
    };
}


const styles = StyleSheet.create({});

export default ShowScreen;