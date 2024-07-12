import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = ({
    onSubmit,
    initialValues = { title: '', content: '' }
}) => {

    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label}>enter title:</Text>
            <TextInput style={styles.input}
                value={title}
                onChangeText={text => setTitle(text)} />
            <Text style={styles.label}>enter content:</Text>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={text => setContent(text)} />
            <Button
                onPress={() => onSubmit(title, content)}
                title='save blog post'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ff007f',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        color: '#ff007f',
        marginLeft: 5
    }
});

export default BlogPostForm;
