import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarModal = ({ visible, onClose, onSelectDate }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>📅 Select Date</Text>
          <Calendar
            onDayPress={(day) => {
              onSelectDate(day.dateString);
              onClose();
            }}
            markedDates={{
              [new Date().toISOString().split('T')[0]]: {
                selected: true,
                selectedColor: '#2563EB',
              },
            }}
            theme={{
              selectedDayBackgroundColor: '#2563EB',
              todayTextColor: '#111827',
              arrowColor: '#2563EB',
            }}
          />
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  closeBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#2563EB',
    fontWeight: '600',
  },
});
