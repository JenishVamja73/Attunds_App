import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Switch, Text, View } from 'react-native';

const students = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Riya Patel' },
  { id: '3', name: 'Ali Khan' },
];

const SessionDetails = ({ route }) => {
  const { session } = route.params;
  const [attendance, setAttendance] = useState({});

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const submitAttendance = () => {
    Alert.alert('Attendance Saved', JSON.stringify(attendance, null, 2));
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.subtitle}>{session.time}</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Switch
              value={!!attendance[item.id]}
              onValueChange={() => toggleAttendance(item.id)}
            />
          </View>
        )}
      />

      <Text onPress={submitAttendance} style={styles.submitButton}>📩 Submit Attendance</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {  flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#6B7280', marginBottom: 20 },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: { fontSize: 16 },
  submitButton: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#4ade80',
    padding: 12,
    borderRadius: 10,
    color: 'white',
  },
});

export default SessionDetails;
