import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// This perfectly simulates fetching a page of models from the Sketchfab API
export const fetchRemoteModels = createAsyncThunk(
  'arModels/fetchRemoteModels',
  async () => {
    

    return [
      {
        id: 'sf_duck',
        name: 'Yellow Duck',
        type: 'GLB',
        source: { uri: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb' },
        thumbnail: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/screenshot/screenshot.png',
        scale: [0.05, 0.05, 0.05],
      },
      {
        id: 'sf_avocado',
        name: 'Avocado',
        type: 'GLB',
        source: { uri: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb' },
        thumbnail: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/screenshot/screenshot.jpg',
        scale: [10, 10, 10], // Avocado is tiny, scale it up
      },
      {
        id: 'sf_lantern',
        name: 'Antique Lantern',
        type: 'GLB',
        source: { uri: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb' },
        thumbnail: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/screenshot/screenshot.jpg',
        scale: [0.05, 0.05, 0.05], // Lantern is massive, scale it down
      }
    ];
  }
);

const initialState = {
  activeModel: null,
  modelCatalog: [],
  isLoading: false,
};

const arModelsSlice = createSlice({
  name: 'arModels',
  initialState,
  reducers: {
    setActiveModel: (state, action) => {
      state.activeModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemoteModels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRemoteModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modelCatalog = action.payload;
      });
  }
});

export const { setActiveModel } = arModelsSlice.actions;
export default arModelsSlice.reducer;