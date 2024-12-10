import { createSlice } from '@reduxjs/toolkit';

// ฟังก์ชันสำหรับโหลด user จาก Local Storage
const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (!serializedState) {
            return { user: null };  
        }
        return { user: JSON.parse(serializedState) }; // คืนค่า user object
    } catch (error) {
        console.error('Error loading user from localStorage:', error);
        return { user: null };  
    }
};
const initialState = {
    user: null, // ค่าเริ่มต้นคือ null
};


// สร้าง Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('user', JSON.stringify(state.user)); // บันทึกลง localStorage
        },
        logout(state) {
            state.user = null; // ตั้งค่า user เป็น null
            localStorage.removeItem('user'); // ลบข้อมูล user จาก localStorage
        }
    }
});

// Export actions และ reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
