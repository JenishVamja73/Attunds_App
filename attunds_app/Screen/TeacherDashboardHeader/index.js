import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const TeacherDashboard = ({ navigation })  => {
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [attendanceData, setAttendanceData] = useState({});
    const [attendanceMarked, setAttendanceMarked] = useState({});
    const [teacherPhoto, setTeacherPhoto] = useState('https://randomuser.me/api/portraits/women/44.jpg');
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const sessions = [
        { id: '1', title: 'Algebra Basics', time: '10:00 AM - 11:00 AM', date: '2025-07-03' },
        { id: '2', title: 'Geometry Practice', time: '12:00 PM - 1:00 PM', date: '2025-07-03' },
        { id: '3', title: 'Trigonometry', time: '09:00 AM - 10:00 AM', date: '2025-07-01' }, // Previous date
        { id: '4', title: 'Statistics', time: '11:00 AM - 12:00 PM', date: '2025-07-02' },    // Previous date
        { id: '5', title: 'Calculus', time: '02:00 PM - 03:00 PM', date: '2025-07-04' },     // Future date
    ];


   

    const pickTeacherPhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 512,
                maxHeight: 512,
                quality: 0.8,
            },
            (response) => {
                const uri = response.assets?.[0]?.uri;
                if (uri) setTeacherPhoto(uri);
            }
        );
    };

    const formatDate = (date: Date) =>
        date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });

    const handleToggleAttendance = (studentId: string) => {
        setAttendanceData((prev) => ({
            ...prev,
            [selectedSessionId]: {
                ...(prev[selectedSessionId] || {}),
                [studentId]: !((prev[selectedSessionId] || {})[studentId]),
            },
        }));
    };

    const handleSubmitAttendance = () => {
        if (!selectedSessionId) {
            Alert.alert('Please select a session');
            return;
        }
        setAttendanceMarked((prev) => ({ ...prev, [selectedSessionId]: true }));
        Alert.alert('Success', 'Attendance submitted!');
    };

    const renderSession = ({ item }) => {
        if (item.date !== selectedDate.toISOString().split('T')[0]) return null;
        return (
            <TouchableOpacity
                style={[styles.sessionCard, selectedSessionId === item.id && styles.sessionCardSelected]}
                onPress={() => setSelectedSessionId(item.id)}
            >
                <Text style={styles.sessionTitle}>{item.title}</Text>
                <Text style={styles.sessionTime}>{item.time}</Text>
                {attendanceMarked[item.id] && <Text style={styles.marked}>✔️ Attendance marked</Text>}
            </TouchableOpacity>
        );
    };


    const renderSession01 = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.sessionCard,
                selectedSessionId === item.id && styles.sessionCardSelected,
            ]}
            onPress={() => {
                setSelectedSessionId(item.id);
                navigation.navigate('AttendanceSheet', {
                    sessionId: item.id,
                    sessionTitle: item.title,
                    sessionDate: item.date,
                    sessionTime: item.time,
                });
            }}
            activeOpacity={0.8}
        >
            <View style={styles.sessionHeaderRow}>
                <Text style={styles.sessionTitle}>{item.title}</Text>
                {attendanceMarked[item.id] && (
                    <Text style={styles.statusBadge}>✔️ Marked</Text>
                )}
            </View>
            <Text style={styles.sessionTime}>🕒 {item.time}</Text>
            <Text style={styles.sessionDate}>📅 {item.date}</Text>
        </TouchableOpacity>
    );



    const renderStudent = ({ item }) => {
        const isPresent = attendanceData[selectedSessionId]?.[item.id] || false;
        return (
            <View style={styles.studentRow}>
                <Text>{item.name}</Text>
                <Switch value={isPresent} onValueChange={() => handleToggleAttendance(item.id)} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>👩‍🏫 Teacher Dashboard</Text>

            {/* Teacher Profile */}
            <View style={styles.profileCard}>
                <TouchableOpacity onPress={pickTeacherPhoto}>
                    <Image source={{ uri: teacherPhoto }} style={styles.avatar} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.name}>Ms. Priya Sharma</Text>
                    <Text style={styles.subject}>Mathematics</Text>
                </View>
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
                <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                    <Text style={styles.date}>📅 {formatDate(selectedDate)}</Text>
                </TouchableOpacity>
                <Text style={styles.sessions}>📚 Sessions: {sessions.filter(s => s.date === selectedDate.toISOString().split('T')[0]).length}</Text>
            </View>

            {/* Session List */}
            <Text style={styles.sessionHeader}>Today's Sessions</Text>
            <FlatList
                data={sessions.filter(s => s.date === selectedDate.toISOString().split('T')[0])
                }
                renderItem={renderSession01}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>No sessions today</Text>}
            />

           
           

            {/* Calendar Modal */}
            {calendarVisible && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                        if (date) {
                            setSelectedDate(date);
                            setCalendarVisible(false);
                            setSelectedSessionId(null); // reset selected session
                        }
                    }}
                />
            )}

            <TouchableOpacity
  style={styles.todayButton}
  onPress={() => {
    navigation.navigate('AttendanceSheet', {
      fromTodayButton: true,
      today: new Date().toISOString().split('T')[0], // pass today's date
    });
  }}
>
  <Text style={styles.todayButtonText}>📅 View Today's Attendance Sheet</Text>
</TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, flex: 1, backgroundColor: '#F9FAFB' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
    name: { fontSize: 18, fontWeight: '600' },
    subject: { color: '#6B7280' },
    summaryCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    date: { fontSize: 16, color: '#1F2937' },
    sessions: { fontSize: 16, color: '#1F2937' },
    sessionHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 12,
        color: '#111827',
    },
    sessionCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    sessionCardSelected: {
        borderColor: '#2563EB',
        borderWidth: 2,
    },
    sessionTitle: { fontSize: 16, fontWeight: '500', color: "black", backgroundColor: "red" },
    sessionTime: { fontSize: 14, color: '#6B7280' },
    marked: { marginTop: 4, color: 'green', fontSize: 12 },
    studentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: '#2563EB',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    emptyText: { textAlign: 'center', marginTop: 16, color: '#9CA3AF' },

    sessionCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },

    sessionCardSelected: {
        borderColor: '#2563EB',
        backgroundColor: '#EFF6FF',
    },

    sessionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    sessionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },

    sessionTime: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },

    sessionDate: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 4,
    },

    statusBadge: {
        backgroundColor: '#D1FAE5',
        color: '#065F46',
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        overflow: 'hidden',
        fontWeight: '600',
    },
    todayButton: {
  backgroundColor: '#10B981',
  padding: 12,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 12,
},
todayButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},


});

export default TeacherDashboard;
