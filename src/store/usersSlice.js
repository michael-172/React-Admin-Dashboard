import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk('users/getUsers', async (limitNumber, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        const res = (limitNumber) ? await fetch(`https://myadmin-json-server.herokuapp.com/users/?_limit=${limitNumber}`) : await fetch(`https://myadmin-json-server.herokuapp.com/users`);
        const data = await res.json();
        return data;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});



export const insertUser = createAsyncThunk('users/insertUser', async (userData, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await fetch("https://myadmin-json-server.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-type' : "application/json; charset=UTF-8",
            },
            
        });
        const data = await res.json()
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});



export const deleteUser = createAsyncThunk('users/deleteUser', async (item, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        await fetch(`https://myadmin-json-server.herokuapp.com/users/${item.id}`, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return item;
    }
    catch(error){
        rejectWithValue(error.message)
    }
});


export const getUser = createAsyncThunk('users/getUser', async (item, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        await fetch(`https://myadmin-json-server.herokuapp.com/users/${item.id}`, {
            method: 'GET',
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return item;
    }
    catch(error){
        rejectWithValue(error.message)
    }
})


const usersSlice = createSlice({
    name: "users",
    initialState: {users: [], isLoading: false, isInserted: false, insertionError:false, userInfo: null},
    extraReducers: {
        //getUsers
        [getUsers.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action)
        },

        //insertUser
        [insertUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [insertUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isInserted = true;
            state.users.push(action.payload)
        },
        [insertUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.insertionError = true
        },

        //deleteUser
        [deleteUser.fulfilled]: (state, action) => {
            state.users = state.users.filter(el => el.id !== action.payload.id)
        },

        //deleteUser
        [getUser.fulfilled]: (state, action) => {
            state.userInfo = action.payload
            console.log(action.payload)
        },
    }
});

export default usersSlice.reducer;