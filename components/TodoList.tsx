import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Task {
    key: string;
    value: string;
    completed: boolean;
}

export default function TodoList() {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = () => {
        if (task.length > 0) {
            setTasks([...tasks, { key: uuid.v4() as string, value: task, completed: false }]);
            setTask('');
        }
    };

    const removeTask = (key: string) => {
        setTasks(tasks.filter(task => task.key !== key));
    };

    const toggleTaskComplete = (key: string) => {
        setTasks(tasks.map(task => task.key === key ? { key: task.key, value: task.value, completed: !task.completed } : task));
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">To-Do List</ThemedText>
            <TextInput
                style={styles.input}
                placeholder='Add a task'
                value={task}
                onChangeText={setTask}
            />
            <Button title='Add Task' onPress={addTask}/>
            <FlatList
                data={tasks}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => toggleTaskComplete(item.key)} onLongPress={() => removeTask(item.key)}>
                        <ThemedText style={[styles.task, item.completed ? styles.completedTask : null]}>
                            {item.value}
                        </ThemedText>
                    </TouchableOpacity>
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingLeft: 8,
        marginBottom: 10,
        borderRadius: 5,
    },
    task: {
        padding: 15,
        fontSize: 18,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});