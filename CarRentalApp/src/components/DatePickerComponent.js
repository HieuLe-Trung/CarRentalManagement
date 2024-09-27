import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isPickingStartDate, setIsPickingStartDate] = useState(true); 
  const [isPickingStartTime, setIsPickingStartTime] = useState(false);
  const [isPickingEndTime, setIsPickingEndTime] = useState(false);
  
  const today = new Date(); 

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showTimePicker = (isStart) => {
    if (isStart) {
      setIsPickingStartTime(true);
    } else {
      setIsPickingEndTime(true);
    }
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirmDate = (date) => {
    if (isPickingStartDate) {
      const updatedStartDate = new Date(date);
      updatedStartDate.setHours(7, 0); // Đặt thời gian mặc định là 7:00 sáng
      setStartDate(updatedStartDate);
      setEndDate(null); 
      setIsPickingStartDate(false); 
      setIsPickingStartTime(true); // Hiện thời gian sau khi chọn ngày bắt đầu
    } else {
      const updatedEndDate = new Date(date);
      updatedEndDate.setHours(7, 0); // Đặt thời gian mặc định là 7:00 sáng
      setEndDate(updatedEndDate);
      hideDatePicker(); 
      setIsPickingEndTime(true); // Hiện thời gian sau khi chọn ngày kết thúc
    }
  };

  const handleConfirmTime = (time) => {
    if (isPickingStartTime) {
      const updatedStartDate = new Date(startDate);
      updatedStartDate.setHours(time.getHours(), time.getMinutes());
      setStartDate(updatedStartDate);
      hideTimePicker(); 
      setIsPickingStartTime(false);
    } else {
      const updatedEndDate = new Date(endDate);
      updatedEndDate.setHours(time.getHours(), time.getMinutes());

      // Kiểm tra nếu giờ trả nhỏ hơn giờ thuê
      if (updatedEndDate <= startDate) {
        Alert.alert('Thông báo', 'Giờ trả phải sau giờ thuê. Vui lòng chọn lại!');
        return; // Dừng hàm nếu giờ trả không hợp lệ
      }

      setEndDate(updatedEndDate);
      hideTimePicker(); 
      setIsPickingEndTime(false);
    }
  };

  const handleReturnDate = () => {
    if (startDate) {
      setIsPickingStartDate(false);
      setDatePickerVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn thời gian thuê</Text>

      <View style={styles.card}>
        <View style={styles.dateTimeContainer}>
          {/* Nút chọn ngày thuê */}
          <TouchableOpacity style={styles.dateButton} onPress={() => { setIsPickingStartDate(true); showDatePicker(); }}>
            <Text style={styles.dateLabel}>Chọn ngày thuê</Text>
            <Text style={styles.dateText}>
              {startDate ? startDate.toLocaleDateString('vi-VN') : 'dd/mm/yyyy'}
            </Text>
          </TouchableOpacity>

          {/* Nút chọn giờ thuê */}
          <TouchableOpacity style={styles.dateButton} onPress={() => { if (startDate) { showTimePicker(true); }}}
            disabled={!startDate}>
            <Text style={styles.dateLabel}>Chọn giờ thuê</Text>
            <Text style={styles.dateText}>
              {startDate ? startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateTimeContainer}>
          {/* Nút chọn ngày trả */}
          <TouchableOpacity style={styles.dateButton} onPress={handleReturnDate} disabled={!startDate}>
            <Text style={styles.dateLabel}>Chọn ngày trả</Text>
            <Text style={styles.dateText}>
              {endDate ? endDate.toLocaleDateString('vi-VN') : 'dd/mm/yyyy'}
            </Text>
          </TouchableOpacity>

          {/* Nút chọn giờ trả */}
          <TouchableOpacity style={styles.dateButton} onPress={() => { if (endDate) { showTimePicker(false); }}}
            disabled={!endDate}>
            <Text style={styles.dateLabel}>Chọn giờ trả</Text>
            <Text style={styles.dateText}>
              {endDate ? endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, (!startDate || !endDate) && styles.buttonDisabled]}
        onPress={() => alert(`Đã đặt từ ${startDate.toLocaleString('vi-VN')} đến ${endDate.toLocaleString('vi-VN')}`)}
        disabled={!startDate || !endDate}
      >
        <Text style={styles.confirmText}>Tìm xe</Text>
      </TouchableOpacity>

      {/* Modal Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        minimumDate={isPickingStartDate ? today : startDate}
        maximumDate={new Date(2025, 11, 31)} 
      />

      {/* Modal Time Picker */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
        date={isPickingStartTime ? 
          (startDate ? startDate : new Date(new Date().setHours(7, 0))) : 
          (endDate ? endDate : new Date(new Date().setHours(7, 0)))}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6f0ff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#003366',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#b3d9ff',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#003366',
  },
  dateText: {
    fontSize: 18,
    marginTop: 8,
    color: '#00264d',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#0052cc',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonDisabled: {
    backgroundColor: '#99b3cc',
  },
});

export default DatePickerComponent;
