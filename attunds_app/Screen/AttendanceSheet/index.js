import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const demoData = [
  { id: '1', enrollment: 'ENR001', name: 'Rahul Patel', present: false },
  { id: '2', enrollment: 'ENR002', name: 'Priya Shah', present: false },
  { id: '3', enrollment: 'ENR003', name: 'Amit Joshi', present: false },
  { id: '4', enrollment: 'ENR004', name: 'Sejal Mehta', present: false },
  { id: '5', enrollment: 'ENR005', name: 'Jeet Gohil', present: false },
  { id: '6', enrollment: 'ENR006', name: 'Ayesha Khan', present: false },
];

const AttendanceSheet = () => {
  const [students, setStudents] = useState(demoData);

  const toggleAttendance = (id) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updated);
  };

  const handleSubmit = () => {
    const presentStudents = students.filter((s) => s.present);
    const absentStudents = students.filter((s) => !s.present);

    Alert.alert(
      'Attendance Submitted',
      `✔️ Present: ${presentStudents.length}\n❌ Absent: ${absentStudents.length}`
    );

    // Here you can also call an API or save to local DB
    console.log('Submitted Attendance:', students);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.enrollment}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <View style={styles.statusContainer}>
        <CheckBox
          value={item.present}
          onValueChange={() => toggleAttendance(item.id)}
          tintColors={{ true: '#10B981', false: '#EF4444' }}
        />
        <Text
          style={{
            marginLeft: 8,
            color: item.present ? '#10B981' : '#EF4444',
            fontWeight: '600',
          }}
        >
          {item.present ? '✔️ Present' : '❌ Absent'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Attendance Sheet</Text>

      <View style={styles.header}>
        <Text style={styles.cell}>Enrollment</Text>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Status</Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* ✅ Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>📩 Submit Attendance</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: { flex: 1, fontSize: 16 },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AttendanceSheet;
