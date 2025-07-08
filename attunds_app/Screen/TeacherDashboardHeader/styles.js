import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  teacherCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  teacherPhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e5e7eb',
  },
  teacherName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  teacherSubject: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 4,
  },
  header: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#1f2937',
  },
  sessionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderColor: '#d1d5db',
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  sessionTime: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  marked: {
    marginTop: 6,
    color: '#16a34a',
    fontSize: 13,
    fontWeight: '500',
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  studentName: {
    fontSize: 16,
    color: '#111827',
  },
  endButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
